Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$outDir = Join-Path $root "assets\images\journal"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$width = 1280
$height = 720

$articles = @(
  @{ Slug="prenatal-comfort"; Motif="prenatal"; Accent="#d99a8d"; Ground="#f5eadf"; Title="Prenatal comfort" },
  @{ Slug="nervous-system-safe-touch"; Motif="nervous"; Accent="#6f9f93"; Ground="#eaf1e6"; Title="Safe touch" },
  @{ Slug="water-breath-return"; Motif="water"; Accent="#5f9aa4"; Ground="#e6f0ea"; Title="Water return" },
  @{ Slug="side-lying-prenatal-positioning"; Motif="bolsters"; Accent="#d7a36f"; Ground="#f7ead8"; Title="Side lying" },
  @{ Slug="pregnancy-swelling-lymphatic-touch"; Motif="lymph-prenatal"; Accent="#8bb8ad"; Ground="#edf2df"; Title="Pregnancy swelling" },
  @{ Slug="postpartum-return-to-body"; Motif="postpartum"; Accent="#c58f94"; Ground="#f4e6df"; Title="Postpartum return" },
  @{ Slug="headache-jaw-clenching-care"; Motif="jaw"; Accent="#8b6b4d"; Ground="#eee7dc"; Title="Jaw map" },
  @{ Slug="neck-shoulder-screen-tension"; Motif="desk"; Accent="#768b75"; Ground="#e9eee1"; Title="Screen shoulders" },
  @{ Slug="low-back-hip-relief-light-touch"; Motif="hips"; Accent="#a36f56"; Ground="#f0e4d8"; Title="Low back" },
  @{ Slug="lymphatic-flow-after-travel"; Motif="travel-flow"; Accent="#6d9ca3"; Ground="#e5f0ed"; Title="Travel flow" },
  @{ Slug="grief-held-in-body"; Motif="grief"; Accent="#7b8d83"; Ground="#e9efe8"; Title="Grief and breath" },
  @{ Slug="burnout-reset-care"; Motif="burnout"; Accent="#b98858"; Ground="#f3eadc"; Title="Burnout reset" },
  @{ Slug="sensitive-bodies-first-massage"; Motif="feather"; Accent="#c48f8b"; Ground="#f3e7e1"; Title="Sensitive touch" },
  @{ Slug="choose-pressure-without-guessing"; Motif="pressure"; Accent="#8a6d4f"; Ground="#ede6dc"; Title="Pressure choice" },
  @{ Slug="what-to-wear-and-prepare"; Motif="first-visit"; Accent="#7f9c82"; Ground="#eaf0e1"; Title="First visit" },
  @{ Slug="session-length-guide"; Motif="time"; Accent="#a88452"; Ground="#f0e8dc"; Title="Session length" },
  @{ Slug="water-ritual-aftercare"; Motif="glass-water"; Accent="#5f99aa"; Ground="#e3eef0"; Title="Water ritual" },
  @{ Slug="warm-stones-grounding"; Motif="stones"; Accent="#8b6b4d"; Ground="#ece2d6"; Title="Warm stones" },
  @{ Slug="aromatics-and-scent-sensitivity"; Motif="scent"; Accent="#8fa879"; Ground="#edf0df"; Title="Scent choice" },
  @{ Slug="quiet-vs-guided-massage"; Motif="voice"; Accent="#7a8f8b"; Ground="#e7efeb"; Title="Quiet or guided" },
  @{ Slug="insomnia-rest-massage"; Motif="sleep"; Accent="#6f83a4"; Ground="#e6ebf0"; Title="Sleep support" },
  @{ Slug="massage-for-caregivers"; Motif="caregiver"; Accent="#9b7a5c"; Ground="#eee4da"; Title="Caregivers" },
  @{ Slug="seniors-gentle-mobility"; Motif="mobility"; Accent="#7c967a"; Ground="#e8efdf"; Title="Gentle mobility" },
  @{ Slug="desk-workers-posture-reset"; Motif="posture"; Accent="#6f8f89"; Ground="#e5efea"; Title="Desk reset" },
  @{ Slug="runners-hikers-recovery"; Motif="trail"; Accent="#aa8054"; Ground="#f1e3d5"; Title="Desert legs" },
  @{ Slug="scar-and-surgery-caution"; Motif="scar"; Accent="#b07d72"; Ground="#f0e2dd"; Title="Surgery caution" },
  @{ Slug="lymphatic-massage-myths"; Motif="lymph-nodes"; Accent="#6faaa0"; Ground="#e5f0ea"; Title="Lymph myths" },
  @{ Slug="first-prenatal-massage-questions"; Motif="questions"; Accent="#d99a8d"; Ground="#f7e8dc"; Title="Prenatal questions" },
  @{ Slug="consent-language-before-touch"; Motif="consent"; Accent="#8c765b"; Ground="#eee6db"; Title="Consent language" },
  @{ Slug="emotional-safety-bodywork"; Motif="emotional-safety"; Accent="#8f7b95"; Ground="#eee6f0"; Title="Emotional safety" },
  @{ Slug="rose-quartz-meaning-care"; Motif="rose-quartz"; Accent="#d68f9d"; Ground="#f5e5e8"; Title="Rose quartz" },
  @{ Slug="scorpio-water-ritual"; Motif="scorpio-water"; Accent="#547f91"; Ground="#e3ecf0"; Title="Scorpio water" },
  @{ Slug="seven-waters-method"; Motif="seven-waters"; Accent="#5e9da4"; Ground="#e3efed"; Title="Seven waters" },
  @{ Slug="body-map-booking-guide"; Motif="body-map"; Accent="#8aa280"; Ground="#e9f0e0"; Title="Body map" },
  @{ Slug="seasonal-self-care-las-vegas"; Motif="desert-season"; Accent="#c19057"; Ground="#f3e6d2"; Title="Las Vegas seasons" },
  @{ Slug="how-often-to-rebook"; Motif="rebook"; Accent="#7d9a80"; Ground="#e8f0df"; Title="Rebook rhythm" }
)

