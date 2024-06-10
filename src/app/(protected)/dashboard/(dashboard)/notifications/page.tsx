import {
  NotificationItem,
  PaginationModel,
} from "api/models/Notification/notification";
import { fetchNotificationsList } from "api/routes/Notifications/notifications";
import { org_uuid } from "constants/constants";
import Notifications from "views/Notifications";

async function getData() {
  const notifications: PaginationModel<NotificationItem> =
    await fetchNotificationsList({
      organizationUuid: org_uuid,
      page: 0,
      limit: 25,
    }); // The return value is *not* serialized

  if (!notifications) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch campaigns list");
  }

  return notifications;
}

export default async function Page() {
  const notifications = await getData();

  return <Notifications notificationsResp={notifications} />;
}
