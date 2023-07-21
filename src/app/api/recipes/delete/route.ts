// import { NextResponse } from "next/server";
// import deleteIngredient from "@/lib/deleteIngredient";
// import findIngredient from "@/lib/findIngredient";

// export async function POST(request: Request) {
//   const res = await request.json();
//   const { id } = res;
//   const { ingredient, usedInRecipes } = await findIngredient(id);

//   console.log(usedInRecipes);

//   if (ingredient == undefined) {
//     return NextResponse.json(
//       { status: 500, message: "Ingredient not found" },
//       { status: 500 }
//     );
//   } else if (usedInRecipes == true) {
//     return NextResponse.json(
//       {
//         status: 500,
//         message: `${ingredient.name} is used in recipes and cannot be deleted`,
//       },
//       { status: 500 }
//     );
//   } else {
//     await deleteIngredient(id);
//     return NextResponse.json(
//       {
//         status: 200,
//         message: `${ingredient.name} has been successfully deleted`,
//       },
//       { status: 200 }
//     );
//   }
// }
