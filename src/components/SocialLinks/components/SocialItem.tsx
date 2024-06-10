"use client";
import { SocialLinksItem } from "api/models/Hive/hiveDetails";
import React from "react";

type Props = {
  item: SocialLinksItem;
};

const SocialItem = ({ item }: Props) => {
  const handleSocialClick = (route: string, go: boolean) => {
    go && window.open(route, "_blank");
  };

  return (
    <img
      src={item.icon}
      className={`social_icon ${
        item.isActive && item.route.length > 1 ? "" : "inactive_social_icon"
      }`}
      alt="social"
      onClick={() => handleSocialClick(item.route, item.isActive)}
    />
  );
};

export default SocialItem;
