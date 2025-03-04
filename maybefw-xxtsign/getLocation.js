import axios from 'axios';
import { cookieSerialize } from "./cookietype.js";

export const getLocation = async (loginResult, activity) => {
  try {
    // console.log("=== 获取位置信息 ===");
    
    const response = await axios.get('https://mobilelearn.chaoxing.com/v2/apis/sign/getLocationLog', {
      params: {
        courseId: activity.courseId,
        DB_STRATEGY: 'COURSEID',
        STRATEGY_PARA: 'courseId',
        classId: activity.classId
      },
      headers: {
        cookie: cookieSerialize(loginResult),
      },
    });

    console.log("位置信息获取成功");
    return response.data.data[0];  // 返回位置数据
    
  } catch (error) {
    console.error("获取位置信息失败：", error.message);
    throw error;
  }
};

// 导出函数
// export { getLocation };