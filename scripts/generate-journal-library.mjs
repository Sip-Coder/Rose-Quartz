import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const sources = {
  acogPregnancyMassage: {
    label: "ACOG: Can I get a massage while pregnant?",
    url: "https://www.acog.org/womens-health/experts-and-stories/ask-acog/can-i-get-a-massage-while-pregnant"
  },
  acogExercisePregnancy: {
    label: "ACOG: Exercise During Pregnancy",
    url: "https://www.acog.org/womens-health/faqs/exercise-during-pregnancy"
  },
  nccihMassage: {
    label: "NCCIH: Massage Therapy, What You Need To Know",
    url: "https://www.nccih.nih.gov/health/massage/massageintroduction.htm"
  },
  nccihMassageTips: {
    label: "NCCIH: 6 Things To Know About Massage Therapy for Health Purposes",
    url: "https://www.nccih.nih.gov/health/tips/things-to-know-about-massage-therapy-for-health-purposes"
  },
  nccihStress: {
    label: "NCCIH: 5 Things To Know About Relaxation Techniques for Stress",
    url: "https://www.nccih.nih.gov/health/tips/things-to-know-about-relaxation-techniques-for-stress"
  },
  medlineLymphedema: {
    label: "MedlinePlus: Lymphedema",
    url: "https://medlineplus.gov/lymphedema.html"
  },
  medlineLymphedemaCare: {
    label: "MedlinePlus: Lymphedema self-care",
    url: "https://medlineplus.gov/ency/patientinstructions/000045.htm"
  },
  mayoTensionHeadache: {
    label: "Mayo Clinic: Tension headache diagnosis and treatment",
    url: "https://www.mayoclinic.org/diseases-conditions/tension-headache/diagnosis-treatment/drc-20353982"
  },
  mayoHeadacheStress: {
    label: "Mayo Clinic: Headaches, reduce stress to prevent the pain",
    url: "https://www.mayoclinic.org/diseases-conditions/tension-headache/in-depth/headaches/art-20046707"
  }
};

const imageFor = {
  prenatal: "/assets/images/prenatal-suite.jpg",
  nervous: "/assets/images/water-tiger-mood.jpg",
  ritual: "/assets/images/rose-sanctuary-hero.jpg",
  body: "/assets/images/water-tiger-mood.jpg"
};

const existingArticles = [
  {
    slug: "prenatal-comfort",
    category: "Pregnancy Comfort",
    title: "Why gentle prenatal massage can feel more effective than force",
    deck: "A calm explanation of positioning, safety, swelling support, and how comfort changes by trimester.",
    tags: ["Prenatal", "Comfort-first", "Medical guidance"],
    image: imageFor.prenatal
  },
  {
    slug: "nervous-system-safe-touch",
    category: "Nervous-System Support",
    title: "When your body braces before touch even begins",
    deck: "Rose's guide to pressure consent, sensitivity, trauma-aware pacing, and why slowing down can unlock relief.",
    tags: ["Pressure consent", "Sensitive bodies", "Slow pacing"],
    image: imageFor.nervous
  },
  {
    slug: "water-breath-return",
    category: "Ritual and Aftercare",
    title: "Water, breath, and the return to yourself",
    deck: "A signature philosophy piece tying her nature-inspired practice to practical aftercare and daily grounding.",
    tags: ["Water ritual", "Aftercare", "Rose philosophy"],
    image: imageFor.ritual
  }
];

