import Link from "next/link";
import { HiOutlineChevronLeft } from "react-icons/hi";

export default function BackBtn() {
  return (
    <Link
      href="/"
      className="inline-flex items-center justify-center rounded text-purple-800"
    >
      <HiOutlineChevronLeft className="w-4 h-4" />
      Back
    </Link>
  );
  {
  }
}
