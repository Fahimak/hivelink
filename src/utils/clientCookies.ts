"use client";
import { getCookie } from "cookies-next";
import { setCookie } from "cookies-next";
import { deleteCookie } from "cookies-next";
import {
  deleteServerJwtCookie,
  setServerJwtCookie,
  setServerLoggedInCookie,
  setServerMemberViewCookie,
} from "./serverCookies";

export const getJwtTokenCookie = getCookie("@jwtToken");
export const getProfileIdCookie = getCookie("@profileId");
export const getUsernameCookie = getCookie("@username");
export const getProfileUuidCookie = getCookie("@profileUuid");

export const setJwtTokenCookie = async (value: string) => {
  setServerJwtCookie(value);
  setCookie("isLoggedIn", "yes");
};

export const setSubdomainCookie = async (value: string) => {
  setCookie("subDomain", value);
};

export const setCommunityIdCookie = async (value: string) => {
  setCookie("communityId", value);
};

export const setLoggedInCookie = async (value: string) => {
  setCookie("isLoggedIn", value);
  //   setServerLoggedInCookie("no");
};

export const setMemberViewCookie = async (value: string) => {
  setCookie("isMemberView", value);
  setServerMemberViewCookie(value);
  //   setServerLoggedInCookie("no");
};

export const deleteJwtTokenCookie = async () => {
  deleteCookie("@jwtToken");
  deleteServerJwtCookie();
  setCookie("isLoggedIn", "no");
  deleteCookie("@profileId");
  deleteCookie("@profileUuid");
  deleteCookie("@username");
};

export const setProfileIdCookie = async (value: string) => {
  setCookie("@profileId", value, {
    maxAge: Date.now() + 365 * 24 * 60 * 60 * 1000 * 1000,
  });
};

export const setProfileuuidCookie = async (value: string) => {
  setCookie("@profileUuid", value, {
    maxAge: Date.now() + 365 * 24 * 60 * 60 * 1000 * 1000,
  });
};

export const setUsernameCookie = async (value: string) => {
  setCookie("@username", value, {
    maxAge: Date.now() + 365 * 24 * 60 * 60 * 1000 * 1000,
  });
};
