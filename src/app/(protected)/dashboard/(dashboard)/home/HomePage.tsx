import IslandLayout from "components/IslandLayout/IslandLayout";
import Header from "./components/Header";
import LineBreak from "components/LineBreak/LineBreak";
import WhoAreWe from "./components/WhoAreWe";
import IntroVideo from "./components/IntroVideo";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { ChildComponent } from "api/models/Hive/hiveComponents";
// import HiveGuidelines from "components/HiveGuidelines";

interface Props {
  hiveDetails: HiveDetails;
  childComponents: ChildComponent[];
  videoCount: number;
  usersCount: number;
  channelsCount: number;
}

const HomePage = ({
  hiveDetails,
  childComponents,
  videoCount,
  usersCount,
  channelsCount,
}: Props) => {
  return (
    <div className="home_page_container">
      <IslandLayout>
        <Header
          hiveDetails={hiveDetails}
          childComponents={childComponents}
          videoCount={videoCount}
          channelCount={usersCount}
          userCount={channelsCount}
        />
      </IslandLayout>
      <LineBreak />
      <WhoAreWe description={hiveDetails?.longDescription || ""} />
      <LineBreak />
      <IntroVideo hiveDetails={hiveDetails} />
      <LineBreak />
      {/* <IslandLayout>
        <div className="home_page_content">
          <div className="home_guidelines">
            <Headers>Guidelines</Headers>
            <HiveGuidelines />
          </div>
        </div>
      </IslandLayout> */}
    </div>
  );
};

export default HomePage;