function ColorFromHex($hex, [int]$alpha = 255) {
  $clean = $hex.TrimStart("#")
  $r = [Convert]::ToInt32($clean.Substring(0, 2), 16)
  $g = [Convert]::ToInt32($clean.Substring(2, 2), 16)
  $b = [Convert]::ToInt32($clean.Substring(4, 2), 16)
  return [System.Drawing.Color]::FromArgb($alpha, $r, $g, $b)
}

function RoundedRect([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $d = $r * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  return $path
}

function DrawPathLine($g, $points, $color, [float]$width = 6) {
  $pen = [System.Drawing.Pen]::new($color, $width)
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  $g.DrawBezier($pen, $points[0], $points[1], $points[2], $points[3])
  $pen.Dispose()
}

function DrawLeaf($g, [float]$x, [float]$y, [float]$scale, $color) {
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $path.AddBezier($x, $y, $x + 70*$scale, $y - 55*$scale, $x + 145*$scale, $y - 36*$scale, $x + 190*$scale, $y)
  $path.AddBezier($x + 190*$scale, $y, $x + 135*$scale, $y + 44*$scale, $x + 58*$scale, $y + 48*$scale, $x, $y)
  $brush = [System.Drawing.SolidBrush]::new($color)
  $g.FillPath($brush, $path)
  $pen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(130, 49, 75, 54), 3*$scale)
  $g.DrawBezier($pen, $x + 22*$scale, $y, $x + 78*$scale, $y - 12*$scale, $x + 126*$scale, $y - 10*$scale, $x + 168*$scale, $y)
  $pen.Dispose()
  $brush.Dispose()
  $path.Dispose()
}

