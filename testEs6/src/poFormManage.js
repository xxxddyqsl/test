class Mold {
    // 分页 插件参数
    constructor() {
        // 分页 插件参数
        this.pageData = {
            pageSizes: [10, 20, 30, 40, 50, 100], // 选择每页条数  TODO: layout的sizes属性存在才生效
            pageIndex: 1, // 当前页码 [非必填]
            pageSize: 10, // 每页显示条数   TODO: 默认选中sizes [非必填]
            total: 0,// 数据总条数 [必填] 默认0
        };
        // po单查询 QueryPO 查询接口参数
        this.data = {
            "pONumber": "", "pRNumber": "", "projectName": "", "deptName": "", "status": "", "vendorName": "", "requestingStaff": "",
            "creator": "", "dueDateFrom": "", "dueDateTo": "", "totalFrom": '', "totalTO": '', "pageSize": this.pageData.pageSize, "pageIndex": this.pageData.pageIndex
        };
    };
    // 初始化
    init() {
        let that = this;
        // 日期选择插件
        this.pluginSelectData();
        // 分页插件
        this.pluginPage();
        // 表格渲染
        this.TableHtml();
        // 使用默认数据调用查询接口 默认查询当前日期 - 前3个月的数据
        Search();
    };
    // 日期选择插件
    pluginSelectData() {
        let that = this;
        // 获取当前时间戳 
        let date = new Date();
        //  初始默认查询的开始时间  为当前日期的 前 3个月
        var StartDate = date.getFullYear() + "-" + ((date.getMonth() + 1 - 3) < 10 ? '0' + (date.getMonth() + 1 - 3) : (date.getMonth() + 1 - 3)) + "-" + ((date.getDate()) < 10 ? '0' + date.getDate() : date.getDate());
        //    设置调用接口时提交的参数
        that.data.dueDateFrom = StartDate;
        //    设置UI input显示的时间
        $('#dueDateFrom').val(StartDate);
        //  初始默认查询的结束时间   默认当天
        var endDate = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + ((date.getDate()) < 10 ? '0' + date.getDate() : date.getDate());
        //    设置调用接口时提交的参数
        that.data.dueDateTo = endDate;
        //    设置UI input显示的时间
        $('#dueDateTo').val(endDate);
        // 开始日期
        $('#dueDateFrom').datetimepicker({
            minView: "month", //选择日期后，不会再跳转去选择时分秒
            forceParse: 0,  //强制解析
            format: 'yyyy-mm-dd',//显示格式 format: 'yyyy-mm-dd hh:ii'
            language: 'zh-CN',//显示中文
            // startDate:tomorrow,//开始时间 - 初始默认时间 当前时间的10分钟后
            startView: 'month',//开始视图 - 日期时间选择器打开之后首先显示的视图 - 默认月视图
            todayBtn: 1,//显示今日按钮
            // minuteStep:1,//构建小时视图。对于每个 minuteStep 都会生成一组预设时间（分钟）用于选择默认为5 每5分钟为1个间隔选择 当前为每1分钟一个间隔
            todayHighlight: true,//当天日期高亮
            autoclose: true,//选中之后自动隐藏日期选择框
            clearBtn: true,//清除按钮
            weekStart: 1,
        }).on('click', function (ev) {
            // $('#StartDatetimepicker').datetimepicker('setDate', date); 
        }).on('change', function (ev) {
            // 日期发生改变时触发
            // console.log( this.value)
            // $('#dueDateFrom').val();
            //开始日期
            // $('#dueDateTo').val();
            that.data.dueDateFrom = this.value;
        });
        // 结束日期
        $('#dueDateTo').datetimepicker({
            minView: "month", //选择日期后，不会再跳转去选择时分秒
            forceParse: 0,  //强制解析
            format: 'yyyy-mm-dd',//显示格式 format: 'yyyy-mm-dd hh:ii'
            language: 'zh-CN',//显示中文
            // startDate:tomorrow,//开始时间 - 初始默认时间 当前时间的10分钟后
            startView: 'month',//开始视图 - 日期时间选择器打开之后首先显示的视图 - 默认月视图
            todayBtn: 1,//显示今日按钮
            // minuteStep:1,//构建小时视图。对于每个 minuteStep 都会生成一组预设时间（分钟）用于选择默认为5 每5分钟为1个间隔选择 当前为每1分钟一个间隔
            todayHighlight: true,//当天日期高亮
            autoclose: true,//选中之后自动隐藏日期选择框
            clearBtn: true,//清除按钮
            weekStart: 1,
        }).on('click', function (ev) {
            // $('#StartDatetimepicker').datetimepicker('setDate', date); 
        }).on('change', function (ev) {
            // 日期发生改变时触发
            // console.log( this.value);
            //结束日期
            // $('#dueDateTo').val();
            that.data.dueDateTo = this.value;
            // console.log(mold.data)
        });
    };
    // 分页 插件
    pluginPage() {
        let that = this;
        /**
   * layout 参数说明：
   * 
   * total： 总条数
   * sizes: 显示每页条数选择框， TODO:pageSizes参数必填,否则无法生效
   * home： 首页按钮
   * prev： 上一页按钮
   * pager： 页码
   * last： 尾页按钮
   * next： 下一页按钮
   * jumper： 输入框跳转（包含事件：失去焦点，回车）触发
   * 
   * */
        new Pagination({
            element: '#pages', // 渲染的容器  [必填]
            type: 1, // 样式类型，默认1 ，目前可选 [1,2] 可自行增加样式   [非必填]
            layout: 'total, sizes, home, prev, pager, next, last, jumper', // [必填]
            pageIndex: that.pageData.pageIndex, // 当前页码 [非必填]
            pageSize: that.pageData.pageSize, // 每页显示条数   TODO: 默认选中sizes [非必填]
            pageCount: 9, // 页码显示数量，页码必须大于等于5的奇数，默认页码9  TODO:为了样式美观，参数只能为奇数， 否则会报错 [非必填]
            total: that.pageData.total, // 数据总条数 [必填]
            singlePageHide: false, // 单页隐藏， 默认true  如果为true页码少于一页则不会渲染 [非必填]
            pageSizes: that.pageData.pageSizes, // 选择每页条数  TODO: layout的sizes属性存在才生效
            prevText: '上一页', // 上一页文字，不传默认为箭头图标  [非必填]
            nextText: '下一页', // 下一页文字，不传默认为箭头图标 [非必填]
            ellipsis: true, // 页码显示省略符 默认false  [非必填]
            disabled: true, // 显示禁用手势 默认false  [非必填]
            currentChange: function (index, pageSize) { // 页码改变时回调  TODO:第一个参数是当前页码，第二个参数是每页显示条数数量，需使用sizes第二参数才有值。
                // console.log(index, pageSize)
                // 选择的页码 发生变化 时重置 pageIndex 
                if (that.pageData.pageIndex != index) {
                    that.pageData.pageIndex = index;
                    // 本地存储 分页信息
                    // localStorage.setItem('pageData',that.pageData);
                    // 修改data 提交参数
                    that.data.pageIndex = index;
                    // 调用查询接口
                    that.QueryPO()
                    // 调用查询按钮
                    //  Search();
                };
                // 每页显示条数  发生变化 时重置 pageSize 调用接口
                if (that.pageData.pageSize != pageSize) {
                    that.pageData.pageSize = pageSize;
                    // localStorage.setItem('pageData',that.pageData);
                    // 修改data 提交参数
                    that.data.pageSize = pageSize;
                    // 调用查询接口
                    that.QueryPO()
                };
            }
        });
        $('._jumper').find('input').attr('disabled')
    }
    // 表格渲染
    TableHtml(msg) {
        $('.table').find('tbody').html('');
        //   console.log(   $('body').append( `${msg.map(item=>{`<div id='CCCC'>${item}</div>`})}`))
        let that = this;
        // msg接口返回数据
        if (msg && msg.length > 0) {
            msg.map(item => {
                // es6模板字符串里怎么使用三元运算符
                let html = ` <tr>
                        <td>${item.PONumber != null && item.PONumber != undefined ? item.PONumber : ''}</td>
                        <td>${item.PRNumber != null && item.PRNumber != undefined ? item.PRNumber : ''}</td>
                        <td>${item.DeptName != null && item.DeptName != undefined ? item.DeptName : ''}</td>
                        <td>${item.RequestingStaff != null && item.RequestingStaff != undefined ? item.RequestingStaff : ''}</td>
                        <td>${item.VendorName != null && item.VendorName != undefined ? item.VendorName : ''}</td>
                        <td>${item.Total != null && item.Total != undefined ? item.Total : ''}</td>
                        <td>${item.ProjectName != null && item.ProjectName != undefined ? item.ProjectName : ''}</td>
                        <td>${item.DueDate != null && item.DueDate != undefined ? that.timeConvert(item.DueDate) : ''}</td>
                        <td>${item.Status != null && item.Status != undefined ? item.Status : ''}</td>
                        <td>${item.Creator != null && item.Creator != undefined ? item.Creator : ''}</td>
                        <td>
                           <div>
                           <a href='javascript:;'  title='${window.languageFn('查看')}' style='margin-right: 10px;' onclick='goPoDetails("${item.PONumber}")'>Detail</a>
                           </div>
                        </td>
                    </tr>  `;
                $('.table').find('tbody').append(html);
            });
        } else {
            $('.table').find('tbody').html('<tr><td>' + window.languageFn('暂无数据！') + '</td></tr>');
        };
        // 校验 tbody 是否出现滚动条
        that.tbodyScrollbarFu(that);
    };
    // tbody 是否出现滚动条 重新添加 兼容class 否则删除 兼容class
    tbodyScrollbarFu() {
        // console.log($('.tbody_scrollbar')[0].scrollHeight ,$('.tbody_scrollbar')[0].clientHeight,$('.tbody_scrollbar')[0].offsetHeight)
        if ($('.tbody_scrollbar')[0].scrollHeight > $('.tbody_scrollbar')[0].clientHeight) {
            //    添加 兼容class
            $('.table_thead').addClass('table_thead_p');
            // console.log('出现滚动条')
        } else {
            // 兼容class 存在 
            if ($('.table_thead').hasClass('table_thead_p')) {
                // 移除 class
                $('.table_thead').removeClass('table_thead_p');
            };
        };
    };
    // po单查询  // ajax post body raw 传json
    QueryPO() {
        let that = this;
        // console.log(this.data);
        $('.table').find('tbody').html('<tr><td>' + window.languageFn('正在拉取数据') + '</td></tr>');
        return new Promise((resolve) => {
            $.ajax({
                // 测试地址 api 转nginx 代理
                url: "../../IndiEV/SapFormMergeShow.aspx/QueryPO",
                // 正式地址
                // url: "/FormApplication/IndiEV/SapFormMergeShow.aspx/QueryPO",
                type: "POST",
                data: JSON.stringify(that.data),
                processData: false,
                contentType: 'application/json',
                success: function (res) {
                    // 删除 蒙层 提示元素
                    $('.maskLayer').remove();
                    if (res.Code == 1 && res.Data != null) {
                        // 数据总条数
                        that.pageData.total = res.Data.Total;
                        // 调用 分页插件 重新渲染
                        that.pluginPage();
                        //     // 当前页码
                        //     res.Data.PageIndex
                        //    //一页显示条数
                        //     res.Data.PageIndex
                        let data = res.Data.POInfos;
                        // 渲染表格
                        that.TableHtml(data);
                    } else {
                        alert(res.Message);
                        $('.table').find('tbody').html('<tr><td>' + res.Message + '</td></tr>');
                    }
                    resolve(res);
                },
                error: function (err) {
                    alert(err.responseText.Message);
                    // alert(err.responseText);
                    // 删除 蒙层 提示元素
                    $('.maskLayer').remove();
                    $('.table').find('tbody').html('<tr><td>' + err.status + ':' + err.responseJSON.Message + '</td></tr>');
                    resolve(res);
                }
            });
        }).catch(Error => {
            resolve(Error);
        });
    };
    // AM；格式 时间 转化
    timeConvert(str) {
        // str = str.replace(/\//ig, '-');
        // var y = /\-([\d]{4})/.exec(str)[1],
        //     m = /\-([\d]{2}|[\d])/.exec(str)[1],
        //     d = /([\d]{2}|[\d])\-/.exec(str)[1],
        //     H = /\s([\d]{2}|[\d]):/.exec(str)[1],
        //     i = /:([\d]{2})/.exec(str)[1],
        //     AMorPM = /(AM|PM)/.exec(str)[1];

        // let date = new Date(y + '-' + m + '-' + d + ' ' + H + ':' + i + ' ' + AMorPM);
        let date = new Date(str);
        let time = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + ((date.getDate()) < 10 ? '0' + date.getDate() : date.getDate());
        return time;
    };

   
};
var mold;
$(function () {
    // 初始化
    mold = new Mold();
    mold.init();
    // 将事件侦听器函数附加到窗口的resize事件  通过实时监听页面宽度高度 变化 来实时监听 tbody 是否出现滚动条 重新添加 兼容class 否则删除 兼容class
    window.addEventListener("resize", displayWindowSize);
    //  调用该函数
    displayWindowSize();
    // 实时监听dmo 宽度高度 
    displayMutation();

})
// 实时监听页面宽度高度
function displayWindowSize() {
    // console.log(mold)
    mold.tbodyScrollbarFu();
};
// 实时监听dmo 宽度高度
function displayMutation() {

    //获取监听的dom元素
    let box = document.getElementById("tbody_content");
    //配置选项 观察器所能观察的DOM变动类型（即下面代码的options对象），有以下几种：
    // childList：子节点的变动。
    // attributes：属性的变动。
    // characterData：节点内容或节点文本的变动。
    // subtree：所有后代节点的变动。
    let options = { attributes: true, childList: true, subtree: true };
    //实时 监听 dom 变化 MutationObserver构造函数 当DOM发生变动，会触发Mutation Observer
    let observer = new MutationObserver(function (mutations, observer) {
        // 调用自定义 计算 是否添加兼容 tbody滚动条 class
        mold.tbodyScrollbarFu();
        //  //返回元素的高度（包括元素高度、内边距和边框，不包括外边距）
        // console.log(mutations[0].target.offsetHeight)
        // console.log(mutations,observer)
    });

    //开始观测
    observer.observe(box, options);

    //停止观测
    // observer.disconnect();
};

