import axios from "axios";
import { cookieSerialize } from "./cookietype.js";
import { getQRcode } from "./getQRcode.js";
import { getCaptcha } from "./vavavalidate.js";

export const qrSign = async (loginResult, activity, location,name) => {
    try {
        console.log("=== 开始二维码签到 ===");

        // 获取二维码信息，获取 enc
        const qrcode = await getQRcode(loginResult,activity);
        const enc = qrcode.data.enc;
        console.log("获取到的 enc:", enc);

        // 构造签到请求参数
        const params = {
            enc,
            name:name,
            activeId: activity.activeId,
            uid: loginResult._uid,
            location: JSON.stringify({
                result: "1",
                mockData: { probability: 0 },
                address: location.address,
                latitude: location.latitude,
                longitude: location.longitude,
                altitude: 32.6744,
            }),
            fid: loginResult.fid
        };

        const headers = {
            Cookie: cookieSerialize(loginResult)
        };

        // 发送签到请求
        let response = await axios.get(
            "https://mobilelearn.chaoxing.com/pptSign/stuSignajax",
            {
                params,
                headers
            }
        );

        // 处理验证码
        if (response.data.includes("validate")) {
            console.log(`任务${activity.activeId}需要验证码`);

            // 获取验证码，包含重试机制
            let validate = null;
            for (let i = 0; i < 3; i++) {
                try {
                    validate = await getCaptcha(5, 1000,loginResult);
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
            response = await axios.get(
                "https://mobilelearn.chaoxing.com/pptSign/stuSignajax", 
                { 
                    params, 
                    headers 
                }
            );
        }

        console.log(response.data);
        console.log(`谁说这签到拉呀 这签到可太棒了`);

        // 任务之间添加间隔
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        return response.data;

    } catch (error) {
        console.error("二维码签到失败:", error);
        throw error;
    }
};

// 导出函数
// export { QRSign };
