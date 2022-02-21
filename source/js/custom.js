window.onload = function () {
  // 动态标题头
  !(function () {
    let OriginTitle = document.title;
    let titleTime;
    document.addEventListener(
      "visibilitychange",
      function () {
        if (document.hidden) {
          document.title = "ヽ(●-`Д´-)ノ你丑你就走！";
          clearTimeout(titleTime);
        } else {
          document.title = "ヾ(Ő∀Ő3)ノ欢迎回来!";
          titleTime = setTimeout(function () {
            document.title = OriginTitle;
          }, 2000);
        }
      },
      { passive: false }
    );
  })();
  //备案
  let icp = document.querySelector("body > main > div > aside > footer > nobr:nth-child(3) > span.text-content");
  icp.style.cssText = "margin:8px 0;";
  console.log(icp);
};

//控制台打印
if (window.console) {
  // console.clear();
  var getTimeState_console = function () {
    var t = new Date().getHours(),
      e = "";
    return (
      4 >= t || t > 22
        ? (e = "Good Night 🛌")
        : 4 < t && t <= 10
        ? (e = "Good Morning 🌮")
        : 10 < t && t <= 12
        ? (e = "Good Noon 🍱")
        : 12 < t && t <= 17
        ? (e = "Good Afternoon ☕")
        : 17 < t && t <= 22 && (e = "Good Evening 🍇"),
      e
    );
  };

  console.log(getTimeState_console());
  console.log(
    "欢迎访问%c大赵同学(Zain)的Blog",
    "color:#3eaf7c;font-weight:bold"
  );
  console.log(
    "%c一名立志成为一名前端攻城狮的小白",
    "color:gold;font-weight:bold"
  );
  console.log("%c偌大的虚拟世界遇到你真的很幸运💜", "color:deepskyblue;");

  console.log(
    "%c婷宝儿我送你归于人海了,祝你幸福🍀",
    "border:2px solid deepskyblue;color:lightpink;font-size:16px;font-weight:900;"
  );

  Function.prototype.makeMulti = function () {
    let l = new String(this);
    l = l.substring(l.indexOf("/*") + 3, l.lastIndexOf("*/"));
    return l;
  };
  let string = function () {
    /*
    
    ███████╗ █████╗ ██╗███╗   ██╗    ██████╗ ██╗      ██████╗  ██████╗ 
    ╚══███╔╝██╔══██╗██║████╗  ██║    ██╔══██╗██║     ██╔═══██╗██╔════╝ 
      ███╔╝ ███████║██║██╔██╗ ██║    ██████╔╝██║     ██║   ██║██║  ███╗
    ███╔╝   ██╔══██║██║██║╚██╗██║    ██╔══██╗██║     ██║   ██║██║   ██║
    ███████╗██║  ██║██║██║ ╚████║    ██████╔╝███████╗╚██████╔╝╚██████╔╝
    ╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝    ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝ 
    
      */
  };
  console.log(string.makeMulti());
}


