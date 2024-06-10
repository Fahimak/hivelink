"use client";
import { useState } from "react";
import ChannelButtonIcon from "assets/svg/hamburger-btn.svg";
import ChatButtonIcon from "assets/svg/chat-btn.svg";
import FeedButtonIcon from "assets/svg/feed-btn.svg";
import HomeButtonIcon from "assets/svg/home-btn.svg";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { checkAuth } from "utils/auth";
import { setCookie } from "cookies-next";
import { launchLogin } from "utils/launchLogin";
import MainMenu from "components/MainMenu";
import { RawComponents } from "api/models/Hive/hiveComponents";
import { ChannelListModel } from "api/models/Hive/hiveChannels";
import Image from "next/image";

// const getMenuItemClassName = ({ isActive }: { isActive: boolean }): string =>
//   isActive ? "menu_item active-item" : "menu_item";

interface Props {
  hiveComponents: RawComponents[];
  channelList: ChannelListModel[];
}

const BottomNavMenu = ({ hiveComponents, channelList }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = () => {
    // if (cookies().get("isLoggedIn")?.value !== "yes") {
    //   //   launchLogin();
    // }
  };

  const hamburgerMenuToggle = () => {
    setMenuOpen((prevState) => !prevState);
  };
  const path = usePathname();

  const router = useRouter();

  // useEffect(() => {
  //   router.prefetch("/home");
  //   router.prefetch("/feed");
  //   router.prefetch("/chat");
  // }, []);

  const handleClick = async (route: string) => {
    if (await checkAuth()) {
      router.push(`/dashboard/${route}`);
    } else {
      setCookie("path", path);
      router.push(`/dashboard/${route}`);
      // launchLogin(`/${route}`);
    }
  };

  const pathIsChatRoom = path.includes(`/chat/`) && path.length > 8;
  const pathIsStory = path.includes("/story/") && path.length > 8;

  return (
    <>
      {!pathIsChatRoom && !pathIsStory && (
        <div className="mobile_menu_container" onClick={handleChange}>
          <div onClick={hamburgerMenuToggle}>
            <Image alt="svg" src={ChannelButtonIcon} />
          </div>
          <div
            onClick={() => {
              handleClick("feed");
            }}
          >
            <Image alt="svg" src={FeedButtonIcon} />
          </div>
          <div
            onClick={() => {
              handleClick("home");
            }}
          >
            <Image alt="svg" src={HomeButtonIcon} />
          </div>
          <div
            onClick={() => {
              handleClick("chat");
            }}
          >
            <Image alt="svg" src={ChatButtonIcon} />
          </div>
        </div>
      )}
      {menuOpen && (
        <div
          onClick={hamburgerMenuToggle}
          className={`hamburger_menu_container ${
            menuOpen
              ? "hamburger_menu_container_open"
              : "hamburger_menu_container_close"
          } `}
        >
          <MainMenu hiveComponents={hiveComponents} channelList={channelList} />
        </div>
      )}
    </>
  );
};

export default BottomNavMenu;
