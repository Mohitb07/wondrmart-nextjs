import { axiosInstance } from "@/api";

/**
 * Downloads the PDF invoice for a given order from the backend and triggers browser download.
 * @param orderId The ID of the order to download the invoice for.
 */
export const downloadOrderInvoice = async (orderId: string): Promise<void> => {
  if (!orderId) {
    throw new Error("Order ID is required to download invoice");
  }

  try {
    const response = await axiosInstance.get(`/order/${orderId}/invoice`, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice-${orderId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error: any) {
    if (error?.response?.data instanceof Blob) {
      try {
        const text = await error.response.data.text();
        const json = JSON.parse(text);
        throw new Error(json.message || "Failed to download invoice");
      } catch (parseErr: any) {
        if (parseErr.message && !parseErr.message.includes("JSON")) {
          throw parseErr;
        }
      }
    }
    throw error;
  }
};