const generatedArticles = [
  {
    slug: "side-lying-prenatal-positioning",
    category: "Pregnancy Comfort",
    title: "Side-lying support: the quiet architecture of prenatal comfort",
    deck: "Prenatal massage becomes more useful when pillows, angles, and transitions make the body feel protected before touch even begins.",
    tags: ["Side-lying", "Bolsters", "Pregnancy comfort"],
    image: imageFor.prenatal,
    sources: ["acogPregnancyMassage", "acogExercisePregnancy"],
    callout: "Pregnant guests should follow provider guidance. New pain, unusual swelling, bleeding, dizziness, blood-pressure concerns, or high-risk pregnancy notes should be discussed with a clinician before booking.",
    service: "Prenatal comfort massage",
    prompt: "Share pregnancy stage, which side feels easier, pillow needs, reflux or breath limits, and any provider guidance.",
    sections: [
      ["Positioning is not decoration", ["The side-lying setup is part of the treatment. Pillows between the knees, under the belly, behind the back, and beneath the head can reduce the work the guest has to do just to stay comfortable.", "When support is right, Rose can work more precisely on the hips, low back, neck, shoulders, feet, and jaw without asking the pregnant body to hold a strained shape."]],
      ["How Rose can adjust the room", ["A prenatal session may need slower turns, warmer blankets on one area and less heat on another, or more space for breath around the ribs. The right setup can change several times in one appointment.", "Rose can treat every adjustment as normal care. That lowers the pressure on the guest to be easy, still, or silent when the body is asking for something else."]],
      ["What to notice after the session", ["After prenatal work, guests can notice whether sleep, rib space, hip pressure, or foot heaviness shifts. These notes help Rose prepare the next appointment with less guesswork.", "The goal is not to force dramatic change. It is to make the body feel safer, better supported, and less alone in its discomfort."]]
    ],
    listTitle: "A side-lying setup can support",
    listItems: ["Hips and pelvis", "Low back and sacrum", "Neck, jaw, and scalp", "Feet and ankles", "Breath and rib comfort"],
    asideFit: "Best for guests who need careful prenatal positioning, hip and low-back relief, or a quieter session that protects breath and belly space."
  },
  {
    slug: "pregnancy-swelling-lymphatic-touch",
    category: "Pregnancy Comfort",
    title: "Pregnancy swelling and why lymphatic touch has to stay gentle",
    deck: "Swelling and heaviness need conservative, rhythmic care, not aggressive pressure or promises that override medical guidance.",
    tags: ["Swelling", "Lymphatic flow", "Prenatal"],
    image: imageFor.prenatal,
    sources: ["acogPregnancyMassage", "medlineLymphedema", "medlineLymphedemaCare"],
    callout: "Sudden, one-sided, painful, severe, or unusual swelling during pregnancy can be medically important. Guests should contact their clinician instead of relying on massage.",
    service: "Prenatal comfort massage or lymphatic flow",
    prompt: "Share where swelling appears, whether it changes during the day, provider guidance, and whether touch should avoid any area.",
    sections: [
      ["Heaviness is information", ["A swollen-feeling body often wants less force, not more. Rose can begin with slow contact, comfortable elevation, and careful attention to how the guest describes pressure, tenderness, or heat.", "Gentle lymphatic-style pacing is meant to support comfort. It should never be presented as a cure or a substitute for checking symptoms that feel new, severe, or concerning."]],
      ["What gentle flow can feel like", ["The rhythm is light, slow, and directional. It may include feet, ankles, calves, hands, arms, face, or a whole-body settling sequence, depending on what is appropriate for the guest.", "Rose can keep the work conservative around pregnancy and invite feedback often. If the guest feels anxious about swelling, naming the safety boundary can be as relieving as the touch itself."]],
      ["Aftercare that respects pregnancy", ["After the session, hydration, easy movement, and supported rest may help the body feel less compressed. Rose can suggest simple observation rather than telling the guest to chase a result.", "The best follow-up question is practical: what changed, what stayed heavy, and what should Rose know before the next appointment?"]]
    ],
    listTitle: "Useful intake details",
    listItems: ["Where swelling appears", "Whether swelling is new or familiar", "Provider guidance", "Tenderness, heat, or pain", "Comfort with foot or ankle work"],
    asideFit: "Best for pregnant guests who feel heavy, swollen, travel-worn, or uncomfortable in their feet, ankles, hands, or face."
  },
  {
    slug: "postpartum-return-to-body",
    category: "Pregnancy Comfort",
    title: "Postpartum massage as a slow return to your own body",
    deck: "After birth, the body needs care that respects fatigue, feeding posture, scar sensitivity, emotion, and the strange tenderness of being needed constantly.",
    tags: ["Postpartum", "Recovery", "Gentle return"],
    image: imageFor.prenatal,
    sources: ["nccihMassage", "acogExercisePregnancy"],
    callout: "Postpartum guests with fever, heavy bleeding, new severe pain, infection signs, clotting concerns, incision complications, or mood symptoms that feel unsafe need medical support before massage.",
    service: "Restorative therapeutic massage",
    prompt: "Share birth timing, provider restrictions, feeding posture, scar or incision sensitivity, sleep loss, and whether quiet or conversation would feel better.",
    sections: [
      ["The body has been working without pause", ["Postpartum massage should not treat the body like it simply needs to bounce back. It has carried, labored, fed, held, worried, and adapted.", "Rose can begin with the practical realities: how long the guest can lie comfortably, whether breasts or belly need space, whether scars are sensitive, and whether the nervous system is near tears or numbness."]],
      ["Common places that ask for care", ["Neck, shoulders, wrists, low back, hips, feet, and jaw often carry the invisible work of feeding, rocking, lifting, and sleeping in fragments. Gentle contact can help those areas feel noticed again.", "Pressure can stay specific without becoming intense. The guest may need relief, but they may also need not to be touched like a project."]],
      ["A return plan that is realistic", ["Aftercare should be small enough for postpartum life. One glass of water, one supported breath, one warm shower, or one stretch at the wall may be more useful than a complicated routine.", "Rose can help guests track what felt easier after the session, then use that information to shape the next visit if and when another session is realistic."]]
    ],
    listTitle: "Postpartum sessions can focus on",
    listItems: ["Feeding posture", "Neck and shoulders", "Wrists and hands", "Low back and hips", "Quiet emotional decompression"],
    asideFit: "Best for new parents who need care that is gentle, flexible, and honest about fatigue."
  },
  {
    slug: "headache-jaw-clenching-care",
    category: "Head, Jaw, and Headache Care",
    title: "Jaw clenching, scalp tension, and the headache map",
    deck: "Headache care works best when the intake maps jaw habits, neck load, screen posture, sleep, and pressure sensitivity together.",
    tags: ["Jaw tension", "Headache", "Scalp work"],
    image: imageFor.nervous,
    sources: ["nccihMassage", "mayoTensionHeadache", "mayoHeadacheStress"],
    callout: "A new, sudden, severe, unusual, or worsening headache needs medical attention. Massage should not delay care for neurological symptoms, fever, injury, or vision changes.",
    service: "Head, jaw, and headache care",
    prompt: "Share headache location, jaw clenching habits, screen time, sleep patterns, and whether face, scalp, or neck touch feels safe.",
    sections: [
      ["The head rarely hurts alone", ["Jaw clenching, raised shoulders, shallow breath, and screen posture can all show up as head pain or scalp tension. A useful session looks at the pattern rather than chasing one sore point.", "Rose can ask where the headache begins, where it travels, what makes it worse, and how much pressure the guest can receive around the face, jaw, temples, neck, and scalp."]],
      ["Gentle does not mean vague", ["Focused head and jaw care can include slow scalp contact, temple work, occipital support, upper shoulder softening, and careful attention around the jaw without forcing the mouth or face.", "For some guests, the best work is quiet and specific. For others, Rose can use guided check-ins so the guest can name pressure changes before the body starts guarding."]],
      ["Aftercare for repeat patterns", ["The aftercare does not need to be dramatic. It can be a jaw check before sleep, screen breaks, water, or a note about when the clenching starts.", "The point is to learn the pattern. If Rose knows what returns first, the next session can begin closer to the real source of the problem."]]
    ],
    listTitle: "Helpful things to map",
    listItems: ["Jaw clenching or grinding", "Temple or scalp tenderness", "Neck and shoulder load", "Screen posture", "Light, sound, or scent sensitivity"],
    asideFit: "Best for guests with jaw tension, screen headaches, scalp tenderness, or shoulder guarding."
  },
  {
    slug: "neck-shoulder-screen-tension",
    category: "Therapeutic Relief",
    title: "Screen shoulders: why neck tension needs more than hard pressure",
    deck: "Modern shoulder tension is often a nervous-system habit, not only a tight muscle problem.",
    tags: ["Neck", "Shoulders", "Desk tension"],
    image: imageFor.nervous,
    sources: ["nccihMassage", "nccihMassageTips"],
    callout: "Numbness, weakness, radiating pain, injury, fever, or unexplained symptoms should be evaluated by a health professional before massage.",
    service: "Restorative therapeutic massage",
    prompt: "Share work posture, which shoulder lifts first, whether pain travels, and how direct neck work feels to you.",
    sections: [
      ["The shoulders learn the day", ["Phones, laptops, driving, and emotional load can teach the shoulders to hover. By the time someone gets on the table, the tension may be a full-body posture, not a simple knot.", "Hard pressure can sometimes make that posture fight harder. Rose can start by giving the neck and shoulders a reason to stop defending."]],
      ["How Rose can work without escalating", ["A session can move through broad shoulder contact, supported neck work, scalp, jaw, upper back, chest openness, and breath. The pressure can become focused only after the body trusts the pace.", "The question is not how deep the work can go. It is whether the nervous system can receive the work without immediately rebuilding the same shape."]],
      ["A better follow-up than 'stretch more'", ["Aftercare can be one practical cue: drop the shoulders before answering a message, place the feet on the floor during calls, or take one breath before looking down.", "Small cues work because screen tension returns in small moments. Rose can help guests find the moment where the pattern begins."]]
    ],
    listTitle: "Session focus areas",
    listItems: ["Upper traps", "Neck base", "Scalp and jaw", "Chest and breath", "Upper back"],
    asideFit: "Best for desk workers, drivers, students, caregivers, and anyone whose shoulders live near their ears."
  },
  {
    slug: "low-back-hip-relief-light-touch",
    category: "Therapeutic Relief",
    title: "Low back and hip relief without forcing the body open",
    deck: "The pelvis, breath, feet, and nervous system all influence how the low back receives massage.",
    tags: ["Low back", "Hips", "Sacrum"],
    image: imageFor.body,
    sources: ["nccihMassage", "nccihMassageTips"],
    callout: "Severe pain, loss of bowel or bladder control, numbness, weakness, trauma, fever, or unexplained symptoms need medical care, not a massage-first plan.",
    service: "Restorative therapeutic massage",
    prompt: "Share where low-back discomfort sits, what positions help or worsen it, and whether hip, glute, or sacrum work feels safe.",
    sections: [
      ["The low back is rarely isolated", ["Low-back tension can be influenced by hips, glutes, feet, breath, sleep, stress, and how the body stands when tired. A good session does not assume one muscle is the villain.", "Rose can use the body map to ask where the guest wants focus and where they need caution. That prevents the session from becoming a pressure contest."]],
      ["Light touch can prepare deeper relief", ["Slow contact around the sacrum, hips, and low back can help the body stop bracing before more focused work begins. Sometimes that preparation is the most therapeutic part.", "If the guest wants more pressure, Rose can add it in small, consent-based steps. The body gets to stay in the conversation."]],
      ["How to keep the relief practical", ["Aftercare can include an easy walk, a supported rest position, water, or noticing which movement feels different. The goal is integration, not a complicated homework plan.", "When Rose knows what helps for even ten minutes, she can build the next session around what the body already accepted."]]
    ],
    listTitle: "Useful body-map areas",
    listItems: ["Low back", "Sacrum", "Hips and pelvis", "Feet and gait", "Breath and belly"],
    asideFit: "Best for guests who want low-back support without aggressive deep pressure."
  },
  {
    slug: "lymphatic-flow-after-travel",
    category: "Lymphatic Flow",
    title: "Travel heaviness: light lymphatic flow after flights and long drives",
    deck: "Long sitting can leave the body feeling puffy, compressed, and tired. The response should stay light, cautious, and grounded.",
    tags: ["Travel", "Heaviness", "Lymph flow"],
    image: imageFor.ritual,
    sources: ["medlineLymphedema", "medlineLymphedemaCare", "nccihMassage"],
    callout: "One-sided swelling, calf pain, chest pain, shortness of breath, redness, heat, or sudden severe swelling can signal urgent concerns. Seek medical care instead of massage.",
    service: "Lymphatic flow",
    prompt: "Share travel timing, areas of heaviness, swelling history, clotting concerns, and whether legs or feet feel tender.",
    sections: [
      ["Travel compresses more than muscles", ["Flights, long drives, dehydration, unfamiliar beds, and schedule stress can make the body feel heavy before there is any obvious pain. Guests may describe swelling, tight shoes, sluggishness, or a foggy sense of not being home yet.", "Rose can treat that as a whole-body transition rather than a problem to beat out of the legs."]],
      ["What a travel reset can include", ["A session can use gentle rhythmic contact, feet and ankles, calves when appropriate, hands, neck, face, and breath. The pressure stays light enough that the body does not protect itself.", "The most important intake question is safety. Travel can increase concerns that belong with a clinician, so Rose should ask about sudden, painful, one-sided, hot, or unusual swelling."]],
      ["Returning the body to rhythm", ["Aftercare can be water, loose clothing, an easy walk, ankle pumps, and sleep. The point is to help the guest re-enter their body after the compression and speed of travel.", "For frequent travelers, Rose can build a repeatable arrival ritual that feels calming without making medical promises."]]
    ],
    listTitle: "Travel-reset focus",
    listItems: ["Feet and ankles", "Calves when appropriate", "Hands and arms", "Neck and jaw", "Whole-body settling"],
    asideFit: "Best for guests who feel puffy, tired, and compressed after flights, road trips, conventions, or long sitting."
  },
  {
    slug: "grief-held-in-body",
    category: "Nervous-System Support",
    title: "When grief lives in the shoulders, chest, and breath",
    deck: "Massage for grief should not try to fix emotion. It should create enough safety for the body to stop carrying everything alone.",
    tags: ["Grief", "Breath", "Emotional safety"],
    image: imageFor.nervous,
    sources: ["nccihMassage", "nccihStress"],
    callout: "Massage can support comfort and grounding, but it is not mental-health treatment. Guests in crisis or feeling unsafe should seek immediate mental-health support.",
    service: "Nervous-system reset",
    prompt: "Share whether quiet, guided words, stillness, or extra consent check-ins would feel best. You do not need to explain the grief.",
    sections: [
      ["Grief changes how touch lands", ["A grieving body may hold the chest, jaw, shoulders, belly, or breath without the guest realizing it. The goal is not to make the story come out. The goal is to make the room safe enough that the body has options.", "Rose can work with slowness, steady contact, and permission to say less. Some guests need silence. Some need a few orienting words. Both can be care."]],
      ["A session can be structured without being clinical", ["Rose can begin by asking what would feel supportive today: head, shoulders, hands, feet, breath, or whole-body quiet. That gives grief a container without turning the appointment into therapy.", "Pressure should remain adjustable. A sensitive nervous system may need less novelty and more predictability."]],
      ["Aftercare for tenderness", ["After the session, the guest can drink water, avoid rushing into errands, and notice one place where the body feels less alone. That is enough.", "The most respectful rebooking rhythm is optional. Rose can invite care without making grief into a program."]]
    ],
    listTitle: "Gentle options",
    listItems: ["Still contact", "Scalp and jaw", "Hands and feet", "Chest and breath support", "Quiet transitions"],
    asideFit: "Best for guests carrying loss, burnout, tenderness, or emotional fatigue who want body care without explanation pressure."
  },
  {
    slug: "burnout-reset-care",
    category: "Nervous-System Support",
    title: "Burnout massage: care for the body that cannot downshift on command",
    deck: "Burnout often arrives as shallow breath, tight jaw, guarded shoulders, poor sleep, and a body that no longer trusts rest.",
    tags: ["Burnout", "Stress", "Reset"],
    image: imageFor.nervous,
    sources: ["nccihStress", "nccihMassage"],
    callout: "Persistent exhaustion, depression, panic, chest pain, fainting, or symptoms that feel unsafe deserve medical or mental-health support. Massage can be complementary care, not a replacement.",
    service: "Nervous-system reset",
    prompt: "Share whether you want silence, guided grounding, no deep pressure, or a session that focuses on sleep and decompression.",
    sections: [
      ["Rest can feel unfamiliar", ["A burned-out guest may lie down and still feel braced. The mind might want relief quickly, while the body needs time to believe it is not being asked to perform.", "Rose's light-touch specialty fits this moment because it does not demand that the nervous system relax on command."]],
      ["How the reset can unfold", ["The session can begin with slow holds, feet, scalp, neck, breath, and broad contact before any focused work. Rose can keep the environment predictable: sound, temperature, pressure, and conversation all matter.", "The body often downshifts through repetition. A simple, steady sequence can be more effective than a complex treatment that asks the guest to process too much."]],
      ["The aftercare is a boundary", ["Burnout aftercare should protect the first hour after the appointment. No immediate over-scheduling, no hard workout to prove progress, and no pressure to explain the session to anyone.", "The care continues when the guest chooses one smaller evening, one slower morning, or one honest rebooking cadence."]]
    ],
    listTitle: "Burnout signs to mention",
    listItems: ["Sleep disruption", "Jaw clenching", "Feeling wired and tired", "Sensitivity to pressure", "Need for quiet"],
    asideFit: "Best for guests who feel overextended, depleted, emotionally saturated, or unable to settle."
  },
  {
    slug: "sensitive-bodies-first-massage",
    category: "Nervous-System Support",
    title: "Your first massage when you are sensitive to touch",
    deck: "A sensitive guest does not need to be talked into a normal massage. The session should be built around consent, pacing, and choice from the start.",
    tags: ["First massage", "Sensitive touch", "Consent"],
    image: imageFor.body,
    sources: ["nccihMassageTips", "nccihMassage"],
    callout: "Guests with medical complexity, skin concerns, recent injury, clotting concerns, infection, or trauma symptoms that need clinical support should get appropriate guidance before booking.",
    service: "Nervous-system reset",
    prompt: "Share what kind of touch feels safe, what areas should be avoided, and whether you want every change explained first.",
    sections: [
      ["Sensitivity is not a problem to overcome", ["Some bodies respond strongly to pressure, surprise, scent, sound, temperature, or being touched by someone new. That does not make the guest difficult. It gives Rose the information needed to build trust.", "A first massage can be shorter, quieter, more guided, or focused only on areas the guest already knows feel safe."]],
      ["How Rose can lower the stakes", ["Rose can explain the sequence before beginning, ask permission before changing areas, keep draping predictable, and use a simple pressure language: lighter, same, or more focused.", "The guest can keep clothing on for certain styles of care if appropriate, skip any body area, or choose hands, feet, scalp, shoulders, or back only."]],
      ["Success can be small", ["For a sensitive guest, success might mean staying present for the session, feeling less guarded in one area, or learning what kind of massage is not overwhelming.", "The first appointment does not need to solve everything. It can simply prove that bodywork can be collaborative."]]
    ],
    listTitle: "Comfort choices",
    listItems: ["Areas to avoid", "Pressure language", "Conversation level", "Lighting and sound", "Stop or pause signals"],
    asideFit: "Best for first-time guests, highly sensitive clients, and anyone nervous about receiving touch."
  },
  {
    slug: "choose-pressure-without-guessing",
    category: "Consent and Comfort",
    title: "How to choose massage pressure without guessing",
    deck: "Light, medium, and focused pressure mean different things to different bodies. A better intake gives guests language they can actually use.",
    tags: ["Pressure", "Consent", "Intake"],
    image: imageFor.body,
    sources: ["nccihMassage", "nccihMassageTips"],
    callout: "Pressure should never be used to push through pain, numbness, dizziness, or symptoms that feel wrong. Massage should adapt or stop when the body says no.",
    service: "All service pathways",
    prompt: "Share what has felt too much before, where focused pressure is welcome, and how you want Rose to check in.",
    sections: [
      ["Pressure words are imperfect", ["One person's medium is another person's too much. The best booking flow does not expect guests to know technical massage language before the first visit.", "Rose can ask for comparisons: feather-light, steady and broad, medium with check-ins, or focused only in specific areas. That turns pressure into a conversation."]],
      ["Consent can be rhythmic", ["Pressure consent works best when it is repeated naturally. Rose can check at the start, during transitions, before focused work, and any time the body changes.", "This keeps the guest from feeling like they missed their chance to speak. It also lets Rose adjust before bracing takes over."]],
      ["What to notice after pressure changes", ["After a pressure adjustment, the guest can notice breath, jaw, hands, toes, and whether the body wants to move away. These signals matter.", "The session becomes more therapeutic when pressure is measured by reception, not intensity."]]
    ],
    listTitle: "Pressure language guests can use",
    listItems: ["Lighter", "Same", "More focused", "Broader", "Pause", "Avoid this area"],
    asideFit: "Best for anyone unsure whether they want light-touch care, focused relief, or a mix of both."
  },
  {
    slug: "what-to-wear-and-prepare",
    category: "First Visit Guidance",
    title: "What to wear, bring, and expect before a Rose Quartz session",
    deck: "Clear preparation helps the body arrive with less uncertainty and gives Rose better information before touch begins.",
    tags: ["First visit", "Preparation", "Comfort"],
    image: imageFor.ritual,
    sources: ["nccihMassageTips", "nccihMassage"],
    callout: "Guests should share relevant medical history, recent injuries, pregnancy, surgery, infection, clotting concerns, and symptoms that may require provider guidance.",
    service: "All service pathways",
    prompt: "Share comfort needs, clothing preferences, scent sensitivity, temperature needs, and any medical guidance before the appointment.",
    sections: [
      ["Preparation should reduce pressure, not add it", ["Guests do not need a perfect routine before massage. The useful preparation is simple: arrive a little early, hydrate normally, wear comfortable clothes, and know what you want Rose to avoid.", "The website can make this clear so first-time clients are not secretly worrying about etiquette."]],
      ["Clothing and draping can be discussed", ["Many massage sessions use professional draping, but comfort varies by guest and service. Rose can explain what will stay covered, what areas are included, and how the guest can request changes.", "For some light-touch or nervous-system sessions, the guest may prefer more clothing or less exposure. That preference belongs in the intake."]],
      ["What Rose needs to know", ["The most important preparation is honesty: pressure sensitivity, pregnancy, recent procedures, headaches, swelling, dizziness, injuries, emotional tenderness, and scent preferences.", "When Rose knows the context, the session can feel less like a generic appointment and more like care designed around the person arriving."]]
    ],
    listTitle: "Before you arrive",
    listItems: ["Hydrate normally", "Avoid rushing in", "Bring provider guidance if relevant", "Name scent sensitivity", "Choose quiet or guided tone"],
    asideFit: "Best for new guests who want the first appointment to feel clear before they walk in."
  },
  {
    slug: "session-length-guide",
    category: "Request Guidance",
    title: "60, 90, or 120 minutes: choosing a session length that matches your body",
    deck: "The right length depends on focus, nervous-system pace, complexity, and whether the guest needs transition time as much as table time.",
    tags: ["Request prep", "Session length", "Planning"],
    image: imageFor.ritual,
    sources: ["nccihMassageTips"],
    callout: "Longer is not automatically better. Medical cautions, fatigue, pregnancy comfort, and nervous-system capacity should shape the appointment length.",
    service: "All service pathways",
    prompt: "Share whether you want focused relief, full-body care, ritual pace, prenatal comfort, or extra time for transitions.",
    sections: [
      ["A short session can still be complete", ["Sixty minutes can work well when the goal is focused: head and jaw, lymphatic flow, neck and shoulders, feet, or a clear nervous-system reset.", "The key is not to overload the plan. A focused session should protect the main outcome instead of trying to touch everything."]],
      ["Ninety minutes is the signature middle ground", ["Ninety minutes gives Rose enough room for intake, positioning, full-body rhythm, and focused work without rushing the return. It is often the best fit for prenatal care or combined specialties.", "This length lets the body settle before asking it to receive more specific touch."]],
      ["When 120 minutes makes sense", ["A two-hour session is best for ritual care, complex tension patterns, deep rest, extra transitions, or guests who need time to arrive and time to return.", "It should still be paced carefully. Spacious does not mean intense; it means the session does not have to hurry."]]
    ],
    listTitle: "Quick guide",
    listItems: ["60 minutes for focused care", "90 minutes for signature full-body support", "120 minutes for ritual and deep restoration", "Shorter if the body tires easily", "Longer when transitions matter"],
    asideFit: "Best for guests deciding between focused relief and a more immersive Rose Quartz experience."
  },
  {
    slug: "water-ritual-aftercare",
    category: "Ritual and Aftercare",
    title: "A practical water ritual for after massage",
    deck: "Aftercare works best when it is simple enough to actually happen: water, breath, warmth, and one small boundary.",
    tags: ["Aftercare", "Water", "Return ritual"],
    image: imageFor.ritual,
    sources: ["nccihStress", "nccihMassage"],
    callout: "Hydration and rest are supportive habits, not medical treatment. Guests with medical symptoms should follow clinician guidance.",
    service: "Energy-grounding ritual",
    prompt: "Share whether you want a quiet return, guided grounding, warm stones, aromatics, or a simple aftercare card.",
    sections: [
      ["Water marks the transition", ["A water ritual does not have to be mystical to be meaningful. It can be as simple as drinking slowly before checking the phone and letting the body feel the session before the day rushes back in.", "For Rose's brand, water is both aesthetic and practical: a cue for pacing, softness, and return."]],
      ["The ritual has three parts", ["First, hydrate. Second, breathe before standing or driving away. Third, choose one boundary that protects the work: no immediate errands, no heavy workout, no stressful call if it can wait.", "These steps help guests keep the session from becoming an isolated hour that disappears the moment they leave."]],
      ["How Rose can personalize it", ["The aftercare card can change by session: prenatal comfort, lymph flow, headache care, grief support, burnout reset, or ritual rest.", "This makes aftercare feel custom rather than generic, and it gives Rose a reason to follow up with warmth."]]
    ],
    listTitle: "Simple return ritual",
    listItems: ["Drink water", "Take three slow breaths", "Notice one changed body area", "Choose one boundary", "Schedule rest if possible"],
    asideFit: "Best for guests who want the session to carry into the rest of the day."
  },
  {
    slug: "warm-stones-grounding",
    category: "Ritual and Aftercare",
    title: "Warm stones without intensity: grounding for sensitive bodies",
    deck: "Warmth can become a nervous-system cue when it is used carefully, consentfully, and without turning the session into a spectacle.",
    tags: ["Warm stones", "Grounding", "Sensitive care"],
    image: imageFor.ritual,
    sources: ["nccihMassageTips", "nccihStress"],
    callout: "Heat may not be appropriate with pregnancy cautions, reduced sensation, inflammation, fever, skin irritation, or some medical conditions. Rose should ask first and adapt.",
    service: "Energy-grounding ritual",
    prompt: "Share heat sensitivity, pregnancy, inflammation, numbness, skin concerns, and whether warmth feels calming or overwhelming.",
    sections: [
      ["Warmth can create permission", ["For some guests, warmth tells the body it can stop bracing. A warm stone resting through a towel, a heated table, or warm hands can feel like a calm threshold before deeper care.", "The key is choice. Warmth should be offered, checked, and removed easily if the body says no."]],
      ["Grounding is not the same as heavy pressure", ["A grounding session can use still contact, slow holds, warm towels, stones, feet, hands, scalp, and breath. It does not need aggressive pressure to feel substantial.", "Rose can make the experience feel rich while protecting sensitive bodies from too much heat, scent, or sensation at once."]],
      ["After warmth, return slowly", ["Guests may feel sleepy or spacious after heat-based work. The return should include water, slow sitting, and a moment before standing.", "That transition is part of the treatment. It helps the nervous system carry the calm instead of snapping back into urgency."]]
    ],
    listTitle: "Warmth preferences to share",
    listItems: ["Heat sensitivity", "Areas to avoid", "Pregnancy or medical cautions", "Preference for towels or stones", "Need for a cooler room"],
    asideFit: "Best for guests who want ritual care, grounding, and warmth without high pressure."
  },
  {
    slug: "aromatics-and-scent-sensitivity",
    category: "Consent and Comfort",
    title: "Aromatics, scent sensitivity, and the right to choose neutral air",
    deck: "A beautiful massage room should never require a guest to tolerate scent that overwhelms their body.",
    tags: ["Scent", "Aromatics", "Sensitivity"],
    image: imageFor.ritual,
    sources: ["nccihMassageTips"],
    callout: "Guests with asthma, migraine, allergies, pregnancy sensitivity, nausea, or scent-triggered symptoms should be able to request a neutral room.",
    service: "All service pathways",
    prompt: "Share scent sensitivity, migraine triggers, pregnancy nausea, allergies, or whether you prefer no aromatics.",
    sections: [
      ["Scent is part of consent", ["Spa culture often treats fragrance as automatic. Rose Quartz Massage can feel more refined by doing the opposite: aromatics are optional, gentle, and never assumed.", "A neutral room can be just as beautiful. Wood, clean linens, water, warmth, and quiet can carry the atmosphere without scent."]],
      ["How to offer aromatics carefully", ["If scent is used, Rose can keep it low, natural, and easy to decline. She can ask before applying anything to skin or diffusing anything in the room.", "This matters for migraine-prone guests, pregnant guests, sensitive nervous systems, and anyone who simply wants clean air."]],
      ["The guest should not have to apologize", ["The booking flow can make scent preferences normal. A checkbox for neutral room, light aromatics, or no topical fragrance prevents discomfort before it starts.", "That small act of choice tells the guest the whole session will be consent-led."]]
    ],
    listTitle: "Room options",
    listItems: ["Neutral air", "No topical fragrance", "Light aromatics only", "No diffuser", "Avoid specific scents"],
    asideFit: "Best for scent-sensitive guests, migraine-prone guests, pregnant clients, and anyone who wants a quieter sensory field."
  },
  {
    slug: "quiet-vs-guided-massage",
    category: "Consent and Comfort",
    title: "Quiet or guided? Choosing the conversation tone of your massage",
    deck: "Some bodies relax into silence. Others feel safer with a few clear words. The right tone is part of the treatment.",
    tags: ["Conversation", "Guidance", "Comfort"],
    image: imageFor.nervous,
    sources: ["nccihStress", "nccihMassage"],
    callout: "A massage session can be emotionally supportive, but it is not counseling or mental-health care. Guests can choose silence without needing to explain why.",
    service: "All service pathways",
    prompt: "Choose quiet, guided, or conversational tone in the booking request and note whether check-ins should be brief or detailed.",
    sections: [
      ["Tone changes the nervous system", ["A guest who is overwhelmed may need silence so the body can stop processing. Another guest may need gentle explanation so touch does not feel surprising.", "Rose can make both options feel equally welcome. The tone is not a personality test. It is a comfort setting."]],
      ["Guidance can be minimal", ["Guided does not mean constant talking. It can be a simple note before changing areas, a breath cue, a pressure check, or an explanation of what Rose is noticing.", "Quiet does not mean the guest cannot speak. It means Rose protects silence unless care requires a check-in."]],
      ["How to choose", ["Guests can ask themselves: Do I relax when I understand what is happening, or do I relax when words stop? Do I want emotional quiet, technical guidance, or occasional reassurance?", "The answer may change by session. A good website lets the guest update it every time."]]
    ],
    listTitle: "Tone choices",
    listItems: ["Quiet", "Guided", "Conversational", "Check in before pressure changes", "Only speak if needed"],
    asideFit: "Best for guests who want the room to match their nervous system instead of adapting to generic spa etiquette."
  },
  {
    slug: "insomnia-rest-massage",
    category: "Nervous-System Support",
    title: "Massage for the body that forgot how to sleep",
    deck: "Rest-focused bodywork can support sleep routines by reducing urgency, softening breath, and protecting the transition after the session.",
    tags: ["Sleep", "Rest", "Nervous system"],
    image: imageFor.nervous,
    sources: ["nccihStress", "nccihMassage"],
    callout: "Chronic insomnia, breathing problems during sleep, severe anxiety, medication concerns, or sleep symptoms that affect safety should be discussed with a health professional.",
    service: "Nervous-system reset",
    prompt: "Share whether sleep trouble is about falling asleep, staying asleep, pain, pregnancy comfort, stress, or racing thoughts.",
    sections: [
      ["Sleep is a transition, not a command", ["A body that has been running on stress may not fall asleep just because the day ends. Massage can support the transition by lowering sensory load and giving the body a slower rhythm to follow.", "Rose can build the session around quiet repetition, scalp, feet, neck, breath, and broad contact rather than stimulating the body with too much novelty."]],
      ["The timing matters", ["Some guests need evening care. Others do better earlier in the day so the nervous system has time to settle before bedtime. The right timing is personal.", "Rose can ask what happens after massage: sleepy, emotional, energized, thirsty, hungry, or tender. Those details shape future care."]],
      ["Aftercare for sleep", ["A sleep-focused aftercare card should be very simple: water, dim light, fewer screens, warm shower, and one gentle body scan before bed.", "The point is not to create another task list. It is to keep the nervous system from being pulled immediately back into demand."]]
    ],
    listTitle: "Sleep intake notes",
    listItems: ["Falling asleep or staying asleep", "Pain at night", "Jaw or shoulder tension", "Pregnancy positioning", "Need for quiet aftercare"],
    asideFit: "Best for guests who want massage to support rest, decompression, and bedtime rhythm."
  },
  {
    slug: "massage-for-caregivers",
    category: "Special Populations",
    title: "Massage for caregivers who are always listening for someone else",
    deck: "Caregivers often arrive with practical fatigue, emotional vigilance, and bodies that forgot they are allowed to receive.",
    tags: ["Caregivers", "Burnout", "Rest"],
    image: imageFor.body,
    sources: ["nccihStress", "nccihMassage"],
    callout: "Caregiver stress can become medically and emotionally serious. Massage can provide restoration, but ongoing exhaustion, depression, or crisis needs broader support.",
    service: "Special populations",
    prompt: "Share whether you are physically lifting, emotionally depleted, sleep deprived, or worried you will not be able to settle.",
    sections: [
      ["The body stays on alert", ["Caregivers often listen even in quiet rooms. Their shoulders hold anticipation. Their hands, low back, jaw, and breath may be shaped by the needs of someone else.", "Rose can acknowledge that arriving is already a transition. The session may need more grounding before touch deepens."]],
      ["Care that asks very little", ["A caregiver session can focus on hands, forearms, neck, shoulders, low back, feet, and breath. Rose can keep choices simple so the guest does not have to manage one more thing.", "Silence may be a relief. So can gentle guidance. The intake should let the guest choose without explaining the whole caregiving story."]],
      ["A realistic return", ["Aftercare should not assume a quiet life awaits. Rose can suggest one tiny boundary: sit in the car for one extra breath, drink water before returning home, or let the next hour be less efficient.", "Small recovery moments matter when long breaks are not available."]]
    ],
    listTitle: "Common caregiver focus",
    listItems: ["Hands and forearms", "Neck and shoulders", "Low back", "Feet", "Emotional decompression"],
    asideFit: "Best for parents, family caregivers, nurses, bodyworkers, and anyone who spends the day tending others."
  },
  {
    slug: "seniors-gentle-mobility",
    category: "Special Populations",
    title: "Gentle massage for seniors and sensitive mobility needs",
    deck: "Older bodies may need more positioning support, lighter pressure, slower transitions, and careful respect for medical context.",
    tags: ["Seniors", "Mobility", "Gentle care"],
    image: imageFor.body,
    sources: ["nccihMassage", "nccihMassageTips"],
    callout: "Guests with fragile skin, osteoporosis, blood thinners, clotting history, recent surgery, neuropathy, or complex medical conditions should share provider guidance before massage.",
    service: "Special populations",
    prompt: "Share mobility limits, medications or conditions that affect touch, preferred positioning, and whether getting on or off the table needs support.",
    sections: [
      ["Gentle care is not lesser care", ["For seniors, the best massage may be lighter, slower, and more precise. That does not make it less therapeutic. It means the session respects tissue, joints, skin, and medical context.", "Rose can make dignity part of the design: clear draping, stable transitions, simple choices, and no rushing."]],
      ["Positioning comes first", ["Some guests need bolsters under knees, side-lying work, extra time turning, seated work, or a shorter session. These adjustments should feel normal, not like exceptions.", "A calm setup lets the body receive more. The safer the position, the more useful the touch can be."]],
      ["Aftercare should be steady", ["Aftercare can include water, slow standing, easy movement, and noting what felt freer or tender. Rose should avoid overwhelming the guest with complicated instructions.", "The goal is comfort, mobility support, and a room where the guest feels respected from arrival to return."]]
    ],
    listTitle: "Helpful intake notes",
    listItems: ["Mobility support", "Skin sensitivity", "Medical guidance", "Preferred position", "Pressure limits"],
    asideFit: "Best for seniors or guests who need adaptive positioning and conservative pressure."
  },
  {
    slug: "desk-workers-posture-reset",
    category: "Therapeutic Relief",
    title: "A posture reset for desk workers that starts with breath",
    deck: "Desk posture is not just a shape. It is a daily rhythm of eyes, jaw, shoulders, ribs, hips, and breath.",
    tags: ["Posture", "Desk work", "Breath"],
    image: imageFor.nervous,
    sources: ["nccihMassage", "mayoHeadacheStress"],
    callout: "Persistent pain, numbness, weakness, or symptoms that travel into the arm or hand should be evaluated by a health professional.",
    service: "Restorative therapeutic massage",
    prompt: "Share desk setup, screen hours, headaches, jaw clenching, shoulder lift, and whether chest or rib work feels comfortable.",
    sections: [
      ["The desk follows you", ["Even away from the computer, the body may keep the same shape: forward head, raised shoulders, small breath, tight hips, and a jaw ready for the next notification.", "Massage can help interrupt that pattern by working with the whole posture, not only the sore spot."]],
      ["What Rose can include", ["A desk reset can include neck, shoulders, upper back, scalp, jaw, forearms, hands, low back, hips, and breath. Rose can begin broad and move into focus as the body allows.", "The session should also consider sound and conversation. A guest who spends all day processing information may need quiet more than explanation."]],
      ["Aftercare at the workstation", ["The most useful aftercare is something the guest can do at the desk: feet on the floor, one breath before email, shoulders down before a call, or hands unclenched at the keyboard.", "Rose can help the guest identify the first body cue that tension is returning. That cue becomes the reset point."]]
    ],
    listTitle: "Desk reset areas",
    listItems: ["Neck and scalp", "Jaw", "Shoulders", "Forearms and hands", "Hips and low back"],
    asideFit: "Best for screen-heavy workers, students, remote professionals, and anyone carrying posture fatigue."
  },
  {
    slug: "runners-hikers-recovery",
    category: "Therapeutic Relief",
    title: "Recovery massage for runners, hikers, and desert legs",
    deck: "Active bodies need massage that respects training load, hydration, heat, feet, hips, and the difference between soreness and injury.",
    tags: ["Recovery", "Legs", "Active bodies"],
    image: imageFor.body,
    sources: ["nccihMassageTips"],
    callout: "Sharp pain, swelling, suspected strain, fracture, heat illness, or symptoms that change gait should be assessed medically before massage.",
    service: "Restorative therapeutic massage",
    prompt: "Share recent activity, heat exposure, soreness versus pain, upcoming events, and areas that should not be deeply worked.",
    sections: [
      ["Recovery is not punishment", ["Runners and hikers often think recovery massage has to be intense to be useful. But a tired body may need circulation, nervous-system downshift, and broad tissue attention more than aggressive pressure.", "Rose can work with legs, hips, feet, low back, shoulders, and breath while respecting the difference between training soreness and injury."]],
      ["The desert adds context", ["Las Vegas heat, dry air, long walks, conventions, trails, and travel can all change how the body feels. Hydration, foot care, and pacing matter.", "Rose can ask what the body did recently and what it needs to do next. Pre-event and post-event sessions should not be treated the same."]],
      ["Aftercare for active guests", ["Aftercare may include water, food, easy movement, avoiding immediate intensity, and noticing whether gait feels different.", "If an area feels sharp, unstable, hot, or swollen, the plan should shift from massage to appropriate medical evaluation."]]
    ],
    listTitle: "Recovery focus",
    listItems: ["Feet and calves", "Hips and glutes", "Low back", "Shoulders from packs", "Hydration and pacing notes"],
    asideFit: "Best for active guests who want recovery without being overworked."
  },
  {
    slug: "scar-and-surgery-caution",
    category: "Lymphatic Flow",
    title: "Massage after surgery: what Rose needs to know before touching scar tissue",
    deck: "Post-surgical care requires medical clearance, timing, infection awareness, and a conservative approach to swelling and sensitivity.",
    tags: ["Surgery", "Scar caution", "Provider guidance"],
    image: imageFor.body,
    sources: ["medlineLymphedema", "medlineLymphedemaCare", "nccihMassageTips"],
    callout: "Recent surgery, infection signs, open wounds, fever, clotting risk, unexplained swelling, or provider restrictions must be handled by medical guidance before massage.",
    service: "Lymphatic flow or special populations",
    prompt: "Share surgery date, provider clearance, restrictions, swelling, sensation changes, incision status, and areas to avoid.",
    sections: [
      ["Timing matters", ["Post-surgical massage should never be rushed because a guest wants swelling to disappear. Healing tissue has rules, and Rose should know what a clinician has cleared before planning touch.", "Sometimes the best care is not touching the surgical area at all. The session can focus on comfort, breath, neck, shoulders, feet, or areas compensating from rest."]],
      ["Scar tissue is not just texture", ["A scar may carry numbness, sensitivity, fear, swelling, or a history the guest does not want to discuss. Rose can ask practical questions without demanding the whole story.", "If scar work is appropriate, it should be consent-led, conservative, and stopped if the tissue or guest response says no."]],
      ["What lymphatic support can and cannot promise", ["Gentle lymphatic-style work may support comfort and a sense of flow, but it should not be sold as a medical fix. Post-surgical swelling belongs inside a medical context.", "Rose can protect trust by being clear: provider guidance first, comfort second, pressure last."]]
    ],
    listTitle: "Required intake details",
    listItems: ["Surgery date", "Provider clearance", "Open or healed incision", "Swelling pattern", "Clotting or infection concerns"],
    asideFit: "Best for guests with provider-cleared recovery needs who want conservative, comfort-first support."
  },
  {
    slug: "lymphatic-massage-myths",
    category: "Lymphatic Flow",
    title: "Lymphatic massage myths that Rose Quartz can clear up before booking",
    deck: "Gentle lymphatic work should be explained with realistic language so guests know what it is, what it is not, and when caution matters.",
    tags: ["Lymphatic", "Education", "Safety"],
    image: imageFor.ritual,
    sources: ["medlineLymphedema", "medlineLymphedemaCare"],
    callout: "Lymphedema, infection, cancer treatment history, heart or kidney concerns, clotting risk, and unexplained swelling require qualified medical guidance.",
    service: "Lymphatic flow",
    prompt: "Share whether your goal is comfort, heaviness support, post-travel reset, provider-guided lymphedema support, or general relaxation.",
    sections: [
      ["Myth: harder works better", ["Lymphatic-style touch is not deep-tissue massage with a softer name. The pressure is usually light, rhythmic, and specific.", "If a guest expects force, Rose can explain that the goal is not to crush fluid out of the body. It is to support comfort and gentle movement while respecting safety."]],
      ["Myth: it is always appropriate", ["There are times when swelling should not be handled by massage first. Sudden, painful, hot, one-sided, or unexplained swelling needs medical attention.", "Rose can use the booking intake to identify when lymphatic care is a fit and when the safest answer is provider guidance."]],
      ["Myth: one session fixes everything", ["Some guests feel lighter after one session. Others need consistent care, medical support, compression guidance, movement, or changes outside the massage room.", "Honest expectations make the service stronger. Rose can promise presence, skill, and caution, not miracle claims."]]
    ],
    listTitle: "Good reasons to request lymph flow",
    listItems: ["Travel heaviness", "Gentle pregnancy comfort when appropriate", "Provider-guided care", "General sluggishness", "Light-touch relaxation"],
    asideFit: "Best for guests who want clear, realistic lymphatic education before booking."
  },
  {
    slug: "first-prenatal-massage-questions",
    category: "Pregnancy Comfort",
    title: "Questions to ask before your first prenatal massage",
    deck: "A good prenatal session starts with clear questions about safety, positioning, pressure, and what the guest needs to feel protected.",
    tags: ["Prenatal", "First visit", "Questions"],
    image: imageFor.prenatal,
    sources: ["acogPregnancyMassage", "acogExercisePregnancy"],
    callout: "Guests with high-risk pregnancy, severe symptoms, unusual swelling, bleeding, dizziness, or provider restrictions should ask their clinician before scheduling.",
    service: "Prenatal comfort massage",
    prompt: "Share trimester, provider guidance, symptoms, positioning needs, and what helps your body feel safe.",
    sections: [
      ["Question one: how will I be positioned?", ["ACOG notes side-lying as a good position for massage while pregnant. Rose can explain how pillows, bolsters, and transitions will protect the belly and reduce strain.", "This question helps the guest imagine the session before arriving, which can reduce anxiety."]],
      ["Question two: how will pressure be checked?", ["Prenatal pressure should never be a one-time conversation. The body can change throughout the session, especially around hips, feet, ribs, and low back.", "Rose can explain that light touch is a valid therapeutic choice, not a downgrade."]],
      ["Question three: what should delay booking?", ["The guest should know which symptoms require provider guidance first. This makes the site more trustworthy and helps Rose avoid turning massage into a medical decision.", "A careful no can be part of an excellent client experience."]]
    ],
    listTitle: "Ask before booking",
    listItems: ["Are you trained for prenatal positioning?", "Can pressure stay light?", "What symptoms need provider guidance?", "Can I choose silence?", "Can pillows be adjusted during the session?"],
    asideFit: "Best for expectant mothers who want clarity before their first prenatal massage."
  },
  {
    slug: "consent-language-before-touch",
    category: "Consent and Comfort",
    title: "Consent language before touch: simple words that make massage safer",
    deck: "Guests should not need expert language to ask for comfort, pause, less pressure, or a different plan.",
    tags: ["Consent", "Communication", "Safety"],
    image: imageFor.nervous,
    sources: ["nccihMassageTips"],
    callout: "Consent can be changed at any time. A guest can pause, redirect, or stop a session without needing to justify the decision.",
    service: "All service pathways",
    prompt: "Choose pressure words, pause signals, areas to avoid, and whether Rose should ask before changing body regions.",
    sections: [
      ["Clear words reduce guessing", ["Many guests endure discomfort because they do not want to interrupt. Rose can solve that before the session begins by giving simple language: lighter, same, more focused, pause, skip, or explain first.", "When the words are already offered, using them feels less confrontational."]],
      ["Consent is active care", ["Consent is not paperwork. It is the ongoing rhythm of how the session responds to the guest's body.", "Rose can check pressure without making the guest manage the whole appointment. She can also watch breath, jaw, hands, and posture for signs the body needs a different pace."]],
      ["The website can teach the room", ["A booking form that includes consent language prepares the guest to speak and prepares Rose to listen. It makes the session feel safer before touch begins.", "That is a brand differentiator: clear, elegant, practical care."]]
    ],
    listTitle: "Useful words",
    listItems: ["Lighter", "Pause", "Skip this area", "More support", "Explain first", "Quiet please"],
    asideFit: "Best for any guest who wants to feel more agency during bodywork."
  },
  {
    slug: "emotional-safety-bodywork",
    category: "Nervous-System Support",
    title: "Emotional safety in bodywork without turning massage into therapy",
    deck: "A massage room can be emotionally intelligent while still staying inside the scope of skilled bodywork.",
    tags: ["Emotional safety", "Boundaries", "Scope"],
    image: imageFor.nervous,
    sources: ["nccihMassage", "nccihStress"],
    callout: "Massage is not psychotherapy and should not be used as crisis care. Guests who feel unsafe, suicidal, or in acute distress need immediate mental-health support.",
    service: "Nervous-system reset",
    prompt: "Share whether you want silence, grounding words, no emotional discussion, or extra consent check-ins.",
    sections: [
      ["Warmth can have boundaries", ["Rose's brand can be compassionate without becoming vague or overreaching. Emotional safety is built through consent, clarity, privacy, and the right not to explain.", "A guest can cry, be quiet, laugh, or feel nothing dramatic. Rose does not need to interpret it."]],
      ["What Rose can safely hold", ["She can hold the pace, the room, the pressure, the draping, the transitions, and the invitation to pause. Those are bodywork skills with emotional intelligence.", "She does not need to diagnose trauma or process a story. The care is in helping the body feel less defended."]],
      ["Why this builds trust", ["Guests remember when a provider does not push for more than they consented to give. A massage that stays in scope can feel safer than one that tries to become everything.", "The website should reflect that maturity in plain language."]]
    ],
    listTitle: "Emotional safety can look like",
    listItems: ["No pressure to explain", "Clear boundaries", "Quiet options", "Predictable touch", "Easy pauses"],
    asideFit: "Best for sensitive guests, grieving guests, burned-out guests, and anyone who wants warmth with clear scope."
  },
  {
    slug: "rose-quartz-meaning-care",
    category: "Rose Philosophy",
    title: "Rose quartz as a care standard, not just a crystal meaning",
    deck: "The Rose Quartz name can become a practical promise: compassion, consent, softness, and care that does not ask the body to defend itself.",
    tags: ["Rose Quartz", "Brand philosophy", "Compassion"],
    image: imageFor.ritual,
    sources: ["nccihMassageTips"],
    callout: "Symbolism can support the atmosphere of care, but massage claims should remain grounded, practical, and honest.",
    service: "All service pathways",
    prompt: "Share what helps you feel cared for: quiet, warmth, grounding, gentle pressure, direct relief, or a clear plan.",
    sections: [
      ["The name can become behavior", ["Rose quartz is often associated with softness, heart-centered care, and unconditional love. On the website, that symbolism works best when it becomes practical.", "It can mean asking before pressure changes, allowing silence, protecting sensitive guests, and designing services around bodies that need patience."]],
      ["Soft does not mean weak", ["A gentle practice can still be clear, skilled, and effective. The brand should not apologize for light-touch care; it should define it as Rose's specialty.", "That distinction helps clients who have felt overworked by other massage experiences find the right room faster."]],
      ["How guests feel the brand", ["They feel it in the intake, the body map, the room preferences, the aftercare card, and Rose's language. The symbol becomes trustworthy because it shows up as choices.", "That is how a beautiful brand becomes a reliable service experience."]]
    ],
    listTitle: "Rose Quartz care principles",
    listItems: ["Compassion", "Clear consent", "Gentle strength", "Emotional warmth", "No pressure to perform"],
    asideFit: "Best for guests drawn to the name but wanting care that stays practical and grounded."
  },
  {
    slug: "scorpio-water-ritual",
    category: "Rose Philosophy",
    title: "Scorpio water energy as depth, boundaries, and quiet transformation",
    deck: "Rose's water-sign language can inform the brand without turning the website into astrology theater.",
    tags: ["Water", "Boundaries", "Brand philosophy"],
    image: imageFor.ritual,
    sources: ["nccihStress"],
    callout: "Astrology and symbolism are used here as brand language and reflection, not medical or therapeutic claims.",
    service: "Energy-grounding ritual",
    prompt: "Choose whether you want a practical session, a quiet ritual tone, or a little more symbolic grounding woven into the experience.",
    sections: [
      ["Depth needs boundaries", ["Scorpio water energy can be translated into the site as privacy, depth, intensity held with care, and a room that does not need to be loud to feel powerful.", "For Rose, the most useful part is boundaries. Deep care is only safe when consent is clear."]],
      ["Water as pacing", ["Water can show up in the intake, the visuals, the sound of the brand, and the aftercare. It says: slow down, return, let the body move at its own rhythm.", "This gives the site a distinctive emotional signature without promising anything beyond skilled massage and presence."]],
      ["Transformation can be subtle", ["A guest may leave with less jaw tension, a little more breath, or one new way to listen to the body. That is enough.", "The brand does not need to announce transformation. It can design conditions where small shifts feel respected."]]
    ],
    listTitle: "Water-sign brand cues",
    listItems: ["Privacy", "Depth", "Boundaries", "Ritual pacing", "Emotional intelligence"],
    asideFit: "Best for guests who want massage to feel grounded, intimate, and quietly restorative."
  },
  {
    slug: "seven-waters-method",
    category: "Rose Philosophy",
    title: "The Seven Waters Method: a signature intake for real bodies",
    deck: "A seven-part intake can make Rose's work memorable while helping guests communicate comfort, pressure, mood, and aftercare needs.",
    tags: ["Seven Waters", "Intake", "Method"],
    image: imageFor.ritual,
    sources: ["nccihMassageTips"],
    callout: "A signature method should organize care, not replace medical screening or provider guidance when symptoms require it.",
    service: "All service pathways",
    prompt: "Use the body map and Care Compass to share safety, breath, flow, structure, quiet, release, and return needs.",
    sections: [
      ["A method makes care easier to choose", ["Guests do not always know whether they need Swedish massage, lymphatic work, prenatal care, or nervous-system support. A signature method can translate their lived experience into a care plan.", "The Seven Waters Method gives Rose a memorable structure without forcing clients into clinical language."]],
      ["What the seven parts do", ["Safety covers medical notes, boundaries, and pressure. Breath notices bracing. Flow looks at heaviness and swelling. Structure maps tension. Quiet chooses the room tone. Release names what the guest wants to set down. Return protects aftercare.", "Together, the seven parts make the booking experience feel guided rather than transactional."]],
      ["Why it supports Rose's strengths", ["The method gives kinesthetic, auditory, and visual guests different ways to communicate. They can map the body, choose words, and see a summary.", "That is where the website becomes more than a brochure. It becomes the first layer of care."]]
    ],
    listTitle: "Seven Waters",
    listItems: ["Safety", "Breath", "Flow", "Structure", "Quiet", "Release", "Return"],
    asideFit: "Best for guests who are not sure what to book but know how they want to feel."
  },
  {
    slug: "body-map-booking-guide",
    category: "Request Guidance",
    title: "How to use the Rose Session Map before you book",
    deck: "A body map helps guests share pain, tenderness, swelling, breath, and pressure preferences without writing a perfect essay.",
    tags: ["Body map", "Request prep", "Intake"],
    image: imageFor.body,
    sources: ["nccihMassageTips"],
    callout: "The body map is for communication, not diagnosis. New, severe, unexplained, or medically concerning symptoms should be discussed with a health professional.",
    service: "All service pathways",
    prompt: "Mark the areas asking for care, the sensation you feel, the pressure you prefer, and the session tone you want.",
    sections: [
      ["The map lowers the writing burden", ["Many guests know where the body is asking for care but struggle to describe it in a blank text box. A visual map gives them a starting point.", "Rose can receive a clearer summary before confirming the appointment, which makes the session feel more personal from the beginning."]],
      ["It also protects consent", ["The map lets guests name areas to focus on and areas to avoid. It can capture pressure, tone, and sensation before anyone is on the table.", "That means the first conversation is already more specific than a generic intake."]],
      ["How to use it well", ["Choose the areas that matter most today, not every area that has ever hurt. Add sensation words like tight, tender, swollen, bracing, or headache.", "If something is medically concerning, use the map to tell Rose and also seek appropriate medical guidance."]]
    ],
    listTitle: "Map inputs",
    listItems: ["Body area", "Sensation", "Pressure", "Tone", "Suggested pathway"],
    asideFit: "Best for guests who want a guided booking flow before talking with Rose."
  },
  {
    slug: "seasonal-self-care-las-vegas",
    category: "Ritual and Aftercare",
    title: "Seasonal self-care in Las Vegas heat, dryness, and bright desert days",
    deck: "The desert climate shapes hydration, skin, sleep, swelling, and how the body arrives for massage.",
    tags: ["Las Vegas", "Seasonal care", "Hydration"],
    image: imageFor.ritual,
    sources: ["nccihStress"],
    callout: "Heat illness, fainting, dehydration symptoms, chest pain, confusion, or severe swelling require medical attention, not massage-first care.",
    service: "Restorative therapeutic massage",
    prompt: "Share heat exposure, travel, water intake, skin sensitivity, sleep disruption, and whether you need a cooler room.",
    sections: [
      ["The desert changes the body", ["Las Vegas can leave guests hot, dry, tired, overstimulated, or swollen after long walks, travel, events, or workdays. Massage should meet that climate reality.", "Rose's nature theme can make the room feel like shade: green, water, wood, clean stone, and calm."]],
      ["How sessions can adapt", ["Summer care may need cooler temperature, lighter linens, more water cues, and less heat. Winter or evening care may invite warmth, grounding, and slower transitions.", "Guests should be encouraged to share heat sensitivity instead of silently enduring a room that feels too warm."]],
      ["Aftercare by season", ["Aftercare can be hydration, mineral-rich food, gentle movement, shade, quiet, or a warm shower depending on the season and the guest's body.", "The point is not to prescribe a lifestyle. It is to help the session fit the real environment outside Rose's door."]]
    ],
    listTitle: "Seasonal notes",
    listItems: ["Heat exposure", "Dry skin", "Travel fatigue", "Swelling", "Room temperature preference"],
    asideFit: "Best for locals and visitors whose bodies respond strongly to desert weather."
  },
  {
    slug: "how-often-to-rebook",
    category: "Request Guidance",
    title: "How often should you rebook massage?",
    deck: "The right rhythm depends on the guest's goal, stress load, pregnancy stage, pain pattern, budget, and how long relief lasts.",
    tags: ["Rebooking", "Care rhythm", "Planning"],
    image: imageFor.body,
    sources: ["nccihMassageTips", "nccihMassage"],
    callout: "Massage frequency should not replace medical evaluation for symptoms that are worsening, unexplained, or interfering with daily function.",
    service: "All service pathways",
    prompt: "Share what you want to change, how long relief usually lasts, and whether the goal is maintenance, support through a season, or focused relief.",
    sections: [
      ["Rebooking is not one-size-fits-all", ["Some guests need one appointment before a trip, birth, event, or hard week. Others benefit from a short series to learn how the body responds.", "Rose can make rebooking feel collaborative instead of sales-driven by asking what changed and how long it lasted."]],
      ["A few useful rhythms", ["Focused relief may start every two to four weeks for a season. Nervous-system support may work monthly or around stressful transitions. Prenatal care may shift by trimester and provider guidance.", "Maintenance can be simple: return when the body starts rebuilding the pattern, not when it is already in crisis."]],
      ["What Rose can track", ["The best rebooking cue is evidence from the guest's life: sleep, swelling, jaw tension, headaches, hip comfort, stress bracing, or how the body felt the next day.", "That makes the care plan specific. The rhythm comes from response, not pressure."]]
    ],
    listTitle: "Rebooking cues",
    listItems: ["Relief duration", "Sleep changes", "Stress season", "Pregnancy stage", "Recurring tension pattern"],
    asideFit: "Best for guests deciding whether massage is occasional support or a regular care rhythm."
  },
  {
    slug: "hands-arms-caregivers",
    category: "Therapeutic Relief",
    title: "Hands, wrists, and forearms: the overlooked caregiver map",
    deck: "Hands tell the story of holding, typing, lifting, feeding, cleaning, and caring long before the shoulders speak.",
    tags: ["Hands", "Forearms", "Caregivers"],
    image: imageFor.body,
    sources: ["nccihMassageTips"],
    callout: "Numbness, tingling, weakness, swelling, injury, or symptoms that interfere with grip should be discussed with a health professional.",
    service: "Restorative therapeutic massage",
    prompt: "Share hand use, numbness or tingling, grip fatigue, wrist sensitivity, and whether palm or forearm work feels comfortable.",
    sections: [
      ["The hands carry invisible labor", ["Hands and forearms may hold stress from caregiving, bodywork, typing, gaming, cooking, cleaning, or lifting. Guests often forget to ask for this care until pain starts interrupting daily tasks.", "Rose can make hand and forearm work feel like a legitimate focus, not an afterthought."]],
      ["Gentle detail can be enough", ["Hand work does not have to be intense. Slow palm contact, forearm gliding, wrist support, fingers, and shoulder connection can give the nervous system a surprising amount of relief.", "Because hands can be sensitive, Rose should ask first and keep pressure responsive."]],
      ["Aftercare through use", ["The guest can notice gripping, phone posture, keyboard tension, or how often the hands stay curled at rest. Those small cues help the session carry into daily life.", "If symptoms suggest nerve involvement or injury, massage should pause for appropriate evaluation."]]
    ],
    listTitle: "Hand-care focus",
    listItems: ["Palms", "Forearms", "Wrists", "Thumbs", "Shoulders and neck connection"],
    asideFit: "Best for caregivers, desk workers, artists, massage therapists, cooks, and anyone whose hands do constant work."
  },
  {
    slug: "migraine-sensitive-touch",
    category: "Head, Jaw, and Headache Care",
    title: "Migraine-sensitive massage: less input can be more care",
    deck: "Guests who experience migraine may need low light, neutral scent, quiet, and careful pressure more than a standard headache session.",
    tags: ["Migraine", "Sensitivity", "Low-stimulus room"],
    image: imageFor.nervous,
    sources: ["nccihMassage", "mayoHeadacheStress"],
    callout: "Migraine, new severe headache, neurological symptoms, vision changes, fever, injury, or unusual headache patterns should be managed with medical guidance.",
    service: "Head, jaw, and headache care",
    prompt: "Share light, scent, sound, pressure, nausea, scalp, and face-touch sensitivity before booking.",
    sections: [
      ["Input matters", ["For migraine-prone guests, the room itself can be part of the care plan. Light, scent, sound, temperature, and conversation may matter as much as the massage technique.", "Rose can offer a low-stimulus session with neutral air, quiet tone, slow transitions, and no surprise changes."]],
      ["Touch can be local or indirect", ["Some guests want scalp, jaw, neck, face, and shoulder work. Others cannot tolerate touch near the head during sensitive periods and need feet, hands, or general grounding instead.", "The intake should let the guest choose what feels safe that day."]],
      ["Aftercare should protect the senses", ["After a migraine-sensitive session, the guest may need water, dim light, quiet, and no immediate errands. Rose can suggest a soft return instead of a busy aftercare list.", "The goal is to reduce load, not add one more thing to manage."]]
    ],
    listTitle: "Sensory settings",
    listItems: ["Low light", "Neutral scent", "Quiet room", "Gentle scalp work", "No face touch if sensitive"],
    asideFit: "Best for guests whose headaches are paired with light, sound, scent, nausea, or touch sensitivity."
  },
  {
    slug: "feet-ankles-grounding",
    category: "Therapeutic Relief",
    title: "Feet and ankles as the body's grounding conversation",
    deck: "Foot work can be calming, practical, and deeply regulating when it is done with consent and attention to swelling or sensitivity.",
    tags: ["Feet", "Ankles", "Grounding"],
    image: imageFor.body,
    sources: ["nccihMassageTips", "medlineLymphedema"],
    callout: "Foot wounds, infection, severe swelling, diabetes-related sensation changes, clotting concerns, or unexplained pain require medical caution before massage.",
    service: "Lymphatic flow or restorative massage",
    prompt: "Share swelling, foot sensitivity, injury, numbness, pregnancy comfort, and whether foot work feels grounding or unpleasant.",
    sections: [
      ["Feet tell Rose how the body arrived", ["Feet can show travel, standing work, pregnancy heaviness, nervous-system activation, or the simple fatigue of carrying a full life. They can also be emotionally sensitive.", "Rose can ask before foot work and treat yes, no, and maybe as equally acceptable answers."]],
      ["Grounding can be light", ["Foot and ankle care may include still contact, gentle holds, slow movement, light lymphatic-style pacing, or more focused work if the guest wants it.", "The pressure should match the tissue and context, especially when swelling, pregnancy, or medical conditions are part of the story."]],
      ["Aftercare from the ground up", ["After foot work, guests can notice balance, warmth, heaviness, or the way the body meets the floor. A short easy walk or water may help integrate the session.", "The goal is not to force the feet to change. It is to help the whole body feel supported from the ground."]]
    ],
    listTitle: "Foot-care questions",
    listItems: ["Do feet feel safe to touch?", "Any swelling?", "Any numbness?", "Pregnancy or travel?", "Light or focused pressure?"],
    asideFit: "Best for guests who want grounding, foot relief, travel support, or gentle swelling-aware care."
  },
  {
    slug: "special-populations-care",
    category: "Special Populations",
    title: "Special populations deserve specific massage, not watered-down care",
    deck: "Seniors, sensitive guests, caregivers, pregnant clients, and people with medical complexity need thoughtful adaptation, not generic relaxation.",
    tags: ["Adaptive care", "Special populations", "Intake"],
    image: imageFor.body,
    sources: ["nccihMassageTips", "nccihMassage"],
    callout: "Guests with complex medical history should share provider guidance and relevant restrictions before booking. Rose can adapt or refer out when massage is not the right next step.",
    service: "Special populations",
    prompt: "Share accessibility needs, medical cautions, pressure limits, positioning needs, and what would make the session feel respectful.",
    sections: [
      ["Adaptation is expertise", ["A session for a sensitive or medically complex guest should not feel like a reduced version of normal massage. The adaptation is the skill.", "Rose can adjust timing, position, pressure, temperature, conversation, and focus so the guest is not forced into a standard format."]],
      ["The intake has to be better", ["Special populations need more than a checkbox. They need plain-language prompts that help Rose understand risks, preferences, support needs, and what the guest does not want repeated from past care.", "That makes the body map and Care Compass important parts of the service, not just website features."]],
      ["Respect is a design choice", ["The site can show respect by explaining cautions, offering choices, and avoiding exaggerated promises. Guests feel safer when the business is honest about scope.", "Rose's advantage is warmth with clarity. That combination is rare and memorable."]]
    ],
    listTitle: "Adaptive choices",
    listItems: ["Shorter session", "Side-lying or seated work", "Lower pressure", "Neutral scent", "Extra transition time"],
    asideFit: "Best for guests who need the appointment shaped around accessibility, sensitivity, pregnancy, age, or medical context."
  },
  {
    slug: "bodywork-for-chronic-pain-pace",
    category: "Therapeutic Relief",
    title: "Chronic pain and why pacing matters more than proving tolerance",
    deck: "A chronic-pain session should be measured by how the body receives care during and after, not by how much pressure it survives.",
    tags: ["Chronic pain", "Pacing", "Gentle care"],
    image: imageFor.nervous,
    sources: ["nccihMassage", "nccihMassageTips"],
    callout: "Chronic pain should be managed with appropriate health care. New, worsening, unexplained, or disabling symptoms need medical evaluation.",
    service: "Restorative therapeutic massage",
    prompt: "Share pain patterns, flare triggers, areas to avoid, pressure tolerance, medication effects, and what happened after past massage.",
    sections: [
      ["Tolerance is not the goal", ["People with chronic pain are often praised for enduring. Massage should not repeat that pattern. The goal is to create an experience the body can receive without paying for it later.", "Rose can ask about flares after previous bodywork, not just what felt good during the session."]],
      ["Pacing makes care sustainable", ["The session may need lighter pressure, fewer areas, more pauses, or a slower return. Rose can start with the areas that feel safest before approaching areas that usually guard.", "This does not mean avoiding relief. It means creating conditions where relief is less likely to trigger a rebound."]],
      ["Aftercare is evidence", ["The next day matters. Did sleep change? Did soreness feel useful or too much? Did a flare start? Did the guest feel calmer?", "That information helps Rose tune the next session with respect rather than assumptions."]]
    ],
    listTitle: "Chronic-pain intake",
    listItems: ["Flare triggers", "Pressure limits", "Safe areas", "Previous massage response", "Next-day symptoms"],
    asideFit: "Best for guests who want therapeutic care without being pushed past capacity."
  },
  {
    slug: "belly-breath-and-diaphragm",
    category: "Nervous-System Support",
    title: "Belly, breath, and the places massage should approach with care",
    deck: "Breath work can support body awareness, but belly and rib care need clear consent, especially during pregnancy, grief, stress, or sensitivity.",
    tags: ["Breath", "Belly", "Consent"],
    image: imageFor.nervous,
    sources: ["nccihStress", "nccihMassageTips"],
    callout: "Belly work is optional and may not be appropriate with pregnancy, surgery, digestive symptoms, trauma history, or personal preference. Consent must be explicit.",
    service: "Nervous-system reset",
    prompt: "Share whether belly, ribs, chest, or breath cues feel supportive, neutral, or off-limits.",
    sections: [
      ["Breath can be intimate", ["The breath is not just a technique. It can be connected to emotion, pregnancy, anxiety, posture, digestion, and body boundaries.", "Rose can use breath as an invitation rather than a command. The guest should never feel watched or graded."]],
      ["Belly and rib care require clarity", ["Some guests benefit from supported rib, diaphragm, or belly-adjacent work. Others do not want that area touched at all. Both choices are valid.", "The website can normalize choosing off-limits areas before the session begins."]],
      ["Gentle breath support can be indirect", ["Rose can support breath through shoulders, back, neck, feet, hands, and pacing without touching the belly. The body can soften around breath without being pushed into vulnerability.", "That flexibility is what makes the session feel safe."]]
    ],
    listTitle: "Consent choices",
    listItems: ["No belly work", "Rib support only", "Breath cues welcome", "No breath cues", "Ask before chest or belly-adjacent touch"],
    asideFit: "Best for guests who want nervous-system care with clear boundaries around breath and belly."
  },
  {
    slug: "the-quiet-intake",
    category: "Request Guidance",
    title: "The quiet intake: how Rose can learn a lot without making guests overexplain",
    deck: "A good intake respects privacy while still gathering the details that make massage safer and more personal.",
    tags: ["Intake", "Privacy", "Request prep"],
    image: imageFor.ritual,
    sources: ["nccihMassageTips"],
    callout: "Clients should share information that affects safety and comfort, but they do not owe personal stories beyond what is needed for care.",
    service: "All service pathways",
    prompt: "Use short answers, body-map selections, and comfort choices. Rose can ask follow-up questions only where needed.",
    sections: [
      ["Not every guest wants to narrate", ["Some people arrive with grief, stress, pregnancy discomfort, pain, or sensitivity but do not want to explain their whole life to receive care.", "A quiet intake lets them choose body areas, pressure, tone, and cautions without performing vulnerability."]],
      ["Structure protects privacy", ["The Care Compass, body map, and room preferences can gather useful information in small pieces. That gives Rose enough to begin while leaving the guest's story alone unless they choose to share.", "This is especially helpful for sensitive bodies and first-time guests."]],
      ["Follow-up can stay practical", ["Rose can ask only what changes the session: pressure, position, medical guidance, areas to avoid, and what would help the guest feel safe.", "That practicality is part of emotional safety. It keeps the appointment grounded."]]
    ],
    listTitle: "Quiet intake tools",
    listItems: ["Body map", "Pressure chips", "Tone choice", "Room preferences", "Aftercare card"],
    asideFit: "Best for private guests who want custom care without a long conversation."
  },
  {
    slug: "forest-room-sensory-design",
    category: "Rose Philosophy",
    title: "Forest room design: why the website should feel like the session",
    deck: "Wood, canopy green, water, stone, and warmth are not just visuals. They teach the guest what kind of care Rose offers.",
    tags: ["Design", "Forest", "Guest experience"],
    image: imageFor.ritual,
    sources: ["nccihStress"],
    callout: "Sensory design can support relaxation, but every guest should still be able to choose light, sound, scent, temperature, and conversation preferences.",
    service: "All service pathways",
    prompt: "Share whether you prefer low light, neutral scent, warmer blankets, quiet music, silence, or more guided care.",
    sections: [
      ["The first session starts online", ["Before the guest meets Rose, the website tells the body what to expect. A forest-and-water visual language can signal patience, softness, privacy, and grounded care.", "That makes the site more than marketing. It becomes a rehearsal for safety."]],
      ["Nature can stay refined", ["The design should not become cluttered or themed like a gift shop. Browns, greens, marble, water, and dappled light can feel luxurious when the layout stays calm.", "The tiger-spirit edge can appear as confidence and protection, not loud graphics."]],
      ["Sensory choice completes the experience", ["The room should not assume every guest wants the same scent, sound, or temperature. A premium site invites those choices before arrival.", "That is how aesthetics become care: beautiful, but still responsive."]]
    ],
    listTitle: "Sensory choices",
    listItems: ["Light", "Sound", "Scent", "Temperature", "Conversation", "Transition time"],
    asideFit: "Best for guests who care deeply about atmosphere, sensitivity, and feeling prepared before arrival."
  }
];

