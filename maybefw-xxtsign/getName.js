// //获取用户名return name
// import { userLogin } from "./login.js";
import { cookieSerialize } from "./request.js";



import axios from "axios";
export const ACCOUNTMANAGE = {
  URL: "https://passport2.chaoxing.com/mooc/accountManage",
  METHOD: "GET",
};
//getAccountInfo的api是get而不是post 换成post就会请求失败！
export const getName = async (loginResult) => {
  const result = await axios.get(ACCOUNTMANAGE.URL, {
    headers: {
      Cookie: cookieSerialize(loginResult),
    },
  });
  const data = result.data;
  // console.log(data);

  const nameStart = data.indexOf('id="messageName"');
  if (nameStart === -1) {
    console.log("未找到用户名字段");
    return null;
  }

  const name = data
    .slice(data.indexOf(">", nameStart) + 1, data.indexOf("</span>", nameStart))
    .trim();
  // console.log("解析出的用户名:", name);
  return name;
};
