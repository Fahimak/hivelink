"use server";
import { fetchClientFormPost, fetchClientPost } from "api/client";
import { fetchServerPost, formServerPost } from "api/request";
import { checkAuth } from "utils/auth";

const base_path = "/webApp";

export async function fetchHiveDetails(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/${checkAuth() ? "hive/" : "noAuth/"}details/v2`,
      payload,
      "hive"
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function editHiveDetails(payload: {}) {
  try {
    const data = await fetchServerPost(`${base_path}/hive/edit`, payload);

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function saveContactInfo(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/hive/save/contact/details`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function fetchSocialLinks(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/${checkAuth() ? "" : "noAuth/"}hive/social/handles`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function fetchActivities(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/${checkAuth() ? "" : "noAuth/"}activities/get/all/hive`,
      payload,
      "hive"
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function fetchContactInfo(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/hive/contact/details`,
      payload,
      "contactInfo"
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function fetchHiveMembers(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/member/hive/list`,
      payload,
      "members"
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function addSuperAdmin(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/member/add/super/admin`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function removeHiveMember(payload: {}) {
  try {
    const data = await fetchServerPost(`${base_path}/member/delete`, payload);

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function emailAdminInvite(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/member/add/email/admin`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function emailMemberInvite(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/member/add/email`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function phoneMemberInvite(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/member/add/phone`,
      payload
    );
    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function phoneAdminInvite(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/member/add/phone/admin`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function fetchIntroPresinedUrl(payload: {}) {
  try {
    const data = await fetchServerPost(
      `/content/admin/resources/pre/signed`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}
