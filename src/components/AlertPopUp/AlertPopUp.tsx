import ErrorAlert from "./ErrorAlert";
import InfoAlert from "./InfoAlert";
import SuccessAlert from "./SuccessAlert";

const AlertPopUp = () => {
  return (
    <>
      <ErrorAlert />
      <SuccessAlert />
      <InfoAlert />
    </>
  );
};

export default AlertPopUp;
