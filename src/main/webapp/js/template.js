/**
 * Created by DELL on 2017/12/14.
 */
/*
 * nowClick:最近一次点击
 * */
var nowClick,nowCatalog;
var documentId=$("input#documentId").val();
//初始化的时候调用getUsable()函数赋值
var usableList;
// 加载模板3时初始化
var roleList;
var nowLine;
//评论区初始化
function discussInit() {
    $(".discuss").code(""); 
}
//评论加载
function disReload() {
    var catalogIndex=$(nowClick).children("span.catalogIndex").text()
    $.ajax({
        url: "discuss-getCatalogDis",
        data: {catalogIndex:catalogIndex, id_document:documentId},
        dataType: "json",
        type: "Post",
        async: "false",
        success: function (result) {
            var content="",tempDis,date,state;
            for (var i=0;i<result.wrapperList.length;i++){
                tempDis=result.wrapperList[i].proDiscussEntity;
                state=result.wrapperList[i].state;
                date=tempDis.time.toString().split("T");
                content+="  <div class='row'> <div class='ibox float-e-margins ' style='margin-bottom: 10px'> <div class='ibox-title'> <h5>";
                content+=tempDis.name+" "+date[0]+" "+date[1]+"</h5><input style='display: none' class='id_dis' value='"+tempDis.id_pro_discuss+"'>"
                content+="  <button  class='btn";
                if (state=="2")
                    content+=" btn-danger ";
                else content+=" btn-default ";
                content+="btn-xs col-lg-push-1 m-l-sm deleteDis'  type='button'  style='margin-top: -3px'>删除</button> ";
                content+="</div> <div class='ibox-content'> <div class=' wrapper'>";
                content+=tempDis.content+"  </div> </div> </div> </div>";
            }
            $("div.allDiscuss").html(content);
        },
        error: function (result) {
            showtoast("dangerous","加载失败","加载目录失败")
        }
    })
}
//目录点击事件
$(document).on("click",".dic",function () {
    nowClick=$(this);
    var catalogIndex=$(nowClick).children("span.catalogIndex").text()
    $.ajax({
        url: "catalog-getCatalog",
        data: { documentId:documentId,catalogIndex:catalogIndex},
        dataType: "json",
        type: "Post",
        async: "false",
        success: function (result) {
            var content;
            $("#save").attr("style","display:none");
            $("#edit").attr("style","display:show");
            $("div.catalogNoneContent").hide();
            $("div.catalogNotNoneContent").show();
            //模板生成
            template=result.template;
            $("div.content").html(template.content);
            nowCatalog=result.catalogEntity,title="";
            if (nowCatalog.first_index!="0")title+=nowCatalog.first_index;
             if(nowCatalog.second_index!="0")title+="."+nowCatalog.second_index;
             if(nowCatalog.third_index!="0")title+="."+nowCatalog.third_index;
             if(nowCatalog.fourth_index!="0")title+="."+nowCatalog.fourth_index;
            title+="  "+nowCatalog.title;
            $("h2#catalog_title").text(title);
            discussInit();
            entity=result.entity;
            if(template.id_template=="3"){//加载角色+内容
                UsableInit()
                roleList=result.roleList;
               $("input#funName").val(entity.funName);
               $("select#priority").val(entity.priority);
                $("#describe").html(entity.describe);
                $("#in").html(entity.input);
                $("#out").html(entity.output);
                $("#basic").html(entity.basic);
                $("#alternative").html(entity.alternative);
                //生成表格
                var funRoleList=entity.funRoleList;
                var funUsableList=entity.funUsableList;
                var funRoleContent="";
                for (var i=0;i<funRoleList.length;i++){
                    funRoleContent+=" <tr class='funTr'> <th > <span class='fun_down li_fa fa col-md-offset-1  fa-arrow-down black'></span> <span class='fun_up fa li_fa col-md-offset-1  fa-arrow-up black ' ></span> <span class='fun_delete li_fa fa col-md-offset-1  fa-times  black' ></span></th> <th> <select class='form-control  roleName dis' name='roleName'   disabled>";

                    for (var j=0;j<roleList.length;j++){
                        funRoleContent+="<option";
                        if(funRoleList[i].roleName==roleList[j].roleName)funRoleContent+=" selected";
                        funRoleContent+=" >"+roleList[j].roleName+"</option>";
                    }
                    funRoleContent+="</select> </th> <th> <textarea   class='form-control roleDescribe dis'  name='roleDescribe'   style='max-width: 100%' disabled>";
                    funRoleContent+=funRoleList[i].roleDescribe+"</textarea> </th>";
                    if(funRoleList[i].usableName==null){//新增按钮
                        funRoleContent+=" <th> <button  class='btn btn-primary  btn-xs col-lg-push-1 dis'  id='addUsable'  data-toggle='modal' data-target='#addUsableModel' onclick='addUsable(this)' type='button' style='margin-right: 10px' disabled>新增可用性</button> </th></tr>";
                    }else {
                        funRoleContent+="</tr>";
                        funRoleContent+="<tr class='usableTr'> <th colspan='2' name='usableName' class='usableName'>"+funRoleList[i].usableName+"</th> <th  name='usablePara' class='usablePara' >"+funRoleList[i].usablePara+"</th> <th style='text-align: center' > <button  class='btn btn-danger  btn-xs col-lg-push-1 dis' id='deleteUsable'  onclick='deleteUsable(this)' type='button' style='margin-right: 10px' disabled>删除可用性</button></th> </tr>"
                    }
                }
                $(".funTable tbody").prepend(funRoleContent);
                var funUsableContent="";
                for (var i=0;i<funUsableList.length;i++){
                    funUsableContent+="<tr class='usableTr'> <th colspan='2' name='usableName' class='usableName'>"+funUsableList[i].usableName+"</th> <th  name='usablePara' class='usablePara' >"+funUsableList[i].usablePara+"</th> <th style='text-align: center' >  <button  class='btn btn-danger  btn-xs col-lg-push-1 dis' id='deleteUsable'  onclick='deleteUsable(this)' type='button' style='margin-right: 10px' disabled>删除可用性</button></th> </tr>"
                }
                $(".funTable tfoot").append(funUsableContent);
            }
            else if(template.id_template=="2"){
                var roleName=entity.roleName;
                var describe=entity.describe;
                var permissions=entity.permissions;
                $("#roleName").val(roleName);
                $("#describe").html(describe);
                $("#permissions").html(permissions);
            }
            else if (template.id_template=="1"){
                var content=entity.content;
                $("#describe").html(content);
            }
        },
        error: function (result) {
            showtoast("dangerous","失败","获取失败")
        }
    })
})
//新增弹框初始化
function addModelInit() {
$("input#add_title").val("");
}
//重命名弹框初始化
function renameModelInit() {
    $("input#re_title").val("");
}
//正文模板初始化
function templateInit() {
    $.ajax({
        url: "catalog-getIndex",
        data: {documentId:documentId},
        dataType: "json",
        type: "Post",
        async: "false",
        success: function (result) {
            $("div#allIndex").html("<div class='spiner-example'> <div class='sk-spinner sk-spinner-three-bounce'> <div class='sk-bounce1'></div> <div class='sk-bounce2'></div> <div class='sk-bounce3'></div> </div>");
            if(result.catalogList.length==0){
                $("div#allIndex").html("<div class='spiner-example'><li class='li_head black'> <button class='btn btn-primary  btn-xs'  data-toggle='modal' data-target='#myModal2'>新建目录</button> </li></div>");
            }
            else {
            var content=" ",nowFirst="0",nowSecond="0",nowThird="0",nowFourth="0",tempFirst,tempSecond,tempThird,tempFourth,tempCatalog;
            var firstEndContent,secondEndContent,thirdEndContent,fourthEndContent;
            firstEndContent="</li>";
            secondEndContent="</ul></li>";
            thirdEndContent="</ul></li>";
            fourthEndContent="</ul></li>";
            for (var i=0;i<result.catalogList.length;i++){
                tempCatalog=result.catalogList[i];
                tempFirst=tempCatalog.first_index;
                tempSecond=tempCatalog.second_index;
                tempThird=tempCatalog.third_index;
                tempFourth=tempCatalog.fourth_index;
                //结束符生成，如果下一条内容是子一级内容，不生成结束符；如果是同级内容，生成本级结束符；如果是更高级内容，要生成一次或多次结束符
                // 第一级目录内容生成（不含结束符）
                if(tempSecond=="0"&&tempThird=="0"&&tempFourth=="0"){
                    if (nowFirst=="0") {}//最开头不做任何操作
                    else if(nowSecond=="0"&&nowThird=="0"&&nowFourth=="0")//同级别
                    {
                        content+="</li>";}
                    else if(nowThird=="0"&&nowFourth=="0")//第二级:关第二级，关第一级（有多层）
                    {
                        content+="</li> </ul></li>";}
                    else if(nowFourth=="0")//上一节是第三级目录
                    {
                        content+="</li> </ul></li> </ul></li>";}
                    else{//上一节是第四级目录
                        content+="</li> </ul></li> </ul></li> </ul></li>";
                    }
                    content+=" <li>";
                    content+="  <a href='#' class='dic first'> <span class='nav-label'>"+tempFirst+"</span>";
                    content+=" <span class='catalogIndex' style='display: none'>"+tempFirst+" "+tempSecond+" "+tempThird+" "+tempFourth+"</span>"
                    content+="<span class='nav-label col-md-offset-1 indexName' >"+tempCatalog.title+"</span>";
                    content+="  <span class='fa arrow'></span> </a>";

                }
                // 第二级目录内容生成（不含结束符）
                else  if(tempThird=="0"&&tempFourth=="0"){
                    if(nowSecond=="0"&&nowThird=="0"&&nowFourth=="0")//上一节是第一级目录
                    {
                        content+="<ul  class='nav nav-second-level'>";
                    }
                    else if(nowThird=="0"&&nowFourth=="0")//上一节是第二级目录
                    {
                        content+="</li>";}
                    else if(nowFourth=="0")//上一节是第三级目录
                    {
                        content+="</li> </ul></li>"}
                    else{//上一节是第四级目录
                        content+="</li> </ul></li> </ul></li>";
                    }
                    content+=" <li> <a href='#' class='dic second'>";
                    content+=" <span class='nav-label'>"+tempSecond+"</span>";
                    content+=" <span class='catalogIndex' style='display: none'>"+tempFirst+" "+tempSecond+" "+tempThird+" "+tempFourth+"</span>"
                    content+="<span class='nav-label col-md-offset-1 indexName' >"+tempCatalog.title+"</span></a>";

                }
                // 第三级目录内容生成（不含结束符）
                else  if (tempFourth=="0"){
                    if(nowThird=="0"&&nowFourth=="0")//上一节是第二级目录
                    {
                        content+="<ul class='nav nav-third-level'>";
                    }
                    else if(nowFourth=="0")//上一节是第三级目录
                    {
                        content+="</li>";}
                    else{//上一节是第四级目录
                        content+="</li> </ul></li>";
                    }
                    content+=" <li> <a href='#' class='dic third'>";
                    content+=" <span class='nav-label'>"+tempThird+"</span>";
                    content+=" <span class='catalogIndex' style='display: none'>"+tempFirst+" "+tempSecond+" "+tempThird+" "+tempFourth+"</span>"
                    content+="<span class='nav-label col-md-offset-1 indexName' >"+tempCatalog.title+"</span></a>";

                }
                // 第四级目录内容生成（不含结束符）
                else {
                    if(nowFourth=="0")//上一节是第三级目录
                    {
                        content+="<ul class=' nav nav-fourth-level'>";
                    }
                    else{//上一节是第四级目录
                        content+="</li>";
                    }
                    content+=" <li> <a href='#' class='dic fourth'>";
                    content+=" <span class='nav-label'>"+tempFourth+"</span>";
                    content+=" <span class='catalogIndex' style='display: none'>"+tempFirst+" "+tempSecond+" "+tempThird+" "+tempFourth+"</span>"
                    content+="<span class='nav-label col-md-offset-1 indexName' >"+tempCatalog.title+"</span></a>";


                }
                nowFirst=tempFirst;nowSecond=tempSecond;nowThird=tempThird;nowFourth=tempFourth;
            }
            $("div#allIndex").html(content)
            $('#side-menu').metisMenu();}
        },
        error: function (result) {
            showtoast("dangerous","加载失败","加载目录失败")
        }
    })

}
//新增按钮点击事件
$(".li_add").click(function () {
   if(typeof(nowClick) == "undefined")
    {
        showtoast("warning","新增失败","没有选中任何目录","left");
    }
    if (!nowClick.hasClass("fourth")){
        addModelInit();
        $(".li_add_hidden").click();
    }
    else showtoast("warning","新增失败","只能新增四级目录");
})
//删除按钮点击事件
$(".li_delete").click(function () {
    if(typeof(nowClick) == "undefined")
    {
        showtoast("warning","删除失败","没有选中任何目录","left");
    }
    else{
        var name=$(nowClick).children("span.indexName").text();
        swal({
            title: "删除\""+name+"\"目录下所有内容",
            text: "一旦删除无法恢复，请谨慎操作！",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "删除",
            cancelButtonText: "取消",
            closeOnConfirm: false
        }, function () {
            catalogIndex=$(nowClick).children("span.catalogIndex").text()
            $.ajax({
                url: "catalog-delete",
                data: {catalogIndex:catalogIndex, documentId:documentId},
                dataType: "json",
                type: "Post",
                async: "false",
                success: function (result) {
                    $("button.cancel").click();
                    templateInit();
                    showtoast("success","成功","删除目录成功")
                },
                error: function (result) {
                    showtoast("dangerous","失败","删除目录失败")
                }
            })

        });
    }
})
//上移按钮点击事件
$(".li_up").click(function () {
    //取上一个li
    var lastLi=nowClick.parent().prev("li")
    if ((typeof (lastLi).html())=="undefined")showtoast("warning","失败","已经到顶部")
    else {
        catalogIndex=$(nowClick).children("span.catalogIndex").text()
        $.ajax({
            url: "catalog-up",
            data: {catalogIndex:catalogIndex, documentId:documentId},
            dataType: "json",
            type: "Post",
            async: "false",
            success: function (result) {
                templateInit();
                showtoast("success","成功","上移目录成功")
            },
            error: function (result) {
                showtoast("dangerous","失败","上移目录失败")
            }
        })
    }
})
//下移按钮点击事件
$(".li_down").click(function () {
    //取上一个li
    var nextLi=nowClick.parent().next("li")
    if ((typeof (nextLi).html())=="undefined")showtoast("warning","失败","已经到底部")
    else {
        catalogIndex=$(nowClick).children("span.catalogIndex").text()
        $.ajax({
            url: "catalog-down",
            data: {catalogIndex:catalogIndex, documentId:documentId},
            dataType: "json",
            type: "Post",
            async: "false",
            success: function (result) {
                templateInit();
                showtoast("success","成功","下移目录成功")
            },
            error: function (result) {
                showtoast("dangerous","失败","下移目录失败")
            }
        })
    }
})
//重命名按钮点击事件
$(".li_rename").click(function () {
    renameModelInit();
})
//获取可用性
function getUsable() {
    $.ajax({
        url: "catalog-getUsable",
        data: {},
        dataType: "json",
        type: "Post",
        async: "false",
        success: function (result) {
            usableList=result.usableList;
        },
        error: function (result) {
            showtoast("dangerous","失败","修改标题失败")
        }
    })
}
//可用性初始化
function UsableInit() {
    var content="";
    for (var i=0;i<usableList.length;i++){
        content+=" <option value='"+i+"' onclick='usableClick(this)'>"+(i+1)+"."+usableList[i].name+"</option>"
    }
    $("select#uaSelect").html(content);
}
//加载详细可用性内容
function usableClick(obj) {
var id=parseInt($(obj).val());
$("#uaname").text(usableList[id].name);
    $("#uaproblem").text(usableList[id].rang);
    $("#uasolution").text(usableList[id].solution);
    $("#uaexample").text(usableList[id].example);
}
//页面初始化
$(document).ready(function () {
    templateInit();
    getUsable()
    edit();
})

