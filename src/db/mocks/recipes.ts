import { NewRecipe } from "../schema/recipe";

export const mockRecipes: NewRecipe[] = [
  {
    public_id: "yCyKxA2ar3xi9cc9euXvq",
    name: "Steak Tips Tossed Salad",
    prepTime: 15,
    servings: 6,
    directions:
      "<ol><li><p>In a large bowl, toss all ingredients together excetp dressing.</p></li><li><p>Divide between individual serving plates, and drizzle with desired amount of dressing.</p></li></ol>",
    notes:
      "<p>Grilled steak tips are reserved form grilled steakhouse steak tips recipe.</p>",
  },
  {
    public_id: "QjQsGKPeiMPfcqFa_krSm",
    name: "Grilled Steakhouse Steak Tips",
    prepTime: 5,
    cookTime: 20,
    servings: 6,
    directions:
      "<ol><li><p>In a medium bowl, mix together Worcestershire sauce, Italian dressing, barbecue sauce, garlic powder and pepper. Add meat turning to coat. Cover, and refrigerate at least 1 hour.</p></li><li><p>Preheat grill to high heat. Brush Grill lightly with oil.</p></li><li><p>Place steak tips onto grill, and discard marinade. Grill tips 8-10 minutes per side or to desired degree of doneness. </p></li></ol>",
    notes:
      "<p>Reserve 1 and a half lbs grilled steak tips for steak tips tossed salad recipe.</p>",
  },
];
