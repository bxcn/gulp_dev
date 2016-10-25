/**
 * Created by Administrator on 2015/12/22.
 */
function JTheme(container, options) {

  var defaults = {
    addClass: "checkboxBlue",
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    validate: function() {
      return true;
    },
    changed: function() {}
  };

  // jquery匹配的窗口
  this.container = container;
  // 继承
  this.settings = $.extend({}, defaults, options);
  //匹配的checkbox
  this.checkbox = this.container.find("input");
  // checkbox或radio个数
  this.length = this.container.size();
  //初始化
  this.init();
  // 关联到父元素
  this.contact(this.settings.parent);
}

JTheme.prototype = {
  constructor: JTheme,
  init: function() {
    var self = this;
    // 委派点击input元素
    self.container.delegate("input", "change", function() {
      var that = $(this);
      self.change(that);
    });
    // 渲染
    return this.container.each(function() {
      var that = $(this);
      var inputElement = null;

      if (!that.hasClass("jComponentContainer")) {
        var icon = $("<i class='jComponentIcon blur'></i>");

        inputElement = that.find("input");

        that.addClass("jComponentContainer");

        inputElement.addClass("jComponent " + self.settings.addClass).after(icon);

        if (self.settings.width && self.settings.width) {
          icon.css({
            "width": self.settings.width,
            "height": self.settings.height
          });
        }

        if (inputElement.prop("checked")) {
          self.change(inputElement);
        }
      }

    });
  },
  contact: function(parent) {
    var _this = this;
    if (parent) {
      // 全选事件
      parent.container.delegate("input", "change", function() {
        var parentCheckBox = $(this);
        if (parentCheckBox.prop("checked")) {
          _this.addChecked();
        } else {
          _this.removeChecked();
        }
      });
    }
  },
  change: function(that) {

    var self = this;
    var left = self.settings.left;
    var top = self.settings.top;
    // 选中个数
    var checkedCount = self.container.find(":checked").size();
    // callback validate 选中前的回调返回 点击的元素， 当前选中的个数，总个数
    var validate = self.settings.validate(that, checkedCount, self.length);

    // 选中 并且是validate验证通过
    if (validate && that.prop("checked")) {
      /**
       * 每次有新的选中状态时就清除所有已选中的radio
       */
      if (that.attr("type") == "radio") {
        // 清除所有的样式
        $("input[name='" + that.attr("name") + "']").next("i").removeClass("active");
      }
      that.next().addClass("active");
      // callback changed选中后回调返回点击的元素、当前选中的个数、总个数
      self.settings.changed(that);
    } else {
      // 验证失败，返回样式
      if (!validate) {
        that.prop("checked", true).next().toggleClass("active", true);
      } else {
        // 验证成功并且是取消checked时，取消样式
        that.prop("checked", false).next().toggleClass("active", false);
        // callback changed选中后回调返回点击的元素、当前选中的个数、总个数
        self.settings.changed(that);
      }

    }

    this.allCheck(that);
  },
  // 全选事件
  allCheck: function(that) {
    var self = this;
    // 选中个数
    var checkedCount = self.container.find(":checked").size();
    if (!self.settings.parent ) return;

    var validate = self.settings.validate(that, checkedCount, self.length);
    if ( !validate ) return;

    // 总个数
    var checkCount = self.container.find("input").size();
    if (checkedCount == checkCount) {
      self.settings.parent.addChecked();
    } else {
      self.settings.parent.removeChecked();
    }
  },
  // 全部选中
  addChecked: function(array) {
    var self = this;
    var left = self.settings.left;
    var top = self.settings.top;
    if (!array) {
      // 全部选中
      this.checkbox.prop("checked", true).next().addClass("active");
    } else {
      this.removeChecked();
      // 有选择性的选中
      this.checkbox.each(function(i, data) {
        var that = $(data);
        var value = that.val();
        for (var i = 0, len = array.length; i < len; i++) {
          if (value == array[i]) {
            that.next().addClass("active");
            that.prop("checked", true);
          }
        }
      });
    }

    return this;
  },
  // 清空所有选中的
  removeChecked: function(array) {
    var self = this;
    var left = self.settings.left;
    var top = self.settings.top;
    if (!array) {
      this.checkbox.prop("checked", false).next().removeClass("active");
    } else {
      this.checkbox.each(function(i, data) {
        var that = $(data);
        var value = that.val();
        for (var i = 0, len = array.length; i < len; i++) {
          if (value == array[i]) {
            that.prop("checked", true).next().removeClass("active");
          }
        }
      });
    }
  },
  render: function() {

  },
  // 返回选中的值
  getValue: function() {
    var array = [];
    this.checkbox.each(function(i, data) {
      var that = $(data);
      if (that.prop("chekced")) {
        array.push(that.val());
      }
    });
    return array;
  }
};
(function() {
  $.fn.checkbox = $.fn.radio = function(settings) {
    var s = +(new Date());
    var jtheme = new JTheme(this, settings);
    var e = +(new Date());
    return jtheme;
  }
  /*
  var checkbox = $(".aaa").checkbox({
    addClass: "checkboxBlue",
    valid: function() {
      
      return true;
    },
    changed: function(){
      
    }
  });
  checkbox.addChecked();
  checkbox.removeChecked();
  checkbox.render();
  */
})();