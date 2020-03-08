//公有弹出层方法
    function alertForm(title,id,callback){
        layer.open({
            title:title,
            content: $(id).html()
            ,btn: ['确定', '取消']
            ,yes: function(index, layero){
                callback()
            }
        })
    }