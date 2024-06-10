"use server";
import { fetchServerPost, formServerPost } from "api/request";
// import { AxiosProgressEvent } from "axios";

export async function fetchChatRooms(passedId: number) {
  try {
    const data = await fetchServerPost("/chat/app/organization/list/get", {
      organizationId: passedId,
    });

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function getChatMessages(
  chatRoomId: string,
  userId: string,
  page: number
) {
  try {
    const data = await fetchServerPost("/chat/app/room/get/messages", {
      chatRoomId: chatRoomId,
      userId: userId,
      page: page,
    });

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function sendAttachmentApi(body: FormData) {
  try {
    const data = await formServerPost("/chat/app/room/send/attachment", body);
    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function sendVoiceApi(body: FormData) {
  try {
    const data = await formServerPost("/chat/app/room/send/voice", body);

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function sendChatMessages(
  chatRoomId: string,
  message: string,
  userId: number,
  userName: string,
  mentionUsersIds: number[]
) {
  try {
    const data = await fetchServerPost("/chat/app/room/send/message", {
      chatRoomId: chatRoomId,
      message: message,
      type: "text",
      userId: userId,
      userName: userName,
      mentionUsersIds: mentionUsersIds,
    });

    return data;
  } catch (error) {
    console.log("error");
  }
}

export async function getMentionsList(chatRoomId: string) {
  try {
    const data = await fetchServerPost("/chat/app/room/users/list", {
      chatRoomId: chatRoomId,
    });

    return data;
  } catch (error) {
    console.log("error");
  }
}