//数字转英文的函数
function getNextRank(nowRank) {
    if (nowRank=="first")return "second";
    else if(nowRank=="second") return"third";
    else if(nowRank=="third") return"fourth";
}
//新增目录
function catalogAdd() {

    var title = $("input#add_title").val(), id_template = $("#add_id_template").val()
    var place = $("input[name='add_place']:checked").val(),
        catalogIndex = $(nowClick).children("span.catalogIndex").text();
    var temp = $(nowClick).attr("class");
    var classList = temp.split(' ');
    var nowRank = classList[1];
    //需要判断文档能否新建功能模块
    if (id_template == "3") {
        $.ajax({
            url: "catalog-getRoleCount",
            data: {documentId: documentId},
            dataType: "json",
            type: "Post",
            async: "false",
            success: function (result) {
                if (parseInt(result.roleCount) <= 0) {
                    showtoast("warning", "失败", "需要先创建用户");
                    return;
                }
            },
            error: function (result) {
                showtoast("dangerous", "加载失败", "加载目录失败")
            }
        })
    }

        if (place == "0") {//同级,传最后一个元素位置
            catalogIndex = $(nowClick).parent().parent().children("li:last-child").children("a").children("span.catalogIndex").text();
            $.ajax({
                url: "catalog-addState2",
                data: {title: title, id_template: id_template, catalogIndex: catalogIndex, id_document: documentId},
                dataType: "json",
                type: "Post",
                async: "false",
                success: function (result) {
                    var lastNum, nextNum;
                    lastNum = nowClick.parent().parent().children("li:last-child").children("a").children("span:first-child").text();
                    nextNum = (parseInt(lastNum) + 1);
                    var content = "<li> <a href='#' class='dic " + nowRank + "'> <span class='nav-label'>" + nextNum + "</span><span class='catalogIndex' style='display: none'>" + result.spanText + "</span><span class='nav-label col-md-offset-1 indexName'>" + title + "</span></a></li>";
                    nowClick.parent().parent().append(content);
                },
                error: function (result) {
                    showtoast("dangerous", "加载失败", "加载目录失败")
                }
            })
        }
        else if (place == "1") {//下一级别，需要新增ul，传当前级别位置
            var nextRank = getNextRank(nowRank), nowNum, nextNum;
            if (typeof(nowClick.parent().children("ul").html()) == "undefined") {//需要新增一个ul
                catalogIndex = nowClick.children("span.catalogIndex").text();
                $.ajax({
                    url: "catalog-addState1",
                    data: {title: title, id_template: id_template, catalogIndex: catalogIndex, id_document: documentId},
                    dataType: "json",
                    type: "Post",
                    async: "false",
                    success: function (result) {
                        nextNum = 1;
                        nowClick.parent().append(" <ul class='nav nav-" + nextRank + "-level'></ul>")
                        var content = "<li> <a href='#' class='dic " + nextRank + "'> <span class='nav-label'>" + nextNum + "</span><span class='catalogIndex' style='display: none'>" + result.spanText + "</span><span class='nav-label col-md-offset-1 indexName'>" + title + "</span></a></li>";
                        nowClick.parent().children("ul").append(content);
                        $('#side-menu').metisMenu();
                        $(nowClick).click();
                    },
                    error: function (result) {
                        showtoast("dangerous", "加载失败", "加载目录失败")
                    }
                })
            }
            else {//不需要新增，传最后一个元素的位置
                catalogIndex = nowClick.parent().children("ul").children("li:last-child").children("a").children("span.catalogIndex").text();
                ;
                $.ajax({
                    url: "catalog-addState2",
                    data: {title: title, id_template: id_template, catalogIndex: catalogIndex, id_document: documentId},
                    dataType: "json",
                    type: "Post",
                    async: "false",
                    success: function (result) {
                        nowNum = nowClick.parent().children("ul").children("li:last-child").children("a").children("span:first-child").text();
                        nextNum = (parseInt(nowNum) + 1);
                        var content = "<li> <a href='#' class='dic " + nextRank + "'> <span class='nav-label'>" + nextNum + "</span><span class='catalogIndex' style='display: none'>" + result.spanText + "</span><span class='nav-label col-md-offset-1 indexName'>" + title + "</span></a></li>";
                        nowClick.parent().children("ul").append(content);
                    },
                    error: function (result) {
                        showtoast("dangerous", "加载失败", "加载目录失败")
                    }
                })


            }
        }
}
//第一次新增目录
function catalogNew() {
    var title=$("input#new_title").val(),id_template=$("#new_id_template").val();
    if (id_template=="3")showtoast("warning","失败","需要先创建用户")
    else {
        $.ajax({
            url: "catalog-newCatalog",
            data: {title: title, id_document: documentId, id_template: id_template},
            dataType: "json",
            type: "Post",
            async: "false",
            success: function (result) {
                $("div#allIndex").html("<li> <a href='#' class='dic first'> <span class='nav-label'>1</span><span class='catalogIndex' style='display: none'>1 0 0 0</span><span class='nav-label col-md-offset-1 indexName'>" + title + "</span></a></li>")
                $('#side-menu').metisMenu();
                showtoast("success", "成功", "新增目录成功")
            },
            error: function (result) {
                showtoast("dangerous", "失败", "新增目录失败")
            }
        })
    }
    
}
//评论提交
function commitDis() {
    var discuss=$(".discuss").code();
    var catalogIndex=$(nowClick).children("span.catalogIndex").text()
    $.ajax({
        url: "discuss-commit",
        data: {disContent: discuss,catalogIndex:catalogIndex, id_document:documentId},
        dataType: "json",
        type: "Post",
        async: "false",
        success: function (result) {
            showtoast("success","成功","评论提交成功")
            discussInit()
            disReload()
        },
        error: function (result) {
            showtoast("dangerous","加载失败","加载目录失败")
        }
    })
}
//评论删除按钮
$(document).on("click",".deleteDis",function () {
    if ($(this).hasClass("btn-danger")){
        var id_pro_discuss=$(this).prev("input.id_dis").val()
        swal({
            title: "删除评论？",
            text: "一旦删除无法恢复，请谨慎操作！",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "删除",
            cancelButtonText: "取消",
            closeOnConfirm: false
        }, function () {
            $.ajax({
                url: "discuss-delete",
                data: {id_pro_discuss: id_pro_discuss},
                dataType: "json",
                type: "Post",
                async: "false",
                success: function (result) {
                    $("button.cancel").click();
                    showtoast("success","成功","删除评论成功")
                    disReload()
                },
                error: function (result) {
                    showtoast("dangerous","失败","删除评论失败")
                }
            })
        });}
})
//目录重命名
function catalogRename() {
    var title= $("input#re_title").val(),catalogIndex=$(nowClick).children("span.catalogIndex").text();
    $.ajax({
        url: "catalog-rename",
        data: {title: title,catalogIndex:catalogIndex, documentId:documentId},
        dataType: "json",
        type: "Post",
        async: "false",
        success: function (result) {
            var old_title=$("#catalog_title").text();
            var temp=old_title.split(" ")
            $("#catalog_title").text(temp[0]+" "+title)
            $(nowClick).children("span.indexName").text(title)
            showtoast("success","成功","修改标题成功");
        },
        error: function (result) {
            showtoast("dangerous","失败","修改标题失败")
        }
    })
}
//模板编辑按钮
function temp_edit() {
    $("#eg").addClass("no-padding");$(".click1edit").summernote({
        height:100,
        minHeight:100,
        lang:"zh-CN",focus:true,toolbar: [
        // ['style', ['bold', 'italic', 'underline', 'clear']],
        // ['fontsize', ['fontsize']],
        // ['color', ['color']],
        // ['para', ['paragraph']],
        // ['table', ['table']],
        ['picture', ['picture']],
        ['fullscreen', ['fullscreen']]
    ],
        placeholder: '暂无内容',
    })
    $("#edit").attr("style","display:none");
    $("#save").attr("style","display:show");
    $(".dis").removeAttr("disabled")
}
//模板保存按钮
function temp_save() {
    $("#eg").removeClass("no-padding");
    var aHTML=$(".click1edit").code();$(".click1edit").destroy();
    $("#save").attr("style","display:none");
    $("#edit").attr("style","display:show");

    var id_template = nowCatalog.id_template,id_catalog=nowCatalog.id_catalog;
        if (id_template == "1") {//通用
        var describe=$("#describe").code();
        $.ajax({
            url: "catalog-saveTemplateOne",
            data: {id_catalog: id_catalog, content: describe},
            dataType: "json",
            type: "Post",
            async: "false",
            success: function (result) {
                showtoast("success", "保存成功", "内容保存成功")
            },
            error: function (result) {
                showtoast("dangerous", "保存失败", "内容保存失败")
            }
        })
    }
    else if (id_template == "2") {//角色
        var roleName=$("input#roleName").val();
        var describe=$("#describe").code();
        var permissions=$("#permissions").code();
        $.ajax({
            url: "catalog-saveTemplateTwo",
            data: {id_catalog: id_catalog, content: roleName,describe:describe,permissions:permissions},
            dataType: "json",
            type: "Post",
            async: "false",
            success: function (result) {
                showtoast("success", "保存成功", "内容保存成功")
            },
            error: function (result) {
                showtoast("dangerous", "保存失败", "内容保存失败")
            }
        })
    }
    else  if(id_template == "3"){
            var funName=$("input#funName").val();
            var priority=$("select#priority").val();
            var describe=$("#describe").html();
            var inDiv=$("#in").html();
            var outDiv=$("#out").html();
            var basic=$("#basic").html();
            var alternative=$("#alternative").html();
            var  funRoleList="[{";
            var roleName,roleDescribe,usableName,usablePara,last="";
            $(".funTable tbody").find("tr").each(function () {
             if ($(this).hasClass("funTr")){//开头
                  if (last!=""){//第一次，没有,
                      funRoleList+="},{"
                 }
                 roleName=$(this).children("th").eq(1).children(".roleName").find("option:selected").text();
                  // alert($(this).children("th").eq(2).children(".roleDescribe"))
                 roleDescribe=$(this).children("th").eq(2).children(".roleDescribe").val();
                 funRoleList+="\"roleName\":\""+roleName+"\",\"roleDescribe\":\""+roleDescribe+"\"";
                 last="funTr";
             }
            else if ($(this).hasClass("usableTr")){//开头
                 usableName=$(this).children("th:first-child").text();
                 usablePara=$(this).children("th").eq(1).text();
                 funRoleList+=",\"usableName\":\""+usableName+"\",\"usablePara\":\""+usablePara+"\"";
                 last="usableTr";
             }
            })
            funRoleList+="}]";

            var funUsableList="[",usableName,usablePara,first="yes";
            $(".funTable tfoot").find("tr").each(function () {
                    if (first=="yes"){//第一次，没有,
                        funUsableList+="{"
                    }
                    else   funUsableList+=",{"
                    usableName=$(this).children("th:first-child").text();
                    usablePara=$(this).children("th").eq(1).text();
                funUsableList+="\"usableName\":\""+usableName+"\",\"usablePara\":\""+usablePara+"\"}";
                    first="no";
            })
            funUsableList+="]";
            $.ajax({
                url: "catalog-saveTemplateThree",
                data: {id_catalog: id_catalog,funName: funName, priority: priority,content:describe,
                    inDiv:inDiv,outDiv:outDiv,basic:basic,alternative:alternative,
                    funRoleList:funRoleList,funUsableList:funUsableList},
                dataType: "json",
                type: "Post",
                async: "false",
                success: function (result) {
                    showtoast("success", "保存成功", "内容保存成功")
                },
                error: function (result) {
                    showtoast("dangerous", "保存失败", "内容保存失败")
                }
            })
        }
    $(".dis").attr("disabled","true");
}
//评论编辑按钮
function edit() {
    $("#eg").addClass("no-padding");$(".click2edit").summernote({
        lang:"zh-CN",focus:true,toolbar: [
        // ['style', ['bold', 'italic', 'underline', 'clear']],
        // ['fontsize', ['fontsize']],
        // ['color', ['color']],
        // ['para', ['paragraph']],
        // ['table', ['table']],
        ['picture', ['picture']]
    ]})
}
//评论保存按钮
function save() {
    $("#eg").removeClass("no-padding");
    var aHTML=$(".click2edit").code();
}