const articleImage = (slug) => `/assets/images/journal/${slug}.jpg`;
const withArticleImage = (article) => ({ ...article, image: articleImage(article.slug) });
const journalArticles = generatedArticles.slice(0, 33).map(withArticleImage);
const allArticles = [...existingArticles.map(withArticleImage), ...journalArticles];
const categoryId = (category) => category.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const sourceLinks = (ids) => ids.map((id) => sources[id]).filter(Boolean);

const requestFocusFor = (article) => {
  const service = String(article.service || "").toLowerCase();
  if (service.includes("prenatal")) return "Prenatal comfort";
  if (service.includes("head") || service.includes("migraine")) return "Head, jaw, and headache care";
  if (service.includes("lymphatic")) return "Lymphatic flow";
  if (service.includes("nervous")) return "Nervous-system reset";
  if (service.includes("restorative") || service.includes("ritual")) return "Restorative therapeutic massage";
  return "Not sure yet";
};

const requestDurationFor = (article) => {
  const service = String(article.service || "").toLowerCase();
  const slug = String(article.slug || "").toLowerCase();
  if (service.includes("ritual") || slug.includes("ritual") || slug.includes("water-breath") || slug.includes("scorpio")) return "120 minutes";
  if (service.includes("head") || service.includes("lymphatic") || service.includes("special populations")) return "60 minutes";
  return "90 minutes";
};

