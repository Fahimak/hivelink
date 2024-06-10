import { fetchFormsList } from "api/routes/Forms/forms";
import IslandLayout from "components/IslandLayout";
import FormsContainer from "views/Forms/FormsContainer";

async function getData() {
  const formsList = await fetchFormsList(); // The return value is *not* serialized

  if (!formsList) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch formsList");
  }

  return formsList;
}

export default async function Page() {
  const formsList = await getData();

  return (
    <IslandLayout>
      <FormsContainer formsList={formsList} />
    </IslandLayout>
  );
}
