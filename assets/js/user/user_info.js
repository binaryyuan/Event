$(function () {
    let { form ,layer} = layui;
    form.verify({
        nickname : function (value) {
            if (value.length > 6) {
                return '昵称长度必须小于等于6位';
            }
        }
    })


    getinitUserInfo();
    function getinitUserInfo() {
        $.ajax({
            method: "GET",
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !==0) {
                    return layer.msg('获取用户信息失败');
                }
                console.log(res);
                form.val('formUserInfo', res.data);
            }
        })
    }

    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        getinitUserInfo();
})

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize,
            success: function (res) {
                if (res.status !==0) {
                    return layer.msg(res.message);
                }
                layer.msg('更新成功');
                window.parent.getUserInfo();
            }
        })
})


})