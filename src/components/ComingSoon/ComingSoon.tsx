import IslandLayout from "components/IslandLayout";
import LineBreak from "components/LineBreak";
import RocketSVG from "assets/svg/rocket-02.svg";
import React from "react";
import Image from "next/image";

const ComingSoon = () => {
  return (
    <IslandLayout>
      <h2 className="coming_soon font-bold text-2xl">
        <Image src={RocketSVG} alt="svg" />
        <LineBreak />
        Get ready for something amazing!
      </h2>
      <h4 className="coming_soon_content font-bold">
        A new project is on its way to transport you to a world of wonder. Stay
        tuned!{" "}
      </h4>
    </IslandLayout>
  );
};

export default ComingSoon;
