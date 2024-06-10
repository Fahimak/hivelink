"use client";
import { EventsItem, UserQRData } from "api/models/Hive/events";
import { getCookie, setCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  event: EventsItem;
  qrDetails: UserQRData;
  user: string;
};

const ClientRegistration = ({ event, qrDetails, user }: Props) => {
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    setCookie("path", `${path}?user=${user}`);
    if (getCookie("isLoggedIn") !== "yes") {
      router.push("/login");
    }
  }, [path]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      if (!event.eventUuid) {
        router.push("/dashboard/home");
      }
      if (!qrDetails) {
        router.push("/dashboard/home");
      }
    }
  }, [isClient, event, qrDetails]);

  return <></>;
};

export default ClientRegistration;
