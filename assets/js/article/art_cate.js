$(function () {
    var layer = layui.layer;
    //获取文章分类列表
    initArticleCateList();
    function initArticleCateList() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                var htmlStr = template('tpl_table', res);
                $('tbody').html(htmlStr);
            }

        });
    }

    var indexadd = null;
    var indexedit = null;
    $('#addbtn').on('click', function () {
        indexadd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            , content: $('#dialogadd').html()
        });
    });
    //通过代理为form绑定事件
    $('body').on('submit', '#formadd', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) return layer.msg('添加文章分类失败');
                layer.msg('添加文章分类成功');
                initArticleCateList();
                layer.close(indexadd);
            }
        })

    });

    //通过代理事件为编辑按钮绑定事件
    $('tbody').on('click', '.btn_edit', function () {
        indexedit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑文章分类'
            , content: $('#dialogedit').html()
        });
        var id = $(this).attr('data_id');
        //   console.log(id);
        $.ajax({
            type: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // console.log(res);
                layui.form.val('formedit', res.data);

            }
        })
    });

    //通过代理为form绑定事件
    $('body').on('submit', '#formedit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) return layer.msg('更新文章分类失败');
                layer.msg('更新文章分类成功');
                initArticleCateList();
                layer.close(indexedit);
            }
        })

    });

    //通过代理事件为删除按钮绑定事件
    $('tbody').on('click', '.btn_del', function () {
        var id = $(this).attr('data_id');
        // console.log(id);
        layui.layer.confirm('确定删除文章分类？', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                type: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status != 0) return layer.msg('删除文章分类失败');
                    layer.msg('删除文章分类成功');
                    //关闭弹出层
                    layui.layer.close(index);
                    initArticleCateList();
                }
            })


        });
    })


})