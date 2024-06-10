"use client";
import IslandLayout from "components/IslandLayout/IslandLayout";
import React, { useEffect, useState } from "react";
import LineBreak from "components/LineBreak";
import {
  NotificationItem,
  PaginationModel,
} from "api/models/Notification/notification";
import NotificationList from "./components/NotificationsList";
import Loading from "app/loading";

interface Props {
  notificationsResp: PaginationModel<NotificationItem>;
}

const NotificationPage = ({ notificationsResp }: Props) => {
  //   const pageNo = notifications.pageNo;

  //   const notificationsResp = notifications.notifications;

  //   const { getNotifications, readNotifications } = useNotificationApi();

  //   useEffect(() => {
  //     getNotifications();

  //     readNotifications();
  //   }, [pageNo]);

  //   const handleNextPage = (pageNo: number) => {
  //     notifications.setPageNo(pageNo);
  //   };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <IslandLayout>
          <div className="notification_page_container">
            <h1 className="font-bold text-2xl">Notifications</h1>
            <LineBreak />
            {!!notificationsResp &&
            !!notificationsResp.content &&
            notificationsResp.content.length > 0 ? (
              <>
                <NotificationList notifications={notificationsResp} />
                <LineBreak />
                {/* <PageNumbers
                handleChange={handleNextPage}
                initialPage={pageNo}
                totalPages={notificationsResp.totalPages}
              /> */}
              </>
            ) : (
              <div>No Notifications</div>
            )}
          </div>
        </IslandLayout>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default NotificationPage;
