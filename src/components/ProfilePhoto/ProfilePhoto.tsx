import ProfileIcon from "components/common/svg/ProfileIcon";
import Image from "next/image";

interface Props {
  imgUrl: string;
  height?: string;
  widht?: string;
}
const ProfilePhoto = ({ imgUrl }: Props) => {
  return (
    <>
      {!!imgUrl ? (
        // <img className="profile_photo" src={imgUrl} alt="" />
        <Image
          className="profile_photo"
          src={imgUrl}
          alt=""
          width={40}
          height={40}
        />
      ) : (
        <ProfileIcon />
        // <svg
        //   width="40px"
        //   height="28px"
        //   viewBox="0 0 28 28"
        //   fill="none"
        //   xmlns="http://www.w3.org/2000/svg"
        // >
        //   <path
        //     d="M14 0.666504C6.63996 0.666504 0.666626 6.63984 0.666626 13.9998C0.666626 21.3598 6.63996 27.3332 14 27.3332C21.36 27.3332 27.3333 21.3598 27.3333 13.9998C27.3333 6.63984 21.36 0.666504 14 0.666504ZM14 4.6665C16.2133 4.6665 18 6.45317 18 8.6665C18 10.8798 16.2133 12.6665 14 12.6665C11.7866 12.6665 9.99996 10.8798 9.99996 8.6665C9.99996 6.45317 11.7866 4.6665 14 4.6665ZM14 23.5998C10.6666 23.5998 7.71996 21.8932 5.99996 19.3065C6.03996 16.6532 11.3333 15.1998 14 15.1998C16.6533 15.1998 21.96 16.6532 22 19.3065C20.28 21.8932 17.3333 23.5998 14 23.5998Z"
        //     fill="black"
        //   />
        // </svg>
      )}
    </>
  );
};

export default ProfilePhoto;
