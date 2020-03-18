
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
        btn: ['確定','取消'] //按钮
        ,cancel: function(index, layero){
        returnParentListen();
        console.log("cancel")
        }
      }, function(){
        //yes
        callback()
      }, function(){
        returnParentListen();
        console.log("no")
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
        ,btn: ['确定']
        //點擊右上角X
        ,cancel:function(){
          returnParentListen();
        }
        //點擊登錄
        ,success: function(layero, index){
          layero.addClass('layui-form');
          layero.find('.layui-layer-btn0').attr({
          'lay-filter': layFilter,
          'lay-submit': ''
          });
        //重新渲染form
        form.render();
          parentListen();
        },
        
        //點擊確定
        yes: function(index, layero){
        form.on('submit('+layFilter+')', function (data) {
        // layer.alert(JSON.stringify(data.field))
        //TODO   ajax 
        ajaxMethod(data.field)
        console.log("yes")
        // returnParentListen();
        // console.log(data)
        return false
        // layer.closeAll()
        })
        
        },
      })
    })
  }
     //彈出窗口模板2  带时间的
     function alertcomfirm2(id,title,contentId,layFilter,laydateId,validateMethod,ajaxMethod){
      layui.use(['form','layer','laydate'], function(){
        var form = layui.form;
        var laydate = layui.laydate;
        //數據驗證  
        validateMethod(form)
        layer.open({
        //type：1  這樣才不會在數據驗證失敗後關閉彈出層
        // type:1,   
        area: '450px',
        title:title,
        id:id,
        content: $(contentId).html()
        ,btn: ['确定']
        //點擊右上角X
        ,cancel:function(){
          returnParentListen();
        }
        //點擊登錄
        ,success: function(layero, index){
          layero.addClass('layui-form');
          layero.find('.layui-layer-btn0').attr({
          'lay-filter': layFilter,
          'lay-submit': ''
          });
        //重新渲染form
        form.render();
        laydate.render({ 
          elem: laydateId,
          // content: $("#laydateId"),
          type: 'datetime',
          // trigger: 'click'
          // ,range: true //或 range: '~' 来自定义分割字符
        });
          // parentListen();
        },
        
        //點擊確定
        yes: function(index, layero){
        form.on('submit('+layFilter+')', function (data) {
        //TODO   ajax 
        ajaxMethod(data.field)
        console.log("yes")
        return false
        // layer.closeAll()
        })

        },
      })
    })
  }
    function parentListen(){
      parent.changeZindex()
    }
    function returnParentListen(){
      parent.returnZindex()
    }
