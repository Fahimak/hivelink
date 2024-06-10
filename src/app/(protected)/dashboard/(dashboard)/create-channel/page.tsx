import { HiveDetails } from "api/models/Hive/hiveDetails";
import { fetchHiveDetails } from "api/routes/Hive/hive";
import { org_uuid } from "constants/constants";
import CreateChannel from "views/CreateChannel";

async function getData() {
  const hiveDetails: HiveDetails = await fetchHiveDetails({
    organizationUuid: org_uuid,
  }); // The return value is *not* serialized
  if (!hiveDetails) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch hive details from home");
  }

  return { hiveDetails };
}

export default async function Page() {
  const { hiveDetails } = await getData();

  return <CreateChannel hiveDetails={hiveDetails} />;
}
