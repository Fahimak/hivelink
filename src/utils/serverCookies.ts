"use server";

import { cookies } from "next/headers";

export const setServerJwtCookie = (value: string) => {
  cookies().set("@jwtToken", value, {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  });
};

export const setServerLoggedInCookie = (value: string) => {
  cookies().set("isLoggedIn", value);
};

export const setServerMemberViewCookie = (value: string) => {
  cookies().set("isMemberView", value);
};

export const setServerSubDomainCookie = (value: string) => {
  cookies().set("subDomain", value);
};

export const deleteServerJwtCookie = () => {
  cookies().delete("@jwtToken");
};

export const getCommunityIdCookie = () => {
  cookies().get("communityId");
};
