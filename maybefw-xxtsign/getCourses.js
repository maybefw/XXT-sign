


import * as cheerio from "cheerio";

import axios from "axios";
 const COURSELIST = {
  URL: "https://mooc1-1.chaoxing.com/visit/courselistdata",
  METHOD: "POST",
};
export const getCourses = async (_uid, _d, vc3) => {
  console.log("正在请求课程列表...");
  const formdata = "courseType=1&courseFolderId=0&courseFolderSize=0";

  try {
    console.log("请求参数:", {
      uid: _uid,
      d: _d,
      vc3: vc3,
    });

    const result = await axios.post(
      COURSELIST.URL,
      formdata, // 注意：formdata 应该是第二个参数
      {
        headers: {
          Accept: "text/html, */*; q=0.01",
          "Accept-Encoding": "gzip, deflate",
          "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8;",
          Cookie: `_uid=${_uid}; _d=${_d}; vc3=${vc3}`,
        },
      }
    );

    // console.log("服务器响应:", result.data);
    //是一个html，有很多课程的信息，courseid和clazzId等等
    //现在把html中的courseid和clazzId提取出来放到courses数组中

    const data = result.data;
    //   console.log(data)
    const courses = [];
    const $ = cheerio.load(data);

    // // 使用正则表达式匹配所有课程信息
    // const coursePattern = /courseId="(\d+)"\s+clazzId="(\d+)"/g;
    // let match;

    // while ((match = coursePattern.exec(data)) !== null) {
    //   courses.push({
    //     courseId: match[1],
    //     classId: match[2],
    //   });
    // }
    $(".course").each((_index, element) => {
      const $course = $(element);
      const courseId = $course.attr("courseid"); // 改为小写
      const classId = $course.attr("clazzid"); // 改为小写
      const courseName = $course.find(".course-name").attr("title");
      const teacherName = $course.find(".line2").last().attr("title");
      //   const schoolName = $course.find(".margint10").attr("title") || "";

      courses.push({
        courseId,
        classId,
        courseName,
        teacherName: teacherName?.replace(/&nbsp;等$/, ""),
        // schoolName,
      });
    });

    if (courses.length === 0) {
      console.log("无课程可查。");
      return "NoCourse";
    }
    // 打印课程信息用于调试
    // courses.forEach((course) => {
    //   console.log(`课程: ${course.courseName}, 教师: ${course.teacherName}`);
    // });
    courses.forEach((course) => {
      console.log(`课程: ${course.courseName}`);
      console.log(`教师: ${course.teacherName}`);
      // console.log(`学校: ${course.schoolName}`);
      console.log("------------------------");
    });

    // console.log("获取的课程列表:", courses);
    return courses;

    //    课程已结束                                                                          </a>

    //                                                                    </div>
    //                    <div class="course-info">
    //                        <h3 class="inlineBlock">
    //                                                                                        <a  class="color1" href="https://mooc1-1.chaoxing.com/mooc-ans/visit/stucoursemiddle?courseid=204165664&clazzid=63937455&vc=1&cpi=273696743&ismooc2=1&v=2" target="_blank">
    //                                                                             <span class="course-name overHidden2" title="高等数学B">高等数学B</span>
    //                                                                     </a>

    //                                        </h3>

    //                                                                                        <p class="margint10 line2" title="安徽工业大学">安徽工业大学</p>

    //                        <p class="line2" title="课程组">课程组</p>
    //                                            </div>
    //                </li>

    //                <li class="course clearfix" courseId="228536188" clazzId="63325246" personId="273696743" id="course_228536188_63325246">
    //                    <div class="course-cover">

    //                                                                <a href="https://mooc1-1.chaoxing.com/mooc-ans/visit/stucoursemiddle?courseid=228536188&clazzid=63325246&vc=1&cpi=273696743&ismooc2=1&v=2" target="_blank" tabindex="-1" style="outline: none;">
    //                                                                        <img src="https://p.ananas.chaoxing.com/star3/240_130c/4d470c018e7f010b71e083865849bbbf.jpg">
    //                                                                </a>

    //                                               <ul class="hanlde-list">
    //                            <li class="move-to movetobtn">移动到
    //   </li>
    //                                                     </ul>
    //                                                                                        <a class="not-open-tip" href="https://mooc1-1.chaoxing.com/mooc-ans/visit/stucoursemiddle?courseid=228536188&clazzid=63325246&vc=1&cpi=273696743&ismooc2=1&v=2" target="_blank" tabindex="-1" style="outline: none;">
    //                                                                                     课程已结束
    // ... 其余代码
  } catch (error) {
    console.error("请求失败:", error);
    return "RequestFailed";
  }
};
// const getCourses = async (_uid, _d, vc3) => {
//   console.log("正在请求课程列表...");
//   const formdata = "courseType=1&courseFolderId=0&courseFolderSize=0"; //有点像硬编码的

//   // 发送获取课程列表请求
//   const result = await axios.post(
//     COURSELIST.URL, //这个是获取课程列表的api也就是https://mooc1-1.chaoxing.com/visit/courselistdata
//     {
//       gzip: true,
//       method: COURSELIST.METHOD,
//       headers: {
//         Accept: "text/html, */*; q=0.01",
//         "Accept-Encoding": "gzip, deflate",
//         "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
//         "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8;",
//         Cookie: `_uid=${_uid}; _d=${_d}; vc3=${vc3}`,
//       },
//     },
//     formdata
//   );

//   // // 检查是否需要重新登录
//   // if (result.statusCode === 302) {
//   //   console.log("身份过期，请重新登录！");
//   //   return "AuthFailed";
//   // }

//   // const data = result.data; //储存解析到的数据
//   // const courses = []; //储存courseId和classId，现在还没有到检测正在进行的活动的那一步

//   // let end_of_courseid;

//   // // 解析课程数据
//   // for (let i = 1; ; i++) {
//   //   i = data.indexOf("course_", i);
//   //   if (i === -1) break; // 找不到更多课程时退出循环
//   //   end_of_courseid = data.indexOf("_", i + 7);
//   //   courses.push({
//   //     courseId: data.slice(i + 7, end_of_courseid),
//   //     classId: data.slice(end_of_courseid + 1, data.indexOf('"', i + 1)),
//   //   });
//   // }

//   // if (courses.length === 0) {
//   //   console.log("无课程可查。");
//   //   return "NoCourse";
//   // }
//   // // console.log("获取的课程列表:", courses); // 打印课程信息
//   // return courses; //返回课程列表！也就是所有的课程列表！
//   // 检查是否需要重新登录
//   if (result.statusCode === 302) {
//     console.log("身份过期，请重新登录！");
//     return "AuthFailed";
//   }

//   const data = result.data; // 储存解析到的数据
//   const courses = []; // 储存 courseId 和 classId

//   // 使用正则表达式解析课程数据
//   const courseRegex = /course_(\d+)_(\d+)/g;
//   let match;

//   while ((match = courseRegex.exec(data)) !== null) {
//     courses.push({
//       courseId: match[1],
//       classId: match[2],
//     });
//   }

//   if (courses.length === 0) {
//     console.log("无课程可查。");
//     return "NoCourse";
//   }

//   return courses; // 返回课程列表
// };
