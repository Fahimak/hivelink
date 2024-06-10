"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const launchLogin = (path: string) => {
  // const path = usePathname();

  const redirectUrl = "https://login.vhive.org";

  const subDomain = cookies().get("subDomain")?.value;

  redirect(`/login`);

  // router.push(
  //   "/login" +
  //     `?domain=${subDomain}&path=${localStorage.getItem("path")}&register=${
  //       localStorage.getItem("register") || "false"
  //     }&atxd=${localStorage.getItem("atxd") || "fxd"}`
  // );
};
