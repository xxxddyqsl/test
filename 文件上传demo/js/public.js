
var publicJS = function(){
    var public = {};
    //取值
    //selected存在则为select选中的文本
    window.getValue = public.getValue = function(dom,selectText){
        if (Object.prototype.toString.call(dom) !== "[object String]") {
            console.log('dom必须为String！');
            return;
        }
        var doc = $('#' + dom);
        if (doc[0].type.toLowerCase() == 'radio' || doc[0].type.toLowerCase() == 'checkbox') {
            var value = getCheckValue(dom);
        } else if (doc.length == 1) {
            if (doc[0].tagName === 'SPAN') {
                var value = doc.html();
            } else {
                var value = doc.val();
            }
        } else {
            console.log('有多个相同的ID！');
            return;
        }
        if (selectText && doc[0] && doc[0].tagName === 'SELECT') {
            var value = $('#'+dom+' option:selected').text();
        }
        return value;
    }
    //单选、复选取值，返回数据类型
    function getCheckValue(dom){
        var doc = $('input[name='+dom+']');
        if (doc.length == 0) {
            console.log('无法获取dom！');
            return;
        }
        var value = [];
        for (var i = 0; i < doc.length; i++) {
            doc[i].checked ? value.push(doc[i].value) : null;
        }
        if (doc[0].type == 'radio') {
            value = value.join('');
        } else {
            value = value.join(';');
        }
        return value;
    }

    //赋值
    window.innerValue = public.innerValue = function(dom, data){
        if (Object.prototype.toString.call(dom) !== "[object String]") {
            console.log('dom必须为String！');
            return;
        }
        var doc = $('#' + dom);
        if (doc[0].type.toLowerCase() == 'radio' || doc[0].type.toLowerCase() == 'checkbox') {
            var value = innerCheckValue(dom, data);
        } else if (doc.length == 1) {
            if (doc[0].tagName === 'SPAN') {
                doc.html(data);
            } else {
                doc.val(data);
            }
        } else {
            console.log('有多个相同的ID！');
            return;
        }
    }
    //单选、复选赋值
    function innerCheckValue(dom, data){
        var doc = $('input[name='+dom+']');
        if (doc.length == 0) {
            console.log('无法获取dom！');
            return;
        }
        if (Object.prototype.toString.call(data) !== "[object String]") {
            console.log('单选data必须为String！');
            return;
        }
        if (doc[0].type == 'radio') {
            for (var i = 0; i < doc.length; i++) {
                    data == doc[i].value ? doc[i].checked = true : null;
            }
        } else {
            for (var i = 0; i < doc.length; i++) {
                for (var q = 0; q < data.split(';').length; q++) {
                    data.split(';')[q] == doc[i].value ? doc[i].checked = true : null;
                }
            }
        }
    }

    //select加载选择项
    window.getSelect = public.getSelect = function(dom, data){
        if (Object.prototype.toString.call(dom) !== "[object String]") {
            console.log('dom必须为String！');
            return;
        }
        if (Object.prototype.toString.call(data) !== "[object Array]") {
            console.log('data必须为Array！');
            return;
        }
        var doc = $('#' + dom);
        if (doc.length == 1) {
            doc.children().remove();
            var addom = '';
            addom += '<option value=""></option>';
            for (var i = 0; i < data.length; i++) {
                if (Object.prototype.toString.call(data[i]) !== "[object Array]") {
                    console.log('data必须为Array！');
                    return;
                }
                addom += '<option value="'+data[i][0]+'">'+data[i][1]+'</option>';
            }
            doc.append(addom);
        } else {
            console.log('无法获取dom！');
            return;
        }
    }

    window.ajax = public.ajax = function(options) {
        $.ajax({
            beforeSend:function(XMLHttpRequest){
                options.noShade ? null : layer.load(2,{shade:0.2, area: ['32px', '32px']});
                options.beforeSend && options.beforeSend(XMLHttpRequest);
            },
            async:options.async == false ? false : true,
            type:options.type || 'get',
            url:options.url || '',
            contentType:options.contentType || "application/x-www-form-urlencoded; charset=UTF-8",
            processData:options.processData == false ? false : true,
            traditional:options.traditional || false,
            data:options.data || '',
            dataType:options.dataType || 'json',
            timeout:options.timeout || 15000,
            success:function(data){
                options.success && options.success(data);
            },
            error:function(data){
                layer.msg(data.Message || '网络错误！');
                options.error && options.error(data);
            },
            complete:function(data){
                layer.closeAll('loading');
                if(data.statusText == 'timeout'){
                    layer.msg('等待超时！');
        　　　　}
                options.complete && options.complete(data);
            }
        })
    }

    window.converData = public.converData = function(data) {
        if (data && typeof data === 'object') {
            var converRes = '';
            for(var i in data){
                converRes += i + '=' + data[i] + '&';
            }
            converRes = converRes.substring(0, converRes.length - 1);
            return converRes;
        } else {
            return data;
        }
    }

    window.guid = public.guid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    if (typeof FileReader != "undefined" && !FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function (fileData) {
            var binary = "";
            var pt = this;
            var reader = new FileReader();      
            reader.onload = function (e) {
                var bytes = new Uint8Array(reader.result);
                var length = bytes.byteLength;
                for (var i = 0; i < length; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                //pt.result  - readonly so assign binary
                pt.content = binary;
                $(pt).trigger('onload');
            }
            reader.readAsArrayBuffer(fileData);
        }
    }

    return public;
}
    