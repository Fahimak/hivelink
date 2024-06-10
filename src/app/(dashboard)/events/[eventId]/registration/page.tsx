import { EventsModel, UserQRData } from "api/models/Hive/events";
import {
  fetchEventDetails,
  fetchEventQrDetails,
} from "api/routes/Events/events";
import IslandLayout from "components/IslandLayout";
import LineBreak from "components/LineBreak";
import { org_uuid } from "constants/constants";
import Link from "next/link";
import ClientRegistration from "./components/ClientRegistration";
import { formatDateToDDMMYY } from "views/Events/components/EventUserDetails";
import Loading from "app/loading";

async function getData(passedId: string, passedProfileId: string) {
  const event: EventsModel = await fetchEventDetails({
    eventIdentifier: passedId,
  }); // The return value is *not* serialized

  if (!event) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch event details");
  }

  const qrDetails: UserQRData = await fetchEventQrDetails({
    eventUuid: event?.event.eventUuid,
    organizationUuid: org_uuid,
    profileId: passedProfileId || "",
  }); // The return value is *not* serialized

  if (!qrDetails) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch qrDetails");
  }

  return { event, qrDetails };
}

const Page = async ({
  params,
  searchParams,
}: {
  params: { eventId: string };
  searchParams: { [key: string]: string };
}) => {
  const { event, qrDetails } = await getData(
    params.eventId,
    searchParams["user"]
  );

  return (
    <IslandLayout>
      {qrDetails ? (
        <>
          <div className="home_event_body_org_info">
            <div className="home_event_body_org_info_content">
              <div className="title_and_limit">
                <div>
                  <h2 className="fs-large font-bold text-2xl">
                    {qrDetails?.userSummary.userName}
                  </h2>
                </div>
                <img
                  src={
                    qrDetails?.userSummary.profilePhoto ||
                    "https://veehivestage-images.s3.us-east-2.amazonaws.com/profileImage/defaultAvatar.png"
                  }
                  alt="hive_owner_profile"
                  className="home_event_thumbnail"
                />
              </div>
              <p className="fs-medium">{qrDetails?.userSummary.email || ""}</p>
              <p className="fs-medium">{qrDetails?.userSummary.phone || ""}</p>
            </div>
          </div>
          {!!qrDetails?.formDetails && qrDetails.formDetails.length > 0 && (
            <div className="p-4">
              <LineBreak />
              <h1 className="font-bold text-3xl">Form Details</h1>
              <LineBreak />
              <div className="normal_20-p">
                {qrDetails.formDetails.map((data, idx) => {
                  return (
                    <>
                      {data.type === "date" ? (
                        <div key={idx}>
                          <h4 className="fs-large font-bold">
                            {data.fieldName}
                          </h4>
                          <LineBreak />
                          <p className="fs-medium">
                            Response: {formatDateToDDMMYY(data.fieldValue)}
                            {/* {format(
                                parseISO(new Date(data.fieldValue).toString()),
                                "MMM d, yyyy"
                              )} */}
                          </p>
                          <LineBreak />
                        </div>
                      ) : (
                        <div key={idx}>
                          <h4 className="fs-large font-bold">
                            {data.fieldName}
                          </h4>
                          <LineBreak />
                          <p className="fs-medium">
                            Response:{" "}
                            {data.fieldValue ||
                              data.options[0] ||
                              "No Response"}
                          </p>
                          <LineBreak />
                        </div>
                      )}
                    </>
                  );
                })}
                <LineBreak />
                <Link href="/dashboard/home" className="primaryBtn mt_buttn_2">
                  Done
                </Link>
              </div>
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
      <ClientRegistration
        event={event.event}
        qrDetails={qrDetails}
        user={searchParams["user"] || ""}
      />
    </IslandLayout>
  );
};

export default Page;
