"use client";
import { getCookie, setCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { launchLogin } from "utils/launchLogin";

interface MENU_ITEM {
  componentType: string;
  componentCode: string;
  componentName: string;
  componentIcon: string;
  componentDescription: string;
  componentRoute: string;
}

interface Props {
  menuItem: MENU_ITEM;
}

const MenuItem = ({ menuItem }: Props) => {
  const location = usePathname();

  const router = useRouter();

  // useEffect(() => {
  //   router.prefetch("/home");
  //   router.prefetch("/feed");
  //   router.prefetch("/chat");
  //   router.prefetch("/story");
  //   router.prefetch("/notifications");
  //   router.prefetch("/analytics");
  // }, []);

  const handleClick = (passedRoute: string) => {
    if (getCookie("isLoggedIn") === "yes") {
      // hiveComponents.setSelectedMenu(passedMenu);
      // getChildComponents(menuItem.componentName);
      // window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCookie("path", `/dashboard${passedRoute}`);
      // launchLogin(passedRoute);
    }
  };

  return (
    <Link
      href={`/dashboard${menuItem.componentRoute}`}
      onClick={() => handleClick(menuItem.componentRoute)}
      className="menu_item pointer"
    >
      <img alt="" src={menuItem.componentIcon} className="menu_icon" />
      <div
        className={`menu_item_ak ${
          false // hiveComponents.selectedMenu === menuItem.componentName
            ? "selected_menu"
            : "menu_text"
        }`}
      >
        <div>{menuItem.componentName}</div>
        {/* {menuItem.componentName === "Chat" && (
          <>{unreadMessages > 0 && <div className="readed_tab_badge" />}</>
        )} */}
      </div>
    </Link>
  );
};

export default MenuItem;
