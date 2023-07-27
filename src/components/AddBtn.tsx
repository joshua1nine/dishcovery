import clsx from "clsx";
import Link from "next/link";
import type { ComponentProps } from "react";
import { FaPlus } from "react-icons/fa6";

type AddBtnComponentProps = ComponentProps<typeof Link>;

type AddBtnCustomProps = {
  href: string;
};

export type AddBtnProps = Omit<AddBtnComponentProps, keyof AddBtnCustomProps> &
  AddBtnCustomProps;

const AddBtn = (props: AddBtnProps) => {
  const { href, className, ...componentProps } = props;

  let classes = clsx(className, "p-2 rounded text-white bg-purple-500");

  return (
    <Link href={href} {...componentProps} className={classes} type="submit">
      <FaPlus />
    </Link>
  );
};

export default AddBtn;
