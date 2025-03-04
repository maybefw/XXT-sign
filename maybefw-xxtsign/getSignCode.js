const GETSIGNCODE = {
  URL: "https://mobilelearn.chaoxing.com/v2/apis/active/getPPTActiveInfo",
  METHOD: "GET",
};
import { cookieSerialize } from "./cookietype.js";



export const getSignCode = async (activeId,loginResult) => {
  try {
    // 设置请求的 URL
    const url = `${GETSIGNCODE.URL}?activeId=${activeId}&duid=&denc=`;

    // 设置请求头
    const headers = {
      Accept: "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,eo;q=0.7,ar;q=0.6",
      Connection: "keep-alive",
      Cookie:
         cookieSerialize(loginResult),
      DNT: "1",
      Referer: `https://mobilelearn.chaoxing.com/page/sign/endSign?activeId=${activeId}`,
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
      "X-Requested-With": "XMLHttpRequest",
    };

    // 发起 GET 请求
    const response = await axios.get(url, { headers });
    console.log(response);
    // 检查响应数据
    if (
      response.data &&
      response.data.activeInfo &&
      response.data.activeInfo.signCode
    ) {
      console.log("获取到的签到码:", response.data.activeInfo.signCode);
      return response.data.activeInfo.signCode;
    } else {
      console.log("未找到签到码！");
      return null;
    }
  } catch (error) {
    console.error("获取签到码时发生错误:", error);
    return null;
  }
};

