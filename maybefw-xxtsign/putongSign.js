import axios from "axios";

import { getActiveId } from "./getActiveId.js";
import { PRESIGN } from "./preSign.js";
import { cookieSerialize } from "./cookietype.js";
import { getName } from "./getName.js";

const preSign = async (loginResult, activity) => {
  // const { _uid, JSESSIONID, route, vc3, ...otherCookies } = loginResult;
  const {  activeId, courseId, classId } = activity;//从activity里面解构所需要的参数！

  const url = `${PRESIGN.URL}?courseId=${courseId}&classId=${classId}&activePrimaryId=${activeId}&general=1&sys=1&ls=1&appType=15&&tid=&uid=${loginResult._uid}&ut=s`;

  const headers = {
    secure: true,
    headers: {
      Cookie: cookieSerialize(loginResult),
    },
  };

  await axios.get(url, headers);
  console.log("[预签]已请求");
};


// 签到函数
const putongSignIn = async (loginResult) => {
  try {
 

    // 获取活动ID
    const activity = await getActiveId(loginResult);
    console.log("Activity:", activity); // 调试输出
  
    const name = await getName(loginResult);

    const url = "https://mobilelearn.chaoxing.com/pptSign/stuSignajax";
    const params = {
      activeId: activity.activeId,
      uid: loginResult._uid,
      clientip: "",
      useragent: "",
      latitude: "-1",
      longitude: "-1",
      appType: "15",
      fid: loginResult.fid,
      name: name,//教师端可以看到的名字 不用ennicode之后 因为那样会乱码
    };

    const headers = {
      Host: "mobilelearn.chaoxing.com",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Sec-Fetch-Mode": "cors",
      Accept: "*/*",
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 (schild:abe86689be8cf966a70f7b865822148a) (device:iPhone16,1) Language/zh-Hans com.ssreader.ChaoXingStudy/ChaoXingStudy_3_6.3.5_ios_phone_202411011945_260 (@Kalimdor)_12837882616851377478",
      Connection: "keep-alive",
      Referer: `https://mobilelearn.chaoxing.com/newsign/preSign?courseId=${activity.courseId}&classId=${activity.classId}&activePrimaryId=${activity.id}&general=1&sys=1&ls=1&appType=15&uid=${loginResult._uid}&isTeacherViewOpen=0`,
      Cookie: cookieSerialize(loginResult),
    };

    console.log("Request Params:", params); // 调试输出
    console.log("Request Headers:", headers); // 调试输出
    await preSign(loginResult, activity);

    const response = await axios.get(url, { params, headers });
    console.log("签到结果:", response.data);
  } catch (error) {
    console.error("签到失败:", error);
  }
};

// 执行签到
putongSignIn(loginResult);