function DrawDrop($g, [float]$x, [float]$y, [float]$scale, $fill, $outline) {
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $path.AddBezier($x, $y + 84*$scale, $x - 58*$scale, $y + 32*$scale, $x - 24*$scale, $y - 32*$scale, $x, $y - 82*$scale)
  $path.AddBezier($x, $y - 82*$scale, $x + 24*$scale, $y - 32*$scale, $x + 58*$scale, $y + 32*$scale, $x, $y + 84*$scale)
  $brush = [System.Drawing.SolidBrush]::new($fill)
  $pen = [System.Drawing.Pen]::new($outline, 4*$scale)
  $g.FillPath($brush, $path)
  $g.DrawPath($pen, $path)
  $brush.Dispose()
  $pen.Dispose()
  $path.Dispose()
}

function DrawStone($g, [float]$x, [float]$y, [float]$w, [float]$h, $fill, $outline) {
  $path = RoundedRect $x $y $w $h ([Math]::Min($w, $h) / 2.7)
  $brush = [System.Drawing.SolidBrush]::new($fill)
  $pen = [System.Drawing.Pen]::new($outline, 4)
  $g.FillPath($brush, $path)
  $g.DrawPath($pen, $path)
  $brush.Dispose()
  $pen.Dispose()
  $path.Dispose()
}

