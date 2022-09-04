//只要发起ajax,post,get请求时，就会调用ajaxPrefilter()
$.ajaxPrefilter(function(options){
    //再发起真正的ajax之前统一拼接路径
    // options.url='http://www.liulongbin.top:3007'+options.url;
    options.url='http://127.0.0.1:3007'+options.url;


    //统一为有权限的接口配置headers请求头
    options.headers={
        Authorization:localStorage.getItem('token')||''
    }
    // //统一为有权限的接口挂载complete
    // options.complete= function (res) {
    //     //无论成功还是失败都会调用complete回调函数
    //     // console.log(res);
    //     if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
    //         localStorage.removeItem('token');
    //         location.href = '/login.html';
    //     }
    // }
})