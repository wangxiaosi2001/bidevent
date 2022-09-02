$(function () {
    // console.log(localStorage.getItem('token'));
    //获取用户的基本信息
    getUserInfo();

    $('#btnlogout').on('click', function () {
        layui.layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html';
            //关闭弹出层
            layui.layer.close(index);
        });
    })
});

function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        haeders: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            // console.log(res);
            if (res.status != 0) { return layui.layer.msg('获取用户信息失败'); }
            renserAvater(res.data);


        }
    })
}
//渲染用户头像
function renserAvater(user) {
    //1.获取用户名称
    var name = user.nickname || user.username;
    // 2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 3.按需渲染用户头像
    if (user.user_pic != null) {
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 3.2渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        // console.log(first);
        $('.text-avatar').html(first).show();
    }
}
