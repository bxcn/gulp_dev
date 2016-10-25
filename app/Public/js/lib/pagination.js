/**
 * This jQuery plugin displays pagination links inside the selected elements.
 *
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 1.2
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
/*
参数说明：
min_page              最小页数                               必选参数，整数
max_page              最大页数                               必选参数，整数
maxentries            总条目数                               必选参数，整数
items_per_page        每页显示的条目数                       可选参数，默认是10
num_display_entries   连续分页主体部分显示的分页条目数       可选参数，默认是10
current_page           当前选中的页面                        可选参数，默认是0，表示第1页
num_edge_entries      两侧显示的首尾分页的条目数             可选参数，默认是0
link_to               分页的链接                             字符串，可选参数，默认是"#"
prev_text             “前一页”分页按钮上显示的文字           字符串参数，可选，默认是"Prev"
next_text             “下一页”分页按钮上显示的文字           字符串参数，可选，默认是"Next"
ellipse_text          省略的页数用什么文字表示               可选字符串参数，默认是"…"
prev_show_always      是否显示“前一页”分页按钮               布尔型，可选参数，默认为true，即显示“前一页”按钮
next_show_always      是否显示“下一页”分页按钮               布尔型，可选参数，默认为true，即显示“下一页”按钮
callback              回调函数                               默认无执行效果
*/

