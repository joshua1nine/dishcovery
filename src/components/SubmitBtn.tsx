import clsx from "clsx";
import type { ComponentProps } from "react";
import { FaSpinner } from "react-icons/fa6";

type SubmitBtnComponentProps = ComponentProps<"button">;

type SubmitBtnCustomProps = {
  text: string;
  disabled?: boolean;
};

export type SubmitBtnProps = Omit<
  SubmitBtnComponentProps,
  keyof SubmitBtnCustomProps
> &
  SubmitBtnCustomProps;

const SubmitBtn = (props: SubmitBtnProps) => {
  const { text, disabled, className, ...componentProps } = props;

  let classes = clsx(
    className,
    "p-4 flex items-center justify-center h-12 rounded my-3 w-full font-semibold",
    disabled ? "bg-gray-200 text-gray-600" : "text-white bg-purple-500"
  );

  return (
    <button {...componentProps} className={classes} type="submit">
      {disabled ? <FaSpinner className="animate-spin" /> : text}
    </button>
  );
};

export default SubmitBtn;
