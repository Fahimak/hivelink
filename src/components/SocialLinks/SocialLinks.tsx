import { SocialLinksItem } from "api/models/Hive/hiveDetails";
import SocialItem from "./components/SocialItem";

interface Props {
  socialLinks: SocialLinksItem[];
}

const SocialLinks = ({ socialLinks }: Props) => {
  return (
    <div className="social_icons_container">
      <h4 className="font-bold">On the web</h4>
      {!!socialLinks && (
        <div className="social_icons_wrapper">
          {socialLinks.map((data, idx) => {
            return <SocialItem item={data} key={idx} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SocialLinks;
