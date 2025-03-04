import { execFile } from "child_process";
import crypto from "crypto";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { cookieSerialize } from "./cookietype.js";
import fs from "fs";


// MD5 加密工具
const md5 = (data) =>
  crypto.createHash("md5").update(data, "utf8").digest("hex");

// UUID 生成工具
const generateUUID = () => uuidv4();

// Debug 打印工具
const debug = (label, data) => console.log(`${label}:`, data);
const uuid = generateUUID();
// import { execFile } from "child_process";
const iv = md5(`Qt9FIw9o4pwRjOyqM6yizZBh682qN2TUslide${Date.now()}${uuid}`);
const calculateDistanceWithPython = async (bigImagePath, smallImagePath) => {
  return new Promise((resolve, reject) => {
    execFile(
      "python",
      ["calculate_distance.py", bigImagePath, smallImagePath],
      (error, stdout, stderr) => {
        if (error) {
          console.error("调用 Python 脚本失败:", stderr);
          reject(error);
        } else {
          try {
            const result = JSON.parse(stdout);
            resolve(result.distance);
          } catch (parseError) {
            reject(parseError);
          }
        }
      }
    );
  });
};

const slideVerify = async (distance, token, iv,loginResult) => {
  // 不再尝试分割token，直接使用
  const captchaId = "Qt9FIw9o4pwRjOyqM6yizZBh682qN2TU"; // 这个值似乎是固定的

  console.log("验证参数:", {
    distance,
    token,
    captchaId,
    iv,
  });

    const headers = {
      //这里的headers坚决不能改！
    Accept: "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,eo;q=0.7,ar;q=0.6",
    Connection: "keep-alive",
    Cookie: cookieSerialize(loginResult),
    DNT: "1",
    Referer:
      "https://mobilelearn.chaoxing.com/page/sign/signIn?courseId=247873331&classId=109887484&activeId=4000109609823&fid=0&timetable=0",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "no-cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
  };

  const params = new URLSearchParams({
    callback: "cx_captcha_function",
    captchaId,
    type: "slide",
    token, // 直接使用传入的token
    textClickArr: JSON.stringify([{ x: Math.round(distance) }]),
    coordinate: "[]",
    runEnv: "10",
    version: "1.1.20",
    t: "a",
    iv,
    _: Date.now().toString(),
  });

  const url = `https://captcha.chaoxing.com/captcha/check/verification/result?${params.toString()}`;
  console.log("完整请求URL:", url);

  try {
    const response = await axios.get(url, {
      headers,
      transformResponse: [(data) => data],
    });

    console.log("原始响应:", response.data);

    // 处理JSONP响应
    const match = response.data.match(/cx_captcha_function\((.*)\)/);
    if (!match) {
      throw new Error("无法解析JSONP响应");
    }

    const result = JSON.parse(match[1]);

    // 检查验证结果
    if (result.error === 1) {
      throw new Error(`验证失败: ${result.msg}`);
    }

      console.log(result);
      if (result.extraData) {
        const extraData = JSON.parse(result.extraData);
        //这里返回整个函数最关键的部分那就是validate
        return {
          validate: extraData.validate,
        };
      }
  } catch (error) {
    console.error("验证请求失败:", error.message);
    throw error;
  }
};
export const getCaptcha = async (maxRetries = 5, retryDelay = 1000, loginResult) => {
 if (!loginResult) {
   throw new Error("loginResult is required");
 }

 const cookies = cookieSerialize(loginResult);
 const headers = {
   cookie: cookies,
 };
    
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const confResponse = await axios.get(
        "https://captcha.chaoxing.com/captcha/get/conf",
        {
          params: {
            callback: "cx_captcha_function",
            captchaId: "Qt9FIw9o4pwRjOyqM6yizZBh682qN2TU",
            _: Date.now(),
          },
          headers,
        }
      );

      const confData = confResponse.data;
      debug("Conf Response", confData);

      const serverTimeMatch = confData.match(/"t":(\d+)/);
      if (!serverTimeMatch) {
        throw new Error("无法从 conf 响应中提取 serverTime");
      }
      const serverTime = serverTimeMatch[1];
      debug("提取的 serverTime", serverTime);

      //   const uuid = generateUUID();
      const captchaKey = md5(`${uuid}${serverTime}`);
      const tokenPart1 = md5(
        `${serverTime}Qt9FIw9o4pwRjOyqM6yizZBh682qN2TUslide${captchaKey}`
      );
      const tokenPart2 = (parseInt(serverTime) + 0x493e0).toString();
      const token = `${tokenPart1}:${tokenPart2}`;
      //   const iv = md5(`Qt9FIw9o4pwRjOyqM6yizZBh682qN2TUslide${Date.now()}${uuid}`);

      debug("生成的参数", { captchaKey, token, iv });

      const payload = {
        callback: "cx_captcha_function",
        captchaId: "Qt9FIw9o4pwRjOyqM6yizZBh682qN2TU",
        type: "slide",
        version: "1.1.20",
        captchaKey,
        token,
        referer:
          "https://mobilelearn.chaoxing.com/page/sign/signIn?courseId=247873331&classId=109887484&activeId=4000109465328&fid=0&timetable=0",
        iv: iv,
        _: Date.now(),
      };

      const captchaResponse = await axios.get(
        "https://captcha.chaoxing.com/captcha/get/verification/image",
        { params: payload, headers }
      );

      const responseData = captchaResponse.data;
      console.log("请求的验证码信息：", responseData);

      const jsonpMatch = responseData.match(/cx_captcha_function\((.*)\)/);
      if (!jsonpMatch) {
        throw new Error("无法解析 JSONP 响应");
      }

      const parsedResponse = JSON.parse(jsonpMatch[1]);

      const bigImage = parsedResponse.imageVerificationVo.shadeImage;
      const smallImage = parsedResponse.imageVerificationVo.cutoutImage;
      const validateToken = parsedResponse.token;

      debug("提取的图片和 token", { bigImage, smallImage, validateToken });
      const bigImagePath = "bigImage.jpg";
      const smallImagePath = "smallImage.jpg";

      // 下载验证码图片
      const downloadImage = async (url, path) => {
        const response = await axios.get(url, { responseType: "arraybuffer" });
        fs.writeFileSync(path, response.data);
      };

      await downloadImage(bigImage, bigImagePath);
      await downloadImage(smallImage, smallImagePath);

      // 使用 Python 计算滑块距离
      const distance = await calculateDistanceWithPython(
        bigImagePath,
        smallImagePath
      );
      debug("计算的滑块距离", distance);
      const verifyResponse = await slideVerify(
        Math.round(distance),
        validateToken,
        iv,
        loginResult//这里需要传入loginResult而且不能改！不能改hearders！
      );
      
      // 检查验证结果
      if (!verifyResponse?.validate) {
        console.log(`第 ${attempt} 次尝试未获取到validate，等待重试...`);
        if (attempt === maxRetries) {
          throw new Error("多次尝试后仍未获取到validate");
        }
        // 等待一段时间后重试
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        continue;
      }

      console.log(`第 ${attempt} 次尝试成功获取validate`);
      return verifyResponse.validate;
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      console.log(`第 ${attempt} 次尝试失败，等待重试...`, error.message);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};

// getCaptcha().catch((err) => console.error(err));
