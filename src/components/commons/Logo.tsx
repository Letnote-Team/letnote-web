import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="text-3xl font-bold ">
        <span className="text-primary-700">let</span>note
      </div>
    </Link>
  );
};
