$(function () {
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  $("#link_login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });

    var form = layui.form;
    var layer = layui.layer;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码不规范"],
    repwd: function (value) {
      let pwd = $(".reg-box [name=password]").val();
      if (value !== pwd) {
        return "两次密码不一致";
      }
    },
  });

  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/reguser",
      data: {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message || '注册失败');
            }
            layer.msg(res.message || '注册成功');
            document.querySelector('#form_reg').reset()
            $('#link_login').click();
      }
    });
  });

    
  $("#form_login").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/login",
      data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            localStorage.setItem('token', res.token);
            location.href='/index.html'
      }
    });
  });
  
});
