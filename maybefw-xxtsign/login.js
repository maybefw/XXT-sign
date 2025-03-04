//获取用户登陆时的cookie return loginResult
//获取uid fid v参数
import cryptojs from "crypto-js";
// import { request } from "./request.js";
import axios from "axios";
// let loginResult=null;
// const request = require("axios"); // 假设使用 axios 作为 HTTP 请求库

// 登录接口的 URL 和请求方法
const LOGIN = {
  URL: "https://passport2.chaoxing.com/fanyalogin",
  METHOD: "POST",
};
// const 
// 默认参数，用于请求时传递的额外信息
// const DefaultParams = {
//   someKey: "someValue", // 自定义默认参数
// };
const DefaultParams = {
  fid: "-1",
  pid: "-1",
  refer: "http%3A%2F%2Fi.chaoxing.com",
  _blank: "1",
  t: true,
  vc3: "",
  _uid: "",
  _d: "",
  uf: "",
  lv: "",
};

// 用户登录函数
export const userLogin = async (uname, password) => {
  // // 密码加密
  console.log('userLogin函数正在请求登录')
  // console.log("正在加密密码...");
  const key = cryptojs.enc.Utf8.parse("u2oh6Vu^HWe40fj");
  const encryptedPassword = cryptojs.DES.encrypt(password, key, {
    mode: cryptojs.mode.ECB,
    padding: cryptojs.pad.Pkcs7,
  });
  password = encryptedPassword.ciphertext.toString();
  // console.log("加密后的密码:", password);

  const formdata = `uname=${uname}&password=${password}&fid=-1&t=true&refer=https%253A%252F%252Fi.chaoxing.com&forbidotherlogin=0&validate=`;
  // console.log("表单数据已构造完成，准备发送请求...");

  // 发送请求
  try {
    // 发送 POST 请求
    const result = await axios.post(
      LOGIN.URL, // 替换为实际的登录 URL
      formdata,
      {
        method: LOGIN.METHOD,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );

    // console.log("服务器响应已接收，解析返回数据...");
    // 检查登录结果
    //    const response = JSON.parse(result.data);
    const response = result.data;
    if (response.status) {
      const cookies = result.headers["set-cookie"]; //这里的cookie还要往下传！牛牛的cookie！
      if (!cookies) {
        console.log("网络异常，换个环境重试");
        return "AuthFailed";
      }

      // 将 cookies 转换为对象
      const rt_cookies = cookies.reduce((acc, cookie) => {
        const [name, value] = cookie.split(";")[0].split("=");
        acc[name] = value;
        return acc;
      }, {});

      // console.log("登录成功");
      const loginResult = Object.assign({ ...DefaultParams }, rt_cookies); //这个loginresult！应该是可以多多应用！！
      // console.log(loginResult); //也就是下面这种格式
      //        {  fid: '465',
      // //   pid: '-1',
      // //   refer: 'http%3A%2F%2Fi.chaoxing.com',
      // //   _blank: '1',
      // //   t: true,
      // //   vc3: 'LgdmsNjOeSbLvo526renx4t1agNtZmTNRac9pBgPJkHxpoWKDbZ4pv%2FH71LnEr%2B3BBPBzey%2FoD%2FCKDlf3cwOvtKdgaNAr2j%2B2DJGbYIf%2BahM8MVbXFCQCVODe93zoweEjgksfEFwVCTOIW8RrPAw9C%2BBbbZ2nAKd8ohRkcs9%2B2k%3D82db291410207e5cd90018d4f738ea03',
      // //   _uid: '245412905',
      // //   _d: '1731421433835',
      // //   uf: 'd9387224d3a6095b0b2cbc623fa85d27d579c9673592c3a3af855dd78c21fb9bd0b8468ec783f3ebeca8d31984dc5fa4c49d67c0c30ca5047c5a963e85f110997523d062c48b5bcdce71fc6e59483dd3befdf0dd3f82f3fedfdfe360f22fbbad8d25a207f4287285',
      // //   lv: '2',
      // //   JSESSIONID: '477F9A65F323ABF91A57CEB90239F209',
      // //   UID: '245412905',
      // //   vc: '27C0D3639490B918598AC4A1536EC61E',
      // //   vc2: 'B0DBDCEE0504A210ABD61A272155101A',
      // //   cx_p_token: 'bc4b30440c414776a9694d1eb800696f',
      // //   p_auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIyNDU0MTI5MDUiLCJsb2dpblRpbWUiOjE3MzE0MjE0MzM4MzcsImV4cCI6MTczMjAyNjIzM30.dMnwBp-M0-WcOZBJURmpCWnMz3JKWyfhFG-RLRMpQ_Q',
      // //   xxtenc: '4d9c5e567504641616dd3e7eeceb10e4',
      // //   DSSTASH_LOG: 'C_38-UN_476-US_245412905-T_1731421433837',
      // //   route: '8dfd6a50c03ca82e777f66522126acd1'
      // // }
      //
      // fid=465; lv=2; xxtenc=4d9c5e567504641616dd3e7eeceb10e4; _uid=245412905; uf=d9387224d3a6095b0b2cbc623fa85d27d579c9673592c3a3af855dd78c21fb9b2c4b22656cf1eb334ea5cca5187e6beec49d67c0c30ca5047c5a963e85f110997523d062c48b5bcdce71fc6e59483dd3789394919f9dcea88fb6ad67ddc875e931b766465b6de9aa; _d=1735351064303; UID=245412905; vc=27C0D3639490B918598AC4A1536EC61E; vc2=E81FA64F92FD31483A77E3BE74C11A2C; vc3=X6Fn%2Ft1fsBBun7tSfh5cd0moEKiXuardWvBSE9l1jFO7dXQCydw%2FHLDDjhw%2FeFDFWu2LKRFSzactjdXdnwEW8JHbTeF9b7ClmymTCo8DHhYI3pnZGwYZgwIfvblIXEDc%2F5fxQVxyBuON4O%2BvQPmusEsqYW7O4FIS%2FWWMkeH%2FEZA%3D5eea6935eb646fb7a67beff19e38d99b; cx_p_token=7cfe6919d2add61ffcaef17e77bcb384; p_auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIyNDU0MTI5MDUiLCJsb2dpblRpbWUiOjE3MzUzNTEwNjQzMDQsImV4cCI6MTczNTk1NTg2NH0.0DgPVVFqW8_eFaVgVlfCews9HzqETc0eHZTtZMjS3NQ; DSSTASH_LOG=C_38-UN_476-US_245412905-T_1735351064305; source=""; spaceFid=465; spaceRoleId=3; tl=1; route=5f4c1fdb37f0b16738faa91aa181cd52; _industry=5; 247873331cpi=273696743; 247873331ut=s; 247873331t=1736002353688; 247873331enc=89a3170e24ac89578587d198a2d58905; JSESSIONID=D2D7CC4EEEE14B443EDB90489648AFD7; route_mobilelearn=86e7a70846ce68909417316c525001c6; route_widget=c793275138c3d8b2901f2d2ad7aaf9fe
      return loginResult; //将 DefaultParams 对象和 rt_cookies 对象合并，生成一个新的对象 loginResult，并返回该对象
    } //else {
    //   console.log("登录失败");
    //   return "AuthFailed";
    // }
  } catch (error) {
    console.error("请求出错:", error);
    return "AuthFailed";
  }
};
// userLogin('17205605735', 'jyk000000');
// export {userLogin}
// export const getLoginResult = () => loginResult;