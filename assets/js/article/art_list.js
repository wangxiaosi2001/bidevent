$(function () {

    var laypage = layui.laypage;
    var q = {
        pagenum: 1,//页码值，默认请求第一页的
        pagesize: 2,//默认一页有两条数据
        cate_id: '',//文章分类的 Id
        state: ''//文章的状态，可选值有：已发布、草稿
    }

    //定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date);
        var y = dt.getFullYear();
        var m = padzero(dt.getMonth() + 1);
        var d = padzero(dt.getDate());
        var hh = padzero(dt.getHours());
        var mm = padzero(dt.getMinutes());
        var ss = padzero(dt.getSeconds());
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
    }
    function padzero(n) {
        return n < 10 ? '0' + n : n;
    }


    inittable();
    initCate();


    //获取文章列表
    function inittable() {
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status != 0) return layui.layer.msg('获取文章列表失败');
                //使用模板引擎
                var strhtml = template("artlist", res);
                $('tbody').html(strhtml);
                // console.log(res.total);
                renderPage(res.total);
            }
        })

    }



    //初始化所有分类
    function initCate() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status != 0) return layui.layer.msg('获取文章分类失败');
                var htmlstr = template("catetpl", res);
                // console.log(htmlstr);
                $('[name=cate_id]').html(htmlstr);
                //layui重新渲染
                layui.form.render();
            }
        })
    }


    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        //获取表单中选定的值
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;
        //根据最新的筛选条件重新筛选
        inittable();

    });

    //分页
    function renderPage(total) {
        console.log(total);
        laypage.render({
            elem: 'pagebox' //注意，这里的 test1 是 ID，不用加 # 号
            , count: total //数据总数，从服务端得到
            , limit: q.pagesize//每页条数的选择项
            , curr: q.pagenum
            , layout: ['count', 'limit', 'prev', 'page', 'next', 'skip']
            , limits: [2, 3, 5, 10]
            //只要调用了laypage.render就调用了jump回调,first值是true
            //点击页码调用了jump回调,first值是undefined
            , jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if (!first) { inittable(); }

            }
        });

    }

    //通过代理事件为删除按钮绑定事件
    $('tbody').on('click', '.btn_del', function () {
        var id = $(this).attr('data_id');
        // console.log(id);
        layui.layer.confirm('确定删除文章？', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                type: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status != 0) return layer.msg('删除文章分类失败');
                    layer.msg('删除文章分类成功');
                    //关闭弹出层
                    layui.layer.close(index);
                    inittable();
                }
            })
        })
    })

});