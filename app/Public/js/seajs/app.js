define(function(require, exports, modlue) {

  //var $ = require("jquery");

  exports.init = function(options) {

    $('#myModal').on('show.bs.modal', function(ev) {
      if (!ev.relatedTarget) {
        ev.preventDefault();
        return;
      }

      console.log(1);


    }).on('shown.bs.modal', function(ev){
      if(!ev.relatedTarget) {
          ev.preventDefault();
          return;
      }
      console.log(2);
    }).on('hide.bs.modal', function(ev){
      console.log("hide");
    }).on('hidden.bs.modal', function(ev){
      console.log("hidden");
    }).on('loaded.bs.modal', function(){
      console.log("loaded");
    });

    /*    options = options || {};
        if (false) {
          require.async("./ajaxData", function(ajaxData){
            console.log(ajaxData);
          });
          
        }*/
  }

});

