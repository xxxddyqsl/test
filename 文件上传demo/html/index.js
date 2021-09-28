if (!console) {
    var console = {};
    console.log = function(data){
        // alert(data)
    }
}
if (typeof console.time == "undefined") {
    console.time = console.timeEnd = function(data){}
}

(function(){
    $(document).on('click',function(){
        layer.close(layerBtn);
    })

    $('#recall').on('click', recall);
    $('#sendSign').on('click', sendSign);
    $('#reject').on('click', reject);
    $('#approve').on('click', approve);
    $('#transfer').on('click', transfer);
    $('#addApprove').on('click', addApprove);
    $('#backSign').on('click', backSign);
    $('#holdSign').on('click', holdSign);
    $('#changeSign').on('click', changeSign);
    $('#print').on('click', self_print);

    //版本切换
    var search = window.location.search;
    if (search.indexOf('new=new') > 0) {
        window.localStorage.setItem('version', 'new');
    }
    var version = window.localStorage.getItem('version');
    if (window.localStorage.getItem('oldAdd')) {
        var newlocal = window.localStorage.getItem('oldAdd').split('&old=old')[0];
    } else {
        var newlocal = '';
    }
    var newAdd = newlocal + '&old=old';
    if (version == 'old' && newlocal != null) {
        window.location.href = newAdd;
    }
    $('.version').on('click', versionFn);
    function versionFn(){
        window.localStorage.setItem('version','old');
        console.log('开始切换到旧版喽！');
        window.location.href = newAdd || window.location.href;
    }

    //获取公共方法
    var public = publicJS();

    public.getForm = {};
    public.getForm.params = {};
    var getFormInfo = window.location.search;
    if (getFormInfo && getFormInfo.split('?').length > 0) {
        var getFormInfoArr = getFormInfo.split('?')[1].split('&');
        for (var i = 0; i < getFormInfoArr.length; i++) {
            if ((getFormInfoArr[i].split('=')[0]).toUpperCase() == 'FORM_APPROVER_ID') {
                public.getForm.params.approveId = getFormInfoArr[i].split('=')[1];
            } else if ((getFormInfoArr[i].split('=')[0]).toUpperCase() == 'FORM_KIND') {
                public.getForm.params.formkind = getFormInfoArr[i].split('=')[1];
            } else if ((getFormInfoArr[i].split('=')[0]).toUpperCase() == 'FORM_NO') {
                public.getForm.params.formno = getFormInfoArr[i].split('=')[1];
            } else {
                public.getForm.params[getFormInfoArr[i].split('=')[0]] = getFormInfoArr[i].split('=')[1];
            }
        }
        for (var i = 0; i < document.cookie.split(';').length; i++) {
            if (document.cookie.split(';')[i].indexOf('Account_No=') >= 0){
                public.getForm.params.uid = document.cookie.split(';')[i].split('=').pop();
            }
        }

        //测试环境
        public.baseUrl = '/snailbpm/api';
        public.baseUrl1 = '';
        public.uploadUrl = '/SnailOffice';

        if (newlocal && newlocal.indexOf('/Apply/Popup') >= 0) {
            public.getForm.getUrl = public.baseUrl+'/ApplyForm/GetFormFieldInfor';
            public.getForm.signUrl = public.baseUrl+'/ApplyForm/ApplyForm';
            public.getForm.params.formno = 0;
        } else if (newlocal && newlocal.indexOf('/Approve/Popup') >= 0) {
            public.getForm.getUrl = public.baseUrl+'/Approve/GetFormDetail';
            public.getForm.signUrl = public.baseUrl+'/Approve/ApproveForm';
            public.getForm.params.viewType = 'view';
        } else if (newlocal && newlocal.indexOf('/Popup/Apply') >= 0) {
            public.getForm.getUrl = public.baseUrl+'/Approve/GetFormDetail';
            public.getForm.signUrl = public.baseUrl+'/ApplyForm/ApplyForm';
            public.getForm.recallUrl = public.baseUrl+'/Approve/RecallForm';
            public.getForm.params.viewType = 'trace';
            public.getForm.params.approveId = public.getForm.params.approveId || '(null)';
        } else if (newlocal && newlocal.indexOf('/Popup/Approve') >= 0) {
            public.getForm.getUrl = public.baseUrl+'/Approve/GetFormDetail';
            public.getForm.signUrl = public.baseUrl+'/ApplyForm/ApplyForm';
            public.getForm.changeUrl = public.baseUrl+'/Approve/ApproveFormAgain';
            public.getForm.params.viewType = 'trace';
            public.getForm.params.approveId = public.getForm.params.approveId || '(null)';
        } else {
            layer.msg('找不到地址！');
            return false;
        }

    } else {
        layer.msg('找不到地址！');
        return false;
    }

    //加载按钮
    if (newlocal && newlocal.indexOf('/Apply/Popup') >= 0) {
        $('#form_menu li')[1].className = '';
        $('#form_menu li')[9].className = '';
    } else if (newlocal && newlocal.indexOf('/Approve/Popup') >= 0) {
        $('#form_menu li')[2].className = '';
        $('#form_menu li')[3].className = '';
        $('#form_menu li')[4].className = '';
        $('#form_menu li')[5].className = '';
        $('#form_menu li')[6].className = '';
        $('#form_menu li')[7].className = '';
        $('#form_menu li')[9].className = '';
        $('#form_menu li')[10].className = 'loadPage';
        $('#form_menu li')[11].className = 'loadPage';
        $('#prevPage').on('click', prevPage);
        $('#nextPage').on('click', nextPage);
    } else if (newlocal && newlocal.indexOf('/Popup/Apply') >= 0) {
        $('#form_menu li')[0].className = '';
        $('#form_menu li')[9].className = '';
    } else if (newlocal && newlocal.indexOf('/Popup/Approve') >= 0) {
        $('#form_menu li')[8].className = '';
        $('#form_menu li')[9].className = '';
    } else {
        layer.msg('找不到地址！');
        return false;
    }
    function prevPage(){
        if (newlocal && newlocal.indexOf('/Approve/Popup') >= 0 && public.getPrevForm && public.getPrevForm.formno) {
            toPrevForm();
        } else {
            layer.msg('已经是第一张表单了！');
        }
    }
    function nextPage(){
        if (newlocal && newlocal.indexOf('/Approve/Popup') >= 0 && public.getNextForm && public.getNextForm.formno) {
            toNextForm();
        } else {
            layer.msg('已经是最后一张表单了！');
        }
    }

    //进入页面加载表单信息
    getForm();
    function getForm() {
        var params = public.getForm.params;
        public.ajax({
            type:'get',
            url:public.getForm.getUrl,
            async:window.name == 'printCon' ? false : true,
            noShade:true,
            data:params,
            dataType:'json',
            success:function(data){
                console.time('loading');
                if (data.Code != 0) {
                    layer.msg(data.Message || '网络错误！');
                    return;
                } else if (data.Code == 0 && data.Data.IsSupportMobile == 'n') {
                    $('#loading_con').remove();
                    layer.msg('此表单不支持新版，跳转旧版中', {
                        icon: 16,
                        shade: 0.01
                    });
                    setTimeout(function() {
                        location.href = newlocal+'&old=loadold';
                    }, 1500);
                    return;
                }
                public.getFromData = data.Data;
                public.uploadData = {};
                public.radioData = {};
                $('#form_con').children().remove();
                $('#title h1').html(data.Data.FormName);
                $('#title .title_left').html('填表人:'+data.Data.FormApplier);
                $('#title .title_right').html('表单号:'+data.Data.FormNo+' 申请日期:'+data.Data.AppliedDate);
                var item = data.Data.FieldList;
                var mainList = {},subList = {};
                //表单详情加载
                if (data.Data && item && item.length > 0) {
                    for (var i = 0; i < item.length; i++) {
                        mainList[item[i].Field.FieldId] = item[i].Field.FieldId;
                        if (item[i].Type.toUpperCase() == 'MAIN') {
                            var lineType = getLineType(item[i].Field.DataType, item[i].Field.FieldMaxLength);
                            var con = '';
                            con += '<tr>';
                            con += '<td colspan="'+lineType+'">';
                            con += '<div class="form_con_td_left" '+fontSizeFn(item[i].Field.LabelName)+'>';
                            con += FieldIsNull(item[i].Field.FieldIsNull);
                            con += item[i].Field.LabelName;
                            con += '</div>';
                            con += '<div class="form_con_td_right">';
                            con += domType(item[i].Field.DataType, item[i].Field.FieldValue.replace(/</g, '&lt;'), item[i].Field.ExtendValue, item[i].Field.FieldId, item[i].Field.FieldIsReadonly);
                            con += '</div>';
                            con += '</td>';

                            if (i < (item.length - 1) && lineType == 1 && item[i+1] && item[i+1].Type.toUpperCase() == 'MAIN' && getLineType(item[i+1].Field.DataType, item[i+1].Field.FieldMaxLength) == 1) {
                                i++;
                                var lineType = getLineType(item[i].Field.DataType, item[i].Field.FieldMaxLength);
                                mainList[item[i].Field.FieldId] = item[i].Field.FieldId;
                                con += '<td colspan="'+lineType+'">';
                                con += '<div class="form_con_td_left" '+fontSizeFn(item[i].Field.LabelName)+'>';
                                con += FieldIsNull(item[i].Field.FieldIsNull);
                                con += item[i].Field.LabelName;
                                con += '</div>';
                                con += '<div class="form_con_td_right">';
                                con += domType(item[i].Field.DataType, item[i].Field.FieldValue.replace(/</g, '&lt;'), item[i].Field.ExtendValue, item[i].Field.FieldId, item[i].Field.FieldIsReadonly);
                                con += '</div>';
                                con += '</td>';
                            }
                            con += '</tr>';
                            $('#form_con').append(con);
                        } else if (item[i].Type.toUpperCase() == 'SUB') {
                            subList[item[i].Field.TableName] = item[i].Field.SubTable;
                            subList[item[i].Field.TableName].AllowAdd = item[i].Field.AllowAdd;
                            subList[item[i].Field.TableName].AllowDelete = item[i].Field.AllowDelete;
                            subList[item[i].Field.TableName].AllowModify = item[i].Field.AllowModify;
                            subList[item[i].Field.TableName].LabelName = item[i].Field.LabelName;
                            subList[item[i].Field.TableName].ColunmField = item[i].Field.ColunmField;
                            for (var q = 0; q < item[i].Field.ColunmField.length; q++) {
                                if (item[i].Field.ColunmField[q].DataType == 'OPTION') {
                                    public.radioData[item[i].Field.ColunmField[q].FieldId] = {};
                                    for (var p = 0; p < item[i].Field.ColunmField[q].ExtendValue.radios.length; p++) {
                                        public.radioData[item[i].Field.ColunmField[q].FieldId][item[i].Field.ColunmField[q].ExtendValue.radios[p][0]] = item[i].Field.ColunmField[q].ExtendValue.radios[p][1];
                                    }
                                } else if (item[i].Field.ColunmField[q].DataType == 'CHECKLIST') {
                                    public.radioData[item[i].Field.ColunmField[q].FieldId] = {};
                                    for (var p = 0; p < item[i].Field.ColunmField[q].ExtendValue.checkboxs.length; p++) {
                                        public.radioData[item[i].Field.ColunmField[q].FieldId][item[i].Field.ColunmField[q].ExtendValue.checkboxs[p][0]] = item[i].Field.ColunmField[q].ExtendValue.checkboxs[p][1];
                                    }
                                } else if (item[i].Field.ColunmField[q].DataType == 'SELECT') {
                                    public.radioData[item[i].Field.ColunmField[q].FieldId] = {};
                                    for (var p = 0; p < item[i].Field.ColunmField[q].ExtendValue.dropdownlists.length; p++) {
                                        public.radioData[item[i].Field.ColunmField[q].FieldId][item[i].Field.ColunmField[q].ExtendValue.dropdownlists[p][0]] = item[i].Field.ColunmField[q].ExtendValue.dropdownlists[p][1];
                                    }
                                }
                            }
                            var con = '';
                            con += '<tr><td colspan="2">';
                            con += '<div class="form_con_td_left" '+fontSizeFn(item[i].Field.LabelName)+'>'+item[i].Field.LabelName+'</div>';
                            con += '<div class="form_con_td_right sub_con">';
                            if (item[i].Field.AllowAdd == 'Y' && item[i].Field.AllowDelete == 'Y') {
                                con += '<ul class="ul_con">';
                                con += '<li class="del" data-ptable="'+item[i].Field.TableName+'">清空</li>';
                                con += '<li class="add" data-ptable="'+item[i].Field.TableName+'">新增</li>';
                                con += '</ul>';
                            } else if (item[i].Field.AllowAdd == 'Y' && item[i].Field.AllowDelete == 'N') {
                                con += '<ul class="ul_con">';
                                con += '<li class="add" data-ptable="'+item[i].Field.TableName+'">新增</li>';
                                con += '</ul>';
                            } else if (item[i].Field.AllowAdd == 'N' && item[i].Field.AllowDelete == 'Y') {
                                con += '<ul class="ul_con">';
                                con += '<li class="del" data-ptable="'+item[i].Field.TableName+'">清空</li>';
                                con += '</ul>';
                            } else {
                                con += '<ul class="ul_con">';
                                con += '<li class="big" data-ptable="'+item[i].Field.TableName+'">大屏</li>';
                                con += '</ul>';
                            }
                            con += '<table class="sub sub_width" id="'+item[i].Field.TableName+'">';
                            con += '<thead><tr>';
                            for (var q = 0; q < item[i].Field.ColunmField.length; q++) {
                                con += '<th>'+item[i].Field.ColunmField[q].LabelName+'</th>';
                            }
                            if (item[i].Field.AllowAdd == 'Y' || item[i].Field.AllowDelete == 'Y' ||item[i].Field.AllowModify == 'Y') {
                                con += '<th>操作</th>';
                            }
                            con += '</tr></thead>';
                            con += '<tbody>';
                            var num = 1;
                            for (var q = 0; q < item[i].Field.SubTable.ColumnValues.length; q++) {
                                // if (q < 6){
                                    con += '<tr>';
                                    for (var p = 0; p < item[i].Field.SubTable.ColumnValues[q].length; p++) {
                                        if (item[i].Field.ColunmField[p].DataType == 'EMPLOYEE') {
                                            con += '<td title="'+item[i].Field.SubTable.ColumnValues[q][p]+'">'+item[i].Field.SubTable.ColumnValues[q][p].split('$')[0]+'</td>';
                                        } else if (item[i].Field.ColunmField[p].DataType == 'FILE') {
                                            public.uploadData[item[i].Field.ColunmField[p].FieldId] ? null : public.uploadData[item[i].Field.ColunmField[p].FieldId] = {};
                                            if (!public.uploadData[item[i].Field.ColunmField[p].FieldId][num]) {
                                                public.uploadData[item[i].Field.ColunmField[p].FieldId][num] = {};
                                            }
                                            var temp = JSON.parse(item[i].Field.SubTable.ColumnValues[q][p]);
                                            for (var o = 0; o < temp.length; o++) {
                                                public.uploadData[item[i].Field.ColunmField[p].FieldId][num][temp[o][2]] = {};
                                                public.uploadData[item[i].Field.ColunmField[p].FieldId][num][temp[o][2]].fileId = temp[o][2];
                                                public.uploadData[item[i].Field.ColunmField[p].FieldId][num][temp[o][2]].name = temp[o][0];
                                                public.uploadData[item[i].Field.ColunmField[p].FieldId][num][temp[o][2]].addr = uploadView(temp[o][3], temp[o][2]);
                                                public.uploadData[item[i].Field.ColunmField[p].FieldId][num][temp[o][2]].formKind = public.getFromData.FormKind;
                                                public.uploadData[item[i].Field.ColunmField[p].FieldId][num][temp[o][2]].formNo = public.getFromData.FormNo;
                                            }
                                            con += '<td><ul class="file_con file_width">';
                                            for (n in public.uploadData[item[i].Field.ColunmField[p].FieldId][num]) {
                                                con += '<li class="addDocument" title="'+public.uploadData[item[i].Field.ColunmField[p].FieldId][num][n].name+'">';
                                                con += '<span class="name"><a target="_blank" target="_blank" href="'+public.uploadData[item[i].Field.ColunmField[p].FieldId][num][n].addr+'">'+public.uploadData[item[i].Field.ColunmField[p].FieldId][num][n].name+'</a></span>';
                                                con += '</li>';
                                            }
                                            con += '</ul></td>';
                                            num++;
                                        } else {
                                            con += '<td title="'+item[i].Field.SubTable.ColumnValues[q][p]+'">'+item[i].Field.SubTable.ColumnValues[q][p].replace(/</g, '&lt;')+'</td>';
                                        }
                                    }
                                    if (item[i].Field.AllowModify == 'Y' && item[i].Field.AllowDelete == 'Y') {
                                        con += '<td>';
                                        con += '<a target="_blank" class="subTableMod" data-code="'+(q+1)+'" data-ptable="'+item[i].Field.TableName+'"> 编辑 </a>';
                                        con += '<a target="_blank" class="subTableDel" data-code="'+(q+1)+'" data-ptable="'+item[i].Field.TableName+'"> 删除 </a>';
                                        con += '</td>';
                                    } else if (item[i].Field.AllowModify == 'N' && item[i].Field.AllowDelete == 'Y') {
                                        con += '<td>';
                                        con += '<a target="_blank" class="subTableDel" data-code="'+(q+1)+'" data-ptable="'+item[i].Field.TableName+'"> 删除 </a>';
                                        con += '</td>';
                                    } else if (item[i].Field.AllowModify == 'Y' && item[i].Field.AllowDelete == 'N') {
                                        con += '<td>';
                                        con += '<a target="_blank" class="subTableMod" data-code="'+(q+1)+'" data-ptable="'+item[i].Field.TableName+'"> 编辑 </a>';
                                        con += '</td>';
                                    }
                                    con += '</tr>';
                                // } else if (q == 6){
                                //     if (item[i].Field.AllowAdd == 'Y' || item[i].Field.AllowDelete == 'Y' ||item[i].Field.AllowModify == 'Y') {
                                //         con += '<tr><td colspan="'+(item[i].Field.ColunmField.length+1)+'" align="center">';
                                //         con += '<a target="_blank" class="sub_more" data-ptable="'+item[i].Field.TableName+'">点击查看更多！</a>';
                                //         con += '</td></tr>';
                                //     } else {
                                //         con += '<tr><td colspan="'+item[i].Field.ColunmField.length+'" align="center">';
                                //         con += '<a target="_blank" class="sub_more" data-ptable="'+item[i].Field.TableName+'">点击查看更多！</a>';
                                //         con += '</td></tr>';
                                //     }
                                //     break;
                                // }
                            }
                            setTimeout(function() {
                                $('.ul_con li').unbind();
                                $('.ul_con li.add').on('click', add);
                                $('.ul_con li.del').on('click', del);
                                $('.ul_con li.big').on('click', big);
                                // $('.sub_more').unbind();
                                // $('.sub_more').on('click', sub_more);
                                $('.subTableMod').unbind();
                                $('.subTableDel').unbind();
                                $('.subTableMod').on('click', subTableMod);
                                $('.subTableDel').on('click', subTableDel);
                            }, 10);
                            if (item[i].Field.SubTable.ColumnValues.length == 0 && item[i].Field.ColunmField.length > 0) {
                                if (item[i].Field.AllowAdd == 'Y' || item[i].Field.AllowDelete == 'Y' ||item[i].Field.AllowModify == 'Y') {
                                    con += '<tr><td colspan="'+(item[i].Field.ColunmField.length+1)+'" align="center">无数据！</td></tr>';
                                } else {
                                    con += '<tr><td colspan="'+item[i].Field.ColunmField.length+'" align="center">无数据！</td></tr>';
                                }
                            }
                            con += '</tbody>';
                            con += '</table>';
                            con += '</div>';
                            con += '</td></tr>';
                            $('#form_con').append(con);
                        }
                    }
                    if (window.name == 'printCon') {
                        $('#form_menu').css('display', 'none');
                        $('.big').css('display', 'none');
                        $('.add').css('display', 'none');
                        $('.del').css('display', 'none');
                        $('.addIcon').css('display', 'none');
                        $('html')[0].id = '';
                        $('#loading_con').remove();
                        setTimeout(function() {
                            $('.addDocument').css('height', '18px');
                            $('.addDocument').css('background', '#fff');
                            $('.delete').css('display', 'none');
                        }, 10);
                    }
                    $('.betterlook').removeClass('betterlook');
                    //缓存本地
                    for (n in subList) {
                        for (var i = 0; i < subList[n].ColumnValues.length; i++) {
                            var ColumnValueItem = {},ColumnValue = [];
                            for (var q = 0; q < subList[n].ColumnValues[i].length; q++) {
                                if (subList[n].ColunmField[q].DataType == 'EMPLOYEE') {
                                    var subList_item = {};
                                    subList_item.DataType = 'EMPLOYEE';
                                    subList_item.ColumnName = subList[n].ColunmField[q].FieldId;
                                    subList_item.ColumnValue = subList[n].ColumnValues[i][q].split('$')[1];
                                    subList_item.showValue = subList[n].ColumnValues[i][q].split('$')[0];
                                    ColumnValue.push(subList_item);
                                } else if (subList[n].ColunmField[q].DataType == 'FILE') {
                                    
                                } else {
                                    var subList_item = {};
                                    subList_item.ColumnName = subList[n].ColunmField[q].FieldId;
                                    subList_item.ColumnValue = subList[n].ColumnValues[i][q];
                                    subList_item.showValue = subList[n].ColumnValues[i][q];
                                    subList_item.FieldName = subList[n].ColunmField[q].FieldName;
                                    ColumnValue.push(subList_item);
                                }
                            }
                            ColumnValueItem.ColumnValue = ColumnValue;
                            ColumnValueItem.TableName = n;
                            if (!subList[n].ColumnValue) {
                                subList[n].ColumnValue = [];
                                ColumnValueItem.ItemNo = 1;
                            } else {
                                ColumnValueItem.ItemNo = subList[n].ColumnValue[subList[n].ColumnValue.length-1].ItemNo + 1;
                            }
                            subList[n].ColumnValue.push(ColumnValueItem);
                        }
                    }
                    public.mainList = mainList;
                    public.subList = subList;
                    //加载默认联动
                    linkDom(item);
                } else {
                    layer.msg(data.Data.Message || '');
                }

                function fontSizeFn(data){
                    if (data.length > 7) {
                        return 'style="font-size:12px;"';
                    } else {
                        return '';
                    }
                }

                function subTableMod(e){
                    add(e, 'mod');
                }
                function add(e, data){
                    var ptable = $(e.target).data('ptable');
                    var code = $(e.target).data('code');
                    var tableInfo, text;
                    data == 'mod' ? text = '编辑' : text = '新增';
                    for (var i = 0; i < public.getFromData.FieldList.length; i++) {
                        var item = public.getFromData.FieldList[i];
                        if (item.Type.toUpperCase() == 'SUB' && ptable == item.Field.TableName) {
                            tableInfo = item.Field;
                        }
                    }
                    if (!tableInfo) {
                        console.log('不存在新增列表！');
                        return;
                    }
                    var content = '';
                    content += '<div class="add_con"><table class="sub">';
                    content += '<tbody>';
                    for (var i = 0; i < tableInfo.ColunmField.length; i++) {
                        content += '<tr>';
                        content += '<td>'+FieldIsNull(tableInfo.ColunmField[i].FieldIsNull)+tableInfo.ColunmField[i].LabelName+'</td>';
                        content += '<td>'+addDom(tableInfo.ColunmField[i].DataType, tableInfo.ColunmField[i].ExtendValue, tableInfo.ColunmField[i].FieldId, code)+'</td>';
                        content += '</tr>';
                    }
                    content += '</tbody>';
                    content += '</table></div>';
                    layer.prompt({
                        title: text+tableInfo.LabelName+'信息',
                        formType: 2,
                        content: content,
                        btn:['确定','取消'],
                        success:function(){
                            linkDom(tableInfo.ColunmField);
                            if (!public.subList[ptable] || !public.subList[ptable].ColumnValue) {
                                return;
                            }
                            for (var i = 0; i < public.subList[ptable].ColumnValue.length; i++) {
                                if (ptable == public.subList[ptable].ColumnValue[i].TableName && code == public.subList[ptable].ColumnValue[i].ItemNo) {
                                    var successItem = public.subList[ptable].ColumnValue[i].ColumnValue;
                                    for (var q = 0; q < successItem.length; q++) {
                                        if (successItem[q].DataType == 'EMPLOYEE' || successItem[q].DataType == 'PICKER') {
                                            public.innerValue(successItem[q].ColumnName, successItem[q].showValue);
                                            $('#'+successItem[q].ColumnName).data('name', successItem[q].showValue);
                                            $('#'+successItem[q].ColumnName).data('id', successItem[q].ColumnValue);
                                        } else {
                                            public.innerValue(successItem[q].ColumnName, successItem[q].ColumnValue);
                                        }
                                    }
                                }
                            }
                            fileShow(name, public.uploadData[name]);
                        },yes:function(index, layero){
                            var ColumnValueitem = [],ColumnValue = {};
                            for (var i = 0; i < tableInfo.ColunmField.length; i++) {
                                var item = {};
                                if (tableInfo.ColunmField[i].DataType == 'EMPLOYEE') {
                                    item.DataType = 'EMPLOYEE';
                                    item.ColumnName = tableInfo.ColunmField[i].FieldId;
                                    item.FieldName = tableInfo.ColunmField[i].FieldName;
                                    item.ColumnValue = $('#'+tableInfo.ColunmField[i].FieldId).data('id');
                                    item.showValue = public.getValue(tableInfo.ColunmField[i].FieldId);
                                } else if (tableInfo.ColunmField[i].DataType == 'PICKER') {
                                    item.DataType = 'PICKER';
                                    item.ColumnName = tableInfo.ColunmField[i].FieldId;
                                    item.FieldName = tableInfo.ColunmField[i].FieldName;
                                    item.ColumnValue = public.getValue(tableInfo.ColunmField[i].FieldId);
                                    item.showValue = public.getValue(tableInfo.ColunmField[i].FieldId);
                                } else if (tableInfo.ColunmField[i].DataType == 'OPTION' || tableInfo.ColunmField[i].DataType == 'SELECT') {
                                    item.ColumnName = tableInfo.ColunmField[i].FieldId;
                                    item.FieldName = tableInfo.ColunmField[i].FieldName;
                                    item.ColumnValue = public.getValue(tableInfo.ColunmField[i].FieldId);
                                    item.showValue = public.radioData[tableInfo.ColunmField[i].FieldId][item.ColumnValue] || '';
                                } else if (tableInfo.ColunmField[i].DataType == 'CHECKLIST') {
                                    item.ColumnName = tableInfo.ColunmField[i].FieldId;
                                    item.FieldName = tableInfo.ColunmField[i].FieldName;
                                    item.ColumnValue = public.getValue(tableInfo.ColunmField[i].FieldId);
                                    var showValue = '';
                                    if (item.ColumnValue && item.ColumnValue.split(';')) {
                                        for (var q = 0; q < item.ColumnValue.split(';').length; q++) {
                                            if (q > 0) {
                                                showValue += '、';
                                            }
                                            showValue += public.radioData[tableInfo.ColunmField[i].FieldId][item.ColumnValue.split(';')[q]]
                                        }
                                    }
                                    item.showValue = showValue;
                                } else if (tableInfo.ColunmField[i].DataType == 'FILE') {
                                    item = null;
                                } else {
                                    item.ColumnName = tableInfo.ColunmField[i].FieldId;
                                    item.FieldName = tableInfo.ColunmField[i].FieldName;
                                    item.ColumnValue = public.getValue(tableInfo.ColunmField[i].FieldId);
                                    item.showValue = public.getValue(tableInfo.ColunmField[i].FieldId, true);
                                }
                                item ? ColumnValueitem.push(item) : null;
                            }
                            ColumnValue.ColumnValue = ColumnValueitem;
                            ColumnValue.TableName = ptable;

                            var showValue = true;
                            layer.closeAll('tips');
                            for (var i = 0; i < tableInfo.ColunmField.length; i++) {
                                // if (tableInfo.ColunmField[i].DataType.toUpperCase() == 'FILE' && tableInfo.ColunmField[i].FieldIsNull.toUpperCase() == 'N') {
                                //     var isNull = true;
                                //     for (var n in public.uploadData[tableInfo.ColunmField[i].FieldId]) {
                                //         if (public.uploadData[tableInfo.ColunmField[i].FieldId][n]) {
                                //             for (var k in public.uploadData[tableInfo.ColunmField[i].FieldId][n]) {
                                //                 if (public.uploadData[tableInfo.ColunmField[i].FieldId][n][k].fileId) {
                                //                     isNull = false;
                                //                 }
                                //             }
                                //         }
                                //     }
                                //     if (isNull) {
                                //         showValue = false;
                                //         layer.tips('请上传'+tableInfo.ColunmField[i].LabelName, '#'+tableInfo.ColunmField[i].FieldId, {
                                //             tipsMore: true,
                                //             tips: [1, '#ea3'],
                                //             time: 3000
                                //         });
                                //     }
                                //     continue;
                                // }
                                for (var q = 0; q < ColumnValue.ColumnValue.length; q++) {
                                    if (tableInfo.ColunmField[i].FieldId == ColumnValue.ColumnValue[q].ColumnName && tableInfo.ColunmField[i].FieldIsNull.toUpperCase() == 'N' && (!ColumnValue.ColumnValue[q].showValue || ColumnValue.ColumnValue[q].showValue == '')) {
                                        layer.tips(tableInfo.ColunmField[i].LabelName+'不能为空！', '#'+ColumnValue.ColumnValue[q].ColumnName, {
                                            tipsMore: true,
                                            tips: [1, '#ea3'],
                                            time: 3000
                                        });
                                        showValue = false;
                                    }
                                }
                            }
                            if (!showValue) {
                                return;
                            }

                            if (data == 'mod') {
                                for (var i = 0; i < public.subList[ptable].ColumnValue.length; i++) {
                                    if (ptable == public.subList[ptable].ColumnValue[i].TableName && code == public.subList[ptable].ColumnValue[i].ItemNo) {
                                        public.subList[ptable].ColumnValue[i].ColumnValue = ColumnValueitem;
                                    }
                                }
                            } else {
                                if (public.subList[ptable].ColumnValue && public.subList[ptable].ColumnValue.length > 0) {
                                    ColumnValue.ItemNo = public.subList[ptable].ColumnValue[public.subList[ptable].ColumnValue.length-1].ItemNo + 1;
                                    public.subList[ptable].ColumnValue.push(ColumnValue);
                                } else {
                                    public.subList[ptable].ColumnValue = [];
                                    ColumnValue.ItemNo = 1;
                                    public.subList[ptable].ColumnValue.push(ColumnValue);
                                }
                            }
                            showSubTable(ptable, public.subList[ptable].ColumnValue, document.body.scrollTop);
                            layer.close(index);
                        },btn2:function(index){
                            layer.closeAll('tips');
                        },cancel:function(index){
                            layer.closeAll('tips');
                        }
                    });
                }
                function sub_more(e){
                    var ptable = $(e.target).data('ptable');
                    var item = public.subList[ptable] || {};
                    console.log(item);
                }
                function big(e){
                    var ptable = $(e.target).data('ptable');
                    var item = public.subList[ptable] || {};
                    var con = '';
                    con += '<style>';
                    con += 'table.sub{border-collapse: collapse;table-layout: fixed;}';
                    con += 'table.sub thead{background: #f9f9f9;}';
                    con += 'table.sub tbody tr{vertical-align: top;}';
                    con += 'table.sub thead tr th,table.sub tbody tr td{border: 1px solid #c7c7c7;padding: 8px;min-width: 60px;text-align: center;}';
                    con += '</style>';
                    con += '<table class="sub" width="100%">';
                    con += '<thead><tr>';
                    for (var q = 0; q < item.ColunmField.length; q++) {
                        con += '<th>'+item.ColunmField[q].LabelName+'</th>';
                    }
                    con += '</tr></thead>';
                    con += '<tbody>';
                    if (item.ColumnValue && item.ColumnValue.length > 0) {
                        for (var i = 0; i < item.ColumnValue.length; i++) {
                            con += '<tr>';
                            for (var q = 0; q < item.ColumnValue[i].ColumnValue.length; q++) {
                                if (item.ColunmField[q].DataType == 'FILE') {
                                    var n = item.ColumnValue[i].ItemNo;
                                    var id = item.ColunmField[q].FieldId;
                                    con += '<td>';
                                    con += '<ul class="file_con file_width">';
                                    for (d in public.uploadData[id][n]) {
                                        var thisFile = public.uploadData[id][n][d];
                                        if (thisFile) {
                                            con += '<li class="addDocument" title="'+thisFile.name+'">';
                                            con += '<span class="name"><a target="_blank" target="_blank" href="'+thisFile.addr+'">'+thisFile.name+'</a></span>';
                                            con += '</li>';
                                        }
                                    }
                                    con += '</ul>';
                                    con += '</td>';
                                }

                                con += '<td>'+item.ColumnValue[i].ColumnValue[q].showValue+'</td>';

                                if ((q+1) == item.ColumnValue[i].ColumnValue.length && item.ColunmField[q+1] && item.ColunmField[q+1].DataType == 'FILE') {
                                    var n = item.ColumnValue[i].ItemNo;
                                    var id = item.ColunmField[q+1].FieldId;
                                    con += '<td>';
                                    con += '<ul class="file_con file_width">';
                                    for (d in public.uploadData[id][n]) {
                                        var thisFile = public.uploadData[id][n][d];
                                        if (thisFile) {
                                            con += '<li class="addDocument" title="'+thisFile.name+'">';
                                            con += '<span class="name"><a target="_blank" target="_blank" href="'+thisFile.addr+'">'+thisFile.name+'</a></span>';
                                            con += '</li>';
                                        }
                                    }
                                    con += '</ul>';
                                    con += '</td>';
                                }
                            }
                            con += '</tr>';
                        }
                    } else {
                        con += '<tr><td colspan="'+item.ColunmField.length+'">无数据！</td></tr>';
                    }
                    con += '</tbody>';
                    con += '</table>';
                    var layerOpenData = {
                        title:item.LabelName,
                        area:['100%',''],
                        content:con
                    }
                    if (top.location != location) {
                        try {
                            window.parent.postMessage(JSON.stringify({layerOpenData:layerOpenData}), localStorage.getItem('postMessage'));
                        } catch (err) {
                            layer.open(layerOpenData);
                        }
                    } else {
                        layer.open(layerOpenData);
                    }
                }
                function del(e){
                    var ptable = $(e.target).data('ptable');
                    var tableInfo;
                    for (var i = 0; i < public.getFromData.FieldList.length; i++) {
                        var item = public.getFromData.FieldList[i];
                        if (item.Type.toUpperCase() == 'SUB' && ptable == (item.Field.TableName)) {
                            tableInfo = item.Field;
                        }
                    }
                    layer.confirm('确定清空'+tableInfo.LabelName+'信息？',{
                        title:'提示'
                    },function(index){
                        for (var i = 0; i < public.subList[ptable].ColunmField.length; i++) {
                            if (public.subList[ptable].ColunmField[i].DataType == 'FILE' && public.subList[ptable].ColumnValue) {
                                var id = public.subList[ptable].ColunmField[i].FieldId;
                                for (var q = 0; q < public.subList[ptable].ColumnValue.length; q++) {

                                    var code = public.subList[ptable].ColumnValue[q].ItemNo;
                                    if (public.uploadData[id] && public.uploadData[id][code]) {
                                        for(n in public.uploadData[id][code]) {

                                            if (public.uploadData[id][code][n]) {
                                                subTableUploadDel(id, code, n); 
                                            }
                                            if (public.uploadData[id][code][n]) {
                                                layer.msg('附件'+public.uploadData[id][code][n].name+'删除失败，请重试！');
                                                return;
                                            }

                                        }
                                    }

                                } 
                                public.uploadData[id] = {};
                            }
                        }
                        public.subList[ptable].ColumnValue = [];
                        showSubTable(ptable, [], document.body.scrollTop);
                        layer.close(index);
                    })
                }
                function addDom(type, value, name, code){
                    var dom = '';
                    if (type == 'SELECT') {
                        dom += '<select id="'+name+'">';
                        dom += '<option value=""></option>';
                        for (var i = 0; i < value.dropdownlists.length; i++) {
                            dom += '<option value="'+value.dropdownlists[i][0]+'">'+value.dropdownlists[i][1]+'</option>';
                        }
                        dom += '</select>';
                    } else if (type == 'DATE') {
                        setTimeout(function() {
                            dateFn('#'+name, 'date');
                        }, 10);
                        var dom = '<input title="'+value.replace('/','-').replace('/','-')+'" id='+name+' value="'+value.replace('/','-').replace('/','-')+'" type="text" class="S_laydate laydate-img">';
                    } else if (type == 'TIME') {
                        setTimeout(function() {
                            dateFn('#'+name, 'time');
                        }, 10);
                        var dom = '<input title="'+value+'" id='+name+' value="'+value+'" type="text" class="S_laydate laydate-img">';
                    } else if (type == 'TEXT') {
                        var dom = '<input type="text" class="add_input" title="'+value+'" id="'+name+'" value="'+value+'">';
                    } else if (type == 'PICKER') {
                        var dom = '<input id="'+name+'" data-name="'+value+'" value="'+value+'" title="'+value+'" type="text" class="picker">';
                    } else if (type == 'LONGTEXT') {
                        var dom = '<textarea title="'+value+'" id="'+name+'">'+value+'</textarea>';
                    } else if (type == 'EMPLOYEE') {
                        var dom = '<input id="'+name+'" data-id="'+value.split('$')[1]+'" value="'+value.split('$')[0]+'" title="'+value.split('$')[0]+'" type="text" class="picker">';
                    } else if (type == 'OPTION') {
                        for (var i = 0; i < value.radios.length; i++) {
                            dom += '<input type="radio" id="'+name+'" name="'+name+'" value="'+value.radios[i][0]+'">'+value.radios[i][1];
                        }
                    } else if (type == 'CHECKLIST') {
                        for (var i = 0; i < value.checkboxs.length; i++) {
                            dom += '<input type="checkbox" id="'+name+'" name="'+name+'" value="'+value.checkboxs[i][0]+'">'+value.checkboxs[i][1];
                        }
                    } else if (type == 'FILE') {
                        var dom = '';
                        dom += '<ul class="file_con">';
                        dom += '<li class="addIcon" data-code="'+code+'" id="'+name+'"></li>';
                        dom += '</ul>';
                        setTimeout(function() {
                            $('#'+name).on('click', upload);
                            public.uploadData[name] ? fileShow(name, public.uploadData[name][code]) : null;
                        }, 10);
                    } else {
                        var dom = '<input id="'+name+'" value="'+value+'" title="'+value+'" type="text" class="add_input">';
                    }
                    return dom;
                }
                function showSubTable(dom, data, scrollTopscrollTop){
                    $('#'+dom).children('tbody').children().remove();
                    var colspanNum = $('#'+dom).children('thead').children('tr').children('th').length;
                    var con = '';
                    if (data && data.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                            // if (i < 6) {
                                con += '<tr>';
                                for (var q = 0; q < data[i].ColumnValue.length; q++) {
                                    if (public.subList[dom].ColunmField[q].DataType == 'FILE') {
                                        var n = data[i].ItemNo;
                                        var id = public.subList[dom].ColunmField[q].FieldId;
                                        con += '<td>';
                                        con += '<ul class="file_con file_width">';
                                        for (d in public.uploadData[id][n]) {
                                            var thisFile = public.uploadData[id][n][d];
                                            if (thisFile) {
                                                con += '<li class="addDocument" title="'+thisFile.name+'">';
                                                con += '<span class="name"><a target="_blank" target="_blank" href="'+thisFile.addr+'">'+thisFile.name+'</a></span>';
                                                con += '</li>';
                                            }
                                        }
                                        con += '</ul>';
                                        con += '</td>';
                                    }

                                    con += '<td>'+data[i].ColumnValue[q].showValue+'</td>';

                                    if ((q+1) == data[i].ColumnValue.length && public.subList[dom].ColunmField[q+1] && public.subList[dom].ColunmField[q+1].DataType == 'FILE') {
                                        var n = data[i].ItemNo;
                                        var id = public.subList[dom].ColunmField[q+1].FieldId;
                                        con += '<td>';
                                        con += '<ul class="file_con file_width">';
                                        if (public.uploadData[id]) {
                                            for (d in public.uploadData[id][n]) {
                                                var thisFile = public.uploadData[id][n][d];
                                                if (thisFile) {
                                                    con += '<li class="addDocument" title="'+thisFile.name+'">';
                                                    con += '</span>';
                                                    con += '<span class="name"><a target="_blank" href="'+thisFile.addr+'">'+thisFile.name+'</a></span>';
                                                    con += '</li>';
                                                }
                                            }
                                        }
                                        con += '</ul>';
                                        con += '</td>';
                                    }
                                }
                                con += '<td>';
                                con += '<a class="subTableMod" data-ptable="'+data[i].TableName+'" data-code="'+data[i].ItemNo+'"> 编辑 </a> ';
                                con += '<a class="subTableDel" data-ptable="'+data[i].TableName+'" data-code="'+data[i].ItemNo+'"> 删除 </a>';
                                con += '</td>';
                                con += '</tr>';
                            // } else if (i == 6) {
                            //     con += '<tr><td colspan="'+colspanNum+'" align="center">';
                            //     con += '<a class="sub_more" data-ptable="'+data[i].TableName+'">点击查看更多！</a>';
                            //     con += '</td></tr>';
                            //     break;
                            // } 
                        }
                    } else {
                        con += '<tr><td colspan="'+colspanNum+'" align="center">无数据！</td></tr>';
                    }
                    $('#'+dom).children('tbody').append(con);
                    $('.subTableMod').unbind();
                    $('.subTableDel').unbind();
                    $('.subTableMod').on('click', subTableMod);
                    $('.subTableDel').on('click', subTableDel);
                    // $('.sub_more').unbind();
                    // $('.sub_more').on('click', sub_more);
                    document.body.scrollTop = scrollTopscrollTop || 0;
                }
                function subTableDel(e){
                    layer.confirm('确定删除这条信息？',{
                        title:'提示'
                    },function(index){
                        var ptable = $(e.target).data('ptable');
                        var code = $(e.target).data('code');
                        for (var i = 0; i < public.subList[ptable].ColunmField.length; i++) {
                            if (public.subList[ptable].ColunmField[i].DataType == 'FILE') {
                                var id = public.subList[ptable].ColunmField[i].FieldId;
                                if (public.uploadData[id] && public.uploadData[id][code]) {
                                    for (n in public.uploadData[id][code]) {

                                        if (public.uploadData[id][code][n]) {
                                            subTableUploadDel(id, code, n); 
                                        }
                                        if (public.uploadData[id][code][n]) {
                                            layer.msg('附件删除失败，请重试！');
                                            return;
                                        }

                                    }
                                }
                            }
                        }
                        for (var i = 0; i < public.subList[ptable].ColumnValue.length; i++) {
                            if (ptable == public.subList[ptable].ColumnValue[i].TableName && code == public.subList[ptable].ColumnValue[i].ItemNo) {
                                public.subList[ptable].ColumnValue.splice(i,1);
                                showSubTable(ptable, public.subList[ptable].ColumnValue, document.body.scrollTop);
                                layer.close(index);
                            }
                        }
                    })
                }
                function subTableUploadDel(id, code, n){
                    var params = {
                        fileId:n,
                        formKind:public.getFromData.FormKind,
                        formNo:public.getFromData.FormNo
                    }
                    public.ajax({
                        type:'POST',
                        url:public.uploadUrl+'/FileUpload/DeleteFiles.aspx?para='+JSON.stringify(params),
                        contentType:'application/json; charset=utf-8',
                        dataType:'json',
                        async:false,
                        success:function(data){
                            if (data.Code == 1) {
                                public.uploadData[id][code][n] = null;
                            }
                        },error:function(data){
                            console.log(data);
                            layer.msg('操作失败！');
                        }
                    })
                }
                //签核记录加载
                $('#approvers tbody').children().remove();
                if (data.Data && data.Data.ApproveRecord && data.Data.ApproveRecord.length > 0) {
                    var approversDom = '';
                    for (var i = 0; i < data.Data.ApproveRecord.length; i++) {
                        approversDom += '<tr>';
                        approversDom += '<td>'+(i+1)+'</td>';
                        approversDom += '<td>'+data.Data.ApproveRecord[i].Approver+'</td>';
                        approversDom += '<td>'+data.Data.ApproveRecord[i].Value+'</td>';
                        approversDom += '<td>'+data.Data.ApproveRecord[i].Content+'</td>';
                        approversDom += '<td>'+''+'</td>';
                        approversDom += '<td>'+data.Data.ApproveRecord[i].Role+'</td>';
                        approversDom += '</tr>';
                    }
                    $('#approvers tbody').append(approversDom);
                } else {
                    $('#approvers tbody').append('<tr><td colspan="6" style="text-align: center;">无记录！</td></tr>');
                }

                function getLineType(DataType, FieldMaxLength){
                    if (DataType == 'TEXT') {
                        // if (FieldMaxLength < 100) {
                        //     return 1;
                        // } else {
                        //     return 2;
                        // }
                        return 2;
                    } else if (DataType == 'LINK' || DataType == 'EMPLOYEE' || DataType == 'SELECT' || DataType == 'DATE' || DataType == 'PICKER' || DataType == 'FORM' || DataType == 'HYPERLINK') {
                        return 1;
                    } else {
                        return 2;
                    }
                }
                console.timeEnd('loading');
                if (newlocal && newlocal.indexOf('/Approve/Popup') >= 0) {
                    getNextForm({FormKind:data.Data.FormKind,FormNo:data.Data.FormNo});
                }
            },
            error:function(data){
                layer.msg('网络错误！');
            },
            complete:function(){
                $('#loading_con').addClass('loading_ani');
                if (navigator.userAgent.toLowerCase().indexOf('msie 9') >= 0) {
                    $('#loading_con').remove();
                    $('#form_menu').css('position', 'fixed');
                    $('#table_con').css('margin','44px 0 0');
                    if (document.body.scrollHeight <= (document.documentElement.clientHeight || document.body.clientHeight)) {
                        $('html')[0].style.width = '100%';
                    }
                } else {
                    if ((document.body.scrollHeight/2) <= (document.documentElement.clientHeight || document.body.clientHeight)) {
                        $('html')[0].style.width = '100%';
                        $('body')[0].style.overflow = 'hidden';
                    }
                    setTimeout(function() {
                        $('#loading_con').remove();
                        $('#form_menu').css('position', 'fixed');
                        $('#table_con').css('margin','44px 0 0');
                    }, 1000);
                }
            }
        })

        function linkDom(data){
            for (var i = 0; i < data.length; i++) {
                if (data[i].Field && data[i].Field.DataType =='EMPLOYEE') {
                    var item = data[i].Field;
                    var thisDom = $('#'+item.FieldId);
                    thisDom.on('click',function(){
                        if ($(this)[0] && $(this)[0].tagName == 'INPUT') {
                            $('#append_con').remove();
                            layer.close(layerBtn);
                            $(this).val() ? getLink($(this)) : null;
                        }
                    })
                    thisDom.on('input',function(){
                        if ($(this)[0] && $(this)[0].tagName == 'INPUT') {
                            $(this).val() ? getLink($(this)) : null;
                        }
                    })
                    thisDom.on('blur',function(){
                        if ($(this)[0] && $(this)[0].tagName == 'INPUT') {
                            if ($(this).data('name')) {
                                $(this).val($(this).data('name'));
                            } else {
                                $(this).val('');
                            }
                        }
                    })
                    //缓存本地相关联的FieldRelation关系
                    public[item.FieldId] = {};
                    public[item.FieldId].FieldRelation = item.FieldRelation;
                    public[item.FieldId].FieldName = item.FieldName;
                    public[item.FieldId].FieldId = item.FieldId
                } else if (data[i].DataType =='EMPLOYEE') {
                    var thisDom = $('#'+data[i].FieldId);
                    thisDom.on('click',function(){
                        if ($(this)[0] && $(this)[0].tagName == 'INPUT') {
                            $('#append_con').remove();
                            layer.close(layerBtn);
                            $(this).val() ? getLink($(this)) : null;
                        }
                    })
                    thisDom.on('input',function(){
                        if ($(this)[0] && $(this)[0].tagName == 'INPUT') {
                            $(this).val() ? getLink($(this)) : null;
                        }
                    })
                    thisDom.on('blur',function(){
                        if ($(this)[0] && $(this)[0].tagName == 'INPUT') {
                            if ($(this).data('name')) {
                                $(this).val($(this).data('name'));
                            } else {
                                $(this).val('');
                            }
                        }
                    })
                    public[data[i].FieldId] = {};
                    public[data[i].FieldId].FieldRelation = data[i].FieldRelation;
                    public[data[i].FieldId].FieldName = data[i].FieldName;
                    public[data[i].FieldId].FieldId = data[i].FieldId
                } else if (data[i].Field && (data[i].Field.DataType =='NUMBER' || data[i].Field.DataType =='SELECT')) {
                    var item = data[i].Field;
                    var thisDom = $('#'+item.FieldId);
                    thisDom.on('input', numberLink);
                    public[item.FieldId] = {};
                    public[item.FieldId].FieldRelation = item.FieldRelation;
                    public[item.FieldId].FieldName = item.FieldName;
                    public[item.FieldId].FieldId = item.FieldId
                } else if (data[i].Field && data[i].Field.DataType =='PICKER') {
                    var item = data[i].Field;
                    var thisDom = $('#'+item.FieldId);
                    thisDom.on('click',function(){
                        if ($(this)[0] && $(this)[0].tagName == 'INPUT') {
                            $('#append_con').remove();
                            layer.close(layerBtn);
                            $(this).val() ? pickerLink($(this)) : null;
                        }
                    })
                    thisDom.on('input',function(){
                        if ($(this)[0] && $(this)[0].tagName == 'INPUT') {
                            pickerLink($(this));
                        }
                    })
                    thisDom.on('blur',function(){
                        if ($(this)[0] && $(this)[0].tagName == 'INPUT') {
                            if ($(this).data('name')) {
                                $(this).val($(this).data('name'));
                            } else {
                                $(this).val('');
                            }
                        }
                    })
                    public[item.FieldId] = {};
                    public[item.FieldId].FieldRelation = item.FieldRelation;
                    public[item.FieldId].FieldName = item.FieldName;
                    public[item.FieldId].FieldId = item.FieldId
                } else if (data[i].DataType =='PICKER') {
                    var thisDom = $('#'+data[i].FieldId);
                    thisDom.on('click',function(){
                        if ($(this)[0] && $(this)[0].tagName == 'INPUT') {
                            $('#append_con').remove();
                            layer.close(layerBtn);
                            $(this).val() ? pickerLink($(this)) : null;
                        }
                    })
                    thisDom.on('input',function(){
                        if ($(this)[0] && $(this)[0].tagName == 'INPUT') {
                            pickerLink($(this));
                        }
                    })
                    thisDom.on('blur',function(){
                        if ($(this)[0] && $(this)[0].tagName == 'INPUT') {
                            if ($(this).data('name')) {
                                $(this).val($(this).data('name'));
                            } else {
                                $(this).val('');
                            }
                        }
                    })
                    public[data[i].FieldId] = {};
                    public[data[i].FieldId].FieldRelation = data[i].FieldRelation;
                    public[data[i].FieldId].FieldName = data[i].FieldName;
                    public[data[i].FieldId].FieldId = data[i].FieldId
                }
            }
        }
        function pickerLink(thisDom){
            var id = thisDom.attr('id')
            var params = {
                key:thisDom.val(),
                formKind:public.getForm.params.formkind,
                fieldId:public[id].FieldId
            }
            public.ajax({
                type:'get',
                noShade:true,
                url:public.baseUrl+'/Approve/getCommonPickerdata',
                data:params,
                dataType:'json',
                success:function(ajaxdata){
                    var appendDom = '';
                    appendDom += '<div class="append_con">';
                    appendDom += '<table>';
                    appendDom += '<thead><tr>';
                    for (var i = 0; i < ajaxdata.Data.LabelList.length; i++) {
                        appendDom += '<th>'+ajaxdata.Data.LabelList[i]+'</th>';
                    }
                    appendDom += '</tr></thead>';
                    appendDom += '<tbody id="append_con"></tbody>';
                    appendDom += '</table>';
                    appendDom += '</div>';
                    var scrollTop = $(document).scrollTop();
                    var top = thisDom.offset().top;
                    var left = thisDom.offset().left;
                    if (left > (window.innerWidth/2) && (left+thisDom.innerWidth()) < window.innerWidth) {
                        left = left + thisDom.innerWidth() - 360;
                    } else if ((left+thisDom.innerWidth()) > window.innerWidth) {
                        left = window.innerWidth - 400;
                    }
                    if ((top-scrollTop+200) > window.innerHeight) {
                        top = top - 200;
                    } else {
                        top = top + thisDom.outerHeight();
                    }
                    top = top - scrollTop;

                    if ($('#append_con').length == 0) {
                        layerBtn = layer.open({
                            type:1,
                            shade:false,
                            title:false,
                            scrollbar: false,
                            content:appendDom,
                            offset:[top+'px',left+'px'],
                            success:function(){
                                pickerLinkCon(ajaxdata);
                            }
                        })   
                    } else {
                        pickerLinkCon(ajaxdata);
                    }
                           
                },
                error:function(ajaxdata){
                    console.log(ajaxdata)
                }
            })
            function pickerLinkCon(ajaxdata){
                $('#append_con').children().remove();
                var appendList = ''
                if (ajaxdata.Data.DataList && ajaxdata.Data.DataList.length > 0) {
                
                    var items = ajaxdata.Data.DataList;
                    for (var q = 0; q < items.length; q++) {
                        appendList += '<tr data-name="'+items[q].Value+'">';
                        for (var i = 0; i < items[q].Label.length; i++) {
                            appendList += '<td title="'+items[q].Label[i]+'">'+items[q].Label[i]+'</td>';
                        }
                        appendList += '</tr>';
                    }
                    $('#append_con').append(appendList);
                    
                } else {
                    appendList += '<tr><td colspan="'+ajaxdata.Data.LabelList.length+'">无数据！</td></tr>';
                    $('#append_con').append(appendList);
                }
                $('#append_con tr').on('click',function(){
                    var name = $(this).data('name');
                    thisDom.data('name', name);
                    thisDom.attr('title', name);
                    public.innerValue(thisDom.attr('id'), name);
                    layer.close(layerBtn);
                })
            }
        }
        function numberLink(e){
            var id = $(e.target).attr('id');
            var item = public[id];
            if (!item.FieldRelation) {
                return;
            }
            for (var q = 0; q < item.FieldRelation.length; q++) {
                if (item.FieldRelation[q].Operate == 'add') {
                    var a = public.getValue(item.FieldId);
                    var b = public.getValue(public.mainList[item.FieldRelation[q].ParameterFieldId]);
                    var c = item.FieldRelation[q].Position == '1' ? Number(a||0)+Number(b||0) : Number(b||0)+Number(a||0);
                    public.innerValue(public.mainList[item.FieldRelation[q].ResultFieldId], c.toFixed(2));
                } else if (item.FieldRelation[q].Operate == 'subtract') {
                    var a = public.getValue(item.FieldId);
                    var b = public.getValue(public.mainList[item.FieldRelation[q].ParameterFieldId]);
                    var c = item.FieldRelation[q].Position == '1' ? Number(a||0)-(b||0) : Number(b||0)-(a||0);
                    public.innerValue(public.mainList[item.FieldRelation[q].ResultFieldId], c.toFixed(2));
                } else if (item.FieldRelation[q].Operate == 'multiply') {
                    var a = public.getValue(item.FieldId);
                    var b = public.getValue(public.mainList[item.FieldRelation[q].ParameterFieldId]);
                    var c = item.FieldRelation[q].Position == '1' ? Number(a||0)*(b||0) : Number(b||0)*(a||0);
                    public.innerValue(public.mainList[item.FieldRelation[q].ResultFieldId], c.toFixed(2));
                } else if (item.FieldRelation[q].Operate == 'divide') {
                    var a = public.getValue(item.FieldId);
                    var b = public.getValue(public.mainList[item.FieldRelation[q].ParameterFieldId]);
                    var c = item.FieldRelation[q].Position == '1' ? Number(a||0)/(b||0) : Number(b||0)/(a||0);
                    public.innerValue(public.mainList[item.FieldRelation[q].ResultFieldId], c.toFixed(2));
                }
            }
        }
        function FieldIsNull(data) {
            if (data.toUpperCase() == 'N') {
                return '<span class="isNull">* </span>';
            } else {
                return '';
            }
        }
        //判断文本类型，返回对应的HTML
        function domType(data, value, extendValue, name, readyStatus){
            if (readyStatus.toUpperCase() == 'Y') {
                var dom = domText(data, value, extendValue, name);
                return dom;
            }
            if (data == 'LONGTEXT') {
                var dom = '<textarea title="'+value+'" id="'+name+'">'+value+'</textarea>';
            } else if (data == 'DATE') {
                setTimeout(function() {
                    dateFn('#'+name, 'date')
                }, 10);
                var dom = '<input title="'+value.replace('/','-').replace('/','-')+'" id='+name+' value="'+value.replace('/','-').replace('/','-')+'" type="text" class="laydate-img">';
            } else if (data == 'CHECKLIST') {
                var dom = '';
                if (extendValue && extendValue.checkboxs) {
                    for (var i = 0; i < extendValue.checkboxs.length; i++) {
                        var status = '';
                        for (var q = 0; q < value.length; q++) {
                            if (value[q] == extendValue.checkboxs[i][0]) {
                                status = 'checked="true"';
                            }
                        }
                        dom += '<input id="'+name+'" name="'+name+'" type="checkbox" '+status+' value="'+extendValue.checkboxs[i][0]+'">'+extendValue.checkboxs[i][1];
                    }
                }
            } else if (data == 'SELECT') {
                var dom = '',status = '';
                dom += '<select id="'+name+'">';
                dom += '<option value=""></option>';
                if (extendValue && extendValue.dropdownlists) {
                    for (var i = 0; i < extendValue.dropdownlists.length; i++) {
                        if (value == extendValue.dropdownlists[i][0]) {
                            status = 'selected="selected"';
                        } else {
                            status = '';
                        }
                        dom += '<option '+status+' value="'+extendValue.dropdownlists[i][0]+'">'+extendValue.dropdownlists[i][1]+'</option>';
                    }
                }
                dom += '</select>';
            } else if (data == 'OPTION') {
                var dom = '',status = '';
                if (extendValue && extendValue.radios) {
                    for (var i = 0; i < extendValue.radios.length; i++) {
                        if (value == extendValue.radios[i][0]) {
                            status = 'checked="true"';
                        } else {
                            status = '';
                        }
                        dom += '<input type="radio" id="'+name+'" name="'+name+'" '+status+' value="'+extendValue.radios[i][0]+'">'+extendValue.radios[i][1];
                    }
                }
            } else if (data == 'LINK') {
                var other = 'javascript:;';
                var dom = '<a target="_blank" target="_blank" href="'+(value || other)+'" id="'+name+'">文档</a>';
            } else if (data == 'EMPLOYEE') {
                var dom = '<input id="'+name+'" data-id="'+value.split('$')[1]+'" data-name="'+value.split('$')[0]+'" value="'+value.split('$')[0]+'" type="text" class="picker">';
            } else if (data == 'PICKER') {
                var dom = '<input id="'+name+'" data-name="'+value+'" value="'+value+'" type="text" class="picker">';
            } else if (data == 'NUMBER') {
                var dom = '<input type="number" title="'+value+'" id="'+name+'" value="'+value+'">';
            } else if (data == 'FILE') {
                var dom = '';
                dom += '<ul class="file_con">';
                dom += '<li class="addIcon" id="'+name+'"></li>';
                dom += '</ul>';
                public.uploadData[name] ? null : public.uploadData[name] = {};
                for (var i = 0; i < value.length; i++) {
                    public.uploadData[name][value[i][2]] = {};
                    public.uploadData[name][value[i][2]].fileId = value[i][2];
                    public.uploadData[name][value[i][2]].formKind = public.getFromData.FormKind;
                    public.uploadData[name][value[i][2]].formNo = public.getFromData.FormNo;
                    public.uploadData[name][value[i][2]].name = value[i][0];
                    public.uploadData[name][value[i][2]].addr = uploadView(value[i][3], value[i][2]);
                }
                setTimeout(function() {
                    $('#'+name).on('click', upload);
                    fileShow(name, public.uploadData[name]);
                }, 10);
            } else {
                var dom = '<input type="text" title="'+value+'" id="'+name+'" value="'+value+'">';
            }
            return dom;
        }
        function domText(data, value, extendValue, name){
            if (data == 'CHECKLIST') {
                var dom = '';
                if (extendValue && extendValue.checkboxs) {
                    for (var i = 0; i < extendValue.checkboxs.length; i++) {
                        var status = '';
                        for (var q = 0; q < value.length; q++) {
                            if (value[q] == extendValue.checkboxs[i][0]) {
                                status = 'checked="true"';
                            }
                        }
                        dom += '<input disabled="disabled" id="'+name+'" name="'+name+'" type="checkbox" '+status+' value="'+extendValue.checkboxs[i][0]+'">'+extendValue.checkboxs[i][1];
                    }
                }
            } else if (data == 'OPTION') {
                var dom = '',status = '';
                if (extendValue && extendValue.radios) {
                    for (var i = 0; i < extendValue.radios.length; i++) {
                        if (value == extendValue.radios[i][0]) {
                            status = 'checked="true"';
                        } else {
                            status = '';
                        }
                        dom += '<input disabled="disabled" type="radio" id="'+name+'" name="'+name+'" '+status+' value="'+extendValue.radios[i][0]+'">'+extendValue.radios[i][1];
                    }
                }
            } else if (data == 'SELECT') {
                var status = '', selected = '', title = '';
                if (extendValue && extendValue.dropdownlists) {
                    for (var i = 0; i < extendValue.dropdownlists.length; i++) {
                        if (value == extendValue.dropdownlists[i][0]) {
                            status = 'selected="selected"';
                            title = extendValue.dropdownlists[i][1];
                        } else {
                            status = '';
                        }
                        selected += '<option '+status+' value="'+extendValue.dropdownlists[i][0]+'">'+extendValue.dropdownlists[i][1]+'</option>';
                    }
                }
                var dom = '';
                dom += '<select id="'+name+'" title="'+title+'" disabled="disabled">';
                dom += '<option value=""></option>';
                dom += selected;
                dom += '</select>';
            } else if (data == 'EMPLOYEE') {
                var dom = '<span id="'+name+'" data-id="'+value.split('$')[1]+'" data-name="'+value.split('$')[0]+'" class="ready_span">'+value.split('$')[0]+'</span>';
            } else if (data == 'FILE') {
                var dom = '';
                dom += '<ul class="file_con">';
                for (var i = 0; i < value.length; i++) {
                    dom += '<li class="addDocument" data-fileid="'+value[i][2]+'" title="'+value[i][0]+'">';
                    dom += '<span class="name"><a target="_blank" target="_blank" href="'+uploadView(value[i][3], value[i][2])+'">'+value[i][0]+'</a></span>';
                    dom += '</li>';
                }
                dom += '</ul>';
                public.uploadData[name] ? null : public.uploadData[name] = {};
                for (var i = 0; i < value.length; i++) {
                    public.uploadData[name][value[i][2]] = {};
                    public.uploadData[name][value[i][2]].fileId = value[i][2];
                    public.uploadData[name][value[i][2]].formKind = public.getFromData.FormKind;
                    public.uploadData[name][value[i][2]].formNo = public.getFromData.FormNo;
                    public.uploadData[name][value[i][2]].name = value[i][0];
                    public.uploadData[name][value[i][2]].addr = uploadView(value[i][3], value[i][2]);
                }
            } else if (data == 'LINK') {
                var other = 'javascript:;';
                var dom = '<a target="_blank" target="_blank" href="'+(value || other)+'" id="'+name+'">文档</a>';
            } else {
                var dom = '<span id="'+name+'" class="ready_span">'+value+'</span>';
            }
            return dom;
        }
    }
    function getNextForm(){
        public.getPrevForm = {};
        public.getNextForm = {};
        var params = {
            pageIndex:1,
            pageSize:40,
            uid:public.getForm.params.uid
        }
        checkNextForm(params);
        function checkNextForm(params){
            public.ajax({
                type:'get',
                url:public.baseUrl+'/Approve/GetApproveList',
                noShade:true,
                data:params,
                dataType:'json',
                success:function(data){
                    if (data.Code == 0 && data.Data.Count > 0) {
                        var list = data.Data.List;
                        for (var i = 0; i < list.length; i++) {
                            if (list[i].FormKind == public.getFromData.FormKind && list[i].FormNo == public.getFromData.FormNo) {
                                // if ((i+1) < list.length) {
                                //     public.getNextForm.approveId = list[i+1].FormApproveId;
                                //     public.getNextForm.formkind = list[i+1].FormKind;
                                //     public.getNextForm.formno = list[i+1].FormNo;
                                // } else if (data.Data.Count > (params.pageSize * params.pageIndex)) {
                                //     params.pageSize = params.pageSize + 1;
                                //     checkNextForm(params);
                                //     return;
                                // }
                                if (((i+1) >= list.length || ((i-1) < 0 && params.pageIndex != 1)) && data.Data.Count > (params.pageSize * params.pageIndex)) {
                                    params.pageIndex = (params.pageSize * params.pageIndex)%(params.pageSize+7) + 1;
                                    params.pageSize = params.pageSize + 7;
                                    checkNextForm(params);
                                    return;
                                }
                                if ((i+1) < list.length) {
                                    public.getNextForm.approveId = list[i+1].FormApproveId;
                                    public.getNextForm.formkind = list[i+1].FormKind;
                                    public.getNextForm.formno = list[i+1].FormNo;
                                }
                                if ((i-1) >= 0) {
                                    public.getPrevForm.approveId = list[i-1].FormApproveId;
                                    public.getPrevForm.formkind = list[i-1].FormKind;
                                    public.getPrevForm.formno = list[i-1].FormNo;
                                }
                                break;
                            }
                        }
                        if (list.length == params.pageSize && params.pageIndex != 1 && (!public.getNextForm.formno || !public.getPrevForm.formno)) {
                            params.pageIndex = params.pageIndex+1;
                            checkNextForm(params);
                        }
                    } else {
                        public.getNextForm = {};
                        public.getPrevForm = {};
                    }
                }
            })
        } 
    }
    function toNextForm(){
        if (newlocal && newlocal.indexOf('/Approve/Popup') >= 0 && public.getNextForm && public.getNextForm.formno) {
            var newPage = location.pathname+'?FORM_APPROVER_ID='+public.getNextForm.approveId+'&Form_Kind='+public.getNextForm.formkind+'&Form_No='+public.getNextForm.formno;
            var oldPage = '/bpm/Approve/Popup/Main.aspx?FORM_APPROVER_ID='+public.getNextForm.approveId+'&Form_Kind='+public.getNextForm.formkind+'&Form_No='+public.getNextForm.formno;
            localStorage.setItem('oldAdd', oldPage);
            layer.msg('下一张表单加载中', {
                icon: 16,
                shade: 0.01
            });
            setTimeout(function() {
                location.href = newPage;
            }, 1500);
        } else {
            closeLay();
        }
    }
    function toPrevForm(){
        if (newlocal && newlocal.indexOf('/Approve/Popup') >= 0 && public.getPrevForm && public.getPrevForm.formno) {
            var newPage = location.pathname+'?FORM_APPROVER_ID='+public.getPrevForm.approveId+'&Form_Kind='+public.getPrevForm.formkind+'&Form_No='+public.getPrevForm.formno;
            var oldPage = '/bpm/Approve/Popup/Main.aspx?FORM_APPROVER_ID='+public.getPrevForm.approveId+'&Form_Kind='+public.getPrevForm.formkind+'&Form_No='+public.getPrevForm.formno;
            localStorage.setItem('oldAdd', oldPage);
            layer.msg('上一张表单加载中', {
                icon: 16,
                shade: 0.01
            });
            setTimeout(function() {
                location.href = newPage;
            }, 1500);
        } else {
            closeLay();
        }
    }

    var layerBtn;
    function getLink(thisDom, noLinkDetails){
        var params = {
            key:thisDom.val(),
            n:"Benq.Flower.Web.SmartControls.EmployeePickerRes.Utility.EmployeePickerFacade",
            a:"Benq.Flower.Web.SmartControls",
            matchmodel:"exact",
            inactiveemployee:"false",
            scene:"",
            userempid:public.getForm.params.uid,
            actiontime:"2716",
            fileterByLocation:"false"
        }
        public.ajax({
            type:'get',
            noShade:true,
            url:public.baseUrl1+'/BPM/FORMS/SNAIL.FORM.591/V2/EmployeePickerData.axd',
            data:params,
            dataType:'xml',
            success:function(ajaxdata){
                var appendDom = '';
                appendDom += '<div class="append_con">';
                appendDom += '<table>';
                appendDom += '<thead><tr>';
                appendDom += '<th>登入名</th>';
                appendDom += '<th>中文名</th>';
                appendDom += '<th>部门代号</th>';
                appendDom += '<th>地区代号</th>';
                appendDom += '</tr></thead>';
                appendDom += '<tbody id="append_con"></tbody>';
                appendDom += '</table>';
                appendDom += '</div>';
                var scrollTop = $(document).scrollTop();
                var top = thisDom.offset().top;
                var left = thisDom.offset().left;
                if (left > (window.innerWidth/2) && (left+thisDom.innerWidth()) < window.innerWidth) {
                    left = left + thisDom.innerWidth() - 360;
                } else if ((left+thisDom.innerWidth()) > window.innerWidth) {
                    left = window.innerWidth - 400;
                }
                if ((top-scrollTop+200) > window.innerHeight) {
                    top = top - 200;
                } else {
                    top = top + thisDom.outerHeight();
                }
                top = top - scrollTop;

                if ($('#append_con').length == 0) {
                    layerBtn = layer.open({
                        type:1,
                        shade:false,
                        title:false,
                        scrollbar: false,
                        content:appendDom,
                        offset:[top+'px',left+'px'],
                        success:function(){
                            getLinkCon(ajaxdata);
                        }
                    })   
                } else {
                    getLinkCon(ajaxdata);
                }
                       
            },
            error:function(ajaxdata){
                console.log(ajaxdata)
            }
        })
        function getLinkCon(ajaxdata){
            $('#append_con').children().remove();
            var appendList = ''
            if ($(ajaxdata).children() && $(ajaxdata).children().children().length > 0) {
            
                var items = $(ajaxdata).children().children();
                for (var q = 0; q < items.length; q++) {
                    appendList += '<tr data-empid="'+($(items[q]).children('empid')[0].innerHTML||$(items[q]).children('empid')[0].text||$(items[q]).children('empid')[0].textContent)+'" data-name="'+($(items[q]).children('empName')[0].innerHTML||$(items[q]).children('empName')[0].text||$(items[q]).children('empName')[0].textContent)+'">';
                    appendList += '<td title="'+($(items[q]).children('value')[0].innerHTML||$(items[q]).children('value')[0].text||$(items[q]).children('value')[0].textContent)+'">'+($(items[q]).children('value')[0].innerHTML||$(items[q]).children('value')[0].text||$(items[q]).children('value')[0].textContent)+'</td>';
                    appendList += '<td title="'+($(items[q]).children('empName')[0].innerHTML||$(items[q]).children('empName')[0].text||$(items[q]).children('empName')[0].textContent)+'">'+($(items[q]).children('empName')[0].innerHTML||$(items[q]).children('empName')[0].text||$(items[q]).children('empName')[0].textContent)+'</td>';
                    appendList += '<td title="'+($(items[q]).children('deptcode')[0].innerHTML||$(items[q]).children('deptcode')[0].text||$(items[q]).children('deptcode')[0].textContent)+'">'+($(items[q]).children('deptcode')[0].innerHTML||$(items[q]).children('deptcode')[0].text||$(items[q]).children('deptcode')[0].textContent)+'</td>';
                    appendList += '<td title="'+($(items[q]).children('sitecode')[0].innerHTML||$(items[q]).children('sitecode')[0].text||$(items[q]).children('sitecode')[0].textContent)+'">'+($(items[q]).children('sitecode')[0].innerHTML||$(items[q]).children('sitecode')[0].text||$(items[q]).children('sitecode')[0].textContent)+'</td>';
                    appendList += '</tr>';
                }
                $('#append_con').append(appendList);
                
            } else {
                appendList += '<tr><td colspan="4">无数据！</td></tr>';
                $('#append_con').append(appendList);
            }
            //获取人员详情
            $('#append_con tr').on('click',function(){
                var empid = $(this).data('empid');
                var name = $(this).data('name');
                thisDom.data('id', empid);
                thisDom.data('name', name);
                thisDom.attr('title', name);
                public.innerValue(thisDom.attr('id'), name);
                noLinkDetails ? null : getLinkDetails(thisDom.attr('id'), empid);
                layer.close(layerBtn);
            })
        }
    }
    function getLinkDetails(id, empid){
        if (!public[id].FieldRelation) {
            return;
        }
        for (var i = 0; i < public[id].FieldRelation.length; i++) {
            (function(i){
                var params = {
                    uid:public.getForm.params.uid,
                    formKind:public.getForm.params.formkind,
                    parameterValue:empid,
                    controlerFieldName:public[id].FieldName,
                    fieldId:public[id].FieldRelation[i].ParameterFieldId
                }
                public.ajax({
                    type:'get',
                    noShade:true,
                    url:public.baseUrl+'/ApplyForm/GetFieldDefaultValue',
                    data:params,
                    dataType:'json',
                    success:function(ajaxdata){
                        public.innerValue(public.mainList[public[id].FieldRelation[i].ParameterFieldId], ajaxdata.Data[0].value);
                    },
                    error:function(ajaxdata){
                        console.log(ajaxdata)
                    }
                })
            })(i)
        }
    }

    function reject(){
        var content = '';
        content += '<div class="transferOpen">';
        content += '<textarea class="approve"></textarea>';
        content += '<br />';
        content += '<input id="IsError" type="checkbox">是否存在明显错误？';
        content += '</div>';
        layer.open({
            title: '请输入否决原因',
            type: 1,
            content: content,
            btn:['提交','取消'],
            success:function(){

            },yes:function(index, layero){
                var ApproveContent = $.trim(layero.find(".approve").val());
                var IsError = layero.find("#IsError")[0].checked ? 'y' : 'n';
                var ApproveValue = 'N';
                sendOption(ApproveContent, IsError, ApproveValue);
                layer.close(index);
            }
        });
    }
    function approve(){
        var content = '';
        content += '<div class="transferOpen">';
        content += '<textarea class="approve"></textarea>';
        content += '</div>';
        layer.open({
            title: '请输入签核意见',
            type: 1,
            content: content,
            btn:['提交','取消'],
            success:function(){

            },yes:function(index, layero) {
                var ApproveContent = $.trim(layero.find(".approve").val());
                var IsError = 'n';
                var ApproveValue = 'Y';
                sendOption(ApproveContent, IsError, ApproveValue);
                layer.close(index);
            }
        })
    }
    function transfer(){
        var content = '';
        content += '<div class="transferOpen">';
        content += '<div><input id="transferer" class="transfer_input searchimg" placeholder="选择被转签人工号或姓名"></div>'
        content += '<input id="transferReason" class="transfer_input margin_top16" placeholder="转签原因">'
        content += '</div>';
        layer.open({
            title: '请输入转签原因',
            type: 1,
            content: content,
            btn:['提交','取消'],
            success:function(){
                var noLinkDetails = true;
                $('#transferer').on('click',function(){
                    if ($(this)[0] && $(this)[0].tagName == 'INPUT') {
                        $('#append_con').remove();
                        layer.close(layerBtn);
                        $(this).val() ? getLink($(this), noLinkDetails) : null;
                    }
                })
                $('#transferer').on('input',function(){
                    if ($(this)[0] && $(this)[0].tagName == 'INPUT') {
                        $(this).val() ? getLink($(this), noLinkDetails) : null;
                    }
                })
                $('#transferer').on('blur',function(){
                    if ($(this)[0] && $(this)[0].tagName == 'INPUT') {
                        if ($(this).data('name')) {
                            $(this).val($(this).data('name'));
                        } else {
                            $(this).val('');
                        }
                    }
                })
            },yes:function(index){
                var TransferEmployee = $('#transferer').data('id');
                if (!TransferEmployee) {
                    layer.msg('请选择被转签人工号或姓名！');
                    return false;
                }
                var Reason = $('#transferReason').val();
                var params = {
                    FormKind:public.getForm.params.formkind,
                    FormNo:public.getForm.params.formno,
                    FormApproveId:public.getForm.params.approveId,
                    Assigher:public.getForm.params.uid,
                    TransferEmployee:TransferEmployee,
                    Reason:Reason
                }
                public.ajax({
                    type:'post',
                    url:public.baseUrl+'/Approve/TransferForm',
                    contentType:'application/x-www-form-urlencoded; charset=utf-8',
                    data:public.converData(params),
                    dataType:'json',
                    success:function(data){
                        if (data.Code == 0) {
                            layer.msg(data.Message || '操作成功！');
                            layer.close(index);
                            toNextForm();
                        } else {
                            layer.msg(data.Message || '操作失败！');
                        }
                    },
                    error:function(data){
                        console.log(data)
                    }
                })
            }
        })
    }
    function addApprove(){
        var content = '';
        content += '<div class="transferOpen">';
        content += '<div class="AddTypeClass">';
        content += '<input name="AddType" value="1" type="radio">加在我之前<br />'
        content += '<input name="AddType" value="2" type="radio">加在我之后<br />'
        content += '<input name="AddType" value="3" type="radio">平行签核'
        content += '</div>';
        content += '<div><input id="transferer" class="transfer_input searchimg" placeholder="选择被加签人工号或姓名"></div>'
        content += '<input id="transferReason" class="transfer_input margin_top16" placeholder="加签原因">'
        content += '</div>';
        layer.open({
            title: '请输入加签原因',
            type: 1,
            content: content,
            btn:['提交','取消'],
            success:function(){
                var noLinkDetails = true;
                $('#transferer').on('click',function(){
                    if ($(this)[0] && $(this)[0].tagName == 'INPUT') {
                        $('#append_con').remove();
                        layer.close(layerBtn);
                        $(this).val() ? getLink($(this), noLinkDetails) : null;
                    }
                })
                $('#transferer').on('input',function(){
                    if ($(this)[0] && $(this)[0].tagName == 'INPUT') {
                        $(this).val() ? getLink($(this), noLinkDetails) : null;
                    }
                })
                $('#transferer').on('blur',function(){
                    if ($(this)[0] && $(this)[0].tagName == 'INPUT') {
                        if ($(this).data('name')) {
                            $(this).val($(this).data('name'));
                        } else {
                            $(this).val('');
                        }
                    }
                })
            },yes:function(index){
                var AddEmployee = $('#transferer').data('id');
                if (!AddEmployee) {
                    layer.msg('请选择被加签人工号或姓名！');
                    return false;
                }
                var Reason = $('#transferReason').val(),AddType;
                for (var i = 0; i < $('input[name=AddType]').length; i++) {
                    $('input[name=AddType]')[i].checked ? AddType = $('input[name=AddType]')[i].value : null;
                }
                var params = {
                    FormKind:public.getForm.params.formkind,
                    FormNo:public.getForm.params.formno,
                    FormApproveId:public.getForm.params.approveId,
                    Assigher:public.getForm.params.uid,
                    AddEmployee:AddEmployee,
                    Reason:Reason,
                    AddType:AddType
                }
                public.ajax({
                    type:'post',
                    url:public.baseUrl+'/Approve/AddApprover',
                    contentType:'application/x-www-form-urlencoded; charset=utf-8',
                    data:public.converData(params),
                    dataType:'json',
                    success:function(data){
                        if (data.Code == 0) {
                            layer.msg(data.Message || '操作成功！');
                            layer.close(index);
                            if (AddType != 1) {
                                getForm();
                            } else {
                                toNextForm();
                            }
                        } else {
                           layer.msg(data.Message || '操作失败！'); 
                        }
                    },
                    error:function(data){
                        console.log(data)
                    }
                })
            }
        })
    }
    function backSignData(){
        var res;
        var params = {
            formApproveId:public.getForm.params.approveId,
            FormKind:public.getForm.params.formkind,
            FormNo:public.getForm.params.formno
        }
        public.ajax({
            type:'get',
            url:public.baseUrl+'/Approve/GetReturnStep',
            data:params,
            async:false,
            dataType:'json',
            success:function(data){
                res = data.Data;
            },
            error:function(data){
                console.log(data)
            }
        })
        return res;
    }
    function backSign(){
        var content = '';
        content += '<div class="transferOpen">';
        content += '<div class="AddTypeClass">';

        var backSignList = backSignData();
        if (backSignList && backSignList.length > 0) {
            var num = 0;
            for (var i = 0; i < backSignList.length; i++) {
                if (backSignList[i].Editable) {
                    num ++;
                    content += '<input name="ToFormApproveId" value="'+backSignList[i].FormApproveId+'" type="radio">'+backSignList[i].Label+'<br />';
                }
            }
            if (num == 0) {
                layer.msg('没有可退回的阶段！');
                return;
            }
        } else {
            layer.msg('没有可退回的阶段！');
            return;
        }

        content += '</div>';
        content += '<input id="transferReason" class="transfer_input" placeholder="退回原因">'
        content += '</div>';
        layer.open({
            title: '请输入退回原因',
            type: 1,
            content: content,
            btn:['提交','取消'],
            success:function(){
                public.getFromData.ApproveRecord
            },yes:function(index){
                var Reason = $('#transferReason').val(),ToFormApproveId;
                for (var i = 0; i < $('input[name=ToFormApproveId]').length; i++) {
                    $('input[name=ToFormApproveId]')[i].checked ? ToFormApproveId = $('input[name=ToFormApproveId]')[i].value : null;
                }
                var params = {
                    FormKind:public.getForm.params.formkind,
                    FormNo:public.getForm.params.formno,
                    FormApproveId:public.getForm.params.approveId,
                    Assigher:public.getForm.params.uid,
                    Reason:Reason,
                    ToFormApproveId:ToFormApproveId
                }
                public.ajax({
                    type:'post',
                    url:public.baseUrl+'/Approve/Return',
                    contentType:'application/x-www-form-urlencoded; charset=utf-8',
                    data:public.converData(params),
                    dataType:'json',
                    success:function(data){
                        if (data.Code == 0) {
                            layer.msg(data.Message || '操作成功！');
                            layer.close(index);
                            toNextForm();
                        } else {
                            layer.msg(data.Message || '操作失败！');
                        }
                    },
                    error:function(data){
                        console.log(data)
                    }
                })
            }
        })
    }
    function changeSign() {
        layer.confirm('确定改签？', function() {
            var params = {
                Uid:public.getForm.params.uid,
                ApproveId:public.getForm.params.approveId
            }
            public.ajax({
                type:'post',
                url:public.getForm.changeUrl,
                contentType:'application/json; charset=utf-8',
                data:JSON.stringify(params),
                dataType:'json',
                success:function(data){
                    if (data.Code == 0) {
                        layer.msg(data.Message || '操作成功！');
                        setTimeout(function() {
                            var newPage = location.pathname+'?FORM_APPROVER_ID='+data.Data+'&Form_Kind='+public.getForm.params.formkind+'&Form_No='+public.getForm.params.formno;
                            var oldPage = '/bpm/Approve/Popup/Main.aspx?FORM_APPROVER_ID='+data.Data+'&Form_Kind='+public.getForm.params.formkind+'&Form_No='+public.getForm.params.formno;
                            localStorage.setItem('oldAdd', oldPage);
                            location.href = newPage;
                        }, 1000);
                    } else {
                        layer.msg(data.Message || '操作失败！');
                    }
                },
                error:function(data){
                    console.log(data)
                }
            })
        })
    }
    function holdSign(){
        var content = '';
        content += '<div class="transferOpen">';
        content += '<textarea class="approve"></textarea>';
        content += '</div>';
        layer.open({
            title: '请输入保留原因',
            type: 1,
            content: content,
            btn:['提交','取消'],
            success:function(){

            },yes:function(index, layero) {
                var ApproveContent = $.trim(layero.find(".approve").val());
                var IsError = 'n';
                var ApproveValue = 'R';
                sendOption(ApproveContent, IsError, ApproveValue);
                layer.close(index);
            }
        })
    }
    function sendOption(ApproveContent, IsError, ApproveValue){
        var params = {
            ApproveContent:ApproveContent,
            Approver:public.getForm.params.uid,
            ApproveValue:ApproveValue,
            FormApproveId:public.getForm.params.approveId,
            FormData:getFromData(),
            FormKind:public.getFromData.FormKind,
            FormNo:public.getFromData.FormNo,
            IsError:IsError
        }
        params.FormData.FormNo = public.getFromData.FormNo;
        params.FormData = JSON.stringify(params.FormData);
        public.ajax({
            type:'post',
            url:public.getForm.signUrl,
            contentType:'application/json; charset=utf-8',
            data:JSON.stringify(params),
            dataType:'json',
            success:function(data){
                if (data.Code == 0) {
                    toNextForm();
                } else {
                    layer.msg(data.Message || '操作失败！');
                }
            },
            error:function(data){
                console.log(data)
            }
        })
    }

    function sendSign(){
        var params = {
            Applyer:public.getForm.params.uid,
            FormKind:public.getFromData.FormKind,
            FormNo:public.getFromData.FormNo,
            FormData:JSON.stringify(getFromData())
        }
        public.ajax({
            type:'post',
            url:public.getForm.signUrl,
            contentType:'application/json; charset=utf-8',
            data:JSON.stringify(params),
            dataType:'json',
            success:function(data){
                if (data.Code == 0) {
                    layer.alert((data.Message || '送签成功！'), function(index){
                        closeLay();
                        layer.close(index);
                    });
                } else {
                    layer.msg(data.Message || '网络错误！');
                }
            },
            error:function(data){
                console.log(data)
            }
        })
    }

    function getFromData(){
        var paramsItem = public.getFromData.FieldList;
        var res = {}, MainColumnValue = [];
        for (var i = 0; i < paramsItem.length; i++) {
            var item = paramsItem[i];
            var itemRes = {};
            if (item.Field && item.Field.FieldIsReadonly == 'n' && item.Type.toUpperCase() == 'MAIN' && item.Field.DataType != 'FILE') {
                itemRes.ColumnName = item.Field.FieldName;
                itemRes.ColumnValue = public.getValue(item.Field.FieldId);
                item.Field.DataType == 'EMPLOYEE' ? itemRes.ColumnValue = $('#'+item.Field.FieldId).data('id') : null;
                MainColumnValue.push(itemRes);
            }
        }
        res.MainColumnValue = MainColumnValue;
        res.SubColumnValue = [];
        function objCopy(){
            var obj = public.subList;
            return obj;
        }
        var SubObj = objCopy();
        for (n in SubObj) {
            if (SubObj[n].ColumnValue && SubObj[n].ColumnValue.length > 0 && (SubObj[n].AllowAdd != 'n' || SubObj[n].AllowDelete != 'n' || SubObj[n].AllowModify != 'n')) {
                for (var i = 0; i < SubObj[n].ColumnValue.length; i++) {
                    for (var o = 0; o < SubObj[n].ColumnValue[i].ColumnValue.length; o++) {
                        if (SubObj[n].ColumnValue[i].ColumnValue[o].FieldName) {
                            SubObj[n].ColumnValue[i].ColumnValue[o].ColumnName = SubObj[n].ColumnValue[i].ColumnValue[o].FieldName
                        }
                        if (SubObj[n].ColumnValue[i].ColumnValue[o].showValue) {
                            delete SubObj[n].ColumnValue[i].ColumnValue[o].showValue;
                        }
                        if (SubObj[n].ColumnValue[i].ColumnValue[o].FieldName) {
                            delete SubObj[n].ColumnValue[i].ColumnValue[o].FieldName;
                        }
                    }
                    
                }
                res.SubColumnValue.push(SubObj[n].ColumnValue);
            }
        }
        if (validation(MainColumnValue)) {
            throw 'error';
        }
        return res;
    }

    function validation(data){
        var res;
        layer.closeAll('tips');
        var item = public.getFromData.FieldList;
        for (var q = 0; q < item.length; q++) {
            if (item[q].Type.toUpperCase() == 'MAIN' && item[q].Field.DataType.toUpperCase() == 'FILE' && item[q].Field.FieldIsNull.toUpperCase() == 'N') {
                var isNull = true;
                for (var n in public.uploadData[item[q].Field.FieldId]) {
                    if (public.uploadData[item[q].Field.FieldId][n] && public.uploadData[item[q].Field.FieldId][n].fileId) {
                        isNull = false;
                    }
                }
                if (isNull) {
                    res = true;
                    layer.tips('请上传'+item[q].Field.LabelName, '#'+item[q].Field.FieldId, {
                        tipsMore: true,
                        tips: [1, '#ea3'],
                        time: 3000
                    });
                }
                continue;
            }
            for (var i = 0; i < data.length; i++) {
                if (data[i].ColumnName == item[q].Field.FieldName) {
                    // // 文本长度验证
                    // if (data[i].ColumnValue.length > item[q].Field.FieldMaxLength) {
                    //     res = true;
                    //     layer.tips('文本过长，最大长度为'+item[q].Field.FieldMaxLength, '#'+item[q].Field.FieldId, {
                    //         tipsMore: true,
                    //         tips: [1, '#ea3'],
                    //         time: 5000
                    //     });
                    // }
                    //是否必填验证
                    if (item[q].Field.FieldIsNull.toUpperCase() == 'N' && (data[i].ColumnValue == '' || data[i].ColumnValue == 'undefined' || !data[i].ColumnValue)) {
                        res = true;
                        layer.tips(item[q].Field.LabelName+'不能为空！', '#'+item[q].Field.FieldId, {
                            tipsMore: true,
                            tips: [1, '#ea3'],
                            time: 3000
                        });
                    }
                }
            }
        }
        return res;
    }
    function recall() {
        var content = '';
        content += '<div class="transferOpen">';
        content += '<textarea class="approve"></textarea>';
        content += '</div>';
        layer.open({
            title: '请输入撤回原因',
            type: 1,
            content: content,
            btn:['提交','取消'],
            success:function(){

            },yes:function(index, layero) {
                var ApproveContent = $.trim(layero.find(".approve").val());
                recallOption(ApproveContent);
                layer.close(index);
            }
        })
    }
    function recallOption(ApproveContent){
        var params = {
            Content:ApproveContent,
            Uid:public.getForm.params.uid,
            FormKind:public.getFromData.FormKind,
            FormNo:public.getFromData.FormNo
        }
        public.ajax({
            type:'post',
            url:public.getForm.recallUrl,
            contentType:'application/json; charset=utf-8',
            data:JSON.stringify(params),
            dataType:'json',
            success:function(data){
                if (data.Code == 0) {
                    layer.msg(data.Message || '操作成功！');
                    closeLay();
                } else {
                    layer.msg(data.Message || '操作失败！');
                }
            },
            error:function(data){
                console.log(data)
            }
        })
    }
    function closeLay() {
        try {
            window.parent.postMessage(JSON.stringify({cancel:true}), localStorage.getItem('postMessage'));
        } catch (err) {
            console.log(err)
        }
    }

    function dateFn(data, type){
        laydate.render({
            elem: data,
            format: 'yyyy-MM-dd',
            type: type,
            istime: true
        });
    }
    function self_print(){
        var url = location.href;
        var printAdd = window.open(url, "printCon", "location=no,menubar=no,titlebar=no,scrollbars=yes,toolbar=no,resizable=yes,left=10,top=10,height=700,width=900");
        printAdd.print();
    }
    function upload(e){
        var id = $(e.target).attr('id');
        var code = $(e.target).data('code');
        code == 'undefined' ? code = null : null;
        $('input[type=file]').unbind();
        $('input[type=file]').on('change', function(){
            if (!running) {
                if (!this.files) {
                    layer.msg('当前浏览器暂不支持上传功能！');
                } else if (this.files[0].size > 1024*1024*10) {
                    layer.msg('文件最大为10M！');
                } else {
                    getMD5(this.files[0], id, code);
                }
            } else {
                layer.msg('一个文件正在上传，请稍后！');
                return;
            }
            this.value = '';
            if (this.outerHTML) {
                this.outerHTML = this.outerHTML;
            }
        })
        $('input[type=file]').click();
    }
    function fileShow(id, data){
        var con = '';
        for (n in data) {
            var thisFile = data[n];
            if (thisFile) {
                con += '<li class="addDocument" data-fileid="'+thisFile.fileId+'" title="'+thisFile.name+'">';
                con += '<span title="删除" class="delete"></span>';
                con += '</span>';
                con += '<span class="name"><a target="_blank" target="_blank" href="'+thisFile.addr+'">'+thisFile.name+'</a></span>';
                con += '</li>';
            }
        }
        $('#'+id).parent('ul').children('.addDocument').remove();
        $('#'+id).parent('ul').append(con);
        $('#'+id).parent('ul').children('.addDocument').children('.delete').on('click', function(e){
            layer.confirm('确定删除文件'+$(e.target).parent('.addDocument').attr('title')+'？',{
                title:'提示'
            },function(index){
                deleteFile(e, id);
                layer.close(index);
            })
        })
    }
    function xhr(){
        if (!XMLHttpRequest) {
            alert('该浏览器不支持上传功能！');
            return;
        }
        if(!XMLHttpRequest.prototype.sendAsBinary){
            XMLHttpRequest.prototype.sendAsBinary = function(datastr) {
                function byteValue(x) {
                    return x.charCodeAt(0) & 0xff;
                }
                var ords = Array.prototype.map.call(datastr, byteValue);
                var ui8a = new Uint8Array(ords);
                this.send(ui8a.buffer);
            };
        }
        var _xhr = new XMLHttpRequest();
        _xhr.overrideMimeType && _xhr.overrideMimeType("application/octet-stream; charset=UTF-8");
        return _xhr;
    }
    var running;
    function getMD5(files, id, code){
        if (!files || running) {
            return;
        }
        var self_id = (~~(Math.random()*(1<<24)));
        var fileReader = new FileReader(),
            time,
            md5;
        fileReader.onload = function(e){
            running = false
            if (files.size != e.target.result.byteLength) {
                console.log('Browser reported success but could not read the file until the end.');
            } else {
                try {
                    md5 = SparkMD5.ArrayBuffer.hash(e.target.result);
                    console.log(self_id+' '+files.name+' 读取成功：'+md5+' Total time:'+(new Date().getTime() - time)+'ms');
                    uploadFile(files, md5, id, self_id, code);
                } catch (err) {
                    console.log(err);
                    layer.msg('网络延迟，请稍后再试！');
                }
            }
        }
        fileReader.onprogress = function(e){
            if (e.loaded != e.total) {
                return;
            }
            var dom = '';
            dom += '<li class="addDocument addDocument'+self_id+'" title="'+files.name+'">';
            dom += '<span title="删除" class="delete"></span>';
            dom += '<span class="onprogress">';
            dom += '<div class="numInfo"></div>';
            dom += '<div class="num">读取中...</div>';
            dom += '</span>';
            dom += '<span class="name"><a target="_blank" target="_blank" href="javascript:;">'+files.name+'</a></span>';
            dom += '</li>';
            $('#'+id).parent('.file_con').append(dom);
            // $('.addDocument'+self_id).children('.delete').on('click', function(e){
            //     layer.confirm('确定取消上传'+files.name+'？',{
            //         title:'提示'
            //     },function(index){
            //         fileReader.abort();
            //         running = false;
            //         $(e.target).parent('.addDocument').remove();
            //         layer.close(index);
            //     })
            // })
        }
        fileReader.onerror = function(){
            layer.alert(files.name+'读取失败！');
            $('.addDocument'+self_id).remove();
        }
        running = true;
        time = (new Date()).getTime();
        fileReader.readAsArrayBuffer(files);
    }
    function uploadFile(files, md5, id, self_id, code){
        if (running) {
            return;
        }
        var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        var chunkSize = 1024*1024*0.5,
            chunks = Math.ceil(files.size / chunkSize),
            currentChunk = 0,
            time,
            haszhi = 0,
            errorTime = 0,
            successTime = 0;
            spark = new SparkMD5.ArrayBuffer(),
            fileReader = new FileReader();
        var params = getUploadData(files, md5, id, code);
        fileReader.onprogress = function(e){
            if (e.lengthComputable && currentChunk < chunks) {
                var num = ((params.offset + e.loaded) / files.size) * 100;
                if (num >= 100) {
                    num = 99.9
                }
                $('.addDocument'+self_id).find('.num').html(num.toFixed(1)+'%');
                $('.addDocument'+self_id).find('.numInfo').css('width', num.toFixed(1)+'%');
                $('.addDocument'+self_id).children('.delete').unbind();
                $('.addDocument'+self_id).children('.delete').on('click', function(e){
                    layer.confirm('确定取消上传'+files.name+'？',{
                        title:'提示'
                    },function(index){
                        fileReader.abort();
                        running = false;
                        $(e.target).parent('.addDocument').remove();
                        layer.close(index);
                    })
                })
            }
        }
        fileReader.onload = function(e){
            if (!running) {
                return;
            }
            var fileContent = fileReader.content || fileReader.result;
            var _xhr = new xhr();
            _xhr.onload = function(){
                if (this.readyState == 4 && errorTime == 0) {
                    if (this.status >= 200 && this.status <= 300) {
                        try {
                            if (Object.prototype.toString.call(this.response) == "[object String]") {
                                var response = JSON.parse(this.response);
                            } else {
                                var response = this.response;
                            }
                            if (response.Code != 1) {
                                errorTime ++;
                                running = false;
                                fileReader.abort();
                                layer.msg(response.message || (files.name+'上传失败！'));
                                $('.addDocument'+self_id).remove();
                            } else {
                                params.offset += haszhi;
                                successTime ++;
                                currentChunk += 1;
                                if (currentChunk < chunks) {
                                    loadNext();
                                } else {
                                    running = false;
                                }
                                if (successTime == chunks) {
                                    public.uploadData[id] ? null : public.uploadData[id] = {};
                                    if (public.uploadData[id][params.fileId]) {
                                        layer.alert('上传出错，请刷新网页！');
                                        running = false;
                                        return;
                                    }
                                    var fileCategoryArr = params.fileCategory.split('_');
                                    if (fileCategoryArr.length == 2) {
                                        public.uploadData[id][params.fileId] = {};
                                        public.uploadData[id][params.fileId].fileId = params.fileId;
                                        public.uploadData[id][params.fileId].formKind = params.formKind;
                                        public.uploadData[id][params.fileId].formNo = params.formNo;
                                        public.uploadData[id][params.fileId].name = files.name;
                                        public.uploadData[id][params.fileId].addr = uploadView(params.fileCategory, params.fileId);
                                    } else if (fileCategoryArr.length == 4) {
                                        public.uploadData[id][fileCategoryArr[fileCategoryArr.length - 1]] ? null : public.uploadData[id][fileCategoryArr[fileCategoryArr.length - 1]] = {};
                                        public.uploadData[id][fileCategoryArr[fileCategoryArr.length - 1]][params.fileId] = {};
                                        public.uploadData[id][fileCategoryArr[fileCategoryArr.length - 1]][params.fileId].fileId = params.fileId;
                                        public.uploadData[id][fileCategoryArr[fileCategoryArr.length - 1]][params.fileId].formKind = params.formKind;
                                        public.uploadData[id][fileCategoryArr[fileCategoryArr.length - 1]][params.fileId].formNo = params.formNo;
                                        public.uploadData[id][fileCategoryArr[fileCategoryArr.length - 1]][params.fileId].name = files.name;
                                        public.uploadData[id][fileCategoryArr[fileCategoryArr.length - 1]][params.fileId].addr = uploadView(params.fileCategory, params.fileId);
                                    }
                                    
                                    $('.addDocument'+self_id).data('fileid', params.fileId);
                                    $('.addDocument'+self_id).find('.name a').attr('href', uploadView(params.fileCategory, params.fileId));
                                    $('.addDocument'+self_id).find('.num').html('100%');
                                    $('.addDocument'+self_id).find('.numInfo').css('width', '100%');
                                    $('.addDocument'+self_id).find('.onprogress').fadeOut();
                                    layer.msg(files.name+response.message);
                                    $('.addDocument'+self_id).children('.delete').unbind();
                                    $('.addDocument'+self_id).children('.delete').on('click', function(e){
                                        layer.confirm('确定删除文件'+files.name+'？',{
                                            title:'提示'
                                        },function(index){
                                            deleteFile(e, id);
                                            layer.close(index);
                                        })
                                    })
                                }
                            }
                        } catch (err) {
                            errorTime ++;
                            running = false;
                            console.log(err);
                            console.log(this.response);
                            fileReader.abort();
                            layer.msg(files.name+'上传失败！');
                            $('.addDocument'+self_id).remove();
                        }
                    } else {
                        console.log(this.response);
                        errorTime ++;
                        running = false;
                        fileReader.abort();
                        layer.msg(files.name+'上传失败！');
                        $('.addDocument'+self_id).remove();
                    }
                }
            }
            var url = public.uploadUrl+'/FileUpload/UploadFiles.aspx?para='+JSON.stringify(params);
            _xhr.open('POST', url, true);
            _xhr.withCredentials = true;
            _xhr.sendAsBinary(fileContent);
        }
        fileReader.onerror = function(){
            running = false;
            layer.alert(files.name+'上传失败！');
            $('.addDocument'+self_id).remove();
        }
        function loadNext(){
            var start = currentChunk * chunkSize,
                end = start + chunkSize >= files.size ? files.size : start + chunkSize;
            fileReader.readAsBinaryString(blobSlice.call(files, start, end));
            haszhi = end - start;
            params.isLast = end == files.size ? true : false;
            params.isFirst = currentChunk ? false : true;
        }
        running = true;
        console.log('Starting incremental file (' + files.name + ')');
        time = (new Date()).getTime();
        loadNext();
    }
    function getUploadData(files, md5, id, code){
        var item = public.getFromData;
        var params = {
            fileName:files.name,
            fileId:public.guid(),
            formKind:item.FormKind,
            formNo:item.FormNo,
            offset:0,
            md5:md5
        }
        if (item.FieldList && item.FieldList.length > 0) {
            for (var i = 0; i < item.FieldList.length; i++) {
                if (item.FieldList[i].Type.toUpperCase() == 'MAIN' && item.FieldList[i].Field.FieldId == id) {
                    params.fileCategory = item.FieldList[i].Field.TableName+'_'+item.FieldList[i].Field.FieldName;
                } else if (item.FieldList[i].Type.toUpperCase() == 'SUB') {
                    var sub_item = item.FieldList[i].Field.ColunmField;
                    for (var q = 0; q < sub_item.length; q++) {
                        if (sub_item[q].FieldId == id) {
                            if (public.subList[sub_item[q].TableName] && public.subList[sub_item[q].TableName].ColumnValue && public.subList[sub_item[q].TableName].ColumnValue.length == 0) {
                                params.fileCategory = sub_item[q].TableName+'_'+sub_item[q].FieldName+'_1';
                            } else if (public.subList[sub_item[q].TableName] && public.subList[sub_item[q].TableName].ColumnValue) {
                                params.fileCategory = sub_item[q].TableName+'_'+sub_item[q].FieldName+'_'+(public.subList[sub_item[q].TableName].ColumnValue[public.subList[sub_item[q].TableName].ColumnValue.length-1].ItemNo + 1);
                                if (code) {
                                    params.fileCategory = sub_item[q].TableName+'_'+sub_item[q].FieldName+'_'+code;
                                }
                            } else {
                                params.fileCategory = sub_item[q].TableName+'_'+sub_item[q].FieldName+'_1';
                            }
                        }
                    }
                }
            }
        }
        return params;
    }
    function deleteFile(dom, id){
        var fileId = $(dom.target).parent('.addDocument').data('fileid');
        if (!public.uploadData[id]) {
            layer.msg('未知错误，请刷新页面！');
            return;
        }
        var params = {};
        if (public.uploadData[id][fileId]) {
            params.fileId=public.uploadData[id][fileId].fileId;
            params.formKind=public.uploadData[id][fileId].formKind;
            params.formNo=public.uploadData[id][fileId].formNo;
        } else {
            for (n in public.uploadData[id]) {
                if (public.uploadData[id][n][fileId]) {
                    params.fileId=public.uploadData[id][n][fileId].fileId;
                    params.formKind=public.uploadData[id][n][fileId].formKind;
                    params.formNo=public.uploadData[id][n][fileId].formNo;
                }
            }
        }
        public.ajax({
            type:'POST',
            url:public.uploadUrl+'/FileUpload/DeleteFiles.aspx?para='+JSON.stringify(params),
            contentType:'application/json; charset=utf-8',
            dataType:'json',
            success:function(data){
                if (data.Code == 1) {
                    $(dom.target).parent('.addDocument').fadeOut();
                    setTimeout(function() {
                        $(dom.target).parent('.addDocument').remove();
                    }, 500);
                    if (public.uploadData[id][fileId]) {
                        public.uploadData[id][fileId] = null;
                    } else {
                        for (n in public.uploadData[id]) {
                            if (public.uploadData[id][n][fileId]) {
                                public.uploadData[id][n][fileId] = null;
                            }
                        }
                    }
                    layer.msg(data.message || '文件删除成功！');
                } else {
                    layer.msg(data.message || '文件删除成功！');
                }
            },error:function(data){
                console.log(data);
                layer.msg('操作失败！');
            }
        })
    }
    function uploadView(fileCategory, fileId){
        var url = '/BPM/Module/ViewFile.aspx?FORM_KIND='+public.getFromData.FormKind+'&FORM_NO='+public.getFromData.FormNo+'&CATEGORY='+fileCategory+'&FILE_ID='+fileId;
        return url;
    }

})()
