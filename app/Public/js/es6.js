define(function(require, exports, module) {
  
  module.exports.init = function() {
    
    var ajaxData = require('../lib/ajaxData').init();

    $('[data-delete]').click(function(){

      var checkeds = $('[data-checkbox-many=\'item\']:checked');
      var array = [];

      checkeds.each(function(){
        array.push($(this).val());
      });
      if ( !array.length ) {
        
        alertDialog('请先选择要去除的项');
        return;
      }

      promptDialog('是否确认去除合格简历', {
        ok:function() {

          ajaxData.post({
            url:'/ResumeList/del_resume',
            data:{'id':array.join(',')}
          })
          .done((result)=>{
            if (result.status) {
              location.reload();
            } else {
              alertDialog(result.msg);
            }
          });
        }

      });

    });  

    console.log("Log a debug level message.");

    var obj = {
      id: 1
    };
    /**
     * [description]
     *
     * @return {[type]} [description]
     */
    const fn = () => {
      return true;
    };
    // 切换select
    $('select[data-select]').on('change.bs.other', function(){
      var that = $(this);
      console.log(1);
    });

    $('.JobInvitation').addClass('active');
  };
});
