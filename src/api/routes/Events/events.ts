"use server";
import { fetchServerPost } from "api/request";
import { checkAuth } from "utils/auth";

const base_path = "/webApp/events";

export async function fetchEventsList(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/get/list`,
      payload,
      "events"
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function registerEvent(payload: {}) {
  try {
    const data = await fetchServerPost(`${base_path}/register`, payload);

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function createEvent(payload: {}) {
  try {
    const data = await fetchServerPost(`${base_path}/create`, payload);

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function fetchEventQrDetails(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/qr/attendee/details`,
      payload
    );
    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function uploadEventVideo(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/video/pre/signed`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function deleteEvent(payload: {}) {
  try {
    const data = await fetchServerPost(`${base_path}/delete`, payload);

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function editEvent(payload: {}) {
  try {
    const data = await fetchServerPost(`${base_path}/edit`, payload);

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function uploadGalleryEvent(payload: {}) {
  try {
    const data = await fetchServerPost(`${base_path}/upload/gallery`, payload);

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function getGalleryEvent(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/get/gallery`,
      payload,
      "gallery"
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function removeGalleryEvent(payload: {}) {
  try {
    const data = await fetchServerPost(`${base_path}/remove/gallery`, payload);

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function getEventsPeopleList(payload: {}) {
  try {
    const data = await fetchServerPost(
      `${base_path}/admin/attendees/get/list`,
      payload
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function markAttended(payload: {}) {
  try {
    const data = await fetchServerPost(`${base_path}/mark/attended`, payload);

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function fetchEventDetails(payload: {}) {
  try {
    const data = await fetchServerPost(
      `/webApp${checkAuth() ? "" : "/noAuth"}/events/get`,
      payload,
      "event"
    );
    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function fetchUpcomingEventDetails(payload: {}) {
  try {
    const data = await fetchServerPost(
      `/webApp${checkAuth() ? "" : "/noAuth"}/events/get/upcoming`,
      payload,
      "event"
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function fetchEventAttendeesList(payload: {}) {
  try {
    const data = await fetchServerPost(
      `/webApp${checkAuth() ? "" : "/noAuth"}/events/attendees/get/list`,
      payload,
      "event"
    );

    return data;
  } catch (error) {
    console.log("error");
  }
}
