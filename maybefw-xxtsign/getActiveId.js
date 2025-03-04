import { getCourses } from "./getCourses.js";
import axios from "axios";
import { cookieSerialize } from "./cookietype.js";

const ACTIVELIST = {
    URL: "https://mobilelearn.chaoxing.com/v2/apis/active/student/activelist"
};

// 签到类型映射
const SIGN_TYPES = {
    0: "普通签到",
    2: "二维码签到",
    3: "手势签到",
    4: "位置签到",
    5: "签到码签到"
};

// 签到状态映射
const SIGN_STATUS = {
    1: "进行中",
    2: "已结束",
    3: "已过期"
};

// 检查单个课程的签到活动
const getActivity = async (course, cookies) => {
    try {
        const response = await axios.get(
            `${ACTIVELIST.URL}?fid=0&courseId=${course.courseId}&classId=${course.classId}&_=${Date.now()}`,
            {
                headers: {
                    Cookie: cookieSerialize(cookies)
                }
            }
        );

        const activeList = response.data?.data?.activeList;
        if (!activeList?.length) return null;

        // 获取最新的活动
        const activity = activeList[0];
        const otherId = Number(activity.otherId);
        const timeDiff = (Date.now() - activity.startTime) / 1000;

        // 检查活动是否有效（2小时内的进行中活动）
        if (otherId >= 0 && otherId <= 5 && 
            activity.status === 1 
            ) {
            
            console.log(`检测到有效活动：${activity.nameOne}`);
            // console.log(activity);

            return {
                activeId: activity.id,
                name: SIGN_TYPES[otherId] || "未知签到类型",
                signStatus: SIGN_STATUS[activity.status] || "未知状态",
                courseId: course.courseId,
                classId: course.classId,
                otherId,
                timele: `${Math.floor(timeDiff / 60)}分钟前`,
                nameFour: activity.nameFour,
                courseName: course.courseName,
                teacherName: course.teacherName
            };
        }
        return null;
    } catch (error) {
        console.error(`检查课程 ${course.courseId} 时出错:`, error.message);
        return null;
    }
};

// 检查所有课程的签到活动
const checkAllActivities = async (courses, loginResult) => {
    for (const course of courses) {
        const activity = await getActivity(course, loginResult);
        if (activity) return activity;
    }
    return null;
};

// 获取活动ID的主函数
export const getActiveId = async (loginResult) => {
    try {
        // if (!loginResult || loginResult === "AuthFailed") {
        //     console.log("无效的登录结果");
        //     return null;
        // }

        const courses = await getCourses(
            loginResult._uid,
            loginResult._d,
            loginResult.vc3
        );
        
        if (courses === "NoCourse") {
            console.log("没有可用的课程");
            return null;
        }

        return await checkAllActivities(courses, loginResult);
    } catch (error) {
        console.error("获取活动失败:", error.message);
        return null;
    }
};