// // input输入时 实时获取所有 input 参数 赋值给 mold.data 查询接口使用
// $('.form_box input').bind('input propertychange', function() {
//     let id = this.id;
//     // input 类型
//     let type = this.type;
//     let value= this.value;
//     // console.log(this, id,type,value);
//     // console.log(mold.data)
//     mold.data[id] != undefined ?mold.data[id]= (type=='number'?Number(value):value):'';
//     // 获取开始 - 结束的日期
//     // $('#dueDateFrom').val();  // 开始日期
//     // $('#dueDateTo').val();//结束日期
//     // console.log(mold.data)
// });
// //  监听下拉框发生修改时 获取val 修改data
// $("#status").change(function(){
//     mold.data.status = this.value;
//     // console.log(mold.data)
// })
// 点击查询
function Search() {
    // 弹出 蒙层 提示
    //   maskLayerShow('正在拉取数据');
    // 兼容多语言
    maskLayerShow(window.languageFn('正在拉取数据'));
    //直接点击查询时 未触发input 输入框 获取所有input的值
    getFromData()
    // 调用查询接口
    mold.QueryPO();
};
// 获取所有input的值 + 下拉框 + 日期
function getFromData() {
    // 获取 input 输入框
    $('.form_box input').each(function () {
        let id = this.id;
        // input 类型
        let type = this.type;
        let value = this.value;
        // console.log(this, id,type,value);
        // console.log(mold.data)
        mold.data[id] != undefined ? mold.data[id] = (type == 'number' ? Number(value) : value) : '';
    });
    // 获取下拉框
    mold.data.status = $("#status").val();
    // 获取 日期
    mold.data.dueDateFrom = $("#dueDateFrom").val();//开始日期
    mold.data.dueDateTo = $("#dueDateTo").val();//结束日期
}

