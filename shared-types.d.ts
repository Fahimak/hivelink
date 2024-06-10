type UniqueId = string;
type UserId = number;
type Email = string;
type UserName = string;
type Logo = string;
type URL = string;
type ChannelIdentifier = number;
type ContentType = "VIDEO" | "AUDIO";

type MessageType = "text" | "voice" | "attachment";

type SendMessageParams<T = any, D = any> = {
  content?: string;
  file?: File | null;
  type?: MessageType;
  cb?: HandlePropgressCb<T>;
  abortSignal?: D;
  mentionUsersIds?: UserId[];
};

type SvgIconProps = {
  className?: string;
  color?: string;
};

type HandlePropgressCb<T = any> = (e: T) => void;

interface Dictionary<T> {
  [index: string]: T;
}
