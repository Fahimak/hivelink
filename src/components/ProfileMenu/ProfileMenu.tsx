"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Divider from "@mui/material/Divider";
import UserDetail from "components/UserDetail";
import LineBreak from "components/LineBreak/LineBreak";
import { ProfileItem } from "api/models/profile";
import { useRouter } from "next/navigation";
import { deleteJwtTokenCookie, getJwtTokenCookie } from "utils/clientCookies";
import revalidateTags from "utils/revalidate";
import { getCookie } from "cookies-next";
import Loading from "app/loading";

interface Props {
  profile: ProfileItem;
}

const ProfileMenu = ({ profile }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  const redirect = process.env.REACT_APP_LEGACY_URL;

  const handleRedirect = () => {
    handleClose();
    window.open(
      redirect + `?org=${getCookie("subDomain")}&login=${getJwtTokenCookie}`,
      "_self"
    );
  };

  const vhiveOrg = ["My Hives"];

  const handleLogout = async () => {
    handleClose();
    await deleteJwtTokenCookie();
    router.push("/dashboard/feed");
    window.location.reload();
    await revalidateTags("hive");
    await revalidateTags("profile");
    await revalidateTags("child");
  };

  const handleVhiveOrg = () => {
    window.open(`https://vhive.org/?token=${getJwtTokenCookie}`, "_blank");
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <Tooltip title="Profile">
              <img
                src={
                  profile?.profilePhoto ||
                  "https://veehivestage-images.s3.us-east-2.amazonaws.com/profileImage/defaultAvatar.png"
                }
                className="hive_logo"
                onClick={handleClick}
              />
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            // onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                width: "250px",
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 10,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <UserDetail profile={profile} />

            <LineBreak />
            <Divider />
            <LineBreak />
            <div className="vhive_org_btns">
              {vhiveOrg.map((data, idx) => {
                return (
                  <MenuItem onClick={handleVhiveOrg} key={idx}>
                    <p className="text-sm">{data}</p>
                  </MenuItem>
                );
              })}
            </div>
            <LineBreak />
            <Divider />
            <LineBreak />
            <MenuItem onClick={handleRedirect}>
              <div className="flex items-center">
                <ListItemIcon>
                  <SwapHorizIcon fontSize="small" />
                </ListItemIcon>
                <p className="text-sm font-ibm">Switch to classic</p>
              </div>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <div className="flex items-center">
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <p className="text-sm font-ibm">Logout</p>
              </div>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <img
          src="https://veehivestage-images.s3.us-east-2.amazonaws.com/profileImage/defaultAvatar.png"
          className="hive_logo"
        />
      )}
    </>
  );
};

export default ProfileMenu;
