import { LinearFilter, SRGBColorSpace } from "three/src/constants.js";
import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera.js";
import { SphereGeometry } from "three/src/geometries/SphereGeometry.js";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { MeshBasicMaterial } from "three/src/materials/MeshBasicMaterial.js";
import { MathUtils } from "three/src/math/MathUtils.js";
import { Vector3 } from "three/src/math/Vector3.js";
import { Mesh } from "three/src/objects/Mesh.js";
import { Scene } from "three/src/scenes/Scene.js";
import { WebGLRenderer } from "three/src/renderers/WebGLRenderer.js";

const FOV_DEFAULT = 62;
const FOV_MIN = 34;
const FOV_MAX = 84;
const AUTO_ROTATE_DEGREES_PER_FRAME = MathUtils.radToDeg(0.0015);
const INTERACTION_PAUSE_MS = 10000;

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const setPressed = (buttons, activeButton) => {
  buttons.forEach((button) => {
    const isActive = button === activeButton;
    button.classList.toggle("is-selected", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

const syncCopy = (root, button) => {
  const label = root.querySelector("[data-panorama-label]");
  const summary = root.querySelector("[data-panorama-summary]");
  const nextLabel = button?.getAttribute("data-panorama-label");
  const nextSummary = button?.getAttribute("data-panorama-summary");
  if (label && nextLabel) label.textContent = nextLabel;
  if (summary && nextSummary) summary.textContent = nextSummary;
};

const initializePanoramaViewer = (root) => {
  const wrap = root.querySelector("[data-panorama-canvas]");
  const fallback = root.querySelector("[data-panorama-fallback]");
  const imageSrc = root.getAttribute("data-panorama-src");
  const zoomInButton = root.querySelector("[data-panorama-zoom-in]");
  const zoomOutButton = root.querySelector("[data-panorama-zoom-out]");
  const resetButton = root.querySelector("[data-panorama-reset]");
  const waypointButtons = [...root.querySelectorAll("[data-panorama-waypoint]")];

  if (!wrap || !imageSrc) return;

  const cameraState = {
    camera: null,
    lon: 0,
    lat: 0,
    pauseUntil: 0,
  };

  const pauseAfterInteraction = () => {
    cameraState.pauseUntil = Date.now() + INTERACTION_PAUSE_MS;
  };

  const setFov = (nextFov) => {
    if (!cameraState.camera) return;
    cameraState.camera.fov = clamp(nextFov, FOV_MIN, FOV_MAX);
    cameraState.camera.updateProjectionMatrix();
  };

  const applyView = ({ lon = 0, lat = 0, fov = FOV_DEFAULT } = {}) => {
    pauseAfterInteraction();
    cameraState.lon = Number(lon) || 0;
    cameraState.lat = clamp(Number(lat) || 0, -78, 78);
    setFov(Number(fov) || FOV_DEFAULT);
  };

  const getSize = () => {
    const width = Math.max(wrap.clientWidth, 320);
    const preferredHeight = Math.max(320, Math.min(width * 0.62, 640));
    const height = Math.max(wrap.clientHeight, preferredHeight);
    return { width, height };
  };

  const showFallback = () => {
    root.classList.add("has-panorama-fallback");
    if (fallback) fallback.hidden = false;
    wrap.hidden = true;
  };

  const { width, height } = getSize();
  let renderer = null;

  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    showFallback();
    return;
  }

  if (!renderer || !renderer.getContext()) {
    renderer?.dispose();
    showFallback();
    return;
  }

  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  wrap.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(FOV_DEFAULT, width / height, 0.1, 1100);
  cameraState.camera = camera;

  const geometry = new SphereGeometry(500, 96, 56);
  geometry.scale(-1, 1, 1);
  const material = new MeshBasicMaterial({ color: 0xffffff });
  const sphere = new Mesh(geometry, material);
  scene.add(sphere);

  const texture = new TextureLoader().load(
    imageSrc,
    () => {
      material.needsUpdate = true;
    },
    undefined,
    () => {
      showFallback();
    },
  );
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  material.map = texture;

  const canvas = renderer.domElement;
  const activePointers = new Map();
  let isDragging = false;
  let lastX = 0;
  let lastY = 0;
  let lastPinchDistance = 0;
  let frameId = 0;

  const pointerDistance = () => {
    if (activePointers.size < 2) return 0;
    const points = [...activePointers.values()];
    const a = points[0];
    const b = points[1];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  const pointerMidpoint = () => {
    const points = [...activePointers.values()];
    if (points.length < 2) return null;
    return { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 };
  };

  const updateLookAt = () => {
    const phi = MathUtils.degToRad(90 - cameraState.lat);
    const theta = MathUtils.degToRad(cameraState.lon);
    const target = new Vector3(
      500 * Math.sin(phi) * Math.cos(theta),
      500 * Math.cos(phi),
      500 * Math.sin(phi) * Math.sin(theta),
    );
    camera.lookAt(target);
  };

  const handleDrag = (clientX, clientY) => {
    pauseAfterInteraction();
    const dx = clientX - lastX;
    const dy = clientY - lastY;
    cameraState.lon = (cameraState.lon - dx * 0.12) % 360;
    cameraState.lat = clamp(cameraState.lat + dy * 0.1, -78, 78);
    lastX = clientX;
    lastY = clientY;
  };

  const onPointerDown = (event) => {
    event.preventDefault();
    pauseAfterInteraction();
    canvas.setPointerCapture(event.pointerId);
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    isDragging = true;
    canvas.classList.add("is-dragging");
    if (activePointers.size >= 2) {
      const midpoint = pointerMidpoint();
      if (midpoint) {
        lastX = midpoint.x;
        lastY = midpoint.y;
      }
      lastPinchDistance = pointerDistance();
      return;
    }
    lastX = event.clientX;
    lastY = event.clientY;
  };

  const onPointerMove = (event) => {
    if (!activePointers.has(event.pointerId)) return;
    event.preventDefault();
    pauseAfterInteraction();
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (activePointers.size >= 2) {
      const midpoint = pointerMidpoint();
      if (!midpoint) return;
      handleDrag(midpoint.x, midpoint.y);
      const distance = pointerDistance();
      if (lastPinchDistance > 0 && distance > 0) {
        setFov(camera.fov - (distance - lastPinchDistance) * 0.045);
      }
      lastPinchDistance = distance;
      return;
    }

    if (isDragging) handleDrag(event.clientX, event.clientY);
  };

  const onPointerUp = (event) => {
    pauseAfterInteraction();
    activePointers.delete(event.pointerId);
    isDragging = activePointers.size > 0;
    canvas.classList.toggle("is-dragging", isDragging);
    lastPinchDistance = activePointers.size >= 2 ? pointerDistance() : 0;
    if (activePointers.size === 1) {
      const next = [...activePointers.values()][0];
      lastX = next.x;
      lastY = next.y;
    }
  };

  const onWheel = (event) => {
    event.preventDefault();
    pauseAfterInteraction();
    setFov(camera.fov + event.deltaY * 0.035);
  };

  const resize = () => {
    const next = getSize();
    camera.aspect = next.width / next.height;
    camera.updateProjectionMatrix();
    renderer.setSize(next.width, next.height);
  };

  const animate = () => {
    frameId = requestAnimationFrame(animate);
    if (!isDragging && activePointers.size === 0 && Date.now() >= cameraState.pauseUntil) {
      cameraState.lon = (cameraState.lon - AUTO_ROTATE_DEGREES_PER_FRAME) % 360;
    }
    updateLookAt();
    renderer.render(scene, camera);
  };

  waypointButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setPressed(waypointButtons, button);
      syncCopy(root, button);
      applyView({
        lon: button.getAttribute("data-lon"),
        lat: button.getAttribute("data-lat"),
        fov: button.getAttribute("data-fov"),
      });
    });
  });

  zoomInButton?.addEventListener("click", () => {
    pauseAfterInteraction();
    setFov(camera.fov - 7);
  });

  zoomOutButton?.addEventListener("click", () => {
    pauseAfterInteraction();
    setFov(camera.fov + 7);
  });

  resetButton?.addEventListener("click", () => {
    const firstWaypoint = waypointButtons[0];
    if (firstWaypoint) {
      firstWaypoint.click();
      return;
    }
    applyView();
  });

  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", onPointerUp);
  canvas.addEventListener("wheel", onWheel, { passive: false });

  const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
  observer?.observe(wrap);
  window.addEventListener("resize", resize);

  const firstWaypoint = waypointButtons[0];
  if (firstWaypoint) {
    setPressed(waypointButtons, firstWaypoint);
    syncCopy(root, firstWaypoint);
    applyView({
      lon: firstWaypoint.getAttribute("data-lon"),
      lat: firstWaypoint.getAttribute("data-lat"),
      fov: firstWaypoint.getAttribute("data-fov"),
    });
  }

  animate();

  return () => {
    cancelAnimationFrame(frameId);
    observer?.disconnect();
    window.removeEventListener("resize", resize);
    canvas.removeEventListener("pointerdown", onPointerDown);
    canvas.removeEventListener("pointermove", onPointerMove);
    canvas.removeEventListener("pointerup", onPointerUp);
    canvas.removeEventListener("pointercancel", onPointerUp);
    canvas.removeEventListener("wheel", onWheel);
    texture.dispose();
    material.dispose();
    geometry.dispose();
    renderer.dispose();
    if (wrap.contains(canvas)) wrap.removeChild(canvas);
  };
};

export const initializePanoramaViewers = () => {
  document.querySelectorAll("[data-panorama-viewer]").forEach((root) => {
    initializePanoramaViewer(root);
  });
};
