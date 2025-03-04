# # from gc import callbacks


# # def __init__(self):
# #     self.headers={headers: {
# #       Accept: "*/*",
# #       "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,eo;q=0.7,ar;q=0.6",
# #       Connection: "keep-alive",
# #       Cookie:
# #         'fid=465; lv=2; xxtenc=4d9c5e567504641616dd3e7eeceb10e4; tl=1; _uid=245412905; uf=d9387224d3a6095b0b2cbc623fa85d27d579c9673592c3a3af855dd78c21fb9b0e921afc60c89936a25542508471eeb9c49d67c0c30ca5047c5a963e85f110997523d062c48b5bcdce71fc6e59483dd3befdf0dd3f82f3fe2cf896a06d8c81d72adea3c5d6bae2c8; _d=1731823787020; UID=245412905; vc=27C0D3639490B918598AC4A1536EC61E; vc2=B618C9EEFB617EF5C66A3F4A693A83FC; vc3=KTj%2FdO6Ds3xE5XHDdY3gM4aRiMv63lEYEZhU0OlQN0kDYigM9irkwBmCB0U83heSwMkIr%2BUWMXsgFQNPJgevVKn6zqSCgqtvO5KCGQmgNMTbzMt3D8xuxWEi1CDB2%2FJeB5phDIB8PpHyp9aUFNG2lAjTFES%2BBt5f%2B%2B24NCT9vD8%3Dad7db66dc83e998ec16e177b04d27460; cx_p_token=ea95ed1769f778ebd94190b4795f594c; p_auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIyNDU0MTI5MDUiLCJsb2dpblRpbWUiOjE3MzE4MjM3ODcwMjEsImV4cCI6MTczMjQyODU4N30.EiyZHRI5mwgrVa_i2UFB8WoiDHn-rA6YBzcAOVT_kwQ; DSSTASH_LOG=C_38-UN_476-US_245412905-T_1731823787021; source=""; spaceFid=465; spaceRoleId=3; route=5b2d0f0178496f9905a777a89b40fc27',
# #       DNT: "1",
# #       Referer:
# #         "https://mobilelearn.chaoxing.com/page/sign/signIn?courseId=247873331&classId=109887484&activeId=4000109117812&fid=0&timetable=0",
# #       "Sec-Fetch-Dest": "script",
# #       "Sec-Fetch-Mode": "no-cors",
# #       "Sec-Fetch-Site": "same-site",
# #       "User-Agent":
# #         "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
# #       "sec-ch-ua":
# #         '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
# #       "sec-ch-ua-mobile": "?1",
# #       "sec-ch-ua-platform": '"Android"',
# #     },
# #   }
# # );}

# # def TollRequest(self,url,method=None ,params=None,data=None):...
# #  def MD5_encrpted(self,test):
# #    md5=hashlib.md5()
# #    md5.update(test.encode(encoding='utf-8'))
# #    entcrpted_test=md5.hexdigest()
# #    return entcrpted_test
# # def Get_captcha(self):
# #   params= {
# #       callback: "cx_captcha_function",
# #       captchaId: "Qt9FIw9o4pwRjOyqM6yizZBh682qN2TU",
# #       _: "1731915816773",
# #     },
# # urls="https://captcha.chaoxing.com/captcha/get/conf"
# # server_time=self.TollRequest(url=urls,method="get",params=params).text[25,38]
# # uuid1=uuid.uuid4()

# # captkey=self.MD5_encrpted((uuid1)+server_time)
# # token=self.MD5_encrpted(server_time+"输入Q开头的字符串"+"slide"+captchakey)+''+str(init(server_time)+0x493e0)
# # time1=round(time.time()+1000)#当前时间戳
# # iv=self.MD5_encrpted("输入Q开头的字符串"+"slide"+str(time1)+str(uuid1))
# # url="https://captcha.chaoxing.com/captcha/get/verification/image"
# # params={
# #     callback:"cx_captcha_function",
# #     captchaId:"Qt9FIw9o4pwRjOyqM6yizZBh682qN2TU",
# #     _:time1,
# # }
# # response=self.TollRequest(url=url,method="get",params=params).text
# # bigImage=re.findall(r'"bigImage":"(.*?)"',response)[0]
# # smallImage=re.findall(r'"smallImage":"(.*?)"',response)[0]
# # token1=re.findall(r'"token":"(.*?)"',response)[0]
# # distance1=self.getDistance(bigImage,smallImage)
# # print(distance1)
# # self.slide_verify(distance1,token1,iv,)

