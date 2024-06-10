import { alertStore } from "store/alert";

interface UseTriggerAlertReturn {
  toastError: any;
  toastSuccess: any;
  toastInfo: any;
}

export const useTriggerAlert = (): UseTriggerAlertReturn => {
  const updateAlert = alertStore((state: any) => state.updateAlert);

  const toastError = (message: string) => {
    updateAlert({ type: "error", message: message });
  };

  const toastSuccess = (message: string) => {
    updateAlert({ type: "success", message: message });
  };

  const toastInfo = (message: string) => {
    updateAlert({ type: "info", message: message });
  };

  return { toastError, toastSuccess, toastInfo };
};
