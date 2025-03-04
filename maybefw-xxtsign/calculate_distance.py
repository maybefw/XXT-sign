# # import ddddocr
# import sys
# import json
# import requests

# def calculate_distance(big_image_url, small_image_url):
#     # 下载图片
#     big_image = requests.get(big_image_url).content
#     small_image = requests.get(small_image_url).content

#     # 初始化 ddddocr
#     ocr = ddddocr.DdddOcr(det=False, ocr=False)
#     result = ocr.slide_match(big_image, small_image)

#     # 返回滑块距离
#     return result.get("target")[0]

# if __name__ == "__main__":
#     # 接收 Node.js 传递的参数
#     big_image_url = sys.argv[1]
#     small_image_url = sys.argv[2]

#     # 计算滑块距离
#     distance = calculate_distance(big_image_url, small_image_url)

#     # 返回 JSON 格式结果
#     print(json.dumps({"distance": distance}))
import cv2
import sys
import json

def calculate_distance(big_image_path, small_image_path):
    big_image = cv2.imread(big_image_path, cv2.IMREAD_COLOR)
    small_image = cv2.imread(small_image_path, cv2.IMREAD_COLOR)

    result = cv2.matchTemplate(big_image, small_image, cv2.TM_CCOEFF_NORMED)
    _, _, _, max_loc = cv2.minMaxLoc(result)

    return max_loc[0]  # 返回滑块需要移动的水平距离

if __name__ == "__main__":
    big_image_path = sys.argv[1]
    small_image_path = sys.argv[2]

    distance = calculate_distance(big_image_path, small_image_path)
    print(json.dumps({"distance": distance}))
