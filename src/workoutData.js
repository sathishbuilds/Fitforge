// ─── WORKOUT DATA ─────────────────────────────────────────────────────────────
// Male: high intensity compound-focused
// Female: toned, functional, lower intensity with form cues

export const workoutData = {
  // ═══════════════════════════════════════════════════════════════════════════
  //  LEAN BULK  (Male)
  // ═══════════════════════════════════════════════════════════════════════════
  "Lean Bulk": {
    Male: {
      ppl: [
        {
          day: "Push – Chest / Shoulders / Triceps",
          exercises: [
            { name: "Barbell Bench Press", sets: "4×6–8", target: "Chest", gif: "chest", desc: "Full ROM, bar touches chest, drive through heels" },
            { name: "Incline Dumbbell Press", sets: "4×8–10", target: "Chest", gif: "chest", desc: "30–45° incline, controlled eccentric" },
            { name: "Cable Fly (mid)", sets: "3×12", target: "Chest", gif: "chest", desc: "Constant tension, squeeze hard at peak" },
            { name: "Overhead Barbell Press", sets: "4×6–8", target: "Shoulders", gif: "shoulder", desc: "Strict press, no leg drive, lockout overhead" },
            { name: "Dumbbell Lateral Raise", sets: "4×12–15", target: "Shoulders", gif: "shoulder", desc: "Slight forward lean, pinky up, slow eccentric" },
            { name: "Arnold Press", sets: "3×10", target: "Shoulders", gif: "shoulder", desc: "Rotate palms during press, full ROM" },
            { name: "Close-Grip Bench Press", sets: "3×8–10", target: "Triceps", gif: "tricep", desc: "Elbows at 45°, don't flare wide" },
            { name: "Overhead Tricep Extension (EZ bar)", sets: "3×10–12", target: "Triceps", gif: "tricep", desc: "Elbows close to head, stretch at bottom" },
          ]
        },
        {
          day: "Pull – Back / Biceps",
          exercises: [
            { name: "Deadlift", sets: "4×5", target: "Back", gif: "back", desc: "Hinge at hips, neutral spine, push floor away" },
            { name: "Weighted Pull-Ups", sets: "4×6–8", target: "Back", gif: "back", desc: "Full hang to chin over bar, controlled descent" },
            { name: "Barbell Row (overhand)", sets: "4×8", target: "Back", gif: "back", desc: "Pull to lower chest, elbows 45°, chest up" },
            { name: "Seated Cable Row (close grip)", sets: "3×10–12", target: "Back", gif: "back", desc: "Squeeze scapulae, don't round shoulders" },
            { name: "Single-Arm Dumbbell Row", sets: "3×10 each", target: "Back", gif: "back", desc: "Elbow drives to hip, full stretch at bottom" },
            { name: "Face Pulls", sets: "3×15", target: "Rear Delt", gif: "shoulder", desc: "External rotation, pull to face, elbows high" },
            { name: "Barbell Curl", sets: "4×8–10", target: "Biceps", gif: "bicep", desc: "No swinging, supinate at top" },
            { name: "Incline Dumbbell Curl", sets: "3×10–12", target: "Biceps", gif: "bicep", desc: "Long head stretch, slow eccentric" },
          ]
        },
        {
          day: "Legs – Quads / Hamstrings / Calves",
          exercises: [
            { name: "Barbell Back Squat", sets: "4×6–8", target: "Quads", gif: "legs", desc: "Below parallel, drive knees out, chest up" },
            { name: "Romanian Deadlift", sets: "4×8–10", target: "Hamstrings", gif: "legs", desc: "Hinge back, feel hamstring stretch at bottom" },
            { name: "Leg Press", sets: "4×10–12", target: "Quads", gif: "legs", desc: "Full ROM, don't lock knees out at top" },
            { name: "Bulgarian Split Squat", sets: "3×10 each", target: "Quads/Glutes", gif: "legs", desc: "Rear foot elevated, stay upright, deep lunge" },
            { name: "Seated Leg Curl", sets: "4×10–12", target: "Hamstrings", gif: "legs", desc: "Curl to 90°, hold briefly, slow eccentric" },
            { name: "Standing Calf Raise", sets: "4×15–20", target: "Calves", gif: "legs", desc: "Full extension at top, pause, full stretch" },
            { name: "Leg Extension", sets: "3×12–15", target: "Quads", gif: "legs", desc: "Pause at top, controlled descent" },
            { name: "Hip Thrust (barbell)", sets: "3×10–12", target: "Glutes", gif: "glute", desc: "Drive hips up, squeeze glutes at peak" },
          ]
        }
      ],
      single: {
        Chest: [
          { name: "Flat Barbell Bench Press", sets: "4×6–8", desc: "Primary chest builder, full ROM" },
          { name: "Incline Dumbbell Press", sets: "4×8–10", desc: "Upper chest emphasis" },
          { name: "Decline Barbell Press", sets: "3×8–10", desc: "Lower chest development" },
          { name: "Cable Fly (mid)", sets: "3×12–15", desc: "Isolation, constant tension" },
          { name: "Incline Cable Fly", sets: "3×12", desc: "Upper chest, stretch at bottom" },
          { name: "Dips (chest variation)", sets: "3×10–12", desc: "Lean forward, elbow flare" },
          { name: "Dumbbell Pullover", sets: "3×12", desc: "Serratus + chest stretch" },
          { name: "Push-Ups (weighted)", sets: "3×15", desc: "Plate on back for resistance" },
        ],
        Back: [
          { name: "Conventional Deadlift", sets: "4×5", desc: "King of back exercises" },
          { name: "Wide-Grip Pull-Ups", sets: "4×8", desc: "Lat width builder" },
          { name: "Barbell Row", sets: "4×8", desc: "Mid-back thickness" },
          { name: "T-Bar Row", sets: "4×8–10", desc: "Chest-supported, lower traps" },
          { name: "Seated Cable Row", sets: "3×10–12", desc: "Squeeze scapulae" },
          { name: "Lat Pulldown (wide grip)", sets: "3×10–12", desc: "Lat isolation" },
          { name: "Chest-Supported Row", sets: "3×10", desc: "Removes lower back fatigue" },
          { name: "Straight-Arm Pulldown", sets: "3×12–15", desc: "Lat isolation, no biceps" },
        ],
        Shoulders: [
          { name: "Barbell Overhead Press", sets: "4×6–8", desc: "Main deltoid builder" },
          { name: "Dumbbell Lateral Raise", sets: "4×12–15", desc: "Side delt isolation" },
          { name: "Arnold Press", sets: "3×10", desc: "Hits all 3 heads" },
          { name: "Rear Delt Fly (bent over)", sets: "3×12–15", desc: "Rear delt, posture health" },
          { name: "Face Pull (cable)", sets: "3×15", desc: "Rear delt + external rotation" },
          { name: "Upright Row", sets: "3×10", desc: "Medial delt + upper trap" },
          { name: "Cable Lateral Raise", sets: "3×12", desc: "Constant tension on side delts" },
          { name: "Shrugs (barbell/dumbbell)", sets: "4×12–15", desc: "Trap isolation" },
        ],
        Arms: [
          { name: "Barbell Bicep Curl", sets: "4×8–10", desc: "Mass builder for biceps" },
          { name: "Incline Dumbbell Curl", sets: "3×10–12", desc: "Long head stretch" },
          { name: "Hammer Curl", sets: "3×10–12", desc: "Brachialis + brachioradialis" },
          { name: "Concentration Curl", sets: "3×12", desc: "Peak contraction" },
          { name: "Close-Grip Bench Press", sets: "4×8–10", desc: "Tricep mass builder" },
          { name: "Skullcrusher (EZ bar)", sets: "3×10–12", desc: "Long head isolation" },
          { name: "Tricep Pushdown (rope)", sets: "3×12–15", desc: "All 3 tricep heads" },
          { name: "Overhead Tricep Extension", sets: "3×10–12", desc: "Long head stretch" },
        ],
        Legs: [
          { name: "Barbell Back Squat", sets: "4×6–8", desc: "Quad + glute compound" },
          { name: "Romanian Deadlift", sets: "4×8", desc: "Hamstring focus" },
          { name: "Leg Press", sets: "4×10–12", desc: "Volume for quads" },
          { name: "Bulgarian Split Squat", sets: "3×10 each", desc: "Quad + balance" },
          { name: "Leg Curl (seated)", sets: "4×10–12", desc: "Hamstring isolation" },
          { name: "Leg Extension", sets: "3×12–15", desc: "VMO isolation" },
          { name: "Standing Calf Raise", sets: "4×15–20", desc: "Gastroc + soleus" },
          { name: "Hip Thrust", sets: "3×10–12", desc: "Glute isolation" },
        ],
        Core: [
          { name: "Hanging Leg Raise", sets: "4×12–15", desc: "Lower abs, control swing" },
          { name: "Cable Crunch", sets: "4×15", desc: "Weighted abs, full flex" },
          { name: "Ab Wheel Rollout", sets: "3×10–12", desc: "Full-core anti-extension" },
          { name: "Plank (weighted)", sets: "3×45–60s", desc: "Plate on back for resistance" },
          { name: "Russian Twist (weighted)", sets: "3×20", desc: "Oblique rotation" },
          { name: "Decline Crunch", sets: "3×15", desc: "Upper abs" },
          { name: "Side Plank", sets: "3×30–45s each", desc: "Oblique stability" },
          { name: "Dragon Flag", sets: "3×8–10", desc: "Advanced core builder" },
        ]
      }
    },
    // ─── LEAN BULK FEMALE ──────────────────────────────────────────────────
    Female: {
      ppl: [
        {
          day: "Push – Chest / Shoulders / Triceps",
          exercises: [
            { name: "Dumbbell Chest Press (flat)", sets: "3×10–12", target: "Chest", gif: "chest", desc: "Moderate weight, full ROM, controlled" },
            { name: "Incline Dumbbell Press", sets: "3×10–12", target: "Chest", gif: "chest", desc: "Upper chest toning" },
            { name: "Push-Ups", sets: "3×12–15", target: "Chest", gif: "chest", desc: "Full body, chest focus, modify on knees if needed" },
            { name: "Dumbbell Shoulder Press", sets: "3×10–12", target: "Shoulders", gif: "shoulder", desc: "Seated for stability, controlled press" },
            { name: "Lateral Raise (light DB)", sets: "3×12–15", target: "Shoulders", gif: "shoulder", desc: "Slight bend at elbow, slow and controlled" },
            { name: "Front Raise (alternating)", sets: "3×12 each", target: "Shoulders", gif: "shoulder", desc: "Anterior delt, don't swing" },
            { name: "Tricep Pushdown (rope)", sets: "3×12–15", target: "Triceps", gif: "tricep", desc: "Elbows fixed at sides, full extension" },
            { name: "Overhead Tricep Extension (DB)", sets: "3×12", target: "Triceps", gif: "tricep", desc: "Seated, both hands on one dumbbell" },
          ]
        },
        {
          day: "Pull – Back / Biceps",
          exercises: [
            { name: "Assisted Pull-Ups / Band Pull-Ups", sets: "3×8–10", target: "Back", gif: "back", desc: "Band assistance, full hang to chin" },
            { name: "Dumbbell Row (single arm)", sets: "3×10–12 each", target: "Back", gif: "back", desc: "Elbow to hip, feel the lat" },
            { name: "Seated Cable Row (wide grip)", sets: "3×12", target: "Back", gif: "back", desc: "Squeeze scapulae, open back" },
            { name: "Lat Pulldown (medium grip)", sets: "3×10–12", target: "Back", gif: "back", desc: "Pull to upper chest, lean slightly back" },
            { name: "Resistance Band Pull-Apart", sets: "3×15", target: "Rear Delt", gif: "shoulder", desc: "Rear delt activation, posture" },
            { name: "Reverse Fly (dumbbell)", sets: "3×12–15", target: "Rear Delt", gif: "shoulder", desc: "Hinge forward, fly out, controlled" },
            { name: "Dumbbell Bicep Curl", sets: "3×12", target: "Biceps", gif: "bicep", desc: "Alternate arms, full supination" },
            { name: "Hammer Curl", sets: "3×12", target: "Biceps", gif: "bicep", desc: "Neutral grip, brachialis tone" },
          ]
        },
        {
          day: "Legs & Glutes",
          exercises: [
            { name: "Dumbbell Goblet Squat", sets: "4×12", target: "Quads/Glutes", gif: "legs", desc: "Upright torso, knees track over toes" },
            { name: "Hip Thrust (dumbbell/barbell)", sets: "4×12–15", target: "Glutes", gif: "glute", desc: "Drive through heel, squeeze top" },
            { name: "Romanian Deadlift (DB)", sets: "3×12", target: "Hamstrings", gif: "legs", desc: "Feel hamstring stretch, controlled" },
            { name: "Dumbbell Reverse Lunge", sets: "3×10 each", target: "Glutes/Quads", gif: "legs", desc: "Back knee near floor, stay upright" },
            { name: "Cable Kickback", sets: "3×15 each", target: "Glutes", gif: "glute", desc: "Straight leg, squeeze glute at top" },
            { name: "Sumo Squat (wide stance)", sets: "3×12", target: "Inner Thigh/Glutes", gif: "legs", desc: "Toes out 45°, push knees out" },
            { name: "Lying Leg Curl", sets: "3×12–15", target: "Hamstrings", gif: "legs", desc: "Hamstring isolation, controlled" },
            { name: "Standing Calf Raise", sets: "3×15–20", target: "Calves", gif: "legs", desc: "Full ROM, slow down" },
          ]
        }
      ],
      single: {
        Glutes: [
          { name: "Hip Thrust (barbell)", sets: "4×12–15", desc: "Top glute builder" },
          { name: "Cable Kickback", sets: "3×15 each", desc: "Isolation, slow controlled" },
          { name: "Dumbbell Sumo Squat", sets: "3×12–15", desc: "Inner + outer glute" },
          { name: "Donkey Kick", sets: "3×15 each", desc: "Bodyweight glute activation" },
          { name: "Frog Pump", sets: "3×20", desc: "Low back safe, glute max" },
          { name: "Side-Lying Abduction", sets: "3×20 each", desc: "Glute med isolation" },
          { name: "Step-Ups (dumbbell)", sets: "3×12 each", desc: "Functional glute strength" },
          { name: "Single-Leg Hip Thrust", sets: "3×12 each", desc: "Unilateral glute focus" },
        ],
        Legs: [
          { name: "Goblet Squat", sets: "4×12", desc: "Core + quad friendly" },
          { name: "Romanian Deadlift (DB)", sets: "3×12", desc: "Hamstring lengthening" },
          { name: "Reverse Lunge", sets: "3×12 each", desc: "Balance + glute focus" },
          { name: "Sumo Squat", sets: "3×12", desc: "Inner thigh + glutes" },
          { name: "Leg Press (moderate load)", sets: "3×15", desc: "Quad development" },
          { name: "Lying Leg Curl", sets: "3×12–15", desc: "Hamstring isolation" },
          { name: "Lateral Lunge", sets: "3×10 each", desc: "Hip mobility + inner thigh" },
          { name: "Seated Calf Raise", sets: "4×15–20", desc: "Soleus toning" },
        ],
        Chest: [
          { name: "Dumbbell Chest Press (flat)", sets: "3×12", desc: "Chest toning" },
          { name: "Incline Push-Up", sets: "3×15", desc: "Upper chest, less loading" },
          { name: "Push-Up (standard)", sets: "3×12–15", desc: "Functional strength" },
          { name: "Dumbbell Fly (flat)", sets: "3×12", desc: "Chest stretch and tone" },
          { name: "Cable Fly (mid)", sets: "3×12–15", desc: "Constant tension" },
          { name: "Incline Dumbbell Press", sets: "3×12", desc: "Upper chest lift" },
          { name: "Wall Push-Up", sets: "3×15", desc: "Beginner friendly variation" },
          { name: "Chest Dip (assisted)", sets: "3×10", desc: "Bodyweight with support" },
        ],
        Back: [
          { name: "Resistance Band Row", sets: "3×15", desc: "Posture and upper back" },
          { name: "Dumbbell Row", sets: "3×12 each", desc: "Lat + rhomboid tone" },
          { name: "Lat Pulldown (machine)", sets: "3×12", desc: "Lat width" },
          { name: "Seated Cable Row", sets: "3×12–15", desc: "Mid-back tone" },
          { name: "Reverse Fly (bent over)", sets: "3×15", desc: "Rear delt + upper back" },
          { name: "Superman Hold", sets: "3×12", desc: "Lower back endurance" },
          { name: "Assisted Pull-Up", sets: "3×8–10", desc: "Full body pull strength" },
          { name: "Band Pull-Apart", sets: "3×15", desc: "Shoulder health + posture" },
        ],
        Shoulders: [
          { name: "Seated Dumbbell Press", sets: "3×12", desc: "Shoulder toning" },
          { name: "Lateral Raise (light)", sets: "4×15", desc: "Side delt definition" },
          { name: "Front Raise (plate/DB)", sets: "3×12", desc: "Anterior delt" },
          { name: "Reverse Fly", sets: "3×15", desc: "Rear delt posture" },
          { name: "Band External Rotation", sets: "3×15 each", desc: "Rotator cuff health" },
          { name: "Arnold Press (light)", sets: "3×12", desc: "All-round shoulder tone" },
          { name: "Upright Row (band/cable)", sets: "3×12", desc: "Side delt + trap" },
          { name: "Face Pull (cable)", sets: "3×15", desc: "Rear delt + external rotation" },
        ],
        Core: [
          { name: "Crunch", sets: "3×20", desc: "Upper abs activation" },
          { name: "Reverse Crunch", sets: "3×15", desc: "Lower abs focus" },
          { name: "Plank", sets: "3×30–45s", desc: "Full core stability" },
          { name: "Dead Bug", sets: "3×10 each", desc: "Safe, anti-extension" },
          { name: "Russian Twist", sets: "3×20", desc: "Oblique rotation" },
          { name: "Bicycle Crunch", sets: "3×20", desc: "Rotation + obliques" },
          { name: "Leg Raise (lying)", sets: "3×15", desc: "Lower abs" },
          { name: "Side Plank", sets: "3×30s each", desc: "Oblique stability" },
        ]
      }
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  WEIGHT LOSS
  // ═══════════════════════════════════════════════════════════════════════════
  "Weight Loss": {
    Male: {
      ppl: [
        {
          day: "Push – Chest / Shoulders / Triceps",
          exercises: [
            { name: "Push-Ups (standard)", sets: "4×15–20", target: "Chest", gif: "chest", desc: "Full range, chest to near floor" },
            { name: "Incline Push-Up", sets: "3×15", target: "Chest", gif: "chest", desc: "Hands elevated, upper chest focus" },
            { name: "Dumbbell Chest Press", sets: "3×12–15", target: "Chest", gif: "chest", desc: "Moderate weight, higher reps for calorie burn" },
            { name: "Pike Push-Up", sets: "3×12–15", target: "Shoulders", gif: "shoulder", desc: "Inverted V position, targets delts" },
            { name: "Dumbbell Lateral Raise", sets: "4×15", target: "Shoulders", gif: "shoulder", desc: "Light weight, fast controlled reps" },
            { name: "Band Shoulder Press", sets: "3×15", target: "Shoulders", gif: "shoulder", desc: "Band resistance, full press overhead" },
            { name: "Tricep Dips (bodyweight)", sets: "3×12–15", target: "Triceps", gif: "tricep", desc: "Bench dips or parallel bars" },
            { name: "Diamond Push-Up", sets: "3×12", target: "Triceps", gif: "tricep", desc: "Hands close together, elbows in" },
          ]
        },
        {
          day: "Pull – Back / Biceps",
          exercises: [
            { name: "Pull-Ups (assisted if needed)", sets: "4×8–10", target: "Back", gif: "back", desc: "Control the descent, full ROM" },
            { name: "Resistance Band Row", sets: "4×15", target: "Back", gif: "back", desc: "Band around post, row to chest" },
            { name: "Dumbbell Row", sets: "3×12 each", target: "Back", gif: "back", desc: "Full stretch, full contraction" },
            { name: "Inverted Row (TRX/bar)", sets: "3×12", target: "Back", gif: "back", desc: "Body under bar, row chest to it" },
            { name: "Band Pull-Apart", sets: "3×20", target: "Rear Delt", gif: "shoulder", desc: "Arms straight, pull band apart" },
            { name: "Reverse Fly (bent over)", sets: "3×12–15", target: "Rear Delt", gif: "shoulder", desc: "Moderate weight, rear delts" },
            { name: "Dumbbell Bicep Curl", sets: "3×12–15", target: "Biceps", gif: "bicep", desc: "Supinate wrist at top" },
            { name: "Chin-Ups", sets: "3×8–10", target: "Biceps", gif: "bicep", desc: "Underhand grip, bicep emphasis" },
          ]
        },
        {
          day: "Legs + HIIT Circuit",
          exercises: [
            { name: "Jump Squats", sets: "4×15", target: "Quads/Glutes", gif: "legs", desc: "Explosive, land softly — burns max calories" },
            { name: "Reverse Lunges (alternating)", sets: "4×12 each", target: "Quads/Glutes", gif: "legs", desc: "Step back, upright torso" },
            { name: "Glute Bridge (single leg)", sets: "3×12 each", target: "Glutes", gif: "glute", desc: "Drive through heel, squeeze at top" },
            { name: "Sumo Squat (bodyweight)", sets: "3×15–20", target: "Inner thigh/Glutes", gif: "legs", desc: "Wide stance, slow down, explosive up" },
            { name: "Mountain Climbers", sets: "4×30s", target: "Core/Cardio", gif: "core", desc: "Fast pace, flat back" },
            { name: "Burpee", sets: "3×10", target: "Full Body/Cardio", gif: "cardio", desc: "Full extension at top, chest to floor" },
            { name: "Box Jump", sets: "3×10", target: "Explosive Power", gif: "legs", desc: "Land softly, step down, not jump down" },
            { name: "High Knees", sets: "4×30s", target: "Cardio/Core", gif: "cardio", desc: "Arms pump, stay on balls of feet" },
          ]
        }
      ],
      single: {
        Chest: [
          { name: "Push-Ups (standard)", sets: "4×15–20", desc: "Chest + core + calorie burn" },
          { name: "Wide Push-Up", sets: "3×15", desc: "More chest activation" },
          { name: "Decline Push-Up", sets: "3×12", desc: "Upper chest focus, feet elevated" },
          { name: "Incline Push-Up", sets: "3×15", desc: "Lower chest + beginner friendly" },
          { name: "Dumbbell Press (flat)", sets: "3×12–15", desc: "Moderate load, high rep" },
          { name: "Dumbbell Fly (flat)", sets: "3×12", desc: "Chest stretch and activation" },
          { name: "Diamond Push-Up", sets: "3×12", desc: "Tricep + inner chest" },
          { name: "Dips (bodyweight)", sets: "3×10–12", desc: "Lower chest + triceps" },
        ],
        Back: [
          { name: "Pull-Ups (bodyweight)", sets: "4×8–10", desc: "Best back bodyweight move" },
          { name: "Resistance Band Row", sets: "4×15", desc: "Home-friendly back work" },
          { name: "Dumbbell Row (single arm)", sets: "3×12 each", desc: "Mid-back and lat tone" },
          { name: "Inverted Row", sets: "3×12", desc: "Bodyweight horizontal pull" },
          { name: "Band Pull-Apart", sets: "3×20", desc: "Rear delt + posture" },
          { name: "Superman (floor)", sets: "3×15", desc: "Lower back + erectors" },
          { name: "Good Mornings (bodyweight)", sets: "3×15", desc: "Erectors + hamstrings" },
          { name: "Lat Pulldown (machine)", sets: "3×12", desc: "Lat isolation" },
        ],
        Shoulders: [
          { name: "Pike Push-Up", sets: "4×12–15", desc: "Bodyweight shoulder press" },
          { name: "Lateral Raise (DB)", sets: "4×15", desc: "Side delt tone" },
          { name: "Band Shoulder Press", sets: "3×15", desc: "Low load, high reps" },
          { name: "Front Raise (light DB)", sets: "3×15", desc: "Anterior delt" },
          { name: "Reverse Fly (bent over)", sets: "3×15", desc: "Rear delt health" },
          { name: "Plate Circle / Band Circle", sets: "3×12 each direction", desc: "Rotator cuff + stability" },
          { name: "Band External Rotation", sets: "3×15 each", desc: "Shoulder injury prevention" },
          { name: "Wall Handstand Hold", sets: "3×20–30s", desc: "Pressing strength + balance" },
        ],
        Legs: [
          { name: "Jump Squat", sets: "4×15", desc: "Max calorie burn" },
          { name: "Walking Lunge", sets: "3×12 each", desc: "Glute + quad + balance" },
          { name: "Sumo Squat (BW)", sets: "3×20", desc: "Inner thigh + glutes" },
          { name: "Glute Bridge", sets: "3×15", desc: "Hamstrings + glutes" },
          { name: "Step-Ups (bodyweight)", sets: "3×12 each", desc: "Unilateral leg work" },
          { name: "Wall Sit", sets: "3×45s", desc: "Isometric quad endurance" },
          { name: "Calf Raise", sets: "4×20", desc: "Gastroc definition" },
          { name: "Squat + Kick Back", sets: "3×12", desc: "Glute activation combo" },
        ],
        Arms: [
          { name: "Push-Up (narrow grip)", sets: "3×15", desc: "Tricep tone" },
          { name: "Tricep Dips (bench)", sets: "3×12", desc: "Tricep endurance" },
          { name: "Dumbbell Curl", sets: "3×15", desc: "Bicep tone, light load" },
          { name: "Hammer Curl", sets: "3×15", desc: "Forearm + brachialis" },
          { name: "Band Bicep Curl", sets: "3×20", desc: "Constant tension" },
          { name: "Overhead Extension (DB)", sets: "3×15", desc: "Tricep stretch" },
          { name: "Isometric Bicep Hold", sets: "3×20s each angle", desc: "TUT for toning" },
          { name: "Band Tricep Kickback", sets: "3×20", desc: "Isolation, high rep burn" },
        ],
        Core: [
          { name: "Mountain Climbers", sets: "4×30s", desc: "Cardio + core" },
          { name: "Plank", sets: "3×45s", desc: "Anti-extension stability" },
          { name: "Crunch", sets: "4×20", desc: "Upper abs" },
          { name: "Reverse Crunch", sets: "3×15", desc: "Lower abs" },
          { name: "Bicycle Crunch", sets: "3×20", desc: "Obliques + rotation" },
          { name: "Russian Twist", sets: "3×20", desc: "Oblique activation" },
          { name: "Flutter Kicks", sets: "3×30s", desc: "Lower abs endurance" },
          { name: "Hollow Body Hold", sets: "3×20–30s", desc: "Full-core isometric" },
        ]
      }
    },
    // ─── WEIGHT LOSS FEMALE ─────────────────────────────────────────────────
    Female: {
      ppl: [
        {
          day: "Tone & Tighten – Upper Body",
          exercises: [
            { name: "Knee Push-Up", sets: "3×12–15", target: "Chest", gif: "chest", desc: "Modified, perfect form over ego" },
            { name: "Dumbbell Chest Press (light)", sets: "3×12–15", target: "Chest", gif: "chest", desc: "Moderate weight, full ROM" },
            { name: "Dumbbell Lateral Raise", sets: "3×15", target: "Shoulders", gif: "shoulder", desc: "Shoulder toning, light and controlled" },
            { name: "Seated Dumbbell Press (light)", sets: "3×12", target: "Shoulders", gif: "shoulder", desc: "Seated for safety, shoulder tone" },
            { name: "Band Tricep Pushdown", sets: "3×15–20", target: "Triceps", gif: "tricep", desc: "Arms toning with resistance band" },
            { name: "Overhead Tricep Ext. (light DB)", sets: "3×12–15", target: "Triceps", gif: "tricep", desc: "Seated, both hands, controlled" },
            { name: "Dumbbell Bicep Curl", sets: "3×12–15", target: "Biceps", gif: "bicep", desc: "Tone and shape the arms" },
            { name: "Resistance Band Row", sets: "3×15", target: "Back", gif: "back", desc: "Posture improvement + toning" },
          ]
        },
        {
          day: "Pull & Posture",
          exercises: [
            { name: "Resistance Band Lat Pulldown", sets: "3×15", target: "Back", gif: "back", desc: "Lat activation, good for posture" },
            { name: "Dumbbell Row (light)", sets: "3×12 each", target: "Back", gif: "back", desc: "Single arm, feel the muscle work" },
            { name: "Band Pull-Apart", sets: "3×20", target: "Rear Delt", gif: "shoulder", desc: "Open chest, improve posture" },
            { name: "Reverse Fly (very light)", sets: "3×15", target: "Rear Delt", gif: "shoulder", desc: "Rear shoulder + upper back tone" },
            { name: "Assisted Pull-Up (band)", sets: "3×8", target: "Back", gif: "back", desc: "Back strength builder" },
            { name: "Superman Hold", sets: "3×12", target: "Lower Back", gif: "back", desc: "Erector strength, low back health" },
            { name: "Hammer Curl", sets: "3×12", target: "Biceps", gif: "bicep", desc: "Arm tone, neutral grip" },
            { name: "Face Pull (band)", sets: "3×15", target: "Rear Delt", gif: "shoulder", desc: "Posture + shoulder health" },
          ]
        },
        {
          day: "Booty & Legs Burn",
          exercises: [
            { name: "Squat (bodyweight)", sets: "4×15–20", target: "Quads/Glutes", gif: "legs", desc: "Knees over toes, sit back" },
            { name: "Hip Thrust (bodyweight/light)", sets: "4×15", target: "Glutes", gif: "glute", desc: "Squeeze at top every rep" },
            { name: "Donkey Kick", sets: "3×15 each", target: "Glutes", gif: "glute", desc: "Slow and controlled, feel the glute" },
            { name: "Lateral Band Walk", sets: "3×15 each direction", target: "Glute Med", gif: "glute", desc: "Band above knees, stay low" },
            { name: "Reverse Lunge", sets: "3×12 each", target: "Glutes/Quads", gif: "legs", desc: "Step back, controlled descent" },
            { name: "Sumo Squat (BW)", sets: "3×15", target: "Inner Thigh/Glutes", gif: "legs", desc: "Wide stance, push knees out" },
            { name: "Calf Raise", sets: "3×20", target: "Calves", gif: "legs", desc: "Slow full ROM" },
            { name: "Glute Bridge (single leg)", sets: "3×12 each", target: "Glutes", gif: "glute", desc: "Core stable, drive heel" },
          ]
        }
      ],
      single: {
        Glutes: [
          { name: "Hip Thrust (bodyweight)", sets: "4×15", desc: "Foundation glute exercise" },
          { name: "Donkey Kick", sets: "3×15 each", desc: "Glute isolation, controlled" },
          { name: "Fire Hydrant", sets: "3×15 each", desc: "Glute med activation" },
          { name: "Lateral Band Walk", sets: "3×15 each", desc: "Hip abductor activation" },
          { name: "Glute Bridge", sets: "3×15", desc: "Lower glute + hamstring" },
          { name: "Frog Pump", sets: "3×20", desc: "Safe, high-rep glute burn" },
          { name: "Side-Lying Clam", sets: "3×20 each", desc: "Glute med + hip stability" },
          { name: "Standing Kickback (band)", sets: "3×15 each", desc: "Standing glute isolation" },
        ],
        Legs: [
          { name: "Bodyweight Squat", sets: "4×15–20", desc: "Foundation lower body" },
          { name: "Reverse Lunge", sets: "3×12 each", desc: "Quad + glute balance" },
          { name: "Sumo Squat (BW)", sets: "3×15", desc: "Inner thigh + glutes" },
          { name: "Wall Sit", sets: "3×30–45s", desc: "Isometric quad endurance" },
          { name: "Step-Up (bodyweight)", sets: "3×12 each", desc: "Functional, safe, toning" },
          { name: "Standing Leg Curl (band)", sets: "3×15 each", desc: "Hamstring isolation" },
          { name: "Lateral Lunge", sets: "3×10 each", desc: "Inner thigh + balance" },
          { name: "Calf Raise", sets: "3×20", desc: "Ankle definition" },
        ],
        Arms: [
          { name: "Dumbbell Bicep Curl (light)", sets: "3×15", desc: "Arm toning" },
          { name: "Hammer Curl", sets: "3×15", desc: "Forearm tone" },
          { name: "Band Tricep Pushdown", sets: "3×20", desc: "Under-arm tone" },
          { name: "Overhead Extension (light DB)", sets: "3×15", desc: "Tricep tone" },
          { name: "Concentration Curl", sets: "3×15", desc: "Bicep peak" },
          { name: "Tricep Kickback", sets: "3×15", desc: "Back of arm isolation" },
          { name: "Isometric Curl Hold", sets: "3×20s", desc: "Time under tension" },
          { name: "Push-Up (knee)", sets: "3×12–15", desc: "Full arm + chest" },
        ],
        Core: [
          { name: "Crunch", sets: "3×20", desc: "Upper abs" },
          { name: "Reverse Crunch", sets: "3×15", desc: "Lower abs, no neck strain" },
          { name: "Plank (standard)", sets: "3×30s", desc: "Core stability" },
          { name: "Dead Bug", sets: "3×10 each", desc: "Safe deep core" },
          { name: "Bicycle Crunch", sets: "3×20", desc: "Waist + obliques" },
          { name: "Side Plank", sets: "3×20s each", desc: "Oblique tone" },
          { name: "Lying Leg Raise", sets: "3×12", desc: "Lower belly focus" },
          { name: "Flutter Kicks", sets: "3×20s", desc: "Lower ab endurance" },
        ],
        Back: [
          { name: "Band Row", sets: "3×15", desc: "Upper back posture" },
          { name: "Dumbbell Row (light)", sets: "3×12 each", desc: "Lat tone" },
          { name: "Superman", sets: "3×15", desc: "Lower back health" },
          { name: "Reverse Fly (light)", sets: "3×15", desc: "Rear delt, posture" },
          { name: "Band Pull-Apart", sets: "3×20", desc: "Shoulder health" },
          { name: "Good Morning (BW)", sets: "3×15", desc: "Erectors + hamstring" },
          { name: "Lat Pulldown (machine)", sets: "3×12–15", desc: "Lat definition" },
          { name: "Seated Row (machine)", sets: "3×12–15", desc: "Upper back stability" },
        ],
        Shoulders: [
          { name: "Lateral Raise (very light)", sets: "4×15", desc: "Shoulder toning" },
          { name: "Front Raise (light)", sets: "3×15", desc: "Anterior delt" },
          { name: "Reverse Fly", sets: "3×15", desc: "Rear delt + posture" },
          { name: "Band Shoulder Press", sets: "3×12", desc: "Safe pressing movement" },
          { name: "External Rotation (band)", sets: "3×15 each", desc: "Rotator cuff" },
          { name: "Upright Row (band)", sets: "3×15", desc: "Side delt + trap" },
          { name: "Dumbbell Shrug", sets: "3×15", desc: "Trap tone" },
          { name: "Face Pull (band)", sets: "3×15", desc: "Rear delt + posture" },
        ],
      }
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  MAINTENANCE
  // ═══════════════════════════════════════════════════════════════════════════
  "Maintenance": {
    Male: {
      ppl: [
        {
          day: "Push – Chest / Shoulders / Triceps",
          exercises: [
            { name: "Dumbbell Bench Press", sets: "3×10–12", target: "Chest", gif: "chest", desc: "Controlled, moderate weight" },
            { name: "Incline Push-Up", sets: "3×12–15", target: "Chest", gif: "chest", desc: "Upper chest activation" },
            { name: "Cable Fly", sets: "3×12", target: "Chest", gif: "chest", desc: "Mind-muscle, squeeze at peak" },
            { name: "Dumbbell Shoulder Press", sets: "3×10–12", target: "Shoulders", gif: "shoulder", desc: "Seated, controlled press" },
            { name: "Lateral Raise", sets: "3×12–15", target: "Shoulders", gif: "shoulder", desc: "Side deltoid definition" },
            { name: "Face Pull", sets: "3×15", target: "Rear Delt", gif: "shoulder", desc: "Rear delt + external rotation" },
            { name: "Tricep Pushdown", sets: "3×12–15", target: "Triceps", gif: "tricep", desc: "Cable or band, elbow fixed" },
            { name: "Overhead Tricep Extension", sets: "3×12", target: "Triceps", gif: "tricep", desc: "Dumbbell, seated" },
          ]
        },
        {
          day: "Pull – Back / Biceps",
          exercises: [
            { name: "Pull-Ups (bodyweight)", sets: "3×8–10", target: "Back", gif: "back", desc: "Maintenance of back strength" },
            { name: "Dumbbell Row", sets: "3×10–12 each", target: "Back", gif: "back", desc: "Controlled, feel the lat" },
            { name: "Seated Cable Row", sets: "3×12", target: "Back", gif: "back", desc: "Scapulae squeeze" },
            { name: "Lat Pulldown", sets: "3×10–12", target: "Back", gif: "back", desc: "Wide grip, pull to upper chest" },
            { name: "Reverse Fly", sets: "3×12–15", target: "Rear Delt", gif: "shoulder", desc: "Rear delt posture health" },
            { name: "Band Pull-Apart", sets: "3×20", target: "Rear Delt", gif: "shoulder", desc: "Shoulder mobility" },
            { name: "Dumbbell Curl", sets: "3×12", target: "Biceps", gif: "bicep", desc: "Full supination, slow down" },
            { name: "Hammer Curl", sets: "3×12", target: "Biceps", gif: "bicep", desc: "Brachialis strength" },
          ]
        },
        {
          day: "Legs",
          exercises: [
            { name: "Goblet Squat", sets: "3×12", target: "Quads/Glutes", gif: "legs", desc: "Dumbbell at chest, upright torso" },
            { name: "Romanian Deadlift (DB)", sets: "3×12", target: "Hamstrings", gif: "legs", desc: "Hip hinge, feel the stretch" },
            { name: "Dumbbell Lunge (walking)", sets: "3×10 each", target: "Quads/Glutes", gif: "legs", desc: "Stay upright, control step" },
            { name: "Hip Thrust (DB/BW)", sets: "3×12–15", target: "Glutes", gif: "glute", desc: "Full hip extension at top" },
            { name: "Leg Press (moderate)", sets: "3×12", target: "Quads", gif: "legs", desc: "Full ROM, moderate load" },
            { name: "Leg Curl (machine)", sets: "3×12", target: "Hamstrings", gif: "legs", desc: "Isolation, controlled" },
            { name: "Calf Raise (standing)", sets: "3×15", target: "Calves", gif: "legs", desc: "Full extension, slow down" },
            { name: "Side Lunge", sets: "3×10 each", target: "Inner Thigh/Quads", gif: "legs", desc: "Lateral movement, hip mobility" },
          ]
        }
      ],
      single: {
        Chest: [
          { name: "Dumbbell Bench Press", sets: "3×10–12", desc: "Maintenance pressing strength" },
          { name: "Push-Up (standard)", sets: "3×15", desc: "Bodyweight baseline" },
          { name: "Cable Fly", sets: "3×12", desc: "Isolation, constant tension" },
          { name: "Incline DB Press", sets: "3×12", desc: "Upper chest maintenance" },
          { name: "Decline Push-Up", sets: "3×12", desc: "Lower chest focus" },
          { name: "Dumbbell Fly (flat)", sets: "3×12", desc: "Stretch + squeeze" },
          { name: "Chest Dip (bodyweight)", sets: "3×10", desc: "Compound tricep + chest" },
          { name: "Machine Chest Press", sets: "3×12", desc: "Safe, guided ROM" },
        ],
        Back: [
          { name: "Pull-Up", sets: "3×8–10", desc: "Best back maintenance" },
          { name: "Dumbbell Row", sets: "3×12 each", desc: "Mid-back" },
          { name: "Seated Cable Row", sets: "3×12", desc: "Rhomboids + lats" },
          { name: "Lat Pulldown", sets: "3×12", desc: "Lat maintenance" },
          { name: "Reverse Fly", sets: "3×15", desc: "Rear delt + posture" },
          { name: "Face Pull", sets: "3×15", desc: "Shoulder health" },
          { name: "Superman", sets: "3×12", desc: "Lower back activation" },
          { name: "Good Morning (BW)", sets: "3×15", desc: "Erector + hip hinge" },
        ],
        Shoulders: [
          { name: "Dumbbell Shoulder Press", sets: "3×12", desc: "Deltoid maintenance" },
          { name: "Lateral Raise", sets: "3×12–15", desc: "Side delt" },
          { name: "Front Raise", sets: "3×12", desc: "Anterior delt" },
          { name: "Reverse Fly", sets: "3×15", desc: "Rear delt" },
          { name: "Arnold Press (DB)", sets: "3×10", desc: "3-head activation" },
          { name: "Face Pull (cable)", sets: "3×15", desc: "Health + posture" },
          { name: "Band External Rotation", sets: "3×15 each", desc: "Rotator cuff" },
          { name: "Upright Row (DB)", sets: "3×12", desc: "Side delt + trap" },
        ],
        Arms: [
          { name: "Dumbbell Curl", sets: "3×12", desc: "Bicep maintenance" },
          { name: "Hammer Curl", sets: "3×12", desc: "Brachialis" },
          { name: "Concentration Curl", sets: "3×12", desc: "Peak contraction" },
          { name: "Tricep Pushdown", sets: "3×12–15", desc: "Tricep endurance" },
          { name: "Overhead Extension", sets: "3×12", desc: "Long head stretch" },
          { name: "Tricep Dip", sets: "3×10", desc: "Bodyweight tricep" },
          { name: "Close-Grip Push-Up", sets: "3×12", desc: "Tricep + inner chest" },
          { name: "Preacher Curl (DB)", sets: "3×10", desc: "Short head isolation" },
        ],
        Legs: [
          { name: "Goblet Squat", sets: "3×12", desc: "Full body + legs" },
          { name: "Romanian Deadlift", sets: "3×12", desc: "Hamstring health" },
          { name: "Walking Lunge", sets: "3×10 each", desc: "Dynamic lower body" },
          { name: "Hip Thrust", sets: "3×12", desc: "Glute activation" },
          { name: "Calf Raise", sets: "3×15–20", desc: "Calf maintenance" },
          { name: "Step-Up (dumbbell)", sets: "3×10 each", desc: "Unilateral strength" },
          { name: "Side Lunge", sets: "3×10 each", desc: "Hip mobility" },
          { name: "Leg Press (moderate)", sets: "3×12", desc: "Quad + hamstring" },
        ],
        Core: [
          { name: "Plank", sets: "3×45s", desc: "Core stability baseline" },
          { name: "Crunch", sets: "3×15–20", desc: "Upper abs" },
          { name: "Leg Raise", sets: "3×12", desc: "Lower abs" },
          { name: "Russian Twist", sets: "3×20", desc: "Obliques" },
          { name: "Bicycle Crunch", sets: "3×15", desc: "Full abs" },
          { name: "Side Plank", sets: "3×30s each", desc: "Lateral stability" },
          { name: "Dead Bug", sets: "3×10 each", desc: "Anti-rotation core" },
          { name: "Ab Rollout (wheel/ball)", sets: "3×8–10", desc: "Full core extension" },
        ]
      }
    },
    // ─── MAINTENANCE FEMALE ─────────────────────────────────────────────────
    Female: {
      ppl: [
        {
          day: "Upper Body Tone",
          exercises: [
            { name: "Push-Up (standard/knee)", sets: "3×12–15", target: "Chest", gif: "chest", desc: "Choose variation that challenges you" },
            { name: "Dumbbell Press (light-moderate)", sets: "3×12", target: "Chest", gif: "chest", desc: "Controlled, focus on form" },
            { name: "Lateral Raise (light)", sets: "3×15", target: "Shoulders", gif: "shoulder", desc: "Tone side delts" },
            { name: "Seated Shoulder Press (DB)", sets: "3×12", target: "Shoulders", gif: "shoulder", desc: "Seated, stable, controlled" },
            { name: "Band Tricep Pushdown", sets: "3×15–20", target: "Triceps", gif: "tricep", desc: "Under-arm tone" },
            { name: "Dumbbell Curl", sets: "3×15", target: "Biceps", gif: "bicep", desc: "Arm maintenance" },
            { name: "Reverse Fly (light)", sets: "3×15", target: "Rear Delt", gif: "shoulder", desc: "Posture + rear delt" },
            { name: "Tricep Dip (bench, assisted)", sets: "3×10–12", target: "Triceps", gif: "tricep", desc: "Heels on floor for support" },
          ]
        },
        {
          day: "Back & Core",
          exercises: [
            { name: "Band Row", sets: "3×15", target: "Back", gif: "back", desc: "Posture and back strength" },
            { name: "Dumbbell Row", sets: "3×12 each", target: "Back", gif: "back", desc: "Lat activation" },
            { name: "Lat Pulldown (machine)", sets: "3×12", target: "Back", gif: "back", desc: "Lat maintenance" },
            { name: "Band Pull-Apart", sets: "3×20", target: "Rear Delt", gif: "shoulder", desc: "Open chest, better posture" },
            { name: "Superman", sets: "3×12", target: "Lower Back", gif: "back", desc: "Back health" },
            { name: "Plank", sets: "3×30–45s", target: "Core", gif: "core", desc: "Core stability" },
            { name: "Dead Bug", sets: "3×10 each", target: "Core", gif: "core", desc: "Safe core exercise" },
            { name: "Crunch", sets: "3×20", target: "Core", gif: "core", desc: "Upper abs tone" },
          ]
        },
        {
          day: "Lower Body Tone",
          exercises: [
            { name: "Goblet Squat (light-moderate)", sets: "3×12–15", target: "Quads/Glutes", gif: "legs", desc: "Good all-rounder" },
            { name: "Hip Thrust (light)", sets: "3×15", target: "Glutes", gif: "glute", desc: "Glute tone maintenance" },
            { name: "Reverse Lunge", sets: "3×10 each", target: "Quads/Glutes", gif: "legs", desc: "Balance + strength" },
            { name: "Lateral Band Walk", sets: "3×15 each", target: "Glute Med", gif: "glute", desc: "Side glute activation" },
            { name: "Romanian Deadlift (light)", sets: "3×12", target: "Hamstrings", gif: "legs", desc: "Hamstring health" },
            { name: "Donkey Kick", sets: "3×12 each", target: "Glutes", gif: "glute", desc: "Glute isolation" },
            { name: "Calf Raise", sets: "3×15–20", target: "Calves", gif: "legs", desc: "Lower leg tone" },
            { name: "Sumo Squat", sets: "3×12", target: "Inner Thigh", gif: "legs", desc: "Inner thigh maintenance" },
          ]
        }
      ],
      single: {
        Glutes: [
          { name: "Hip Thrust (light/BW)", sets: "3×15", desc: "Glute maintenance" },
          { name: "Donkey Kick", sets: "3×12 each", desc: "Glute isolation" },
          { name: "Glute Bridge", sets: "3×15", desc: "Foundation movement" },
          { name: "Lateral Band Walk", sets: "3×15 each", desc: "Side glute tone" },
          { name: "Fire Hydrant", sets: "3×15 each", desc: "Glute med activation" },
          { name: "Standing Kickback (band)", sets: "3×15 each", desc: "Glute isolation standing" },
          { name: "Side-Lying Clam", sets: "3×15 each", desc: "Hip stability" },
          { name: "Frog Pump", sets: "3×20", desc: "High-rep glute burn" },
        ],
        Legs: [
          { name: "Goblet Squat", sets: "3×12–15", desc: "Quad + glute tone" },
          { name: "Reverse Lunge", sets: "3×10 each", desc: "Balance + legs" },
          { name: "Sumo Squat", sets: "3×12", desc: "Inner thigh" },
          { name: "Romanian Deadlift", sets: "3×12", desc: "Hamstring health" },
          { name: "Step-Up", sets: "3×12 each", desc: "Functional tone" },
          { name: "Lying Leg Curl", sets: "3×12–15", desc: "Hamstring isolation" },
          { name: "Lateral Lunge", sets: "3×10 each", desc: "Hip + inner thigh" },
          { name: "Calf Raise", sets: "3×20", desc: "Ankle definition" },
        ],
        Core: [
          { name: "Plank", sets: "3×30–45s", desc: "Stability" },
          { name: "Crunch", sets: "3×20", desc: "Upper abs" },
          { name: "Dead Bug", sets: "3×10 each", desc: "Safe core" },
          { name: "Reverse Crunch", sets: "3×15", desc: "Lower abs" },
          { name: "Bicycle Crunch", sets: "3×20", desc: "Obliques" },
          { name: "Side Plank", sets: "3×20–30s each", desc: "Lateral stability" },
          { name: "Leg Raise", sets: "3×12", desc: "Lower belly tone" },
          { name: "Flutter Kicks", sets: "3×20s", desc: "Endurance core" },
        ],
        Arms: [
          { name: "Dumbbell Curl (light)", sets: "3×15", desc: "Arm tone" },
          { name: "Hammer Curl", sets: "3×15", desc: "Forearm + brachialis" },
          { name: "Tricep Kickback (light)", sets: "3×15", desc: "Under-arm tone" },
          { name: "Band Tricep Extension", sets: "3×20", desc: "Tricep endurance" },
          { name: "Concentration Curl", sets: "3×15", desc: "Bicep peak" },
          { name: "Push-Up (knee)", sets: "3×15", desc: "Full arm activation" },
          { name: "Isometric Curl", sets: "3×20s", desc: "TUT for tone" },
          { name: "Resistance Band Row", sets: "3×15", desc: "Back + biceps" },
        ],
        Back: [
          { name: "Band Row", sets: "3×15", desc: "Posture" },
          { name: "Dumbbell Row (light)", sets: "3×12 each", desc: "Lat tone" },
          { name: "Superman", sets: "3×12", desc: "Lower back" },
          { name: "Reverse Fly", sets: "3×15", desc: "Rear delt" },
          { name: "Lat Pulldown (machine)", sets: "3×12", desc: "Lat width" },
          { name: "Seated Row (machine)", sets: "3×12", desc: "Back thickness" },
          { name: "Band Pull-Apart", sets: "3×20", desc: "Shoulder health" },
          { name: "Good Morning (BW)", sets: "3×15", desc: "Erector endurance" },
        ],
        Shoulders: [
          { name: "Lateral Raise (light)", sets: "3×15", desc: "Side delt tone" },
          { name: "Front Raise (light)", sets: "3×15", desc: "Anterior delt" },
          { name: "Reverse Fly", sets: "3×15", desc: "Rear delt" },
          { name: "Seated Press (light)", sets: "3×12", desc: "All-round shoulder" },
          { name: "Band External Rotation", sets: "3×15 each", desc: "Rotator cuff" },
          { name: "Band Shoulder Press", sets: "3×12", desc: "Safe pressing" },
          { name: "Upright Row (band)", sets: "3×15", desc: "Side delt + trap" },
          { name: "Shrug (light DB)", sets: "3×15", desc: "Trap tone" },
        ],
      }
    }
  }
};

export const muscleGroupOptions = {
  Male: ["Chest", "Back", "Shoulders", "Arms", "Legs", "Core"],
  Female: {
    "Lean Bulk": ["Glutes", "Legs", "Chest", "Back", "Shoulders", "Arms", "Core"],
    "Weight Loss": ["Glutes", "Legs", "Arms", "Core", "Back", "Shoulders"],
    "Maintenance": ["Glutes", "Legs", "Core", "Arms", "Back", "Shoulders"],
  }
};
