/**123**/
(function() {
  function ShadeLayout() {
    var bg = $(".bg");

    this.show = function(selector) {
      bg.show();
      $(selector).show();
    };
    this.hide = function(selector) {
      bg.hide();
      $(selector).hide();
    }
  }
  window.layoutDialog = new ShadeLayout()


})();

$(function() {
  // 展开查看更多职位和企业资料
  $('[data-bind="extend_open_btn"]').click(function() {
    $(".tab").css({
      "height": "auto"
    });
    $(".extend >.btn").eq(0).hide();
    $(".extend >.btn").eq(1).show();
  });
  // 关闭查看更多职位和企业资料
  $('[data-bind="extend_close_btn"]').click(function() {
    $(".tab").css({
      "height": "200px"
    });
    $(".extend >.btn").eq(1).hide();
    $(".extend >.btn").eq(0).show();
  }).hide();
  // 不感兴趣事件
  $('[data-bind="no_hobby"]').click(function() {
    layoutDialog.show(".select_no_hobby");

  });

  // 接受邀请事件
  $('[data-bind="hobby"]').click(function() {
    layoutDialog.show(".accept_shade");
    $(window).scrollTop(0);
  });

  // 我知道了
  $('[data-bind="accept"]').click(function() {
    layoutDialog.hide(".accept_shade");
    hintState.jieshou();
    layoutDialog.hide(".jieshou");
    // 现这里写ajax事件

  });

  // 不感兴趣列表中的取消事件
  $('[data-bind="select_cancel"]').click(function() {
    layoutDialog.hide(".select_no_hobby");
  });

  // 不感兴趣列中选择后的事件
  $('[data-bind="selected"]').click(function() {
    layoutDialog.hide(".select_no_hobby");
    layoutDialog.hide(".jieshou");
    hintState.jujue();
    // 现这里写ajax事件
  });


  function HintState() {
    var hint = $("#hint");

    function checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }
    // 时间毫秒
    var timer = null;
    return {
      yaoqing: function(totalTime) {
        var _this = this;
        hint.html("本次邀请将在24小时00分00秒后到期");
        timer = window.setInterval(function() {
          if (totalTime < 1000) {
            window.clearInterval(timer);
            timer = null;
            _this.guoqi();
            layoutDialog.hide(".jieshou");
            layoutDialog.hide(".select_no_hobby");
            return;
          }
          var h = parseInt(totalTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时数
          var m = parseInt(totalTime / 1000 / 60 % 60, 10); //计算剩余的分钟数
          var s = parseInt(totalTime / 1000 % 60, 10); //计算剩余的秒数
          h = checkTime(h);
          m = checkTime(m);
          s = checkTime(s);

          hint.html("本次邀请将在" + h + "小时" + m + "分" + s + "秒后到期");
          totalTime -= 1000;
        }, 1000);

      },
      guoqi: function() {
        window.clearInterval(timer);
        hint.html("本次邀请已过期失效（有效期24小时）").attr("class", "hint bg_gray");
      },
      jujue: function() {
        window.clearInterval(timer);
        hint.html("您已经拒绝本次邀请").attr("class", "hint bg_red");
      },
      jieshou: function() {
        window.clearInterval(timer);
        hint.html("您已经接受本次邀请").attr("class", "hint bg_green");
      }
    }
  }
  window.hintState = HintState();


  hintState.yaoqing(1000*60*60*60*24-1000);


  $(".tab_nav").find("li").click(function() {
    var that = $(this);
    var index = $(".tab_nav").find("li").index(that);
    $(".tab_nav").find("li").removeClass("curr");
    that.addClass("curr");
    $(".tab_list").find("li").hide();
    $(".tab_list").find("li").eq(index).show();
  });

});