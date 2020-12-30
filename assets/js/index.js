$(function () {
  getUserInfo();
  $("#btnLogout").on("click", function () {
    layer.confirm(
      "是否确认退出?",
      { icon: 3, title: "提示" },
      function (index) {
        //do something
        localStorage.removeItem("token");
        location.href = "/login.html";
        layer.close(index);
      }
    );
  });
});

function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // headers: {
    //     Authorization : localStorage.getItem('token')
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg("读取失败");
      }
      // console.log(res);
      renderAvatar(res.data);
    }
    
  });
}

function renderAvatar(user) {
  let uname = user.nickname || user.username;
  $("#welcome").html(`欢迎${uname}`);
  if (user.user_pic) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    let first = uname[0].toUpperCase();
    $(".text-avatar").html(first).show();
    $(".layui-nav-img").hide();
  }
}