// 打开po创建窗口
function setCreatePoForm() {
    let url = './CreatePoForm.html', iWidth = 1000, iHeight = 800,
        // 获取窗口垂直 居中位置
        Top = (window.screen.availHeight - 30 - iHeight) / 2,
        // 获取窗口水平 居中位置
        Left = (window.screen.availWidth - 30 - iWidth) / 2;

    window.open(url, '', 'width=' + iWidth + ',height=' + iHeight + ',top=' + Top + ',left=' + Left);
}
// 进入po详情
function goPoDetails(PONumber) {
    //  参数转换为json字符串 + encodeURIComponent编码
    let obj = encodeURIComponent(JSON.stringify({ pONumber: PONumber }));
    let url = './PoDetails.html?obj=' + obj;
    window.open(url);
}
// 文档缺失
function DocumentationIsMissing() {
    alert(window.languageFn('暂未开发！'))
}

// <!-- 蒙层 提示 -->
function maskLayerShow(title) {
    let arr = title != undefined && title != null ? title.replace(/\s*/g, "").split('') : [];
    let html = `
    <div class="maskLayer gg-flex-1">
        <div class="maskLayer_content gg-flex-1 gg-flex-2">
            <div class="loading"></div>
            <div class="gg-flex-1 maskLayer_content_title_box">
            ${arr.map((item, index) => {
        return `<div class="maskLayer_content_title" style="animation-delay: ${index * 0.08}s;">${item}</div>`
    }).join('')}
            </div>
        </div> 
    </div>
    `;
    $('body').append(html);
}

