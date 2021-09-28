  //获取公共方法
  var public = publicJS();
  public.uploadUrl = '/SnailOffice';
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
    // var params = getUploadData(files, md5, id, code);
    var params =  {fileCategory: "SNAILFORM591_F16",
    fileId: "c52b981c-f533-42ab-9a82-b439d0392e66",
    fileName: "ts编译报错.txt",
    formKind: "SNAIL.FORM.591",
    formNo: 1000,
    isFirst: true,
    isLast: true,
    md5: "ac3cf01208c1bd98b17f1c34837768fb",
    offset: 0,};
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
                                // public.uploadData[id] ? null : public.uploadData[id] = {};
                                // if (public.uploadData[id][params.fileId]) {
                                //     layer.alert('上传出错，请刷新网页！');
                                //     running = false;
                                //     return;
                                // }
                                // var fileCategoryArr = params.fileCategory.split('_');
                                // if (fileCategoryArr.length == 2) {
                                //     public.uploadData[id][params.fileId] = {};
                                //     public.uploadData[id][params.fileId].fileId = params.fileId;
                                //     public.uploadData[id][params.fileId].formKind = params.formKind;
                                //     public.uploadData[id][params.fileId].formNo = params.formNo;
                                //     public.uploadData[id][params.fileId].name = files.name;
                                //     public.uploadData[id][params.fileId].addr = uploadView(params.fileCategory, params.fileId);
                                // } else if (fileCategoryArr.length == 4) {
                                //     public.uploadData[id][fileCategoryArr[fileCategoryArr.length - 1]] ? null : public.uploadData[id][fileCategoryArr[fileCategoryArr.length - 1]] = {};
                                //     public.uploadData[id][fileCategoryArr[fileCategoryArr.length - 1]][params.fileId] = {};
                                //     public.uploadData[id][fileCategoryArr[fileCategoryArr.length - 1]][params.fileId].fileId = params.fileId;
                                //     public.uploadData[id][fileCategoryArr[fileCategoryArr.length - 1]][params.fileId].formKind = params.formKind;
                                //     public.uploadData[id][fileCategoryArr[fileCategoryArr.length - 1]][params.fileId].formNo = params.formNo;
                                //     public.uploadData[id][fileCategoryArr[fileCategoryArr.length - 1]][params.fileId].name = files.name;
                                //     public.uploadData[id][fileCategoryArr[fileCategoryArr.length - 1]][params.fileId].addr = uploadView(params.fileCategory, params.fileId);
                                // }
                                
                                $('.addDocument'+self_id).data('fileid', params.fileId);
                                // $('.addDocument'+self_id).find('.name a').attr('href', uploadView(params.fileCategory, params.fileId));
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
function uploadView(fileCategory, fileId){
    var url = '/BPM/Module/ViewFile.aspx?FORM_KIND='+public.getFromData.FormKind+'&FORM_NO='+public.getFromData.FormNo+'&CATEGORY='+fileCategory+'&FILE_ID='+fileId;
    return url;
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