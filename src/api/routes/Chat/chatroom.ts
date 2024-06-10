"use server";
import { fetchServerPost } from "api/request";

export async function fetchChatRoomDetail(passedId: string) {
  try {
    const data = await fetchServerPost("/chat/app/room/get", {
      chatRoomId: passedId,
    });

    return data;
  } catch (error) {
    console.log("error");
  }
}
