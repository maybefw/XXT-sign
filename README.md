# XXT-sign
学习通签到，个人开发代码乱见谅，遗憾的是签到码无法正常获取，学生身份请求接口不会返回signcode，原本所有包括二维码签到都是正常，后端前端已写，测试天塌了🫠，如有知道签到码如何获取/跟我深度讨论请联系v：_jianlou  邮箱：jile4149@gmail.com    
开源一个早期版本 供大家参考交流🫠
## FLOWCHART
![7c5c40721d3b23b853ee1116b389d78](https://github.com/user-attachments/assets/eaa8ee2d-b519-4af0-9ba7-1cf6c20d86e6)
## 效果实现
**opencv已成功过滑块 下载滑块验证码图片之后calculate_distance.py计算距离，vavavalidate.js过滑块 里面还有些逆向代码**      😇😇😇   
![080fc824330c60c5d757e4deb5773b1](https://github.com/user-attachments/assets/9a6e6ad6-fdbd-4925-b1a2-ab525a802fbc)

## 使用
```
git clone https://github.com/maybefw/XXT-sign.git
```
主文件index.js 输入账密 运行文件之会自动检测签到类型并执行签到，目前支持普通和位置签到（依据老师在教师端设置的位置签到），后续如有讨论成果会更新签到码手势和二维码   
` const loginResult = await userLogin('', '');//输入账号密码`
![59d735dfea2a12e3d41c90fcfee5658](https://github.com/user-attachments/assets/7e3841d3-770f-47da-94d7-18ac9829c0f0)

## 碎碎念
🫥🫥🫥后端前端都做结果正式签到暴雷了哈哈 小程序也做了：   
<img src="https://github.com/user-attachments/assets/868f2f0a-8ddc-44bf-9e53-d354d7daaa96" width="400" />
<img src="https://github.com/user-attachments/assets/09f70ae1-fe3a-4394-9ab6-225c6c0a04c7" width="400" />