const requestHrefFor = (article, prefix = "../") => {
  const params = new URLSearchParams({
    focus: requestFocusFor(article),
    duration: requestDurationFor(article),
    note: `From the journal: ${article.title}. ${article.prompt || "I would like Rose to help map the right care path."}`
  });
  return escapeHtml(`${prefix}index.html?${params.toString()}#booking`);
};

const brandMark = `
          <span class="brand-mark" aria-hidden="true">
            <img src="/rose-quartz-logo.png" alt="Rose Quartz Massage" width="45" height="45" style="border-radius:50%;object-fit:cover;">
          </span>`;

const articleHeader = (prefix = "../") => `
    <header class="site-header" data-header>
      <a class="brand" href="${prefix}index.html#top" aria-label="Rose Quartz Massage home">
${brandMark}
        <span>
          <span class="brand-name">Rose Quartz</span>
          <span class="brand-line">Massage</span>
        </span>
      </a>
      <nav class="nav-links" aria-label="Primary navigation">
        <a href="${prefix}services.html">Services</a>
        <a href="${prefix}pricing.html">Pricing</a>
        <a href="${prefix}index.html#about">About</a>
        <a href="${prefix}index.html#method">Method</a>
        <a href="${prefix}index.html#care-style">Care Style</a>
        <a href="${prefix}index.html#booking">Preview</a>
        <a href="${prefix}journal.html">Journal</a>
      </nav>
      <a class="header-cta" href="${prefix}index.html#booking">Preview request</a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-nav-toggle>
        <span>Menu</span>
      </button>
    </header>

    <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile navigation" hidden>
      <a href="${prefix}services.html">Services</a>
      <a href="${prefix}pricing.html">Pricing</a>
      <a href="${prefix}index.html#about">About</a>
      <a href="${prefix}index.html#method">Method</a>
      <a href="${prefix}index.html#care-style">Care Style</a>
      <a href="${prefix}index.html#booking">Preview</a>
      <a href="${prefix}journal.html">Journal</a>
    </nav>`;

