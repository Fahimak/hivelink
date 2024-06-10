"use client";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Props {
  to?: string;
}

const BackButton = ({ to }: Props) => {
  const router = useRouter();

  // useEffect(() => {
  //   to && router.prefetch(to);
  // }, [to]);

  // const handleClick = () => {
  //   !!to ? router.push(to) : router.back();
  // };

  return (
    <Link
      href={!!to ? to : ".."}
      // onClick={handleClick}
      className="flex items-center gap-x-1 text-black pointer"
    >
      <ArrowBack />
      <p>Back</p>
    </Link>
  );
};

export default BackButton;
