/*
 * 创建成功提示信息
 * */
(function($){
    /*
     * 创建错误提示信息
     * 调用方式：promptDailog("爱伙伴爱伙伴");
     **/
    function PromptDailog( promptTitle, index ){
        this.index = index;
        this._promptDialog = null; // Dialog体内对象
        this.promptTitle = promptTitle;
        this.init();
    }
    PromptDailog.prototype = {
        constructor: PromptDailog,
        init: function( ) {
            // 显示的promptDialog HTML添加到body中
            this.wrapToBody();
        },
        wrapToBody: function() {
            // 創建promptDialog
            var promptDialog = "promptDialog"+ this.index;
            var promptTitle = this.promptTitle;
            var html = '<div id="'+ promptDialog +'" class="warningDiaolog hide">';
            html += '   <div class="dialogState">';
            html += '      <i class="error"></i>';
            html += '      <span class="promptTitle ctent ml10">'+ promptTitle +'</span>';
            html += '  </div>';
            html += '</div>';
            $(document.body).append(html);
            this._promptDialog = $( "#promptDialog" +this.index);
        },
        alertDialog: function(){
            var that = this;
            this._promptDialog.dialog({
                autoOpen:false,
                resizable: false,
                draggable: false,
                modal: true,
                width: 680,
                title:"提示信息",
                buttons: [
                    {
                        text: "关闭",
                        click: function() {
                            // 销毁dialog
                            $(this).dialog("close").remove();
                        }
                    }
                ]
            });
        },
        openAlert: function() {

            this.alertDialog();
            this._promptDialog.dialog("open");

            return this;
        },
        promptDialog: function(param){
            var that = this;
            param = param || {};
            var buttonArr = [];
        
      

          if ( typeof param.cancel == "function" ) {
            buttonArr.push( {
              text: param.CENCALText || "取消",
              click: function() {
                // 销毁dialog
                $(this).dialog("close").remove();
                param.cancel.call(that);
              }
            });
          }
          if ( typeof param.ok == "function" ) {
           buttonArr.push( {
              text: param.OKText || "确定",
              click: function() {
                // 销毁dialog
                $(this).dialog("close").remove();
                param.ok.call(that);
              }
            });
           }

            this._promptDialog.dialog({
                autoOpen:false,
                resizable: false,
                draggable: false,
                modal: true,
                width: param.width || 680,
                title:param.title || "提示信息",
                buttons: buttonArr
            });
        },
        openPrompt: function(param) {
            this.promptDialog(param);
            this._promptDialog.dialog("open");
            return this._promptDialog;
        },
        hasDialog: function() {

        }
    }

    var index = 0;

    /**
     *  alertDialog("are you OK? ");
     * @param promptTitle
     * @returns {*}
     */
    function alertDialog( promptTitle) {
        return (new PromptDailog(promptTitle, index++)).openAlert();
    }
    /**
     * promptDialog("are you OK? ", {ok:function(){alert("ok")},cancel: function(){alert("cancel")}});
     * @param promptTitle  "are you OK? "
     * @param param  {ok:function(){alert("ok")},cancel: function(){alert("cancel")}
     * @returns {*}
     */
    function promptDialog( promptTitle, param) {
        return (new PromptDailog(promptTitle, index++)).openPrompt(param);
    }
    window.alertDialog = alertDialog;
    window.alert = alertDialog;
    window.promptDialog = promptDialog;

})(jQuery);
