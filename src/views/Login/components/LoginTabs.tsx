import React, { Dispatch, SetStateAction } from "react";

type Props = {
  emailLogin: boolean;
  setEmailLogin: Dispatch<SetStateAction<boolean>>;
};

const LoginTabs = ({ emailLogin, setEmailLogin }: Props) => {
  return (
    <div className="flex my-4">
      <div className="flex flex-row bg-gray-200 rounded-lg w-full">
        <button
          type="button"
          onClick={() => setEmailLogin(true)}
          className={`py-1 w-1/2 rounded-lg text-sm font-semibold text-black ${
            emailLogin
              ? "bg-white border-2 border-gray-200"
              : "border-none bg-gray-200"
          }`}
        >
          Email
        </button>
        <button
          type="button"
          onClick={() => setEmailLogin(false)}
          className={`py-1 w-1/2 rounded-lg text-sm font-semibold text-black ${
            emailLogin
              ? "border-none bg-gray-200"
              : "bg-white border-2 border-gray-200"
          }`}
        >
          Phone
        </button>
      </div>
    </div>
  );
};

export default LoginTabs;