jQuery.fn.pagination = function(opts) {
    var maxentries = 10;
    opts = jQuery.extend({
        min_page: 1, //最小页面
        max_page: 1, //最大页面
        items_per_page: 10,
        num_display_entries: 0,
        current_page: 1, //当前选中的页面
        num_edge_entries: 0,
        link_to: "#",
        first_text: "首页",
        last_text: "尾页",
        prev_text: "上一页",
        next_text: "下一页",
        ellipse_text: "...",
        prev_show_always: true,
        next_show_always: true,
        callback: function() {
            return false;
        }
    }, opts || {});

    return this.each(function() {
        /**
         * 计算最大分页显示数目
         */
        function numPages() {
            return opts.max_page; //Math.ceil(maxentries / opts.items_per_page);
        }
        /**
         * 极端分页的起始和结束点，这取决于current_page 和 num_display_entries.
         * @返回 {数组(Array)}
         */
        function getInterval() {
            var ne_half = Math.ceil(opts.num_display_entries / 2);
            var np = numPages();
            var upper_limit = np - opts.num_display_entries;
            var start = current_page > ne_half ? Math.max(Math.min(current_page - ne_half, upper_limit), 0) : 0;
            var end = current_page > ne_half ? Math.min(current_page + ne_half, np) : Math.min(opts.num_display_entries, np);
            return [start, end];
        }

        /**
         * 分页链接事件处理函数
         * @参数 {int} page_id 为新页码
         */
        function pageSelected(page_id, evt) {
            current_page = page_id;
            drawLinks();
            var continuePropagation = opts.callback(page_id, panel, function() {});
            if (!continuePropagation) {
                if (evt.stopPropagation) {
                    evt.stopPropagation();
                } else {
                    evt.cancelBubble = true;
                }
            }
            return continuePropagation;
        }

        /**
         * 此函数将分页链接插入到容器元素中
         */
        function drawLinks() {
            panel.empty();
            var interval = getInterval();
            var np = numPages();
            // 这个辅助函数返回一个处理函数调用有着正确page_id的pageSelected。
            var getClickHandler = function(page_id) {
                    return function(evt) {
                        // 点击分页按钮前的验证
                        if ( !opts.before(page_id) ) {
                            return false;
                        }
                        return pageSelected(page_id, evt);
                    }
                }
                //辅助函数用来产生一个单链接(如果不是当前页则产生span标签)
            var appendItem = function(page_id, appendopts) {
                    page_id = page_id < 0 ? 0 : (page_id <= np ? page_id : np - 1); // 规范page id值
                    appendopts = jQuery.extend({
                        text: page_id + 1,
                        classes: ""
                    }, appendopts || {});
                    if (page_id == current_page) {
                        var lnk = jQuery("<span class='current'>" + (appendopts.text) + "</span>");
                    } else {
                        var lnk = jQuery("<span>" + (appendopts.text) + "</span>")
                            .bind("click", getClickHandler(page_id))
                            .attr('href', opts.link_to.replace(/__id__/, page_id));
                    }
                    if (appendopts.classes) {
                        lnk.addClass(appendopts.classes);
                    }
                    panel.append(lnk);
                }
                //首页
            appendItem(opts.min_page, {
                text: opts.first_text,
                classes: "first"
            });
            // 产生"Previous"-链接
            if (opts.prev_text && (current_page > 0 || opts.prev_show_always)) {
                appendItem((current_page <= opts.min_page ? opts.min_page : current_page - 1), {
                    text: opts.prev_text,
                    classes: "prev"
                });
            }
            if (opts.num_edge_entries > 0) {
                // 产生起始点
                if (interval[0] > 0) {
                    var end = Math.min(opts.num_edge_entries, interval[0]);
                    for (var i = 0; i < end; i++) {
                        appendItem(i);
                    }
                    if (opts.num_edge_entries < interval[0] && opts.ellipse_text) {
                        jQuery("<span>" + opts.ellipse_text + "</span>").appendTo(panel);
                    }
                }
                // 产生内部的些链接
                for (var i = interval[0]; i < interval[1]; i++) {
                    appendItem(i);
                }
                // 产生结束点
                if (interval[1] < np) {
                    if (np - opts.num_edge_entries > interval[1] && opts.ellipse_text) {
                        jQuery("<span>" + opts.ellipse_text + "</span>").appendTo(panel);
                    }
                    var begin = Math.max(np - opts.num_edge_entries, interval[1]);
                    for (var i = begin; i < np; i++) {
                        appendItem(i);
                    }

                }
            } else {
                var lnk = jQuery("<span class='total'>" + (current_page) + "/" + (opts.max_page) + "</span>");
                panel.append(lnk);
            }

            // 产生 "Next"-链接
            if (opts.next_text && (current_page < np - 1 || opts.next_show_always)) {
                appendItem((current_page >= opts.max_page ? opts.max_page : current_page + 1), {
                    text: opts.next_text,
                    classes: "next"
                });
            }
            // 尾页
            appendItem(opts.max_page, {
                text: opts.last_text,
                classes: "last"
            });

        }

        //从选项中提取current_page
        var current_page = opts.current_page;
        //创建一个显示条数和每页显示条数值
        maxentries = (!maxentries || maxentries < 0) ? 1 : maxentries;
        opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0) ? 1 : opts.items_per_page;
        //存储DOM元素，以方便从所有的内部结构中获取
        var panel = jQuery(this);
        // 获得附加功能的元素
        this.selectPage = function(page_id) {
            pageSelected(page_id);
        }
        this.prevPage = function() {
            if (current_page > 0) {
                pageSelected(current_page - 1);
                return true;
            } else {
                return false;
            }
        }
        this.nextPage = function() {
            if (current_page < numPages() - 1) {
                pageSelected(current_page + 1);
                return true;
            } else {
                return false;
            }
        }
        this.setMaxPage = function(max_page) {
                opts.max_page = max_page;
            }
            // 所有初始化完成，绘制链接

        // 回调函数
        opts.callback(current_page, this, function(max_page) {
            
            opts.max_page = max_page;
            drawLinks();
        });

    });
}
/*
$("#pagination").pager({
    id:"#search_result", //返回的分页数据填充到指定的DOM中
    url:"url",  // 接口地址
    data:{page:1}, // 请求数据，默认只包含page:1;
    template:"#handlebar-template", // 这个是handlebar模板id
    callback:function(result) {} // 回调函数，result接口返回的数据 

});
#pagination：是把分页的HTML填充到这个DOM里面> 
<!--分页按钮-->
<ul class="pagination mt20" id="pagination"></ul>

#search_result：把分页的数据填充到这个DOM中
<!--分页数据展示-->
<div class="list-container mt20" id="searchinfo"></div

接口必须返回的JSON格式
{
    list: [{id:1,name:"name"}],
    total_page:1,
    .............. //返回一些其它字段，如果需要处理，在这个callback函数中操作
}
list:返回数据集合；
total_page:总页数
默认情况下在这个callback函数中不需要对返回数据中的list和total_page属性做任何操作；
*/
jQuery.fn.pager = function(opts) {
    var source = $(opts.template || "#handlebar-template").html();
    var template = Handlebars.compile(source);
    //回调函数，作用：在某种情况下可能除了渲染分页外，返回的数据可能感觉 有一些其它的DOM操作；可以在这个回调函数里操作；
    opts.callback = opts.callback || function(result) {};
    // 创建分页
    this.pagination({
        // 点击分页按钮前
        before:opts.before || function(result) { return true},
        callback: function(page, jq, setMaxPageCallBack) {
            // 每次点分页需要重新赋值
            opts.data.page = page;
            loadingAjaxData.post({
                url: opts.url,
                data: opts.data,
                success: function(result) {
                    $(opts.id).html(template(result));
                    $(window).scrollTop(0)
                    setMaxPageCallBack(result.total_page || 1);
                    opts.callback(result);
                }
            });
        }
    });
}