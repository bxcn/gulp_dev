;
(function(factory) {
  if (typeof define === "function" && define.amd) {

    // AMD. Register as an anonymous module.
    define(["ajax"], factory);
  } else {

    // Browser globals
    factory(jQuery);
  }
}(function($) {
     window["ajaxData"] = new AjaxData();
}));


// 加载前的一个遮罩层对象
function DialogLoading(id) {
  var bg = $(id || "#loading");
  // 加载Ajax前去显示
  function beforeSend(fn) {
    return function() {
      bg.show();
      if (fn) {
        fn();
      }
    }
  }

  function complete(fn) {
    return function() {
      bg.hide();
      if (fn) {
        fn();
      }
    }
  }

  this.ajax = function(param) {
    param.beforeSend = beforeSend(param.beforeSend);
    param.complete = complete(param.complete);
    return ajaxData.ajax(param);
  };
  this.post = function(param) {
    param.beforeSend = beforeSend(param.beforeSend);
    param.complete = complete(param.complete);
    return ajaxData.post(param);
  };
  this.get = function(param) {
    param.beforeSend = beforeSend(param.beforeSend);
    param.complete = complete(param.complete);
    return ajaxData.get(param);
  };

  this.show = function() {
    bg.show();
  };

  this.hide = function() {
    bg.hide();
  };

  return this;
}