# # # return bigImage,smallImage,token,iv
# # print(bigImage,smallImage)

# # # def slide_verify(self,distance,token,iv):
# # #     params: {
# # #       "callback": "cx_captcha_function",
# # #       "captchaId": "Qt9FIw9o4pwRjOyqM6yizZBh682qN2TU", 
# # #       "type": "slide",
# # #       "version": "1.1.20", 
# # #       "captchaKey": "7d34424d950cac5ac315ad3ff48bc82d",
# # #       "token": token,
# # #       "textClickArr": '[{"x":%d}]' % distance
# # #       "referer":
# # #         "https://mobilelearn.chaoxing.com/page/sign/signIn?courseId=247873331&classId=109887484&activeId=4000109117812&fid=0&timetable=0",
# # #       "iv": str(round(time.time*1000))
      
# # #     }
# # #     url="https://captcha.chaoxing.com/captcha/check/verification/result"
# # #     response=self.TollRequest(url=url,method="get",params=params).text
# # #     print(response)
# # def slide_verify(self, distance, token, iv):
# #     params = {  # 使用等号而不是冒号
# #       "callback": "cx_captcha_function",
# #       "captchaId": "Qt9FIw9o4pwRjOyqM6yizZBh682qN2TU", 
# #       "type": "slide", 
# #       "version": "1.1.20", 
# #       "captchaKey": "7d34424d950cac5ac315ad3ff48bc82d",
# #       "token": token,
# #       'textClickArr': '[{''x:%d}]' % distance,
# #       "referer": "https://mobilelearn.chaoxing.com/page/sign/signIn?courseId=247873331&classId=109887484&activeId=4000109117812&fid=0&timetable=0",
# #       "iv": str(round(time.time() * 1000))  # 修正 time.time() 的调用
# #     }
# #     # ... 其余代码保持不变 ...
# # def getDistance(self,bigImage,smallImage):
# #    smallImage=self.TollRequest(url=bigImage,method="get").content
# #    bigImage=self.TollRequest(url=bigImage,method="get").content
# #    result=self.slide_match(bigImage,smallImage,simple_target=True)
# #    return result ["target"][0]
# # if __name__=="__main__":
# #     validate=Validate()
# #     validate.Get_captcha()
# import hashlib
# import re
# import time
# import uuid
# import requests  # 假设 TollRequest 是基于 requests 库实现的

# class Validate:
#     def __init__(self):
#         self.headers = {
#             "Accept": "*/*",
#             "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,eo;q=0.7,ar;q=0.6",
#             "Connection": "keep-alive",
#             "Cookie": 'fid=465; lv=2; xxtenc=4d9c5e567504641616dd3e7eeceb10e4; tl=1; _uid=245412905; uf=d9387224d3a6095b0b2cbc623fa85d27d579c9673592c3a3af855dd78c21fb9b0e921afc60c89936a25542508471eeb9c49d67c0c30ca5047c5a963e85f110997523d062c48b5bcdce71fc6e59483dd3befdf0dd3f82f3fe2cf896a06d8c81d72adea3c5d6bae2c8; _d=1731823787020; UID=245412905; vc=27C0D3639490B918598AC4A1536EC61E; vc2=B618C9EEFB617EF5C66A3F4A693A83FC; vc3=KTj%2FdO6Ds3xE5XHDdY3gM4aRiMv63lEYEZhU0OlQN0kDYigM9irkwBmCB0U83heSwMkIr%2BUWMXsgFQNPJgevVKn6zqSCgqtvO5KCGQmgNMTbzMt3D8xuxWEi1CDB2%2FJeB5phDIB8PpHyp9aUFNG2lAjTFES%2BBt5f%2B%2B24NCT9vD8%3Dad7db66dc83e998ec16e177b04d27460; cx_p_token=ea95ed1769f778ebd94190b4795f594c; p_auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIyNDU0MTI5MDUiLCJsb2dpblRpbWUiOjE3MzE4MjM3ODcwMjEsImV4cCI6MTczMjQyODU4N30.EiyZHRI5mwgrVa_i2UFB8WoiDHn-rA6YBzcAOVT_kwQ; DSSTASH_LOG=C_38-UN_476-US_245412905-T_1731823787021; source=""; spaceFid=465; spaceRoleId=3; route=5b2d0f0178496f9905a777a89b40fc27',
#             "DNT": "1",
#             "Referer": "https://mobilelearn.chaoxing.com/page/sign/signIn?courseId=247873331&classId=109887484&activeId=4000109117812&fid=0&timetable=0",
#             "Sec-Fetch-Dest": "script",
#             "Sec-Fetch-Mode": "no-cors",
#             "Sec-Fetch-Site": "same-site",
#             "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
#             "sec-ch-ua": '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
#             "sec-ch-ua-mobile": "?1",
#             "sec-ch-ua-platform": '"Android"',
#         }

