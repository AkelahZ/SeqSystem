<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF8">
    <title>创建项目</title>
    <!--[if lt IE 9]>
    <meta http-equiv="refresh" content="0;ie.html" />
    <![endif]-->
    <meta name="viewport" content="width=devicewidth, initialscale=1.0">
    <meta name="renderer" content="webkit">

    <link href="../../css/bootstrap.min14ed.css" rel="stylesheet">
    <link href="../../css/font-awesome.min93e3.css?v=4.4.0" rel="stylesheet">
    <link href="../../css/animate.min.css" rel="stylesheet">
    <link href="../../css/style.min862f.css?v=4.1.0" rel="stylesheet">
    <link href="../../css/plugins/toastr/toastr.min.css" rel="stylesheet">
    <link href="../../css/xzw.css" rel="stylesheet">
    <link href="../../css/lzf.css" rel="stylesheet">

</head>
<body class="gray-bg animated fadeInDown">
<div class=" row wrapper white-bg">
    <ol class="breadcrumb" style="margin-left: 40px">
        <li style="font-size: 15px">
            <strong>
                <a href="user-jmpHomepage"><span class="lzf_b">首页</span></a> >><a href="user-jmpNewproject"><span class="lzf_b">新建项目</span></a>
            </strong>
        </li>
    </ol>
</div>

<div>
<form class="form-horizontal col-md-offset-3 " id="createForm" style="margin-top:50px">
    <div class="form-group has-feedback">

        <label class="control-label col-sm-3"><button class="btn-circle btn-default"><img src="../../img/u11.png" style="height: 18px;width: 20px"></button>　项目名称：</label>
        <div class="col-sm-4">
            <input type="text"  id="proName" class="form-control text-center" placeholder="请输入项目名称" />
        </div>

    </div>

    <div class="form-group">
        <br/>
    </div>

    <div class="form-group has-feedback">
        <label class="control-label col-sm-3"><button class="btn-circle btn-default"><img src="../../img/u12.png" style="height: 18px;width: 20px"></button>　文档名称：</label>
        <div class="col-sm-4">
            <input type="text"  id="docName" class="form-control text-center" placeholder="请输入文档名称" />
        </div>
    </div>

    <div class="form-group">
        <br/>
    </div>

    <div class="form-group">
        <label class="control-label col-sm-3"><button class="btn-circle btn-default"><img src="../../img/u13.png" style="height: 18px;width: 20px"></button>　机构名称：</label>
        <div class="col-sm-4">
            <div class="input-group">
                <input type="text" id="orgName" class="form-control text-center" autocomplete="true" placeholder="请输入机构名称" oninput="inputSuggest()">
                <div class="input-group-btn">
                    <button type="button" class="btn btn-white dropdown-toggle" data-toggle="dropdown">
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-right" role="menu" style="padding-top: 0px; max-height: 375px; max-width: 800px; overflow: auto; width: auto; transition: 0.5s; min-width: 400px; left: -367px; right: auto;">
                    </ul>
                </div>
            </div>
            <!-- /btn-group -->
        </div>
    </div>


    <div class="form-group">
        <br/>
    </div>

    <div class="form-group has-feedback">
        <label class="control-label col-sm-3"><button class="btn-circle btn-default"><img src="../../img/u14.png" style="height: 18px;width: 20px"></button>　项目简介：</label>
        <div class="col-sm-4">
            <textarea type="text"  id="intro" class="form-control text-center" placeholder="输入项目的基本介绍" rows="6"></textarea>
            <a class="glyphicon glyphicon-remove form-control-feedback"style="pointer-events: auto"></a>
        </div>
    </div>

    <div class="form-group">
        <br/>
    </div>
</form>

    <div class="col-xs-10 col-xs-offset-1">
        <h4 id="mylabel" style="font-size: 13px;margin-left: 75px">请确认项目的相关信息，组员后续可以邀请加入，若信息无误请点击确认创建按钮</h4>
    </div>

    <div class="col-md-12">
        <br/><br/><br/>
    </div>

    <div class="col-md-5 col-xs-offset-2">
        <span class="col-md-2 col-xs-offset-2">
            <button id="create_button" class="btn-danger btn">确认创建</button>
        </span>
        <span class="col-md-2 col-xs-offset-3">
            <a href="user-jmpHomepage"><button class="btn-default btn">取消创建</button></a>
        </span>
    </div>

</div>
</body>
<script src="../../js/jquery.min.js?v=2.1.4"></script>
<script src="../../js/bootstrap.min.js?v=3.3.6"></script>
<script src="../../js/content.min.js?v=1.0.0"></script>
<script src="../../js/plugins/toastr/toastr.min.js"></script>
<script src="../../js/plugins/suggest/bootstrap-suggest.min.js"></script>
<script src="../../js/mjy.js"></script>
<script>

</script>
<script>

    $("button#create_button").click(function () {
        $.ajax({
            url: "project-create",
            data: {
                name: $("input#proName").val(), document_Name: $("input#docName").val(),
                orgName: $("input#orgName").val(), intro: $("textarea#intro").val()
            },
            dataType: "json",
            type: "Post",
            async: "false",
            success: function (result) {
                if(result.res===true)  {
                    showtoast("success", "创建成功", "操作成功")
                    location.href = "user-jmpCurrentProjectList"
                }
                else  showtoast("error", "创建失败", "操作失败")
            },
            error: function (result) {
                showtoast("error", "创建失败", "操作失败")
            }
        })
    });
    function inputSuggest() {
        var orgName=$("input#orgName");
        $.ajax({
            url: "project-chooseOrg",
            data: {OrgName:orgName.val()},
            dataType: "json",
            type: "get",
            async: "false",
            success: function (result) {
                var orgList = result.res;
                var suggest="";
                suggest = JSON.parse('{"value": ' + orgList + ', "defaults": "10000000000"}');

                $("input#orgName").bsSuggest("destroy");
                $("#orgName").bsSuggest({
                    idField:"ID_ORGANIZATION",
                    keyField:"NAME",
                    data:suggest
                }).on('onDataRequestSuccess', function (e, result) {
                    console.log('从 json.data 参数中获取，不会触发 onDataRequestSuccess 事件', result);
                });
            },
            error: function (result) {
                alert('error');
            }
        })
    }

    $(function () {
        $('a').click(function () {
            $('textarea')[0].value = "";
        })
    })
</script>

</html>