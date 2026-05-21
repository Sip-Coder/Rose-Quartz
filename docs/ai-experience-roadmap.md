# AI experience roadmap

This roadmap translates Rose's care style into website features. The goal is not to make the site feel like a chatbot. The goal is to make booking feel more understood, more body-aware, and more useful to Rose before the guest arrives.

## Rose's interaction model

- Likely ENFP or ESFP: expressive, relational, responsive, warm, and strongest when an experience feels alive rather than scripted.
- Learning order: kinesthetic first, audio second, visual third.
- Product translation: start with the body, support guided conversation, then confirm with a clear visual summary.

## Feature 1: Rose Session Map

The first implementation is now in the booking section.

1. Guests choose body areas on an interactive body map.
2. They select sensations such as tightness, swelling, bracing, tenderness, or headache.
3. They choose pressure and session tone.
4. The site generates a client-facing summary and suggested care pathway.
5. The booking request includes the map details for Rose to review.

## Future AI layer

When a backend is added, the Session Map can become an AI-supported intake assistant.

- Generate a Rose-readable intake brief.
- Flag prenatal comfort needs and medical-clearance reminders.
- Suggest service pathways without diagnosing.
- Draft aftercare notes for Rose to approve.
- Remember returning-client preferences with explicit consent.
- Connect journal articles to booking recommendations.

## Guardrails

- Do not diagnose, prescribe, or imply medical treatment.
- Treat pregnancy status, symptoms, and body-map data as sensitive.
- Collect only what Rose needs for booking and care preparation.
- Avoid ad trackers on intake pages.
- Add clear privacy language before saving intake history.
- Route red-flag symptoms toward medical/provider guidance instead of booking recommendations.
