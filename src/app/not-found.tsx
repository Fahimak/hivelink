import Link from "next/link";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="text-center flex flex-col items-center gap-y-2">
        <h2 className="font-bold text-2xl">404 - Page Not Found</h2>
        <p>The requested url could not be found {":("}</p>
        <Link href="/" className="primaryBtn">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Page;
