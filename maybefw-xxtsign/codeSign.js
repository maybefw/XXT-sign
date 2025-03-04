import axios from "axios";
import { cookieSerialize } from "./cookietype.js";
import { getName } from "./getName.js";
import { getCaptcha } from "./vavavalidate.js";


const GETSIGNCODE = {
    URL: "https://mobilelearn.chaoxing.com/v2/apis/active/getPPTActiveInfo",
    METHOD: "GET",
};

// 获取签到码
const getSignCode = async (activeId, loginResult) => {
    try {
        const response = await axios.get(GETSIGNCODE.URL, {
            params: {
                activeId: activeId,
                duid: "",
                denc: "",
            },
            headers: {
                Accept: "application/json, text/javascript, */*; q=0.01",
                Cookie: cookieSerialize(loginResult),
            },
        });
        return response.data.data.signCode;
    } catch (error) {
        console.log(response.data);
        console.error("获取 signCode 失败:", error);
        return null;
    }
};

export const codeSign = async (loginResult, activity) => {
    try {
        console.log("=== 开始普通/签到码/手势签到 ===");
        
        // 获取用户名字
        const name = await getName(loginResult);
        
        // 获取签到码
        const signCode = await getSignCode(activity.activeId, loginResult);
        
        const url = "https://mobilelearn.chaoxing.com/pptSign/stuSignajax";
        const params = {
            activeId: activity.activeId,
            uid: loginResult._uid,
            fid: loginResult.fid,
            name: name,
            appType: "15",
            signCode
        };

        const headers = {
            Cookie: cookieSerialize(loginResult)
        };

        // 签到请求
        let response = await axios.get(url, { params, headers });
        console.log(response);

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
                    if (i < 2) await new Promise(resolve => setTimeout(resolve, 1000));
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
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        return response.data;

    } catch (error) {
        console.error("签到失败：", error.message);
        throw error;
    }
};

