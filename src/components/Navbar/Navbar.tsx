import { RawComponents } from "api/models/Hive/hiveComponents";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import Buttons from "components/Buttons";
import React from "react";
import NavLogo from "./components/NavLogo";
import { checkAuth } from "utils/auth";
import ProfileMenu from "components/ProfileMenu";
import { ProfileItem } from "api/models/profile";

type Props = {
  hiveDetails: HiveDetails;
  hiveComponents: RawComponents[];
  profile: ProfileItem;
};

const Navbar = ({ hiveDetails, hiveComponents, profile }: Props) => {
  return (
    <div className="navbar_container">
      <div className="navbar_content">
        <NavLogo hiveDetails={hiveDetails} />
        <div className="navbar_buttons">
          {!!hiveComponents &&
            hiveComponents[0] &&
            hiveComponents.map((menu, idx) => {
              if (
                menu.componentType === "primaryBtn" ||
                menu.componentType === "secondaryBtn"
              )
                return (
                  <Buttons key={idx} button={menu}>
                    {menu.componentName}
                  </Buttons>
                );
            })}
          {checkAuth() && <ProfileMenu profile={profile} />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
