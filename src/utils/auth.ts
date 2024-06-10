"use server";
import { cookies } from "next/headers";

export const checkAuth = (): boolean => {
  const isLoggedIn = cookies().get("isLoggedIn")?.value || "";
  if (isLoggedIn === "yes") {
    return true;
  } else {
    return false;
  }
};

export const checkMemberView = (): boolean => {
  const isMemberView = cookies().get("isMemberView")?.value || "";
  if (isMemberView === "yes") {
    return true;
  } else {
    return false;
  }
};
