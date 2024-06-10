"use client";
import IslandLayout from "components/IslandLayout";
import React from "react";
import LineBreak from "components/LineBreak/LineBreak";
import Link from "next/link";
import { getCookie } from "cookies-next";

const Cbee = async () => {
  const token = getCookie("@jwtToken");

  return (
    <IslandLayout>
      <div className="content_mgr_header p-4">
        <h1 className="font-bold text-2xl">cBee</h1>
        <p>
          I am ContentBee, your Generative AI powered Digital Content Marketing
          Manager.
        </p>
        <LineBreak />
        <h3 className="font-bold">
          Veehive studio has been renamed as cBee (Content Bee) and has been
          moved to{" "}
          <Link
            href={`https://cbee.ai/protected/dashboard/?login=${token}`}
            className="link"
          >
            cBee.ai
          </Link>
        </h3>

        <LineBreak />
      </div>
    </IslandLayout>
  );
};

export default Cbee;
