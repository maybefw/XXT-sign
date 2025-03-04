import { userLogin } from "./login.js";
import { getActiveId } from "./getActiveId.js";
import { preSign } from "./preSign.js";
import { qrSign } from "./qrCodeSign.js";
import { getLocation } from "./getLocation.js";
import { getName } from "./getName.js";
import { codeSign } from "./codeSign.js";
import { addressSign } from "./addressSign.js";

(async function () {
    try {
        // 1. 登录获取 loginResult
        console.log("=== 开始登录 ===");
        const loginResult = await userLogin('', '');//输入账号密码
        console.log("登录成功");

        // 2. 获取用户名
        const name = await getName(loginResult);
        console.log(`你好，${name}`);

        // 3. 获取活动信息
        console.log("=== 获取活动信息 ===");
        const activity = await getActiveId(loginResult);
        if (!activity) {
            console.log("没有找到进行中的活动");
            return;
        }
        console.log("获取到活动：", activity);

        // 4. 预签到
        console.log("=== 执行预签到 ===");
        await preSign(loginResult, activity);

        // 5. 获取位置信息
        console.log("=== 获取位置信息 ===");
        const location = await getLocation(loginResult, activity);
        console.log("位置信息：", location);

        // 6. 根据活动类型执行不同的签到
        console.log("=== 执行签到 ===");
        switch (activity.otherId) {
            case 2: // 二维码签到
                console.log("执行二维码签到");
                const qrResult = await qrSign(loginResult, activity,location,name);
                console.log("二维码签到结果：", qrResult);
                break;
            
            case 4: // 位置签到
                console.log("执行位置签到");
                const addressResult = await addressSign(loginResult, activity, location,name);
                console.log("位置签到结果：", addressResult);
                break;
            
            case 0: // 普通签到
            case 3: // 手势签到
            case 5: // 签到码签到
                console.log(`执行普通/签到码/手势签到`);
                const codeResult = await codeSign(loginResult, activity, location,name);
                console.log("签到结果：", codeResult);
                break;
            
            default:
                console.log("未知的签到类型：", activity.otherId);
        }

        console.log("=== 签到完成 ===");

    } catch (error) {
        console.error("执行失败：", error.message);
        if (error.response) {
            console.error("错误详情：", error.response.data);
        }
    }
})();
export { loginResult };