/**
 * Created by DELL on 2018/1/2.
 *以下为模板3的功能
 */


function deleteUsable(obj) {
    $(obj).parent().parent().prev().children("th:last-child").children("button").show();
    $(obj).parent().parent().remove();
}

function addUsable(obj) {
    $("#para").val("")
    if(typeof (obj)=="undefined"){
        nowLine="undefined";
        return;
    }
    nowLine=$(obj).parent().parent();
}

function addUsabelLine() {
    var usableName=$("#uaname").text();
    var para=$("#para").val();
    var content;
    if (typeof (nowLine)=="undefined"||  nowLine=="undefined"){
        content=" <tr class='usableTr'> <th colspan='2' name='usableName' class='usableName'>全局可用性："+usableName+"</th> <th  name='usablePara' class='usablePara'>发生条件："+para+"</th> <th style='text-align: center'  >  <button  class='btn btn-danger  btn-xs col-lg-push-1 dis' id='deleteUsable'  onclick='deleteUsable(this)' type='button' style='margin-right: 10px'>删除可用性</button></th> </tr>"
        $(".funTable tfoot").append(content);
        return;
    }
    content=" <tr class='usableTr'> <th colspan='2' name='usableName' class='usableName'>局部可用性："+usableName+"</th> <th  name='usablePara' class='usablePara'>发生条件："+para+"</th> <th style='text-align: center'>  <button  class='btn btn-danger  btn-xs col-lg-push-1 dis' id='deleteUsable'  onclick='deleteUsable(this)' type='button' style='margin-right: 10px'>删除可用性</button></th> </tr>"
    $(nowLine).after(content);
    $(nowLine).children("th:last-child").children("button").hide();

}

