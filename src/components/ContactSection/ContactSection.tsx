"use client";
import { RawComponents } from "api/models/Hive/hiveComponents";
import { ContactInfoModel } from "api/models/Hive/hiveDetails";
import LineBreak from "components/LineBreak/LineBreak";
import AddContactSVG from "assets/svg/add_contact.svg";
import EmailSVG from "assets/svg/email.svg";
import LocationSVG from "assets/svg/location.svg";
import Image from "next/image";

interface Props {
  contactInfo: ContactInfoModel;
  hiveComponents: RawComponents[];
}

const ContactSection = ({ contactInfo, hiveComponents }: Props) => {
  const handleEditContact = () => {
    // router.push("/home/settings/about");
  };

  return (
    <div className="contact_section_container">
      {hiveComponents.map((menu, idx) => {
        if (menu.componentType === "hiveConfig")
          return (
            <div key={idx}>
              <div className="cu_header_wrapper">
                <h4 className="font-bold">{menu.componentName}</h4>
              </div>
              <LineBreak />
              <div className="cu_address_email_wrapper">
                {!!contactInfo?.address ? (
                  <div className="cu_address_wrapper">
                    <Image src={LocationSVG} alt="svg" />

                    <p className="text-sm w-75">{contactInfo?.address || ""}</p>
                  </div>
                ) : (
                  <>
                    {!!menu.componentDescription && (
                      <div
                        onClick={handleEditContact}
                        className="contact_empty_add"
                      >
                        <Image src={AddContactSVG} alt="svg" />

                        <p>Add Address</p>
                      </div>
                    )}
                  </>
                )}
                {!!contactInfo?.email ? (
                  <div className="cu_address_wrapper">
                    <Image src={EmailSVG} alt="svg" />

                    <p className="text-sm w-75">{contactInfo?.email || ""}</p>
                  </div>
                ) : (
                  <>
                    {!!menu.componentDescription && (
                      <div
                        onClick={handleEditContact}
                        className="contact_empty_add"
                      >
                        <Image src={AddContactSVG} alt="svg" />

                        <p>Add Email</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
      })}
    </div>
  );
};

export default ContactSection;
