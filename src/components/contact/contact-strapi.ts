import axios, { isAxiosError, AxiosResponse } from "axios";
import { ContactRequest } from "../../types";

// post a contact request to strapi and send back a success or error message
export const postContactRequest = async (
  contactRequest: ContactRequest
): Promise<string> => {
  try {
    const { status, data }: AxiosResponse = await axios.post(
      "/api/contact-requests",
      {
        data: contactRequest,
      }
    );
    console.log("status", status);
    console.log("data: ", data);

    if (status === 200) return "Success!";
    return "Error!";
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return error.response.data.error.details.errors.name;
    }
    return "Error!";
  }
};