const footer = (prefix = "../") => `
    <footer class="site-footer">
      <div>
        <a class="brand footer-brand" href="${prefix}index.html#top" aria-label="Rose Quartz Massage home">
${brandMark}
          <span>
            <span class="brand-name">Rose Quartz</span>
            <span class="brand-line">Massage</span>
          </span>
        </a>
        <p>Nature-led, light-touch therapeutic massage in Las Vegas.</p>
      </div>
      <div class="footer-links">
        <a href="${prefix}services.html">Services</a>
        <a href="${prefix}pricing.html">Pricing</a>
        <a href="${prefix}index.html#about">About</a>
        <a href="${prefix}care-standards.html">Care Standards</a>
        <a href="${prefix}privacy-intake.html">Privacy</a>
        <a href="${prefix}index.html#booking">Preview</a>
        <a href="${prefix}journal.html">Journal</a>
      </div>
    </footer>`;

const articleTemplate = (article, index) => {
  const prev = allArticles[index - 1];
  const next = allArticles[index + 1];
  const links = sourceLinks(article.sources || ["nccihMassageTips"]);
  const description = article.deck.length > 150 ? `${article.deck.slice(0, 147)}...` : article.deck;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description,
    image: article.image,
    author: { "@type": "Person", name: "Rose" },
    publisher: {
      "@type": "Organization",
      name: "Rose Quartz Massage",
      logo: { "@type": "ImageObject", url: "/rose-quartz-logo.png" }
    },
    about: article.tags
  };

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(article.title)} | Rose Quartz Massage</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="application-name" content="Rose Quartz Massage">
    <meta name="apple-mobile-web-app-title" content="Rose Quartz">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#314b36">
    <meta name="color-scheme" content="light">
    <meta property="og:title" content="${escapeHtml(article.title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:type" content="article">
    <meta property="og:image" content="${article.image}">
    <meta property="og:site_name" content="Rose Quartz Massage">
    <meta property="og:locale" content="en_US">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(article.title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${article.image}">
    <link rel="icon" href="/rose-quartz-logo.png" type="image/png">
    <link rel="manifest" href="/site.webmanifest">
    <script type="application/ld+json">
      ${JSON.stringify(jsonLd, null, 6)}
    </script>
    <link rel="stylesheet" href="../assets/css/styles.css">
  </head>
  <body>
${articleHeader("../")}

    <main class="article-main">
      <article>
        <header class="article-hero">
          <a class="article-back" href="../journal.html">Back to journal library</a>
          <p class="eyebrow">${escapeHtml(article.category)}</p>
          <h1>${escapeHtml(article.title)}</h1>
          <p class="article-deck">${escapeHtml(article.deck)}</p>
          <div class="article-meta" aria-label="Article details">
            ${article.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("\n            ")}
          </div>
          <figure class="article-hero-image">
            <img src="${article.image}" alt="${escapeHtml(`${article.category} journal artwork for ${article.title}`)}">
          </figure>
        </header>

        <div class="article-layout">
          <div class="article-body">
            ${article.sections.map(([title, paragraphs]) => `
            <h2>${escapeHtml(title)}</h2>
            ${paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n            ")}`).join("\n")}

            <h2>${escapeHtml(article.listTitle)}</h2>
            <ul>
              ${article.listItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n              ")}
            </ul>

            <div class="article-callout">
              ${escapeHtml(article.callout)}
            </div>

            <section class="article-sources" aria-label="Sources">
              <h2>Sources</h2>
              ${links.map((source) => `<a href="${source.url}">${escapeHtml(source.label)}</a>`).join("\n              ")}
            </section>
          </div>

          <aside class="article-aside" aria-label="Session notes">
            <span class="article-tag">Rose note</span>
            <h2>Best session fit</h2>
            <p>${escapeHtml(article.asideFit)}</p>
            <h3>Request preview prompt</h3>
            <p>${escapeHtml(article.prompt)}</p>
            <a href="${requestHrefFor(article)}">Build my session plan</a>
          </aside>
        </div>

        <nav class="article-nav" aria-label="Journal navigation">
          ${prev ? `<a href="${prev.slug}.html">Previous: ${escapeHtml(prev.title)}</a>` : `<a href="../journal.html">All journal entries</a>`}
          ${next ? `<a href="${next.slug}.html">Next: ${escapeHtml(next.title)}</a>` : `<a href="../journal.html">All journal entries</a>`}
        </nav>
      </article>
    </main>

${footer("../")}

    <script type="module" src="../assets/js/site.js"></script>
  </body>
</html>
`;
};

const journalIndexTemplate = () => {
  const categoryCounts = allArticles.reduce((counts, article) => {
    counts[article.category] = (counts[article.category] || 0) + 1;
    return counts;
  }, {});
  const categories = Object.keys(categoryCounts);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Journal Library | Rose Quartz Massage</title>
    <meta name="description" content="Explore 36 Rose Quartz Massage journal articles on prenatal comfort, light-touch therapy, lymphatic flow, nervous-system support, aftercare, and Rose's health philosophy.">
    <meta name="application-name" content="Rose Quartz Massage">
    <meta name="apple-mobile-web-app-title" content="Rose Quartz">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#314b36">
    <meta name="color-scheme" content="light">
    <meta property="og:title" content="Rose Quartz Massage Journal Library">
    <meta property="og:description" content="36 in-depth articles on light-touch massage, prenatal comfort, nervous-system support, lymphatic flow, and restorative aftercare.">
    <meta property="og:type" content="website">
    <meta property="og:image" content="/assets/images/journal/seven-waters-method.jpg">
    <meta property="og:site_name" content="Rose Quartz Massage">
    <meta property="og:locale" content="en_US">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Rose Quartz Massage Journal Library">
    <meta name="twitter:description" content="36 in-depth articles on light-touch massage, prenatal comfort, nervous-system support, lymphatic flow, and restorative aftercare.">
    <meta name="twitter:image" content="/assets/images/journal/seven-waters-method.jpg">
    <link rel="icon" href="/rose-quartz-logo.png" type="image/png">
    <link rel="manifest" href="/site.webmanifest">
    <script type="application/ld+json">
      ${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Rose Quartz Massage Journal Library",
        description: "A 36-article library about light-touch massage, prenatal comfort, nervous-system support, lymphatic flow, and aftercare.",
        hasPart: allArticles.map((article) => ({
          "@type": "Article",
          headline: article.title,
          url: `journal/${article.slug}.html`
        }))
      }, null, 6)}
    </script>
    <link rel="stylesheet" href="assets/css/styles.css">
  </head>
  <body>
${articleHeader("")}

    <main class="journal-page-main">
      <section class="journal-library-hero" aria-labelledby="journal-library-title">
        <a class="article-back" href="index.html#journal">Back to homepage</a>
        <p class="eyebrow">Health philosophy journal</p>
        <h1 id="journal-library-title">A 36-part care library for bodies that need gentleness with depth.</h1>
        <p>These articles turn Rose's light-touch specialty into practical education: prenatal comfort, pressure consent, lymphatic flow, headache care, caregiver recovery, and the Water Return philosophy that makes the session continue after the table.</p>
        <div class="journal-library-stats" aria-label="Journal library stats">
          <span><strong>36</strong> articles</span>
          <span><strong>${categories.length}</strong> care themes</span>
          <span><strong>1</strong> Rose Quartz method</span>
        </div>
      </section>

      <div class="journal-category-nav" aria-label="Journal categories" data-journal-filters>
        <button class="is-selected" type="button" data-journal-filter="all" aria-pressed="true">All articles <strong>${allArticles.length}</strong></button>
        ${categories.map((category) => `<button type="button" data-journal-filter="${categoryId(category)}" aria-pressed="false">${escapeHtml(category)} <strong>${categoryCounts[category]}</strong></button>`).join("\n        ")}
      </div>

      <section class="journal-library-panel" aria-labelledby="journal-all-title" data-journal-library>
        <div class="journal-library-toolbar">
          <div>
            <p class="eyebrow">Browse the library</p>
            <h2 id="journal-all-title">All Rose Quartz articles</h2>
            <p data-journal-showing>Showing 12 of 36 articles</p>
          </div>
          <label class="journal-page-size" for="journal-page-size">
            <span>Show</span>
            <select id="journal-page-size" data-journal-page-size>
              <option value="12" selected>12 articles</option>
              <option value="24">24 articles</option>
              <option value="48">48 articles</option>
            </select>
          </label>
        </div>

        <div class="journal-library-grid" data-journal-grid>
          ${allArticles.map((article) => `
          <article class="journal-library-card" id="${categoryId(article.category)}-${escapeHtml(article.slug)}" data-journal-card data-journal-category="${categoryId(article.category)}">
            <img class="journal-library-card-image" src="${article.image}" alt="" loading="lazy" decoding="async">
            <span>${escapeHtml(article.category)}</span>
            <h3>${escapeHtml(article.title)}</h3>
            <p>${escapeHtml(article.deck)}</p>
            <a href="journal/${article.slug}.html">Read article</a>
          </article>`).join("\n")}
        </div>

        <div class="journal-pagination" aria-label="Journal pagination">
          <button type="button" data-journal-prev>Previous</button>
          <span data-journal-page-label>Page 1 of 3</span>
          <button type="button" data-journal-next>Next</button>
        </div>
      </section>
    </main>

${footer("")}

    <script type="module" src="assets/js/site.js"></script>
  </body>
</html>
`;
};

mkdirSync(resolve("journal"), { recursive: true });

journalArticles.forEach((article) => {
  const index = allArticles.findIndex((item) => item.slug === article.slug);
  writeFileSync(resolve("journal", `${article.slug}.html`), articleTemplate(article, index));
});

writeFileSync(resolve("journal.html"), journalIndexTemplate());

console.log(`Generated ${journalArticles.length} journal articles plus journal.html (${allArticles.length} total).`);
