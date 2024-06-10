"use server";
import { fetchServerGet, fetchServerPost } from "api/request";
import { checkAuth } from "utils/auth";

const base_path = "/user/Profile";

export async function fetchUserProfile(payload: {}, token?: string) {
  try {
    const data = await fetchServerPost(
      `${base_path}/get/userName`,
      payload,
      "profile",
      token
    );
    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function refreshToken(payload: {}) {
  try {
    const data = await fetchServerPost(
      `/user/Auth/Refreshtoken`,
      payload,
      "token"
    );
    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function updateUserPhone(payload: {}) {
  try {
    const data = await fetchServerPost(`${base_path}/update/phone`, payload);
    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function updateUserEmail(payload: {}) {
  try {
    const data = await fetchServerPost(`${base_path}/update/email`, payload);
    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function changeUserInfo(payload: {}) {
  try {
    const data = await fetchServerPost(`${base_path}/ChangeUserName`, payload);
    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function loginApiCall(payload: {}) {
  try {
    const data = await fetchServerPost(
      `/user/Auth/web/register/login`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function verifyOtpApiCall(payload: {}) {
  try {
    const data = await fetchServerPost(
      `/user/Auth/signup/verify/login`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function googleLoginApi(payload: {}) {
  try {
    const data = await fetchServerPost(`/user/Auth/google/v2`, payload);

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function facebookLoginApi(payload: {}) {
  try {
    const data = await fetchServerPost(`/user/Auth/Facebook_login`, payload);

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function linkedinLoginApi(payload: {}) {
  try {
    const data = await fetchServerPost(`/user/Auth/linkedin/login`, payload);
    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function getIpInfo() {
  try {
    const res = await fetch("https://ipapi.co/json/", {
      method: "GET",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error while getting geo info");
  }
}