// 下载文件 
async function Download() {
    // 先查询 等待查询结果 - 没有数据 不执行下载
    // 兼容多语言
    maskLayerShow(window.languageFn('正在拉取数据'));
    let QueryData = await mold.QueryPO();
    console.log(QueryData)
    if (QueryData.Code == 1 && QueryData.Data != null) {
        // 兼容多语言
        maskLayerShow(window.languageFn('正在下载！'));
        // 调用下载接口 - 返回二进制流
        downloadAjax()
    }
};

function downloadAjax() {
    let data = {
        "pONumber": mold.data.pONumber, "pRNumber": mold.data.pRNumber, "projectName": mold.data.projectName, "deptName": mold.data.deptName, "status": mold.data.status, "vendorName": mold.data.vendorName, "requestingStaff": mold.data.requestingStaff,
        "creator": mold.data.creator, "dueDateFrom": mold.data.dueDateFrom, "dueDateTo": mold.data.dueDateTo, "totalFrom": mold.data.totalFrom, "totalTO": mold.data.totalTO
    };
    console.log(data);
    $.ajax({
        url: '../../IndiEV/SapFormMergeShow.aspx/DownloadPO', // url为请求接口连接
        type: 'POST',
        data: JSON.stringify(data),
        processData: false,
        contentType: 'application/json',
        xhrFields: { responseType: "blob" },// 该属性只支持jQuery3.5及以上版本，否则下载下来的文件会是乱码
        success: function (res, status, xhr) {
            // 校验 数据返回 是否是Blob二进制流的实例
            if (!(res instanceof Blob)) {
                return alert(window.languageFn('不是Blob实例，下载失败！'));
            };
            // 获取响应标头里返回的 文件名+文件后缀名
            let filename = decodeURIComponent(xhr.getResponseHeader('Content-Disposition').split('filename=')[1]);
            if (filename != '' && filename != 'undefined') {
                 // res为后端传来的文件流，// fileName为文件名称
                downloadFile(res,filename);
            } else {
                alert(window.languageFn('文件名错误，下载失败！'));
            };
            // console.log(res, filename);
        },
        error: function (err) {
            alert(err.statusText);
            // 删除 蒙层 提示元素
            $('.maskLayer').remove();
            // console.log('失败')
        }
    });
}
// 创建下载 res为后端传来的文件流，// fileName为文件名称
function downloadFile(res, fileName) {
    // 创建一个新的对象URL 获取一个http格式的url路径
    let url = window.URL.createObjectURL(res);
    const ele = document.createElement('a');
    ele.setAttribute('href', url);//设置下载文件的文件路径
    ele.setAttribute('download', fileName);//设置下载文件的文件名称
    ele.click();
    // 释放掉blob对象
    window.URL.revokeObjectURL(url);
    // 删除 蒙层 提示元素
    $('.maskLayer').remove();
};