import BackBtn from "@/components/BackBtn";
import CreateIngredientForm from "@/forms/CreateIngredientForm";
import getAllCategories from "@/lib/getAllCategories";
import clsx from "clsx";
import { type ComponentProps } from "react";

type CreateIngredientPageComponentProps = ComponentProps<"div">;

type CreateIngredientPageCustomProps = object;

type CreateIngredientPageProps = Omit<
  CreateIngredientPageComponentProps,
  keyof CreateIngredientPageCustomProps | "type"
> &
  CreateIngredientPageCustomProps;

export default async function CreateIngredientPage(
  props: CreateIngredientPageProps
) {
  const { children, className, ...componentProps } = props;
  const categories = await getAllCategories();

  const classes = clsx(
    className,
    "flex min-h-screen flex-col items-center justify-between p-4"
  );

  return (
    <main className={classes} {...componentProps}>
      <div className="z-10 w-full items-center justify-between lg:flex">
        <BackBtn href="/ingredients" />
        <header className="my-4">
          <h2 className="text-3xl font-bold">New Ingredient</h2>
        </header>
        <CreateIngredientForm categories={categories} />
      </div>
    </main>
  );
}
