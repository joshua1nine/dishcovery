"use client";

import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import React, { ComponentProps, useEffect } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@/db/schema/category";
import { NewIngredient, insertIngredientSchema } from "@/db/schema/ingredient";
import SubmitBtn from "./SubmitBtn";

type CreateIngredientFormComponentProps = ComponentProps<"form">;

type CreateIngredientFormCustomProps = {
  categories: Category[];
};

export type CreateIngredientFormProps = Omit<
  CreateIngredientFormComponentProps,
  keyof CreateIngredientFormCustomProps
> &
  CreateIngredientFormCustomProps;

export default function CreateIngredientForm({
  categories,
}: CreateIngredientFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<NewIngredient>({
    resolver: zodResolver(insertIngredientSchema),
  });

  const onSubmit: SubmitHandler<NewIngredient> = async (data) => {
    const res = await fetch(`http://localhost:3000/api/ingredients/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    router.refresh();
  };

  const onError = (errors: FieldErrors<NewIngredient>) =>
    console.log("Errors", errors);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      noValidate
      className="space-y-4"
    >
      <input type="hidden" value={nanoid()} {...register("public_id")} />
      <input
        className={`w-full rounded-md ${
          errors.name?.message &&
          "outline outline-1 outline-red-600 border-red-600"
        }`}
        type="text"
        id="name"
        {...register("name")}
      />
      {errors.name && (
        <span className="text-red-600 italic font-normal">
          {errors.name.message}
        </span>
      )}
      <select
        className={`w-full rounded-md ${
          errors.categoryId?.message &&
          "outline outline-1 outline-red-600 border-red-600"
        }`}
        id="categoryId"
        {...register("categoryId")}
      >
        <option value="">Category</option>
        {categories.map((category: Category) => {
          return (
            <option key={category.public_id} value={category.public_id}>
              {category.name}
            </option>
          );
        })}
      </select>
      {errors.name && (
        <span className="text-red-600 italic font-normal">
          {errors.categoryId?.message}
        </span>
      )}
      <SubmitBtn text="Add" disabled={isSubmitting} />
    </form>
  );
}