function DrawMotif($g, $item, $accent, $forest, $wood, $water, $rose, $linen) {
  $softAccent = [System.Drawing.Color]::FromArgb(92, $accent.R, $accent.G, $accent.B)
  $strongAccent = [System.Drawing.Color]::FromArgb(210, $accent.R, $accent.G, $accent.B)
  $softForest = [System.Drawing.Color]::FromArgb(170, $forest.R, $forest.G, $forest.B)
  $line = [System.Drawing.Color]::FromArgb(205, $forest.R, $forest.G, $forest.B)
  $x = 640
  $y = 360

  switch ($item.Motif) {
    "prenatal" {
      DrawStone $g 430 225 330 235 $softAccent $strongAccent
      DrawStone $g 360 285 145 210 ([System.Drawing.Color]::FromArgb(85, 255, 255, 255)) $softForest
      DrawStone $g 760 285 145 210 ([System.Drawing.Color]::FromArgb(85, 255, 255, 255)) $softForest
      DrawDrop $g 640 345 1.1 ([System.Drawing.Color]::FromArgb(118, $rose.R, $rose.G, $rose.B)) $strongAccent
    }
    "bolsters" {
      DrawStone $g 350 420 580 80 ([System.Drawing.Color]::FromArgb(105, $accent.R, $accent.G, $accent.B)) $strongAccent
      DrawStone $g 460 250 355 155 ([System.Drawing.Color]::FromArgb(82, 255, 255, 255)) $softForest
      DrawLeaf $g 500 245 0.8 ([System.Drawing.Color]::FromArgb(95, 139, 184, 173))
    }
    "lymph-prenatal" {
      DrawDrop $g 575 330 0.9 ([System.Drawing.Color]::FromArgb(95, $water.R, $water.G, $water.B)) $strongAccent
      DrawDrop $g 705 330 0.9 ([System.Drawing.Color]::FromArgb(78, $rose.R, $rose.G, $rose.B)) $strongAccent
      for ($i=0; $i -lt 5; $i++) { DrawStone $g (420 + 88*$i) (485 - 24*($i%2)) 70 42 ([System.Drawing.Color]::FromArgb(120, 255,255,255)) $softForest }
    }
    "postpartum" {
      DrawStone $g 420 300 440 190 ([System.Drawing.Color]::FromArgb(86, $rose.R, $rose.G, $rose.B)) $strongAccent
      DrawLeaf $g 450 285 0.8 ([System.Drawing.Color]::FromArgb(110, $accent.R, $accent.G, $accent.B))
      DrawDrop $g 690 350 0.72 ([System.Drawing.Color]::FromArgb(90, $water.R, $water.G, $water.B)) $softForest
    }
    "jaw" {
      DrawPathLine $g @([System.Drawing.PointF]::new(520,230),[System.Drawing.PointF]::new(720,210),[System.Drawing.PointF]::new(790,370),[System.Drawing.PointF]::new(680,465)) $line 8
      DrawPathLine $g @([System.Drawing.PointF]::new(685,465),[System.Drawing.PointF]::new(630,520),[System.Drawing.PointF]::new(545,500),[System.Drawing.PointF]::new(505,440)) $strongAccent 8
      for ($i=0; $i -lt 4; $i++) { DrawDrop $g (475 + 60*$i) (330 + 18*$i) 0.25 $softAccent $strongAccent }
    }
    "desk" {
      DrawStone $g 430 280 420 240 ([System.Drawing.Color]::FromArgb(72, 255,255,255)) $softForest
      DrawStone $g 500 330 280 145 $softAccent $strongAccent
      DrawPathLine $g @([System.Drawing.PointF]::new(420,525),[System.Drawing.PointF]::new(560,485),[System.Drawing.PointF]::new(730,486),[System.Drawing.PointF]::new(860,525)) $line 7
    }
    "hips" {
      DrawPathLine $g @([System.Drawing.PointF]::new(450,315),[System.Drawing.PointF]::new(530,450),[System.Drawing.PointF]::new(750,450),[System.Drawing.PointF]::new(830,315)) $strongAccent 10
      DrawDrop $g 640 385 0.72 $softAccent $line
      DrawStone $g 540 470 90 52 ([System.Drawing.Color]::FromArgb(115,255,255,255)) $softForest
      DrawStone $g 650 470 90 52 ([System.Drawing.Color]::FromArgb(115,255,255,255)) $softForest
    }
    "travel-flow" {
      DrawStone $g 430 310 250 210 ([System.Drawing.Color]::FromArgb(90, $wood.R, $wood.G, $wood.B)) $strongAccent
      DrawPathLine $g @([System.Drawing.PointF]::new(300,260),[System.Drawing.PointF]::new(510,210),[System.Drawing.PointF]::new(780,270),[System.Drawing.PointF]::new(960,220)) $water 6
      DrawPathLine $g @([System.Drawing.PointF]::new(340,450),[System.Drawing.PointF]::new(540,390),[System.Drawing.PointF]::new(780,480),[System.Drawing.PointF]::new(980,410)) $line 6
    }
    "grief" {
      DrawDrop $g 640 350 1.15 ([System.Drawing.Color]::FromArgb(72, $water.R, $water.G, $water.B)) $line
      DrawPathLine $g @([System.Drawing.PointF]::new(510,370),[System.Drawing.PointF]::new(560,315),[System.Drawing.PointF]::new(610,315),[System.Drawing.PointF]::new(640,380)) $strongAccent 7
      DrawPathLine $g @([System.Drawing.PointF]::new(770,370),[System.Drawing.PointF]::new(720,315),[System.Drawing.PointF]::new(670,315),[System.Drawing.PointF]::new(640,380)) $strongAccent 7
    }
    "burnout" {
      DrawStone $g 525 290 230 250 ([System.Drawing.Color]::FromArgb(82, $accent.R, $accent.G, $accent.B)) $strongAccent
      DrawDrop $g 640 275 0.45 ([System.Drawing.Color]::FromArgb(165, 241, 181, 102)) $strongAccent
      for ($i=0; $i -lt 4; $i++) { DrawPathLine $g @([System.Drawing.PointF]::new(420,450 + 22*$i),[System.Drawing.PointF]::new(540,420 + 12*$i),[System.Drawing.PointF]::new(740,470 - 10*$i),[System.Drawing.PointF]::new(875,430 + 16*$i)) $line 4 }
    }
    "feather" {
      DrawPathLine $g @([System.Drawing.PointF]::new(465,485),[System.Drawing.PointF]::new(535,300),[System.Drawing.PointF]::new(745,260),[System.Drawing.PointF]::new(845,185)) $line 7
      for ($i=0; $i -lt 8; $i++) {
        DrawPathLine $g @([System.Drawing.PointF]::new(565 + 30*$i,360 - 20*$i),[System.Drawing.PointF]::new(620 + 20*$i,345 - 22*$i),[System.Drawing.PointF]::new(680 + 12*$i,330 - 22*$i),[System.Drawing.PointF]::new(735 + 10*$i,305 - 22*$i)) $strongAccent 3
      }
    }
    "pressure" {
      $pen = [System.Drawing.Pen]::new($line, 8)
      $g.DrawArc($pen, 470, 250, 340, 340, 200, 140)
      $g.DrawArc([System.Drawing.Pen]::new($strongAccent, 10), 470, 250, 340, 340, 200, 72)
      $pen.Dispose()
      DrawDrop $g 640 430 0.42 $softAccent $strongAccent
    }
    "first-visit" {
      DrawStone $g 440 305 400 220 ([System.Drawing.Color]::FromArgb(92,255,255,255)) $softForest
      DrawStone $g 500 260 280 72 $softAccent $strongAccent
      DrawLeaf $g 530 390 0.72 ([System.Drawing.Color]::FromArgb(105, $accent.R, $accent.G, $accent.B))
    }
    "time" {
      for ($i=0; $i -lt 3; $i++) { DrawStone $g (430 + 160*$i) 330 118 118 ([System.Drawing.Color]::FromArgb(100, $accent.R, $accent.G, $accent.B)) $strongAccent }
      DrawPathLine $g @([System.Drawing.PointF]::new(380,500),[System.Drawing.PointF]::new(540,540),[System.Drawing.PointF]::new(740,500),[System.Drawing.PointF]::new(900,540)) $line 5
    }
    "glass-water" {
      DrawStone $g 560 250 160 300 ([System.Drawing.Color]::FromArgb(72, $water.R, $water.G, $water.B)) $line
      for ($i=0; $i -lt 5; $i++) { DrawPathLine $g @([System.Drawing.PointF]::new(455,370 + 24*$i),[System.Drawing.PointF]::new(560,345 + 12*$i),[System.Drawing.PointF]::new(720,390 - 8*$i),[System.Drawing.PointF]::new(845,360 + 14*$i)) $water 4 }
    }
    "stones" {
      DrawStone $g 420 420 180 86 ([System.Drawing.Color]::FromArgb(110, $wood.R, $wood.G, $wood.B)) $line
      DrawStone $g 575 360 190 92 ([System.Drawing.Color]::FromArgb(110, $accent.R, $accent.G, $accent.B)) $strongAccent
      DrawStone $g 735 430 145 76 ([System.Drawing.Color]::FromArgb(105,255,255,255)) $softForest
      DrawDrop $g 640 250 0.42 ([System.Drawing.Color]::FromArgb(140, 242,177,176)) $strongAccent
    }
    "scent" {
      DrawLeaf $g 455 415 1.0 ([System.Drawing.Color]::FromArgb(110, $accent.R, $accent.G, $accent.B))
      for ($i=0; $i -lt 4; $i++) { DrawPathLine $g @([System.Drawing.PointF]::new(585 + 55*$i,375),[System.Drawing.PointF]::new(540 + 52*$i,315),[System.Drawing.PointF]::new(630 + 50*$i,290),[System.Drawing.PointF]::new(590 + 60*$i,235)) $line 4 }
    }
    "voice" {
      for ($i=0; $i -lt 5; $i++) { DrawPathLine $g @([System.Drawing.PointF]::new(390,370 + 18*$i),[System.Drawing.PointF]::new(520,330 - 20*$i),[System.Drawing.PointF]::new(720,410 + 16*$i),[System.Drawing.PointF]::new(890,350 - 15*$i)) ($(if ($i % 2) { $line } else { $strongAccent })) 4 }
      DrawStone $g 565 475 150 48 ([System.Drawing.Color]::FromArgb(110,255,255,255)) $softForest
    }
    "sleep" {
      $pen = [System.Drawing.Pen]::new($line, 8)
      $g.DrawArc($pen, 520, 205, 260, 260, 70, 250)
      $pen.Dispose()
      DrawStone $g 450 465 380 70 $softAccent $strongAccent
      DrawDrop $g 790 275 0.3 ([System.Drawing.Color]::FromArgb(130, $water.R, $water.G, $water.B)) $line
    }
    "caregiver" {
      DrawPathLine $g @([System.Drawing.PointF]::new(430,425),[System.Drawing.PointF]::new(535,355),[System.Drawing.PointF]::new(590,355),[System.Drawing.PointF]::new(645,430)) $line 13
      DrawPathLine $g @([System.Drawing.PointF]::new(850,425),[System.Drawing.PointF]::new(745,355),[System.Drawing.PointF]::new(690,355),[System.Drawing.PointF]::new(635,430)) $strongAccent 13
      DrawDrop $g 640 295 0.36 $softAccent $line
    }
    "mobility" {
      DrawPathLine $g @([System.Drawing.PointF]::new(410,520),[System.Drawing.PointF]::new(525,430),[System.Drawing.PointF]::new(710,470),[System.Drawing.PointF]::new(870,345)) $line 8
      DrawPathLine $g @([System.Drawing.PointF]::new(760,260),[System.Drawing.PointF]::new(825,330),[System.Drawing.PointF]::new(750,435),[System.Drawing.PointF]::new(825,525)) $strongAccent 7
      DrawLeaf $g 430 330 0.62 ([System.Drawing.Color]::FromArgb(95, $accent.R, $accent.G, $accent.B))
    }
    "posture" {
      DrawPathLine $g @([System.Drawing.PointF]::new(470,510),[System.Drawing.PointF]::new(545,350),[System.Drawing.PointF]::new(670,335),[System.Drawing.PointF]::new(760,240)) $line 8
      DrawStone $g 515 360 250 125 $softAccent $strongAccent
      DrawPathLine $g @([System.Drawing.PointF]::new(380,540),[System.Drawing.PointF]::new(555,515),[System.Drawing.PointF]::new(735,540),[System.Drawing.PointF]::new(900,505)) $water 4
    }
    "trail" {
      DrawPathLine $g @([System.Drawing.PointF]::new(315,560),[System.Drawing.PointF]::new(470,390),[System.Drawing.PointF]::new(700,470),[System.Drawing.PointF]::new(965,250)) $strongAccent 12
      DrawLeaf $g 520 315 0.7 ([System.Drawing.Color]::FromArgb(96, $accent.R, $accent.G, $accent.B))
      DrawDrop $g 780 365 0.32 ([System.Drawing.Color]::FromArgb(100, $water.R, $water.G, $water.B)) $line
    }
    "scar" {
      DrawStone $g 430 310 420 190 ([System.Drawing.Color]::FromArgb(92,255,255,255)) $softForest
      DrawPathLine $g @([System.Drawing.PointF]::new(500,405),[System.Drawing.PointF]::new(575,340),[System.Drawing.PointF]::new(675,470),[System.Drawing.PointF]::new(780,360)) $strongAccent 7
      for ($i=0; $i -lt 5; $i++) { DrawPathLine $g @([System.Drawing.PointF]::new(535 + 50*$i,370 + 15*($i%2)),[System.Drawing.PointF]::new(555 + 50*$i,392),[System.Drawing.PointF]::new(575 + 50*$i,390),[System.Drawing.PointF]::new(600 + 50*$i,408)) $line 3 }
    }
    "lymph-nodes" {
      for ($row=0; $row -lt 3; $row++) {
        for ($col=0; $col -lt 4; $col++) {
          DrawDrop $g (500 + 80*$col + 25*($row%2)) (270 + 75*$row) 0.22 ([System.Drawing.Color]::FromArgb(95, $water.R, $water.G, $water.B)) $line
        }
      }
      DrawPathLine $g @([System.Drawing.PointF]::new(450,505),[System.Drawing.PointF]::new(575,455),[System.Drawing.PointF]::new(720,535),[System.Drawing.PointF]::new(850,480)) $strongAccent 5
    }
    "questions" {
      DrawStone $g 475 300 330 210 ([System.Drawing.Color]::FromArgb(86,255,255,255)) $softForest
      DrawDrop $g 550 360 0.35 $softAccent $strongAccent
      DrawDrop $g 650 360 0.35 ([System.Drawing.Color]::FromArgb(90, $water.R, $water.G, $water.B)) $line
      DrawDrop $g 750 360 0.35 ([System.Drawing.Color]::FromArgb(90, $rose.R, $rose.G, $rose.B)) $strongAccent
    }
    "consent" {
      DrawStone $g 410 300 460 220 ([System.Drawing.Color]::FromArgb(80,255,255,255)) $softForest
      DrawPathLine $g @([System.Drawing.PointF]::new(520,395),[System.Drawing.PointF]::new(590,470),[System.Drawing.PointF]::new(710,315),[System.Drawing.PointF]::new(805,275)) $strongAccent 9
      DrawLeaf $g 450 300 0.55 ([System.Drawing.Color]::FromArgb(80, $accent.R, $accent.G, $accent.B))
    }
    "emotional-safety" {
      DrawDrop $g 640 350 1.05 ([System.Drawing.Color]::FromArgb(75, $accent.R, $accent.G, $accent.B)) $strongAccent
      DrawStone $g 500 430 280 66 ([System.Drawing.Color]::FromArgb(98,255,255,255)) $softForest
      DrawPathLine $g @([System.Drawing.PointF]::new(490,310),[System.Drawing.PointF]::new(570,245),[System.Drawing.PointF]::new(705,245),[System.Drawing.PointF]::new(790,310)) $line 6
    }
    "rose-quartz" {
      $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
      $pts = @([System.Drawing.Point]::new(640,210),[System.Drawing.Point]::new(805,345),[System.Drawing.Point]::new(735,540),[System.Drawing.Point]::new(545,540),[System.Drawing.Point]::new(475,345))
      $path.AddPolygon($pts)
      $brush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(125, $rose.R, $rose.G, $rose.B))
      $pen = [System.Drawing.Pen]::new($strongAccent, 5)
      $g.FillPath($brush,$path); $g.DrawPath($pen,$path)
      $brush.Dispose(); $pen.Dispose(); $path.Dispose()
    }
    "scorpio-water" {
      DrawPathLine $g @([System.Drawing.PointF]::new(390,405),[System.Drawing.PointF]::new(540,300),[System.Drawing.PointF]::new(720,495),[System.Drawing.PointF]::new(900,325)) $water 8
      DrawPathLine $g @([System.Drawing.PointF]::new(540,345),[System.Drawing.PointF]::new(610,295),[System.Drawing.PointF]::new(700,295),[System.Drawing.PointF]::new(760,350)) $strongAccent 6
      DrawDrop $g 640 445 0.4 ([System.Drawing.Color]::FromArgb(100, $water.R,$water.G,$water.B)) $line
    }
    "seven-waters" {
      for ($i=0; $i -lt 7; $i++) { DrawDrop $g (400 + 80*$i) (360 + 45*[Math]::Sin($i)) 0.28 ([System.Drawing.Color]::FromArgb(90,$water.R,$water.G,$water.B)) $line }
      DrawPathLine $g @([System.Drawing.PointF]::new(360,505),[System.Drawing.PointF]::new(525,455),[System.Drawing.PointF]::new(760,540),[System.Drawing.PointF]::new(930,485)) $strongAccent 5
    }
    "body-map" {
      DrawDrop $g 640 335 0.95 ([System.Drawing.Color]::FromArgb(65, $accent.R,$accent.G,$accent.B)) $line
      for ($i=0; $i -lt 6; $i++) { DrawStone $g (450 + 80*$i) (470 - 28*($i%2)) 74 44 ([System.Drawing.Color]::FromArgb(120,255,255,255)) $strongAccent }
    }
    "desert-season" {
      $sunBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(125, 241,181,102))
      $g.FillEllipse($sunBrush, 740, 180, 170, 170)
      $sunBrush.Dispose()
      DrawPathLine $g @([System.Drawing.PointF]::new(300,530),[System.Drawing.PointF]::new(470,415),[System.Drawing.PointF]::new(615,520),[System.Drawing.PointF]::new(810,400)) $strongAccent 8
      DrawPathLine $g @([System.Drawing.PointF]::new(450,560),[System.Drawing.PointF]::new(585,515),[System.Drawing.PointF]::new(775,585),[System.Drawing.PointF]::new(940,525)) $water 5
    }
    "rebook" {
      DrawStone $g 475 270 330 260 ([System.Drawing.Color]::FromArgb(90,255,255,255)) $softForest
      for ($i=0; $i -lt 4; $i++) { DrawStone $g (520 + 65*$i) 345 48 48 ([System.Drawing.Color]::FromArgb(100,$accent.R,$accent.G,$accent.B)) $strongAccent }
      DrawPathLine $g @([System.Drawing.PointF]::new(500,520),[System.Drawing.PointF]::new(610,480),[System.Drawing.PointF]::new(720,535),[System.Drawing.PointF]::new(810,492)) $line 4
    }
    default {
      DrawDrop $g $x $y 0.9 $softAccent $strongAccent
      DrawLeaf $g 500 450 0.75 ([System.Drawing.Color]::FromArgb(90,$forest.R,$forest.G,$forest.B))
    }
  }
}

