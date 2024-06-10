import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { alertStore } from "store/alert";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CircularProgress, Dialog, IconButton } from "@mui/material";
import emailIcon from "assets/svg/login_mail.svg";
import passwordIcon from "assets/svg/login_password.svg";
import Image from "next/image";
import {
  deleteJwtTokenCookie,
  setJwtTokenCookie,
  setLoggedInCookie,
  setProfileIdCookie,
  setProfileuuidCookie,
  setUsernameCookie,
} from "utils/clientCookies";
import ReCAPTCHA from "react-google-recaptcha";
import { useGoogleLogin } from "@react-oauth/google";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import FacebookLogin from "@greatsumini/react-facebook-login";
import v_google from "assets/png/google.png";
import v_facebook from "assets/png/facebook.png";
import v_linkedin from "assets/png/linkedIn.png";
import LoginTabs from "./components/LoginTabs";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";
import PhoneInput, { CountryData } from "react-phone-input-2";
import {
  facebookLoginApi,
  fetchUserProfile,
  googleLoginApi,
  linkedinLoginApi,
  loginApiCall,
  verifyOtpApiCall,
} from "api/routes/Profile/profile";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import { getCookie } from "cookies-next";
import { ProfileItem } from "api/models/profile";
import revalidateTags from "utils/revalidate";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const [loading, setLoading] = useState(false);

  const [showOTPScreen, setShowOTPScreen] = useState(false);
  const [recaptcha, setRecaptcha] = useState("");

  const { toastError, toastSuccess } = useTriggerAlert();

  const [profileId, setProfileId] = useState("");

  const [mainLoading, setMainLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (emailLogin) {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginForm.email)
      ) {
        // this.loginResponse = await sendLoginEmailOTPApiCall(this.usernameField);

        const loginEmailResponse = await loginApiCall({
          email: loginForm.email,
          actionMedium: false,
          recaptchaResponse: recaptcha,
          communityDomain: getCookie("subDomain"),
          userType: "member",
        });
        if (!!loginEmailResponse) {
          setProfileId(loginEmailResponse.profileId);
          setShowOTPScreen(true);
        } else {
          toastError("Failed to login");
        }
      } else {
        toastError("Please enter a valid email");
      }
    } else {
      let number = phone.replace(localStorage.getItem("dialCode") || "", "");
      let country = localStorage.getItem("countryCode");

      const loginMobileResponse = await loginApiCall({
        countryCode: country,
        mobileNo: number,
        actionMedium: true,
        recaptchaResponse: recaptcha,
        communityDomain: getCookie("subDomain"),
        userType: "member",
      });
      if (!!loginMobileResponse) {
        setProfileId(loginMobileResponse.profileId);

        setShowOTPScreen(true);
      } else {
        toastError("Failed to login");
      }
    }
    setLoading(false);
  };

  const handleSuccess = async (token: string) => {
    setMainLoading(true);
    await setJwtTokenCookie(token);
    const user: ProfileItem = await fetchUserProfile({});
    if (!user) {
      // This will activate the closest `error.js` Error Boundary
      setMainLoading(false);
      await deleteJwtTokenCookie();
      await setLoggedInCookie("no");
    } else {
      await Promise.all([
        setLoggedInCookie("yes"),
        // revalidateTags("components"),
        // revalidateTags("child"),
        setProfileIdCookie(user.userId.toString()),
        setProfileuuidCookie(user.profileId.toString()),
        setUsernameCookie(user.userName),
      ]);
      router.push(getCookie("path") || "/dashboard/feed");
    }
  };

  const handleVerify = async (passedOtp?: string) => {
    setLoading(true);
    const verifyResp = await verifyOtpApiCall({
      profileId: profileId,
      otp: passedOtp || otp,
      deviceInfo: {
        notificationId: "test",
        appVersion: "1.9.2.1",
        appOS: "iOS",
      },
    });
    if (!!verifyResp) {
      handleSuccess(verifyResp.accessToken);
    } else {
      toastError("Failed to verify Otp, please try again");
    }
    setLoading(false);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const backgroundUrls = [
    "https://imagesdev.veehive.ai/background/Frame+289736-1.jpg",
    "https://imagesdev.veehive.ai/background/Frame+289736-2.jpg",
    "https://imagesdev.veehive.ai/background/Frame+289736-3.jpg",
    "https://imagesdev.veehive.ai/background/Frame+289736-5.jpg",
    "https://imagesdev.veehive.ai/background/Frame+289736-6.jpg",
    "https://imagesdev.veehive.ai/background/Frame+289736-8.jpg",
    "https://imagesdev.veehive.ai/background/Frame+289736.jpg",
    "https://imagesdev.veehive.ai/background/Frame+289734.jpg",
  ];

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setMainLoading(true);

      const resp = await googleLoginApi({
        clientToken: tokenResponse.access_token,
        communityDomain: getCookie("subDomain"),
        userType: "member",
      });

      if (!!resp) {
        handleSuccess(resp.accessToken);
      } else {
        toastError("Failed to login using google");
      }
    },
  });

  const responseFacebook = async (response: any) => {
    setMainLoading(true);

    const token = response?.accessToken;
    const resp = await facebookLoginApi({
      clientToken: token,
      communityDomain: getCookie("subDomain"),
      userType: "member",
    });
    if (!!resp) {
      handleSuccess(resp.accessToken);
    } else {
      toastError("Failed to login using facebook");
    }
  };

  const redirectUri = `${document.location.origin}/login/linkedin`;

  const { linkedInLogin } = useLinkedIn({
    clientId: "77qak39ihpnolt",
    redirectUri: redirectUri,
    onSuccess: async (code) => {
      setMainLoading(true);
      const resp = await linkedinLoginApi({
        clientToken: code,
        redirectUri: redirectUri,
        communityDomain: getCookie("subDomain"),
        userType: "member",
      });
      if (!!resp) {
        handleSuccess(resp.accessToken);
      } else {
        toastError("Failed to login using linkedin");
      }
    },
    scope: "r_emailaddress r_liteprofile",
    onError: (error) => {
      console.log(error.errorMessage);
      // loginViewModel.showToastError(error.errorMessage);
    },
  });

  const [emailLogin, setEmailLogin] = useState(true);

  const [phone, setPhone] = useState("");

  useEffect(() => {
    localStorage.setItem("countryCode", "ae");
    localStorage.setItem("dialCode", "+971");
  }, []);

  const handlePhoneChange = (value: string, country: CountryData) => {
    setPhone(value);
    localStorage.setItem("countryCode", country.countryCode);
    localStorage.setItem("dialCode", country.dialCode);
  };

  const [otp, setOtp] = useState("");

  function handleRecaptcha(response: string | null) {
    setRecaptcha(response || "");
  }

  return (
    <div id="main_login_container" className="main_login_container">
      <div className="login_content_wrapper">
        <div className="login_text_wrapper">
          {/* <img src={logo} width="120px" />
           */}
          <h2 className="font-bold text-3xl">Be a part of our community</h2>
        </div>
        <div className="login_form_wrapper_ak">
          <div className="login">
            {showOTPScreen ? (
              <div className="login-form-container p-4 flex flex-col items-center">
                <div className="font-bold text-2xl my-5">Verification</div>
                <input
                  type="number"
                  inputMode="numeric"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    if (e.target.value.length === 4) {
                      handleVerify(e.target.value);
                      // loginViewModel.handlePinChange("");
                    }
                  }}
                  placeholder="Enter OTP"
                  className="border border-black text-center outline-transparent p-2 rounded-md"
                />
                <h1 className="font-semibold my-5">
                  You will receive an OTP via{" "}
                  {emailLogin ? "email" : "text message"}
                </h1>
                <div className="my-3">
                  {loading ? (
                    <div className="submit-button">
                      <CircularProgress size={20} color="inherit" />
                    </div>
                  ) : (
                    <div
                      onClick={() => handleVerify(otp)}
                      className="submit-button"
                    >
                      Verify
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="login-form-container p-4">
                <h2 className="text-2xl font-bold">Login or signup</h2>
                {/* <p className="gray_text">Welcome! Please enter your details</p> */}
                <LoginTabs
                  emailLogin={emailLogin}
                  setEmailLogin={setEmailLogin}
                />
                <div className="login_inputs_wrapper">
                  {emailLogin ? (
                    <form className="login-form">
                      <div className="ak_login_input_wrapper">
                        <Image src={emailIcon} alt="email_icon" />
                        <input
                          className="ak_login_input"
                          type="email"
                          id="email"
                          placeholder="Email"
                          name="email"
                          value={loginForm.email}
                          onChange={handleChange}
                        />
                      </div>
                    </form>
                  ) : (
                    <PhoneInput
                      country={(
                        localStorage.getItem("countryCode") || ""
                      ).toLowerCase()} // Set the default country
                      value={phone}
                      onChange={handlePhoneChange}
                      inputStyle={{
                        width: "100%",
                        outline: "none",
                        fontFamily: "IBM Plex Sans Condensed",
                        fontStyle: "normal",
                        fontSize: "14px",
                        borderRadius: "10px",
                        borderColor: "rgba(226, 232, 240, 1)",
                        height: "48px",
                      }}
                      containerStyle={{
                        height: "48px",
                      }}
                      buttonStyle={{
                        borderRadius: "10px 0px 0px 10px",
                      }}
                      dropdownStyle={{
                        height: "150px",
                      }}
                    />
                  )}
                </div>

                {(!!loginForm.email || !!phone) && (
                  <div className="mt-3 px-5">
                    <ReCAPTCHA
                      className=""
                      sitekey="6Lfao4clAAAAAGc_zKKLMrh_8K60TwZkn1xkFZZ8"
                      onChange={handleRecaptcha}
                    />
                  </div>
                )}

                <div className="submit-container mt-5 flex justify-center">
                  {loading ? (
                    <div className="submit-button">
                      <CircularProgress size={20} color="inherit" />
                    </div>
                  ) : (
                    <div onClick={handleSubmit} className="submit-button">
                      Sign in
                    </div>
                  )}
                </div>
                <div className="flex my-4 items-center justify-center">
                  <div className="border-b border-black w-1/2 border-gray-400"></div>
                  <span className="px-4 text-sm">OR</span>
                  <div className="border-b border-black w-1/2 border-gray-400"></div>
                </div>
                <div className="flex items-center">
                  <FacebookLogin
                    appId="231847841952529"
                    onSuccess={responseFacebook}
                    render={(renderProps) => (
                      <div
                        onClick={renderProps.onClick}
                        className="w-full flex py-3 border px-3 border-gray-300 cursor-pointer items-center justify-start gap-x-3 rounded-md hover:shadow-lg tranform duration-300"
                      >
                        <Image
                          src={v_facebook}
                          alt=""
                          width={20}
                          height={20}
                          className="cursor-pointer rounded-full"
                        />
                        <div className="">
                          <h1 className="font-medium">
                            Continue with Facebook
                          </h1>
                        </div>
                      </div>
                    )}
                  />
                </div>
                <div className="mt-5 flex items-center">
                  <div
                    className={`w-full flex py-3 px-3 border border-gray-300 cursor-pointer items-center justify-start gap-x-3 rounded-md transform duration-300 hover:shadow-lg`}
                    onClick={() => googleLogin()}
                  >
                    <Image
                      src={v_google}
                      alt=""
                      width={20}
                      height={20}
                      className="cursor-pointer rounded-full"
                    />
                    <div className="">
                      {/* {loginViewModel.socialLoading ? (
                      <CircularProgress size={22} color="inherit" />
                    ) : ( */}
                      <h1 className="font-medium">Continue with Google</h1>
                      {/* )} */}
                    </div>
                  </div>
                  {/* )}
              buttonText="Login"
              onSuccess={googleSuccess}
              onFailure={responseGoogle}
            /> */}
                </div>
                <div
                  className={`mt-5 w-full flex py-3 px-3 border border-gray-300 cursor-pointer items-center justify-start gap-x-3 rounded-md tranform duration-300 hover:shadow-lg`}
                  onClick={linkedInLogin}
                >
                  <Image
                    src={v_linkedin}
                    alt=""
                    width={20}
                    height={20}
                    className="cursor-pointer rounded-full"
                  />
                  <div className="font-medium">Continue with LinkedIn</div>
                </div>
              </div>
            )}
            <div className="privacy_tnc_container">
              <a
                href="https://veehive.ai/privacy-policy"
                target="_blank"
                rel="noreferrer"
                className="privacy_tnc_item"
              >
                <div className="privacy_tnc_item">Privacy Policy</div>
              </a>
              <div className="px-1">|</div>
              <a
                href="https://veehive.ai/terms-and-conditions"
                target="_blank"
                rel="noreferrer"
                className="privacy_tnc_item"
              >
                <div className="privacy_tnc_item">Terms of Use</div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={mainLoading} className="">
        <div className="p-4 flex flex-col items-center gap-2">
          <CircularProgress color="inherit" size={30} variant="indeterminate" />
          <h1 className="font-bold">Logging in...</h1>
        </div>
      </Dialog>
    </div>
  );
};

export default Login;
