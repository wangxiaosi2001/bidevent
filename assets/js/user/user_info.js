$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称必须在1~6个字符之间'
            }
        }
    });

    inituserinfo();

    //初始化用户基本信息
    function inituserinfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status != 0) return layui.layer.msg('获取用户失败');
                // console.log(res);
                //formuserinfo 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                form.val("formuserinfo", res.data);
            }
        })
    }

    //重置表单数据
    $('#btnreset').on('click', function (e) {
        e.preventDefault();
        inituserinfo();
    });
    //监听表单提交
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        //发起ajax请求
        $.ajax({
            type:'POST',
            url: '/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!=0) return layui.layer.msg('提交数据失败');
                layui.layer.msg('提交数据成功')
            }
        })

    })

});
 
