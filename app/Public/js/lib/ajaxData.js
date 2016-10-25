;(function(factory) {
  if (typeof define === "function" && define.amd) {

    // AMD. Register as an anonymous module.
    define(["ajax"], factory);
  } else {

    // Browser globals
    factory(jQuery);
  }
}(function($) {

  function AjaxData() {
    this.ajax = function(param) {

        /**
         * typeData 类型:
         * "xml": 返回 XML 文档，可用 jQuery 处理。
         "html": 返回纯文本 HTML 信息；包含的script标签会在插入dom时执行。
         "script": 返回纯文本 JavaScript 代码。不会自动缓存结果。除非设置了"cache"参数。'''注意：'''在远程请求时(不在同一个域下)，所有POST请求都将转为GET请求。(因为将使用DOM的script标签来加载)
         "json": 返回 JSON 数据 。
         "jsonp": JSONP 格式。使用 JSONP 形式调用函数时，如 "myurl?callback=?" jQuery 将自动替换 ? 为正确的函数名，以执行回调函数。
         "text": 返回纯文本字符串
         */
        var _cache = param.cache || false;
        var _type = param.type || "POST";
        var _dataType = param.dataType || "json";
        var _async = param.async;
        var _data = param.data || null;
        var _url = param.url || null;

        var _beforeSend = param.beforeSend || function() {
          // console.log("beforeSend");
        };
        var _complete = param.complete || function() {
          // console.log("complete");
        };
        var _dataFilter = param.dataFilter || function(a, b) {
          // console.log(arguments.length);
          // console.log(b);
          // console.log("在请求成功之后调用！dataFilter");
        };
        var _success = param.success || function() {};
        var _error = param.error || function() {};
        var _statusCode = {
          404: function() {}
        };

        if (!_url) {
          return;
        }

        $.ajax({
          type: _type,
          dataType: _dataType,
          url: _url,
          async: _async,
          data: _data,
          cache: _cache,
          statusCode: _statusCode,
          beforeSend: _beforeSend,
          complete: _complete,
          // dataFilter:_dataFilter,
          success: _success,
          error: _error
        });
        return $;
      };
      this.post = function(param) {
        param["type"] = param.type || "POST";
        this.ajax(param);
      };

      this.get = function(param) {
        param["type"] = param.type || "GET";
        this.ajax(param);
      };
  };

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