$forest = ColorFromHex "#314b36"
$wood = ColorFromHex "#6f4c31"
$water = ColorFromHex "#5f9aa4"
$rose = ColorFromHex "#f2b1b0"
$linen = ColorFromHex "#fbf8ef"

foreach ($item in $articles) {
  $bitmap = [System.Drawing.Bitmap]::new($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bitmap)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

  $accent = ColorFromHex $item.Accent
  $ground = ColorFromHex $item.Ground
  $rect = [System.Drawing.Rectangle]::new(0,0,$width,$height)
  $bg = [System.Drawing.Drawing2D.LinearGradientBrush]::new($rect, $ground, $linen, 28)
  $g.FillRectangle($bg, $rect)
  $bg.Dispose()

  $seed = [Math]::Abs($item.Slug.GetHashCode())
  $rng = [System.Random]::new($seed)
  for ($i=0; $i -lt 72; $i++) {
    $size = $rng.Next(28, 118)
    $x = $rng.Next(-80, $width)
    $y = $rng.Next(-60, $height)
    $a = $rng.Next(14, 38)
    $c = if ($i % 4 -eq 0) { $accent } elseif ($i % 3 -eq 0) { $water } else { $forest }
    $brush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb($a, $c.R, $c.G, $c.B))
    $g.FillEllipse($brush, $x, $y, $size, $size)
    $brush.Dispose()
  }

  for ($i=0; $i -lt 6; $i++) {
    $penColor = if ($i % 2 -eq 0) { [System.Drawing.Color]::FromArgb(88, $water.R, $water.G, $water.B) } else { [System.Drawing.Color]::FromArgb(70, $forest.R, $forest.G, $forest.B) }
    DrawPathLine $g @(
      [System.Drawing.PointF]::new(120, 155 + 78*$i),
      [System.Drawing.PointF]::new(335, 105 + 42*$i),
      [System.Drawing.PointF]::new(910, 218 + 55*$i),
      [System.Drawing.PointF]::new(1180, 138 + 77*$i)
    ) $penColor 3
  }

  $panelPath = RoundedRect 150 110 980 500 42
  $panelBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(55, 255,255,255))
  $g.FillPath($panelBrush, $panelPath)
  $panelBrush.Dispose()
  $panelPath.Dispose()

  DrawMotif $g $item $accent $forest $wood $water $rose $linen

  $titleBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(230, $forest.R, $forest.G, $forest.B))
  $smallBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(185, $wood.R, $wood.G, $wood.B))
  $titleFont = [System.Drawing.Font]::new("Georgia", 30, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $labelFont = [System.Drawing.Font]::new("Arial", 16, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $g.DrawString("ROSE QUARTZ JOURNAL", $labelFont, $smallBrush, 72, 52)
  $g.DrawString($item.Title, $titleFont, $titleBrush, 72, 92)
  $titleFont.Dispose()
  $labelFont.Dispose()
  $titleBrush.Dispose()
  $smallBrush.Dispose()

  $out = Join-Path $outDir "$($item.Slug).png"
  $bitmap.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bitmap.Dispose()
}

Write-Host "Generated $($articles.Count) journal images in $outDir"
