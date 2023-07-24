import Link from "next/link";
import { ComponentProps } from "react";
import { HiOutlineChevronLeft } from "react-icons/hi";

type BackBtnComponentProps = ComponentProps<"button">;

type BackBtnCustomProps = {
  href: string;
};

export type BackBtnProps = Omit<
  BackBtnComponentProps,
  keyof BackBtnCustomProps
> &
  BackBtnCustomProps;
export default function BackBtn({ href }: BackBtnProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded text-purple-800"
    >
      <HiOutlineChevronLeft className="w-4 h-4" />
      Back
    </Link>
  );
  {
  }
}
