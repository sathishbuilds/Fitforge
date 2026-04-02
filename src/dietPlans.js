export const dietPlans = {
  "Weight Loss": {
    Male: {
      totalCal: 1800,
      breakfast: {
        name: "High-Protein Veggie Scramble",
        items: ["4 egg whites + 1 whole egg", "100g spinach sautéed", "1 tomato", "2 slices whole wheat toast", "Black coffee"],
        cal: 380, protein: 34, carbs: 32, fat: 8,
        desc: "Low-calorie, high-satiety morning fuel"
      },
      lunch: {
        name: "Grilled Chicken Rice Bowl",
        items: ["200g chicken breast (grilled)", "150g brown rice", "Mixed salad (cucumber, carrot, capsicum)", "1 tbsp olive oil + lemon dressing"],
        cal: 520, protein: 48, carbs: 42, fat: 10,
        desc: "Lean protein + complex carbs for sustained energy"
      },
      dinner: {
        name: "Baked Salmon & Veggies",
        items: ["180g salmon fillet (baked)", "100g sweet potato", "Broccoli + green beans (steamed)", "Lemon-herb seasoning"],
        cal: 430, protein: 36, carbs: 24, fat: 14,
        desc: "Omega-3 rich, high protein evening meal"
      },
      snacks: [
        { name: "Pre-Workout", items: ["1 banana", "Black coffee"], cal: 90, protein: 1, carbs: 23, fat: 0 },
        { name: "Post-Workout", items: ["1 scoop whey in water", "5 almonds"], cal: 160, protein: 25, carbs: 5, fat: 4 },
        { name: "Evening", items: ["200g fat-free greek yogurt", "Pinch of cinnamon"], cal: 120, protein: 20, carbs: 8, fat: 1 },
      ]
    },
    Female: {
      totalCal: 1400,
      breakfast: {
        name: "Protein Smoothie Bowl",
        items: ["1 scoop whey protein", "150ml unsweetened almond milk", "½ banana", "50g mixed berries", "1 tbsp chia seeds"],
        cal: 290, protein: 28, carbs: 24, fat: 7,
        desc: "Antioxidant-rich, hormone-supporting morning meal"
      },
      lunch: {
        name: "Tuna & Quinoa Salad",
        items: ["120g canned tuna (water)", "80g cooked quinoa", "Cucumber + tomato + capsicum", "Lemon + olive oil dressing", "Fresh mint"],
        cal: 350, protein: 36, carbs: 28, fat: 7,
        desc: "High protein, anti-inflammatory, filling"
      },
      dinner: {
        name: "Tofu Stir-Fry",
        items: ["180g firm tofu", "Mixed vegetables (broccoli, capsicum, beans)", "80g brown rice (cooked)", "1 tsp sesame oil + soy sauce"],
        cal: 360, protein: 22, carbs: 38, fat: 8,
        desc: "Plant protein, fibre-rich, light on calories"
      },
      snacks: [
        { name: "Morning", items: ["1 apple", "10 almonds"], cal: 110, protein: 3, carbs: 16, fat: 6 },
        { name: "Afternoon", items: ["150g low-fat greek yogurt", "Cucumber sticks"], cal: 120, protein: 15, carbs: 8, fat: 2 },
        { name: "Evening (optional)", items: ["Herbal tea", "2 rice cakes"], cal: 60, protein: 1, carbs: 14, fat: 0 },
      ]
    }
  },
  "Lean Bulk": {
    Male: {
      totalCal: 2800,
      breakfast: {
        name: "Muscle-Building Power Breakfast",
        items: ["4 whole eggs (scrambled)", "100g oats (cooked)", "1 banana", "1 glass whole milk (250ml)", "30g peanut butter on toast"],
        cal: 820, protein: 52, carbs: 76, fat: 28,
        desc: "Calorie-dense, nutrient-packed muscle fuel"
      },
      lunch: {
        name: "Mass Meal: Rice, Chicken & Veg",
        items: ["250g chicken breast", "200g white rice (cooked)", "Steamed broccoli + carrot", "2 tbsp olive oil", "Salt, pepper, herbs"],
        cal: 780, protein: 60, carbs: 68, fat: 18,
        desc: "High protein + high carb post-morning meal"
      },
      dinner: {
        name: "Beef & Potato Bowl",
        items: ["200g lean beef (grilled)", "200g boiled potato", "Mixed salad", "1 tbsp butter", "Garlic seasoning"],
        cal: 700, protein: 52, carbs: 46, fat: 20,
        desc: "Protein + carbs for overnight muscle synthesis"
      },
      snacks: [
        { name: "Pre-Workout", items: ["2 scoops whey in milk", "1 banana", "30g oats"], cal: 420, protein: 52, carbs: 48, fat: 6 },
        { name: "Post-Workout", items: ["2 scoops whey + 50g dextrose"], cal: 360, protein: 48, carbs: 50, fat: 2 },
        { name: "Before Bed", items: ["200g cottage cheese", "30g walnuts", "1 tbsp honey"], cal: 380, protein: 26, carbs: 20, fat: 22 },
      ]
    },
    Female: {
      totalCal: 2000,
      breakfast: {
        name: "Yogurt Power Parfait",
        items: ["200g full-fat greek yogurt", "60g granola", "1 banana", "1 tbsp honey", "10 almonds"],
        cal: 560, protein: 30, carbs: 64, fat: 16,
        desc: "Balanced muscle-building with bone health support"
      },
      lunch: {
        name: "Paneer & Brown Rice Bowl",
        items: ["150g paneer (grilled)", "150g brown rice", "Mixed veg stir-fry", "1 tsp ghee", "Spices"],
        cal: 640, protein: 40, carbs: 52, fat: 18,
        desc: "High-protein vegetarian bulking meal"
      },
      dinner: {
        name: "Salmon + Quinoa Plate",
        items: ["180g salmon", "150g quinoa (cooked)", "Roasted sweet potato + asparagus", "Lemon + dill seasoning"],
        cal: 600, protein: 44, carbs: 46, fat: 16,
        desc: "Omega-3s + complete amino acids for recovery"
      },
      snacks: [
        { name: "Morning Boost", items: ["1 scoop whey in milk", "1 banana"], cal: 280, protein: 30, carbs: 32, fat: 5 },
        { name: "Afternoon", items: ["30g almonds", "2 dates", "Herbal tea"], cal: 220, protein: 7, carbs: 22, fat: 14 },
        { name: "Night", items: ["100g paneer", "Cucumber slices"], cal: 180, protein: 18, carbs: 2, fat: 12 },
      ]
    }
  },
  "Maintenance": {
    Male: {
      totalCal: 2200,
      breakfast: {
        name: "Balanced Eggs & Toast",
        items: ["3 whole eggs (any style)", "2 slices whole wheat toast", "½ avocado", "Coffee or tea"],
        cal: 480, protein: 28, carbs: 32, fat: 22,
        desc: "Balanced macros, sustained morning energy"
      },
      lunch: {
        name: "Dal Rice & Salad (Indian)",
        items: ["150g toor dal (cooked)", "150g white rice", "Fresh cucumber-tomato salad", "100g plain yogurt (dahi)", "Pickle"],
        cal: 520, protein: 24, carbs: 72, fat: 6,
        desc: "Complete amino acids, gut-friendly, traditional"
      },
      dinner: {
        name: "Grilled Fish & Veggies",
        items: ["200g fish (grilled — rohu/tilapia)", "Mixed roasted vegetables", "1 medium potato (baked)", "1 tsp olive oil + herbs"],
        cal: 500, protein: 40, carbs: 36, fat: 10,
        desc: "Light, nutritious, sleep-friendly dinner"
      },
      snacks: [
        { name: "Afternoon", items: ["1 banana", "1 tbsp peanut butter"], cal: 180, protein: 5, carbs: 26, fat: 8 },
        { name: "Evening", items: ["150g greek yogurt", "Mixed nuts 20g"], cal: 200, protein: 16, carbs: 10, fat: 12 },
        { name: "Pre-Workout (if applicable)", items: ["Banana + black coffee"], cal: 90, protein: 1, carbs: 23, fat: 0 },
      ]
    },
    Female: {
      totalCal: 1700,
      breakfast: {
        name: "Smoothie Bowl",
        items: ["1 banana + ½ cup berries", "1 scoop whey protein", "40g oats", "200ml almond milk", "1 tsp flaxseeds (topping)"],
        cal: 380, protein: 28, carbs: 48, fat: 6,
        desc: "Antioxidant-rich, satisfying, easy to digest"
      },
      lunch: {
        name: "Veggie Paneer Wrap",
        items: ["100g paneer (grilled)", "2 whole wheat rotis", "Mixed salad (onion, tomato, capsicum)", "1 tbsp mint chutney"],
        cal: 440, protein: 26, carbs: 44, fat: 14,
        desc: "Balanced Indian-style lunch, portable"
      },
      dinner: {
        name: "Lentil Soup & Brown Rice",
        items: ["150g moong dal (cooked)", "100g brown rice", "Stir-fried spinach + garlic", "100g yogurt", "Lemon wedge"],
        cal: 420, protein: 22, carbs: 60, fat: 5,
        desc: "High fibre, gut-friendly, calming evening meal"
      },
      snacks: [
        { name: "Morning", items: ["Apple", "15 almonds"], cal: 130, protein: 4, carbs: 18, fat: 7 },
        { name: "Afternoon", items: ["Buttermilk (chaas) 200ml", "1 rice cake"], cal: 100, protein: 5, carbs: 14, fat: 2 },
        { name: "Evening", items: ["Warm milk 200ml", "2 dates"], cal: 180, protein: 7, carbs: 24, fat: 4 },
      ]
    }
  }
};
