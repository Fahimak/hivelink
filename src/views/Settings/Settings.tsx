import BackButton from "components/BackButton/BackButton";
import SettingsNav from "./components/SettingsNav";
import {
  ContactInfoModel,
  HiveDetails,
  SocialLinksItem,
} from "api/models/Hive/hiveDetails";
import IslandLayout from "components/IslandLayout";
import { MembersModel } from "api/models/Hive/hiveMembers";

interface Props {
  hiveDetails: HiveDetails;
  contactInfo: ContactInfoModel;
  socialLinks: SocialLinksItem[];
  hiveMembers: MembersModel;
}

const Settings = ({
  hiveDetails,
  contactInfo,
  socialLinks,
  hiveMembers,
}: Props) => {
  return (
    <IslandLayout>
      <div className="p-5">
        <BackButton to="/dashboard/home" />
        <SettingsNav
          hiveDetails={hiveDetails}
          contactInfo={contactInfo}
          socialLinks={socialLinks}
          hiveMembers={hiveMembers}
        />
      </div>
    </IslandLayout>
  );
};

export default Settings;
