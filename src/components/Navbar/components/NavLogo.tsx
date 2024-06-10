"use client";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { setSubdomainCookie } from "utils/clientCookies";
import { setServerSubDomainCookie } from "utils/serverCookies";

interface Props {
  hiveDetails: HiveDetails;
}

const NavLogo = ({ hiveDetails }: Props) => {
  const router = useRouter();

  useEffect(() => {
    setSubdomainCookie(hiveDetails.communitySubDomain);
    setServerSubDomainCookie(hiveDetails.communitySubDomain);
  }, [hiveDetails.communitySubDomain]);

  const handleLogoClick = () => {
    hiveDetails?.communityGuidelines
      ? window.open(hiveDetails.communityGuidelines, "_self")
      : router.push("/dashboard/home");
  };

  return (
    <div className="logo_section">
      <img
        src={hiveDetails?.communityWebLogo || ""}
        alt=""
        className="hive_logo cursor-pointer"
        onClick={handleLogoClick}
      />
    </div>
  );
};

export default NavLogo;