function addFunlLine() {
    var optionCon=""
    for (var i=0;i<roleList.length;i++){
        optionCon+="<option>"+roleList[i].roleName+"</option>";
    }
    var content="   <tr class='funTr'> <th > <span class='fun_down li_fa fa col-md-offset-1  fa-arrow-down black'></span> <span class='fun_up fa li_fa col-md-offset-1  fa-arrow-up black'></span> <span class='fun_delete li_fa fa col-md-offset-1  fa-times  black' ></span></th> <th> " +
        "<select class='form-control roleName dis' name='' name='roleName'  > " +
        optionCon +
        "</select> " +
        "</th> <th> <textarea   class='form-control roleDescribe dis'   style='max-width: 100%' name='roleDescribe'    ></textarea> </th> <th> <button  class='btn btn-primary  btn-xs col-lg-push-1'  id='addUsable'  data-toggle='modal' data-target='#addUsableModel' onclick='addUsable(this)' type='button' style='margin-right: 10px'>新增可用性</button> </th> </tr>"
    $(".funTable").children("tbody").children("tr:last-child").before(content);
}

$(document).on("click",".fun_down",function () {
    var thisLine=$(this).parent().parent();
    if(thisLine.next("tr").hasClass("usableTr")){
        var nextLine=thisLine.next();
        if(nextLine.next().hasClass("end"))
            showtoast("warning","失败","已经到底部");
        else {
            var afterFunTr=nextLine.next("tr.funTr");
            if (afterFunTr.next().hasClass("end")||afterFunTr.next().hasClass("funTr")){
                afterFunTr.after(nextLine)
                afterFunTr.after(thisLine)
            }
            else{
                afterFunTr.next().after(nextLine)
                afterFunTr.next().after(thisLine)
            }
        }
    }
    else {
        if(thisLine.next().hasClass("end"))
            showtoast("warning","失败","已经到底部");
        else {
            var afterFunTr=thisLine.next("tr.funTr");
            if (afterFunTr.next().hasClass("end")||afterFunTr.next().hasClass("funTr")){
                afterFunTr.after(thisLine);
            }
            else afterFunTr.next().after(thisLine);
        }
    }

})

$(document).on("click",".fun_up",function () {
    var thisLine=$(this).parent().parent();
    if(thisLine.index()==0)
    {
        showtoast("warning","失败","已经到顶部");return;
    }
    if(thisLine.next("tr").hasClass("usableTr")){
        var nextLine=thisLine.next();
        var beforeFunTr=thisLine.prev();
        if (beforeFunTr.hasClass("funTr")){
            beforeFunTr.before(thisLine)
            beforeFunTr.before(nextLine)
        }
        else{
            beforeFunTr.prev().before(thisLine)
            beforeFunTr.prev().before(nextLine)
        }
    }
    else {
        var beforeFunTr=thisLine.prev();
        if (beforeFunTr.hasClass("funTr")){
            beforeFunTr.before(thisLine)
        }
        else{
            beforeFunTr.prev().before(thisLine)
        }

    }
})

$(document).on("click",".fun_delete",function () {
    var thisLine=$(this).parent().parent();
    if(thisLine.next().hasClass("usableTr")){
        thisLine.next().remove();
    }
    thisLine.remove();
})

