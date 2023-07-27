import clsx from "clsx";
import Link from "next/link";
import { ComponentProps } from "react";
import { HiOutlineChevronLeft } from "react-icons/hi";

type BackBtnComponentProps = ComponentProps<typeof Link>;

type BackBtnCustomProps = {
  href: string;
};

export type BackBtnProps = Omit<
  BackBtnComponentProps,
  keyof BackBtnCustomProps
> &
  BackBtnCustomProps;

export default function BackBtn(props: BackBtnProps) {
  const { href, className, ...componentProps } = props;

  let classes = clsx(
    className,
    "inline-flex items-center justify-center rounded text-purple-800"
  );

  return (
    <Link {...componentProps} href={href} className={classes}>
      <HiOutlineChevronLeft className="w-4 h-4" />
      Back
    </Link>
  );
  {
  }
}
