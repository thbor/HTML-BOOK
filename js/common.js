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

                function showPerson(){
                  let s = document.getElementById("showLogout")
                  s.style.visibility = ""
                }
                function hiddenPerson(){
                  let s = document.getElementById("showLogout")
                  s.style.visibility = "hidden"
                }
                function logout(){
                  // realLogout();
                  
                  quesForm('你確定要退出登錄嗎?',realLogout)
                }
                function realLogout(){
                  sessionStorage.removeItem("status")
                  layer.closeAll()
                  ifLogin();
                }
                //用户是否登录  status：0.未登录  1.已登陆
                function ifLogin(){
                  //TODO  sessionStorage.setItem("status", 0);放在login方法里
                  // sessionStorage.setItem("status", 0);
                  var value = sessionStorage.getItem("status");
                  console.log(value)
                  if(!value){
                    document.getElementById("notLogin").style.display="";//显
                    document.getElementById("logged").style.display="none";//隱
                    window.history.go(-1)
                    layer.msg('你已退出登錄', {icon: 2})
                    
                  }else{
                    document.getElementById("notLogin").style.display="none";//隐
                    document.getElementById("logged").style.display="";//显
                    layer.msg('登錄成功', {icon: 1})
                  }   
                }
                //登錄表單驗證
                function validateLogin(form){
                  var form = layui.form;
                  form.verify({
                        lusername:function(value){
                          if(value.length==0){
                             return '用戶名不能爲空'
                           }
                        },
                        lpassword: function(value) {
                           if(value.length==0){
                             return '密碼不能爲空'
                        }
                      }
                    });
                }
               
                //註冊表單驗證
                function validateRegister(form){
                  form.verify({
                    rusername:function(value){
                      if(value.length==0){
                         return '用戶名不能爲空'
                        }
                    },
                    rpassword:function(value){
                      if(value.length<6){
                         return '密码不能小於6位'
                        }
                    },
                    // rpassword:  [
                    //   /^[\S]{6,12}$/,
                    //   '密码必须6到12位，且不能出现空格'
                    // ],
                    });
                }
    
                function clickLogin(){
                  alertcomfirm("loginLayer","登录","#loginId",'loginVerify',validateLogin,ajaxLogin)
                }
                function clickRegister(){
                  alertcomfirm("registerLayer","註冊","#registerId",'registerVerify',validateRegister,ajaxRegister)
                }
                function ajaxLogin(data){
                  console.log(data)
                  //如果成功，將status寫入session
                  sessionStorage.setItem("status", 1);
                  layer.closeAll()
                  ifLogin()
                }
                function ajaxRegister(data){
                  console.log("ajaxRegister",data)
                  if(data.rpassword!==data.rcheckPassword){
                    layer.msg('兩次輸入的密碼不一致', {icon: 5});
                    return false;
                  }
                  layer.closeAll()
                }
                function clickTitle(){
                  alert("即将前往首页")
                }
                