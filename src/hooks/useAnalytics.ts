import { useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { usePathname, useSearchParams } from "next/navigation";
import { org_uuid } from "constants/constants";
import { storyStore } from "store/story";
import { logCtaAnalytics } from "api/routes/Analytics/analytics";

export interface FetchParams {
  ctaName: string;
  pageName: string;
  organizationUuid?: string;
  currentStoryId?: number;
  segmentId?: string;
  request?: any;
  storyUuid?: string;
  origin?: string;
  redirect?: string;
}

const REF_KEY = "ref";
const REDIRECT = "rxurx";

const fetch = async (params: FetchParams) => {
  await logCtaAnalytics({
    sessionId: localStorage.getItem("sessionId"),
    appName: "webApp_Desktop",
    domain: `community.veehive.ai`,
    ...params,
  });
};

export const useAnalytics = () => {
  const searchParams = useSearchParams();
  var ref = searchParams.get(REF_KEY);
  var redirect = searchParams.get(REDIRECT);
  const location = usePathname();

  const storyUuid = storyStore((state: any) => state.storyUuid);
  const storyId = storyStore((state: any) => state.storyId);

  const handleAnalyticsEvent = useCallback(
    async (e: any) => {
      await fetch({
        organizationUuid: org_uuid,
        ...e?.detail,
      });
      if (ref) {
        await fetch({
          organizationUuid: org_uuid,
          origin: ref,
          ...e?.detail,
        });
        ref = null;
      }
    },
    [org_uuid]
  );

  useEffect(() => {
    window.addEventListener("analyticsEvent", handleAnalyticsEvent);
    return () => {
      window.removeEventListener("analyticsEvent", handleAnalyticsEvent);
    };
  }, [handleAnalyticsEvent]);

  useEffect(() => {
    if (org_uuid) {
      window.dispatchEvent(
        new CustomEvent<FetchParams>("analyticsEvent", {
          detail: {
            ctaName: "changePage",
            pageName: location.slice(1),
            organizationUuid: org_uuid,
          },
        })
      );
    }
  }, [location, org_uuid]);

  useEffect(() => {
    if (redirect && ref) {
      window.dispatchEvent(
        new CustomEvent<FetchParams>("analyticsEvent", {
          detail: {
            ctaName: "redirectUrl",
            pageName: location.slice(1),
            redirect: redirect,
            origin: ref,
          },
        })
      );
    }
  }, [location, redirect]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent<FetchParams>("analyticsEvent", {
        detail: {
          ctaName: "changeStory",
          pageName: location.slice(1),
          currentStoryId: storyId,
          request: storyId,
          storyUuid: storyUuid,
          origin: ref || "",
          // organizationUuid: hiveDetails.communityUuid,
        },
      })
    );
  }, [storyId]);

  //   const registerVal = useAppSelector(getEventRegisterTypeSelector);

  //   useEffect(() => {
  //     window.dispatchEvent(
  //       new CustomEvent<FetchParams>("analyticsEvent", {
  //         detail: {
  //           ctaName:
  //             registerVal === 1
  //               ? "Yes"
  //               : registerVal === 2
  //               ? "No"
  //               : registerVal === 3
  //               ? "Maybe"
  //               : "Not Clicked",
  //           pageName: location.pathname.slice(1),
  //         },
  //       })
  //     );
  //   }, [registerVal]);
};
