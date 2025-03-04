//此文件用于架设后端接口 想学习讨论的小伙伴可以自己架设试试
// import express from "express";
// import { userLogin } from "./login.js";
// import { getActiveId } from "./getActiveId.js";
// import { preSign } from "./preSign.js";
// import { qrSign } from "./qrCodeSign.js";
// import { getLocation } from "./getLocation.js";
// import { getName } from "./getName.js";
// import { codeSign } from "./codeSign.js";
// import { addressSign } from "./addressSign.js";

// const app = express();
// const port = 3000;

// app.use(express.json());

// // CORS 中间件
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// // 登录接口
// app.post("/api/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const loginResult = await userLogin(username, password);
//     const name = await getName(loginResult);

//     res.json({
//       success: true,
//       data: {
//         loginResult,
//         name,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// // 获取活动信息接口
// app.post("/api/activity", async (req, res) => {
//   try {
//     const { loginResult } = req.body;
//     const activity = await getActiveId(loginResult);

//     if (!activity) {
//       return res.json({
//         success: true,
//         data: null,
//         message: "没有找到进行中的活动",
//       });
//     }

//     // 预签到
//     await preSign(loginResult, activity);

//     // 获取位置信息
//     const location = await getLocation(loginResult, activity);

//     res.json({
//       success: true,
//       data: {
//         activity,
//         location,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// // 统一签到接口
// app.post("/api/sign", async (req, res) => {
//   try {
//     const { loginResult, activity, location, name } = req.body;
//     let signResult;

//     switch (activity.otherId) {
//       case 2: // 二维码签到
//         signResult = await qrSign(loginResult, activity, location, name);
//         break;

//       case 4: // 位置签到
//         signResult = await addressSign(loginResult, activity, location, name);
//         break;

//       case 0: // 普通签到
//       case 3: // 手势签到
//       case 5: // 签到码签到
//         signResult = await codeSign(loginResult, activity, location, name);
//         break;

//       default:
//         throw new Error(`未知的签到类型：${activity.otherId}`);
//     }

//     res.json({
//       success: true,
//       data: signResult,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// // 单独的二维码签到接口
// app.post("/api/sign/qrcode", async (req, res) => {
//   try {
//     const { loginResult, activity, location, name } = req.body;
//     const result = await qrSign(loginResult, activity, location, name);
//     res.json({
//       success: true,
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// // 单独的位置签到接口
// app.post("/api/sign/location", async (req, res) => {
//   try {
//     const { loginResult, activity, location, name } = req.body;
//     const result = await addressSign(loginResult, activity, location, name);
//     res.json({
//       success: true,
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// // 单独的普通签到接口
// app.post("/api/sign/code", async (req, res) => {
//   try {
//     const { loginResult, activity, location, name } = req.body;
//     const result = await codeSign(loginResult, activity, location, name);
//     res.json({
//       success: true,
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// app.listen(port, () => {
//   console.log(`服务器运行在 http://localhost:${port}`);
// });
