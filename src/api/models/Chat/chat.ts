export interface UsersListOfChatRoomDataRequest {
  channelId: ChannelIdentifier;
  pageNo: number;
}

export interface ListChatRoomsOfUserRequestData {
  userId: UserId;
  channelId: ChannelIdentifier;
}

export interface UsersListForMentioningResp {
  channelId: number;
  createdDate: number;
  profilePhoto: string;
  status: string;
  user: string;
  userId: number;
  userName: string;
}

export interface Date {
  $numberLong: string;
}

export interface ReadAt {
  $date: string;
}

export interface Date2 {
  $numberLong: string;
}

export interface CreatedAt {
  $date: Date2;
}

export interface Date3 {
  $numberLong: string;
}

export interface UpdatedAt {
  $date: Date3;
}

export interface User {
  userName: string;
  userId: UserId;
}

export interface User {
  _id: string;
  userId: UserId;
  isPinned: boolean;
}

export interface ActiveUser {
  _id: string;
  userId: UserId;
  socketId: string;
}

export interface ChatRoom {
  activeUsers: ActiveUser[];
  type: string;
  _id: string;
  organizationId: number;
  organizationUuid: string;
  channelId: number;
  userIds: User[];
  chatRoomName: string;
  chatRoomBio: string;
  chatRoomLogo: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetChatRoomDetailData {
  chatRoomId: string;
}

export interface UpdateRoomNameData {
  chatRoomId: string;
  chatRoomName: string;
}

export interface UpdateRoomBioData {
  chatRoomId: string;
  chatRoomBio: string;
}

export interface UpdateRoomLogoData {
  chatRoomId: string;
  chatRoomLogo: string;
}

export interface RemoveUsersFromChatsRoomData {
  chatRoomId: string;
  userIds: Array<Pick<User, "userId" | "isPinned">>;
}

export interface GetChatMessageRequestData {
  chatRoomId: UniqueId;
  userId: UserId;
  page: number;
  limit: number;
}

export type GetChatMessagesWithUserMentionsRequestData = Pick<
  GetChatMessageRequestData,
  "chatRoomId" | "userId"
>;

export interface Message {
  message: string;
}

export interface ReadByRecipient {
  readAt: string;
  readByUserId: number;
}

export type UserMentionItem = {
  id: UserId;
  userName: UserName;
};

export interface MessageDataResponse {
  _id: string;
  chatRoomId: string;
  message: Message;
  type: MessageType;
  attachmentUrl: string;
  thumbnailUrl?: string;
  userId: UserId;
  userName: string;
  readByRecipients: ReadByRecipient[];
  userMentions?: UserMentionItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  videoUrl: string;
}

export interface ChatBotRespModel {
  readByRecipient: boolean;
  _id: string;
  chatSupportRoomId: string;
  message: string;
  attachmentUrl: null;
  userId: number;
  userName: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  videoUrl: string;
}

export interface SendAttachmentResponce extends MessageDataResponse {}

export interface MessageSocketResponse {
  message: MessageDataResponse;
}

export interface CreateChatRoomRequestBody {
  chatRoomName: string;
  chatRoomBio: string;
  communityId: number;
  channelId: number;
  type: string;
  userIds: Array<Pick<User, "userId" | "isPinned">>;
}

export interface SendMessageRequestBody {
  chatRoomId: string;
  message: string;
  userId: number;
  userName: string;
  type: MessageType;
  mentionUsersIds: UserId[];
}

export interface SendMessageBotRequestBody {
  chatRoomId: string;
  message: string;
  userId: number;
  userName: string;
  type: MessageType;
  organizationUuid: string;
  sessionId?: string;
}

export interface PinningChatRoomRequestBody {
  chatRoomId: UniqueId;
  userId: UserId;
}

export interface GetVideoCommentViewerMessagesRequestBody {
  organizationId: number;
  channelId: number;
  videoId: number;
}

export interface SendViewerTextMessageRequestBody
  extends GetVideoCommentViewerMessagesRequestBody {
  message: string;
}

export interface GetVideoRoomsByOwnerRequestData {
  videoId: number;
}

export interface CommentingPerson {
  type: string;
  _id: string;
  channelId: number;
  organizationId: number;
  organizationUuid: string;
  viewerUserId: number;
  ownerUserId: number;
  viewerUserName: string;
  ownerUserName: string;
  videoId: number;
  roomName: string;
  roomLogo?: any;
  activeUsers: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface VideoComment {
  readByRecipient: boolean;
  _id: string;
  videoCommentRoomId: string;
  videoId: number;
  message: string;
  attachmentUrl?: any;
  userId: number;
  userName: string;
  type: MessageType;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CommentsRoomResponse {
  commentRoom: CommentingPerson;
  videoComments: VideoComment[];
}

export interface GetOwnerVideoRoomsResponse {
  room: CommentingPerson;
  lastComment: VideoComment;
}

export interface GetVideoMessagesByOwnerRequestData {
  roomId: string;
}

export interface SendMessagesByOwnerRequestData {
  roomId: string;
  message: string;
}

interface ChatUserItem {
  _id: string;
  userId: number;
  isPinned: boolean;
}

export interface ChatRoomItemModel {
  type: string;
  _id: string;
  organizationId: number;
  channelId: number;
  userIds: ChatUserItem[];
  chatRoomName: string;
  chatRoomBio: string;
  organizationUuid: string;
  activeUsers: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  unreadMessageCount: number;
}

export interface ChatRoomsByChannelModel {
  channelId: number;
  channelName: string;
  channelUuid: string;
  description: string;
  channelLogo: string;
  chatRoomList: ChatRoomItemModel[];
}
