"use client";
import { Components } from "api/models/Hive/hiveComponents";
import { navigate } from "app/actions";
import { getCookie, setCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import React, { PropsWithChildren, useEffect } from "react";
import { checkMemberView } from "utils/auth";
import { setMemberViewCookie } from "utils/clientCookies";
import { launchLogin } from "utils/launchLogin";
import revalidateTags from "utils/revalidate";

interface Props {
  button: Components;
  redirect?: string;
  handlePush?: any;
}

const Buttons: React.FC<PropsWithChildren<Props>> = ({
  button,
  children,
  redirect,
  handlePush,
}) => {
  // useEffect(() => {
  //   router.prefetch(redirect || button.componentRoute);
  // }, []);

  const router = useRouter();

  const path = usePathname();

  const handleClick = async () => {
    // if(button.componentName = "")
    if (button.accessType === "superadmin") {
      (await checkMemberView())
        ? setMemberViewCookie("no")
        : setMemberViewCookie("yes");

      await revalidateTags("components");
      await revalidateTags("child");
      await revalidateTags("channels");
      window.location.reload();
    } else if (button.componentRoute === "/join") {
      router.push("/login");
    } else {
      if (getCookie("isLoggedIn") === "yes") {
        if (!!redirect) {
          router.push(redirect);
        } else {
          if (handlePush) {
            handlePush();
          } else {
            router.push(`/dashboard/${button.componentRoute}`);
          }
        }
      } else {
        setCookie("path", path);
        router.push(`/login`);
        // launchLogin(path);
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer ${button.componentType}`}
    >
      {children}
    </div>
  );
};

export default Buttons;
