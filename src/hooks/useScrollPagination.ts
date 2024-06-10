"use client";
import React, { useRef, useEffect, useCallback } from "react";

type Callback = () => void;

export const useScrollPagination = <T extends HTMLElement>(
  callback?: Callback,
  isObserver?: boolean
): React.RefObject<T> => {
  const scrollElemRef = useRef<T>(null);

  const handleObserver = useCallback(
    ([entrie]: IntersectionObserverEntry[]) => {
      if (entrie.isIntersecting && typeof callback === "function") {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    const option = {
      root: document,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, option);

    if (scrollElemRef.current) {
      observer.observe(scrollElemRef.current);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (scrollElemRef.current) observer.unobserve(scrollElemRef.current);
    };
  }, [handleObserver, isObserver]);

  return scrollElemRef;
};