#     def TollRequest(self, url, method="get", params=None, data=None):
#         if method.lower() == "get":
#             return requests.get(url, headers=self.headers, params=params)
#         elif method.lower() == "post":
#             return requests.post(url, headers=self.headers, data=data)
#         else:
#             raise ValueError("Unsupported HTTP method")

#     def MD5_encrpted(self, test):
#         md5 = hashlib.md5()
#         md5.update(test.encode(encoding='utf-8'))
#         entcrpted_test = md5.hexdigest()
#         return entcrpted_test

#     def Get_captcha(self):
#         params = {
#             "callback": "cx_captcha_function",
#             "captchaId": "Qt9FIw9o4pwRjOyqM6yizZBh682qN2TU",
#             "_": "1731915816773",
#         }
#         urls = "https://captcha.chaoxing.com/captcha/get/conf"
#         server_time = self.TollRequest(url=urls, method="get", params=params).text[25:38]
#         uuid1 = str(uuid.uuid4())

#         captkey = self.MD5_encrpted(uuid1 + server_time)
#         token = self.MD5_encrpted(server_time + "输入Q开头的字符串" + "slide" + captkey) + str(int(server_time) + 0x493e0)
#         time1 = round(time.time() * 1000)  # 当前时间戳
#         iv = self.MD5_encrpted("输入Q开头的字符串" + "slide" + str(time1) + uuid1)
#         url = "https://captcha.chaoxing.com/captcha/get/verification/image"
#         params = {
#             "callback": "cx_captcha_function",
#             "captchaId": "Qt9FIw9o4pwRjOyqM6yizZBh682qN2TU",
#             "type": "slide",
#             "version": "1.1.20",
#             "captchaKey": "7d34424d950cac5ac315ad3ff48bc82d",
#             "token": token,
#             "textClickArr": '[{"x":%d}]'
#             "referer": "https://mobilelearn.chaoxing.com/page/sign/signIn?courseId=247873331&classId=109887484&activeId=4000109117812&fid=0&timetable=0",
#             "iv": str(round(time.time() * 1000))
#         }
#         response = self.TollRequest(url=url, method="get", params=params).text
#         bigImage = re.findall(r'"bigImage":"(.*?)"', response)[0]
#         smallImage = re.findall(r'"smallImage":"(.*?)"', response)[0]
#         token1 = re.findall(r'"token":"(.*?)"', response)[0]
#         distance1 = self.getDistance(bigImage, smallImage)
#         print(distance1)
#         self.slide_verify(distance1, token1, iv)

#         print(bigImage, smallImage)

#     def slide_verify(self, distance, token, iv):
#         params = {
#             "callback": "cx_captcha_function",
#             "captchaId": "Qt9FIw9o4pwRjOyqM6yizZBh682qN2TU",
#             "type": "slide",
#             "version": "1.1.20",
#             "captchaKey": "7d34424d950cac5ac315ad3ff48bc82d",
#             "token": token,
#             "textClickArr": '[{"x":%d}]' % distance,
#             "referer": "https://mobilelearn.chaoxing.com/page/sign/signIn?courseId=247873331&classId=109887484&activeId=4000109117812&fid=0&timetable=0",
#             "iv": str(round(time.time() * 1000))
#         }
#         url = "https://captcha.chaoxing.com/captcha/check/verification/result"
#         response = self.TollRequest(url=url, method="get", params=params).text
#         print(response)

#     def getDistance(self, bigImage, smallImage):
#         smallImage = self.TollRequest(url=smallImage, method="get").content
#         bigImage = self.TollRequest(url=bigImage, method="get").content
#         result = self.slide_match(bigImage, smallImage, simple_target=True)
#         return result["target"][0]

#     def slide_match(self, bigImage, smallImage, simple_target):
#         # 这里假设 slide_match 是一个已经实现的函数
#         # 返回一个字典，包含目标位置
#         return {"target": [42]}  # 示例返回值

# if __name__ == "__main__":
#     validate = Validate()
#     validate.Get_captcha()