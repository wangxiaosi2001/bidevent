$(function () {
    $('#link-reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link-login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    //获取form对象
    var form = layui.form;
    var layer = layui.layer;
  
    form.verify({
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repass: function (value) {
            //形参是确认密码框的内容
            var revalue=$('.reg-box [name=password]').val();
            if (value !== revalue) {
                return '密码不一致';
            }
        }
    });

    //监听注册表单
    $('#form-reg').on('submit',function(e){
        //阻止表单的默认提交行为
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'http://www.liulongbin.top:3007/api/reguser',
            data:{username:$('#form-reg [name=username]').val(),password:$('#form-reg [name=password]').val()},
            success:function(res){
                if(res.status!=0) return layer.msg(res.message);
               layer.msg('注册成功,请登录');
               $('#link-login').click();
            }

        })
    });
    //监听登录表单
    $('#form-login').on('submit',function(e){
        //阻止表单的默认提交行为
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'http://www.liulongbin.top:3007/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0) return layer.msg(res.message);
               layer.msg('登录成功');
            //    console.log(res.token);
            location.href="/index.html";
               
            }

        })
    });
})
