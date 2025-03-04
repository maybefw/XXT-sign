import axios from "axios";
import { cookieSerialize } from "./cookietype.js";


export const getQRcode = async (loginResult,activity) => {
  const response = await axios.get(
    "https://mobilelearn.chaoxing.com/v2/apis/sign/refreshQRCode",
    {
      params: {
        activeId: activity.activeId,
        time: Date.now(),
    },
    headers: {
      Cookie: cookieSerialize(loginResult),
    },
  });
    console.log(response.data);
    return response.data
};
// getQRcode(loginResult);
