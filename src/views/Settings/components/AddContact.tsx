import ArrowBack from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import Switch from "@mui/material/Switch";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import {
  emailAdminInvite,
  emailMemberInvite,
  phoneAdminInvite,
  phoneMemberInvite,
} from "api/routes/Hive/hive";
import BackButton from "components/BackButton";
import ContactInput from "components/ContactInput";
import LineBreak from "components/LineBreak/LineBreak";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import revalidateTags from "utils/revalidate";

interface Props {
  inviteChannels: string[];
  hiveDetails: HiveDetails;
  togglePage: any;
  redirectAfterInvite: string;
}

const AddContact = ({
  inviteChannels,
  hiveDetails,
  togglePage,
  redirectAfterInvite,
}: Props) => {
  const [emails, setEmails] = useState<string[]>([]);

  const [phoneNos, setPhoneNos] = useState<string[]>([]);

  // const phoneUsers = useAppSelector(getPhoneUsersSelector);

  const handlePhoneNumbersChange = (nos: string[]) => {
    setPhoneNos(nos);
    // nos.map((item) => {
    //   dispatch(updatePhoneUsers({ mobileNo: item }));
    // });
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ["Email", "Phone"];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const [adminInvite, setAdminInvite] = useState(false);
  const [skipAlert, setSkipAlert] = useState(false);

  const handleAdminInvite = () => {
    setAdminInvite((prevState) => !prevState);
  };

  const handleSkipAlert = () => {
    setSkipAlert((prevState) => !prevState);
  };

  const [isLoading, setIsLoading] = useState(false);

  const { toastError, toastSuccess } = useTriggerAlert();

  const router = useRouter();

  const handleSendInvite = async () => {
    setIsLoading(true);
    const emailUsers: {
      email: string;
    }[] = [];

    const phoneUsers: {
      mobileNo: string;
    }[] = [];

    emails.map((item) => {
      emailUsers.push({ email: item });
    });

    phoneNos.map((item) => {
      phoneUsers.push({ mobileNo: item });
    });

    const phoneData = {
      users: phoneUsers,
      channels: inviteChannels,
      communityId: hiveDetails?.communityId!,
      skipEmails: skipAlert,
    };

    const emailData = {
      users: emailUsers,
      channels: inviteChannels,
      communityId: hiveDetails?.communityId!,
      skipEmails: skipAlert,
    };

    if (selectedTab === 0) {
      if (adminInvite) {
        const emailAdmin = await emailAdminInvite(emailData);
        if (emailAdmin) {
          toastSuccess("Invites Sent!");
          await revalidateTags("members");
        } else {
          toastError("Invite failed");
        }
      } else {
        const emailMember = await emailMemberInvite(emailData);
        if (emailMember) {
          toastSuccess("Inites Sent!");
          await revalidateTags("members");
        } else {
          toastError("Invite failed");
        }
      }
    } else {
      if (adminInvite) {
        const phoneAdmin = await phoneAdminInvite(phoneData);
        if (phoneAdmin) {
          toastSuccess("Inites Sent!");
          await revalidateTags("members");
        } else {
          toastError("Invite failed");
        }
      } else {
        const phoneMember = await phoneMemberInvite(phoneData);
        if (phoneMember) {
          toastSuccess("Inites Sent!");
          await revalidateTags("members");
        } else {
          toastError("Invite failed");
        }
      }
    }
    router.push(redirectAfterInvite);
    setIsLoading(false);
  };

  return (
    <div className="add_contact_container">
      <h3 className="font-bold text-lg">Invite Members</h3>
      <LineBreak />
      <div
        onClick={() => togglePage()}
        className="back_button_spacing flex items-center gap-x-1 pointer"
      >
        <ArrowBack />
        <h1>Back</h1>
      </div>
      <ContactInput
        tabs={tabs}
        handleChange={handleChange}
        emails={emails}
        setEmails={setEmails}
        phoneNos={phoneNos}
        setPhoneNos={handlePhoneNumbersChange}
        selectedTab={selectedTab}
      />
      <div className="members_invite_toggles">
        <div className="member_setting_container">
          <Switch checked={adminInvite} onChange={handleAdminInvite} />
          <p>Invite as admin - Default access to all public channels.</p>
        </div>
        <div className="member_setting_container">
          <Switch checked={!skipAlert} onChange={handleSkipAlert} />
          <p>Send notifications - Send invite notification as email or sms.</p>
        </div>
      </div>

      {!!emails.length || !!phoneNos.length ? (
        <div onClick={handleSendInvite} className="nextBtn primaryBtn">
          Send Invites
        </div>
      ) : (
        <div className="nextBtn disabledBtn">Send Invites</div>
      )}

      <Dialog open={isLoading}>
        <div className="loader_padding">
          <CircularProgress size={30} color="inherit" />
        </div>
      </Dialog>
    </div>
  );
};

export default AddContact;
