"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  deleteJwtTokenCookie,
  getJwtTokenCookie,
  setCommunityIdCookie,
  setJwtTokenCookie,
  setLoggedInCookie,
  setProfileIdCookie,
  setProfileuuidCookie,
  setSubdomainCookie,
  setUsernameCookie,
} from "utils/clientCookies";
import { ProfileItem } from "api/models/profile";
import {
  fetchUserProfile,
  getIpInfo,
  refreshToken,
} from "api/routes/Profile/profile";
import revalidateTags from "utils/revalidate";
import { CircularProgress, Dialog } from "@mui/material";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { setServerSubDomainCookie } from "utils/serverCookies";
import { getCookie } from "cookies-next";
import { hiveDetailsStore } from "store/details";

interface Props {
  subdomain: string;
  communityId: number;
  hiveDetails: HiveDetails;
}

const AppInit = ({ subdomain, communityId, hiveDetails }: Props) => {
  const token = getJwtTokenCookie;

  const setMainHiveDetails = hiveDetailsStore(
    (state: any) => state.setMainHiveDetails
  );

  useEffect(() => {
    if (!!subdomain) {
      setMainHiveDetails(hiveDetails);

      setSubdomainCookie(subdomain);
      setServerSubDomainCookie(subdomain);
      setCommunityIdCookie(communityId.toString());
    }
  }, [subdomain]);

  const searchParams = useSearchParams();
  const login = searchParams.get("login");
  const attended = searchParams.get("atxd");
  const register = searchParams.get("register");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (attended) localStorage.setItem("atxd", attended || "");
  }, [attended]);

  useEffect(() => {
    if (register) localStorage.setItem("register", register || "");
  }, [register]);

  async function getGeoInfo() {
    const info = await getIpInfo();
    localStorage.setItem("countryCode", info.country_code);
  }

  async function getUser() {
    const user: ProfileItem = await fetchUserProfile({});
    if (!user) {
      const refresh = await refreshToken({});
      if (!refresh) {
        deleteJwtTokenCookie();
        setLoggedInCookie("no");
      } else {
        await setJwtTokenCookie(refresh.accessToken);
        const userRefreshed: ProfileItem = await fetchUserProfile(
          {},
          refresh.accessToken
        );

        if (!userRefreshed) {
          deleteJwtTokenCookie();
          setLoggedInCookie("no");
        } else {
          Promise.all([
            setLoggedInCookie("yes"),
            revalidateTags("components"),
            setProfileIdCookie(userRefreshed.userId.toString()),
            setProfileuuidCookie(userRefreshed.profileId.toString()),
            setUsernameCookie(userRefreshed.userName),
          ]);
          window.location.reload();
        }
      }
    } else {
      Promise.all([
        setLoggedInCookie("yes"),
        revalidateTags("components"),
        setProfileIdCookie(user.userId.toString()),
        setProfileuuidCookie(user.profileId.toString()),
        setUsernameCookie(user.userName),
      ]);
    }
  }

  useEffect(() => {
    getUser();
    getGeoInfo();
  }, [token]);

  return (
    <Dialog open={isLoading} className="">
      <div className="p-4 flex flex-col items-center gap-2">
        <CircularProgress color="inherit" size={30} variant="indeterminate" />
      </div>
    </Dialog>
  );
};

export default AppInit;
