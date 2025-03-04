import axios from "axios";
import { cookieSerialize } from "./cookietype.js";
import { getCaptcha } from "./vavavalidate.js";

export const addressSign = async (loginResult, activity, location, name) => {
  try {
    const { latitude, longitude, address } = location;

    // const { activeId } = activity;
    // const {fid}= loginResult.fid;
    const url = `https://mobilelearn.chaoxing.com/pptSign/stuSignajax`;
    const params = {
      activeId: activity.activeId,
      // uid: loginResult._uid,
      fid: loginResult.fid,
      name: name,
      address: address,
      latitude: latitude,
      longitude: longitude,
      // validate: validate
    };
    const headers = {
      Cookie: cookieSerialize(loginResult),
    };
    // await preSign(loginResult, activity);
    // 签到请求
    let response = await axios.get(url, { params, headers });

    // 处理验证码
    if (response.data.includes("validate")) {
      console.log(`任务${activity.activeId}需要验证码`);

      // 获取验证码，包含重试机制
      let validate = null;
      for (let i = 0; i < 3; i++) {
        try {
          validate = await getCaptcha(5, 1000, loginResult);
          if (validate) break;
        } catch (error) {
          console.log(`第${i + 1}次获取验证码失败:`, error);
          if (i < 2) await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      if (!validate) {
        throw new Error("无法获取有效验证码");
      }

      // 带验证码重新签到
      params.validate = validate;
      response = await axios.get(url, { params, headers });
    }
    console.log(response.data);
    console.log(`谁说这签到拉呀 这签到可太棒了`);

    // 任务之间添加间隔
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return response.data;
  } catch (error) {
    console.error(`签到失败:`, error.message);
  }
};

// export { addressSign };
