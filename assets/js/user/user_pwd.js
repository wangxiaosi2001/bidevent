$(function () {
    var form = layui.form;
    var layer=layui.layer;
    form.verify({
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samepwd: function (value) {
            if (value == $('#oldpass').val()) {
                return '新旧密码不能相同';
            }
        },
        repass: function (value) {
            //形参是确认密码框的内容
            var revalue = $('#newpass').val();
            if (value !== revalue) {
                return '密码不一致';
            }
        }
    });

    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!=0) {
                    return layer.msg('更新密码失败');

                }
                layer.msg('更新密码成功');
                $('.layui-form')[0].resrt();

            }
        })

    })
});