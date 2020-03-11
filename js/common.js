//公有弹出层方法
    function alertForm(title,id,callback){
        layer.open({
            title:title,
            content: $(id).html()
            ,btn: ['确定', '取消']
            ,yes: function(index, layero){
                callback()
            },
            
        })
    }
    function quesForm(content,callback){
      layer.confirm(content, {
        yes: function(index, layero){
          callback()
        }
      });
    }

                //彈出窗口模板
                function alertcomfirm(id,title,contentId,layFilter,validateMethod,ajaxMethod){
                  layui.use(['form','layer'], function(){
                    var form = layui.form;
                    //數據驗證  
                    validateMethod(form)
                    layer.open({
                    //type：1  這樣才不會在數據驗證失敗後關閉彈出層
                    type:1,   
                    area: '350px',
                    title:title,
                    id:id,
                    content: $(contentId).html()
                    ,btn: ['确定', '取消']
                    //點擊登錄
                    ,success: function(layero, index){
                      layero.addClass('layui-form');
                      layero.find('.layui-layer-btn0').attr({
                                  'lay-filter': layFilter,
                                  'lay-submit': ''
                              });
                      //重新渲染form
                      form.render();
                      layer.iframeAuto(index);
                    },
                    //點擊確定
                    yes: function(index, layero){
                      form.on('submit('+layFilter+')', function (data) {
                        // layer.alert(JSON.stringify(data.field))
                        //TODO   ajax 
                        ajaxMethod(data.field)
                        console.log("yes")
                        // console.log(data)
                        return false
                        // layer.closeAll()
                      })
                    },
                })
                
              })
                }