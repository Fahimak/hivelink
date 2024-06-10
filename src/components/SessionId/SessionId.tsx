"use client";
import { useAnalytics } from "hooks/useAnalytics";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {};

const SessionId = (props: Props) => {
  useAnalytics();

  useEffect(() => {
    if (!localStorage.getItem("sessionId")) {
      localStorage.setItem("sessionId", uuidv4());
    }
  }, []);

  return <></>;
};

export default SessionId;
