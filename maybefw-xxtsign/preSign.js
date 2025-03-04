export const PRESIGN = {
  URL: "https://mobilelearn.chaoxing.com/newsign/preSign",
  METHOD: "GET",
};
//不预签就说你非法请求
import { cookieSerialize } from "./cookietype.js";
import axios from "axios";
export const preSign = async (loginResult, activity) => {
  const { activeId, courseId, classId } = activity;//不解构会报错未定义

  const url = `${PRESIGN.URL}?courseId=${courseId}&classId=${classId}&activePrimaryId=${activeId}&general=1&sys=1&ls=1&appType=15&tid=&uid=${loginResult._uid}&ut=s`;

  const headers = {
    headers: {
      Cookie: cookieSerialize(loginResult),
    },
  };

  await axios.get(url, headers);
  console.log("[预签] 已请求");
};
