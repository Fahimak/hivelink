import { ChildComponent } from "api/models/Hive/hiveComponents";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import Buttons from "components/Buttons";
import VideoStatsSVG from "assets/svg/stats_videos.svg";
import ChannelStatsSVG from "assets/svg/stats_channels.svg";
import UsersStatsSVG from "assets/svg/stats_users.svg";
import Image from "next/image";

interface Props {
  hiveDetails: HiveDetails;
  childComponents: ChildComponent[];
  videoCount: number;
  userCount: number;
  channelCount: number;
}

const Header = ({
  hiveDetails,
  childComponents,
  videoCount,
  userCount,
  channelCount,
}: Props) => {
  return (
    <>
      <div className="home_media_container">
        <img
          alt=""
          className="home_banner"
          src={hiveDetails?.communityBanner || ""}
        />
        <img
          alt=""
          className="home_logo"
          src={hiveDetails?.communityWebLogo || ""}
        />
      </div>
      <div className="home_page_content">
        <h1 className="home_page_heading font-bold text-2xl">
          {hiveDetails?.communityName}
        </h1>
        <div className="home_details_wrapper">
          <div className="home_insights">
            {/* <p> */}
            <div className="stat_gapping">
              <Image alt="svg" src={VideoStatsSVG} />

              {videoCount}
            </div>
            {/* • */}
            <div className="stat_gapping">
              <Image alt="svg" src={UsersStatsSVG} />

              {userCount}
            </div>
            {/* • */}
            <div className="stat_gapping">
              <Image alt="svg" src={ChannelStatsSVG} />

              {channelCount}
            </div>
            {/* • */}
            {/* <div className="stat_gapping">
              <StoriesStatsSVG />
              {0}
            </div> */}
            {/* • */}
            {/* <div className="stat_gapping">
              <OnlineStatsSVG />
              {2}
            </div> */}
            {/* </p> */}
          </div>
          <div className="home_buttons">
            {!!childComponents &&
              childComponents[0] &&
              childComponents.map((button, idx) => {
                return (
                  <Buttons
                    redirect="/dashboard/home/settings"
                    key={idx}
                    button={button}
                  >
                    {button.componentType === "logo" ? (
                      <img src={button.componentIcon} alt="" width="24px" />
                    ) : (
                      button.componentName
                    )}
                  </Buttons>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
