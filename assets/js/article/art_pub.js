$(function () {

    //初始化选择框
    initCate();

    // 初始化富文本编辑器
    initEditor()

    //初始化选择框函数
    function initCate() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status != 0) return layui.layer.msg('获取文章分类失败');
                var htmlstr = template("seletpl", res);
                // console.log(htmlstr);
                $('[name=cate_id]').html(htmlstr);
                //layui重新渲染
                layui.form.render();
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btnsel').on('click', function () {
        $('#file').click();
    });
    $('#file').on('change', function (e) {
        var files = e.target.files
        if (files.length === 0) { return }
        var newImgURL = URL.createObjectURL(files[0])
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });

    //文章状态
    var artstate = '已发布';
    $('#btnsave2').on('click', function () {
        artstate = '草稿';
    })

    $('#formpub').on('submit', function (e) {
        e.preventDefault();
        //基于form表单创建FormData对象
        var fd = new FormData($(this)[0]);
        fd.append('state', artstate);

        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                //将文件对象存储到fd
                console.log(blob);
                fd.append('cover_img', blob);
            });

        fd.forEach(function (v, k) {
            console.log(k, v);
        })
        publishArticle(fd);

    })


    function publishArticle(fd) {
        //发起ajax
        $.ajax({
            type: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status != 0) return layui.layer.msg('发布文章失败');
                layui.layer.msg('发布文章成功');
                // location.href = '/article/art_list.html'

            }
        })

    }

})