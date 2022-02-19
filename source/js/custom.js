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
  
};
