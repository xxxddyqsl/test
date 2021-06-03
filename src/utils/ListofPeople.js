import qs from 'qs';       //引用qs模块
import axios from 'axios'
export default {
    fatherthis: null, //调用页的 this
    ents: [],
    entMap: {},
    empCache: {},
    deptCache: {},
    deptTree: [],
    serviceCache: {},
    deptTreeMap: {},
    params: {},
    phone: null,
    userid: null,//自己的 id
    jjtoken: null,//自己的 token
    timer: null,// 定时器
    // loginTime: this.getNow(),
    getNow: function () {
        return this.getTime(1);
    },
    getTime: function (needMs) {
        var now = (new Date()).getTime();
        return needMs ? now : parseInt(now / 1000);
    },
    setLs(k, v) {
        var _v;
        if (typeof v === 'string' || typeof v === 'number') {
            _v = v;
        } else {
            _v = JSON.stringify(v);
        }
        try {
            localStorage.setItem(k, _v);
            return true;
        } catch (e) {
            console.log('存储本地数据失败');
            return false;
        }
    },
    getLs(k) {
        var str = localStorage.getItem(k);
        try {
            str = JSON.parse(str);
        } catch (e) {
        }
        return str === 'undefined' ? '' : str;
    },
    //  添加会议成员 所需 数据初始化
    initializeMember(that, phone, jjtoken, userid) {
        this.fatherthis = that;
        this.phone = phone;
        this.jjtoken = jjtoken;
        this.userid = userid;
    },

    // 我的 好友列表 数据调用 + 处理
    async   getFriendsList() {
        let that = this;
        // 获取 我的好友 数据
        let myGoodFriend = await this.getFriends();
        console.log(myGoodFriend);
        myGoodFriend.map((item, index) => {
            // console.log(item); FriendsList
            if(item.SUserId != this.userid){
                item.label = item.SName;
                item.id = item.SUserId+'_'+item.SDeptId;
                item.img = item.SAvatar !='' ? item.SAvatar :  require("../assets/images/defaultHeadImage.jpg");
                item.phone = item.SMobile;
                // FriendsList 赋值
                this.fatherthis.FriendsList.push(item);
                console.log(  this.fatherthis.FriendsList);  
            }
        })
       
    },
    // 常用联系人  数据调用 + 处理
    async  getFrequenterList() {
        let that = this;
        // 等待 查询到的 常用联系人 id + 调用查询人员信息接口
        let arr = await this.getFrequenterAjax({ user: that.userid });
        // 使用Promise.all 调用查询人员信息接口 并行
        // console.log(arr); FrequentlyUsedContactsList
        Promise.all(arr).then(res => {
            console.log(res);
            res.map((item, index) => {
                if(item.SUserId != this.userid){
                    item.label = item.SName;
                    item.id = item.SUserId+'_'+item.SDeptId;
                    item.img = item.SAvatar !='' ? item.SAvatar :  require("../assets/images/defaultHeadImage.jpg");
                    item.phone = item.SMobile;
                    // FriendsList 赋值
                    this.fatherthis.FrequentlyUsedContactsList.push(item);
                    console.log(this.fatherthis.FrequentlyUsedContactsList);
                }
            })
        });
    },
    // 获取我的好友列表
    getFriends() {
        let that = this;
        let obj = { mobileNo: that.phone };
        return new Promise((resolve) => {
            axios({
                method: "POST",
                url: "/apis/friends/queryFriends.wn",
                data: qs.stringify(obj),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'token': that.jjtoken }
            }).then((res) => {
                console.log(res);
                let msg = res.data;
                if (msg.code == 0) {
                    resolve(msg.friends);
                } else if (msg.code != 0) {
                    // resolve(msg); 
                    setTimeout(() => {//轮询任务 重新获取接口内容
                        that.getFriendsList();
                    }, 1000)
                }
            })
        })
    },
    // 获取  常用联系人 id
    getFrequenterAjax() {
        let that = this;
        let obj={ user: that.userid };
        return new Promise((resolve) => {
            let arr = [];
            axios({
                method: "POST",
                url: "/apis/friends/queryFrequenter.wn",
                data: obj,
                headers: { 'Content-Type': 'application/json;charset=UTF-8', 'token': that.jjtoken }
            }).then((res) => {
                console.log(res);
                let msg = res.data;
                if (msg.code == 0) {
                    msg.data.forEach((item, index) => {
                        // console.log(item);
                        let itemId = item.id.SFrequenterUserId;
                        // arr.push(await that.getLastestEmpInfo(itemId)); 
                        arr.push(that.getLastestEmpInfo(itemId));
                    })
                    resolve(arr);
                }else if (msg.code != 0) {
                    // resolve(msg); 
                   setTimeout(() => {//轮询任务 重新获取接口内容
                        that.getFrequenterList();
                    }, 1000)
                }
            }).catch((res) => {
                console.log(res);
            })
        })
    },
    // 联系人 id  查询获取 联系人 信息
    getLastestEmpInfo(id) {
        let that = this;
        return new Promise(function (resolve) {
            let obj = { userId: id };
            axios({
                method: "POST",
                url: "/apis/users/queryUserInfo.wn",
                data: qs.stringify(obj),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'token': that.jjtoken }
            }).then((res) => {
                console.log(res);
                let msg = res.data;
                if (msg.code == 0) {
                    resolve(res.data.userInfo);
                }else if (msg.code != 0) {
                    // resolve(msg); 
                    setTimeout(() => {//轮询任务 重新获取接口内容
                        that.getFrequenterList();
                    }, 1000)
                }
            }).catch((res) => {
                console.log(res);
            })
        })
    },
    // 获取 自己的信息
    getUserOrgs() {
        let that = this;
        // axios的post请求参数格式有问题 axios的post请求发送健值对，需要引用qs处理一下才可以发送 否则报错
        var obj = { mobileNo: that.phone };
        // 'TGT-937-UANgZwnFBqgw7dypdc2unpPYefDR7FzcFbYPuJaTboddTmMhJk-oa.sso.woniu.com'
        axios({
            method: "POST",
            url: "/apis/orgs/getUserOrg.wn",
            data: qs.stringify(obj),
            headers: { 'token': that.jjtoken }
        }).then(function (res) {
            console.log(res);
            that.ents.length = 0;
            if(res.data.code==0){
                res.data.userEnts.map((item, index) => {
                    console.log(item);
                    that.ents[index] = item;
                })
                // console.log(that.ents);
                // 拼接 改造数据  获取组织架构数据
                that.getCompanys();
            }else if (res.data.code != 0) {
                // resolve(msg); 
                setTimeout(() => {//轮询任务 重新获取接口内容
                    that.getUserOrgs();
                }, 1000)
            }
        }).catch(function (error) {
            console.log(error);
        });
    },
    getCompanys() {
        var that = this;
        var list = [];
        // console.log(that.getLs('ents'));
        var localData = that.getLs('ents') || {};
        // 本地存储中有值
        if (localData.length > 0) {
            return this.getCompanyDataSuccess();
        }
        // console.log(localData);
        var _temp = {};
        for (var i = 0; i < that.ents.length; i++) {
            var _id = that.ents[i].SEntId;
            _temp[_id] = 1;
            var _emps = localData[_id] ? (localData[_id].emps) || [] : [];
            for (var j = 0; j < _emps.length; j++) {
                that.empCache[_emps[j].SUserId] = _emps[j];
            }
            var _services = localData[_id] ? (localData[_id].services) || [] : [];
            for (var j = 0; j < _services.length; j++) {
                _services[j].isService = true;
                _services[j].entId = _id;
                that.serviceCache[_services[j].SUserId] = _services[j];
            }
            var _depts = localData[_id] ? (localData[_id].depts) || [] : [];
            for (var j = 0; j < _depts.length; j++) {
                that.deptCache[_depts[j].SDeptId] = _depts[j];
            }
        }
        for (var p in localData) {
            if (!_temp[p]) {
                delete localData[p];
            }
            if (!localData[p]) {
                continue;
            }
            that.entMap[p] = {
                deptsMap: {},
                empsMap: {},
                empsUserIdMap: {}
            };
            for (var i = 0; i < localData[p].depts.length; i++) {
                that.entMap[p].deptsMap[localData[p].depts[i].SDeptId] = localData[p].depts[i];
            }
            for (var i = 0; i < localData[p].emps.length; i++) {
                var empId = localData[p].emps[i].SEmpId;
                var userId = localData[p].emps[i].SUserId;
                if (!that.entMap[p].empsMap[empId]) {
                    that.entMap[p].empsMap[empId] = [];
                }
                that.entMap[p].empsMap[empId].push(localData[p].emps[i]);
                that.entMap[p].empsUserIdMap[userId] = localData[p].emps[i];
            }
        }
        // that.safeSave(localData);
        for (var i = 0; i < that.ents.length; i++) {
            if (that.ents[i].SStatus.toLowerCase() == 'n') continue;
            var _id = that.ents[i].SEntId;
            var lastUpdateTime = localData[_id] ? localData[_id].lastUpdateTime : '';
            that.params.entId = that.ents[i].SEntId;
            list.push(that.queryCompanyData(_id, lastUpdateTime));
        }

        //  console.log(that.ents);
        // console.group(list);
        //  Promise.all([
        //     that.createEntMap(),
        //     that.getCompanyDataSuccess(),
        //  ])


    },
    async queryCompanyData(id, startDate) {
        let that = this;
        // console.log(this.params);
        // 获取 部门
        var res1 = await this.OngetDepts();
        // 获取 员工
        var res2 = await this.OngetEmps();
        // console.log(res1);
        // console.log(res2);
        // 数据处理
        if (res1.data.code == 0 && res2.data.code == 0) {
            if (res1.data.Data.length || res2.data.Data.length) {
                that.mergeEntsData(id, res1.data.Data, res2.data.Data, res2.data.ServiceData);
            }
        }
        // 创建promise，在promise中调用axios then里使用resolve回调，catch里使用reject回调
        // var p1 = new Promise((resolve, reject) => {
        //     axios.post("/apis/WebChat/getDepts.wn", qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'token': 'TGT-937-UANgZwnFBqgw7dypdc2unpPYefDR7FzcFbYPuJaTboddTmMhJk-oa.sso.woniu.com' } }
        //     ).then(res => {
        //         resolve(res)
        //     }).catch(err => {
        //         reject(err)
        //     })
        // });
        // var p2 = new Promise((resolve, reject) => {
        //     axios.post("/apis/WebChat/getEmps.wn", qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'token': 'TGT-937-UANgZwnFBqgw7dypdc2unpPYefDR7FzcFbYPuJaTboddTmMhJk-oa.sso.woniu.com' } }
        //     ).then(res => {
        //         resolve(res)
        //     }).catch(err => {
        //         reject(err)
        //     })
        // });
        // // 调用Promise.all().then(res=>{})
        // Promise.all([p1, p2]).then(res => {
        //     console.log(res);
        //     var res1 = res[0].data;
        //     var res2 = res[1].data;
        //     if (res1.code == 0 && res2.code == 0) {
        //         if (res1.Data.length || res2.Data.length) {
        //             that.mergeEntsData(id, res1.Data, res2.Data, res2.ServiceData);
        //         }

        //     }
        //     return res;

        // })

    },
    // 获取部门
    async OngetDepts() {
        let that = this;
        return new Promise(function (resolve) {
            axios.post("/apis/WebChat/getDepts.wn", qs.stringify(that.params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'token': that.jjtoken } }
            ).then(res => {
                if (res.data.code == 0) {
                    resolve(res);
                } else {
                    setTimeout(() => {//轮询任务 重新获取接口内容
                        that.OngetDepts();
                    }, 1000)
                }
            }).catch(err => {
                console.log(res);
            })
        })
    },
    // 获取 员工
    async OngetEmps() {
        let that = this;
        return new Promise(function (resolve) {
            axios.post("/apis/WebChat/getEmps.wn", qs.stringify(that.params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'token': that.jjtoken } }
            ).then(res => {
                if (res.data.code == 0) {
                    resolve(res);
                } else {
                    setTimeout(() => {//轮询任务 重新获取接口内容
                        that.OngetEmps()
                    }, 1000)
                }
            }).catch(err => {
                console.log(res);
            })
        })
    },
    mergeEntsData: (function () {
        var mergeing = false, queue = [], localData;
        return function (id, depts, emps, services) {
            var that = this;
            if (mergeing == true) {
                queue.push({
                    id: id,
                    depts: depts,
                    emps: emps
                });
                return;
            }
            mergeing = true;
            if (localData === undefined) {
                localData = that.getLs('ents') || {};
                localData[id] = localData[id] || {};
            }
            // console.log(localData);
            var localEmps = localData[id].emps || [], localDepts = localData[id].depts || [];
            var localServices = localData[id].services || [];
            var delEmps = {}, delDepts = {}, delSerives = {};
            // 过滤离职人员
            for (var i = 0; i < emps.length; i++) {
                if (emps[i].SStatus.toLowerCase() == 'n') {
                    delEmps[emps[i].SEmpId + '_' + emps[i].SDeptId] = emps[i];
                }
            }
            for (var i = localEmps.length - 1; i >= 0; i--) {
                var empId = localEmps[i].SEmpId;
                var deptId = localEmps[i].SDeptId;
                if (delEmps[empId + '_' + deptId]) {
                    localEmps.splice(i, 1);
                }
            }
            var temp = {};
            for (var i = 0; i < localEmps.length; i++) {
                temp[localEmps[i].SEmpId + '_' + localEmps[i].SDeptId] = localEmps[i];
            }
            // 过滤停用服务号
            for (var i = 0; i < services.length; i++) {
                if (services[i].SStatus.toLowerCase() == 'n') {
                    delSerives[services[i].SUserId] = services[i];
                }
            }
            for (var i = localServices.length - 1; i >= 0; i--) {
                var userId = localServices[i].userId;
                if (delSerives[userId]) {
                    localServices.splice(i, 1);
                }
            }
            var tempService = {};
            for (var i = 0; i < localServices.length; i++) {
                tempService[localServices[i].SUserId] = localServices[i];
            }
            // 增加新入职人员；如不是新入职，则修改数据
            for (var j = 0; j < emps.length; j++) {
                var empId = emps[j].SEmpId;
                var deptId = emps[j].SDeptId;
                if (delEmps[empId + '_' + deptId]) continue;
                if (temp[empId + '_' + deptId]) {
                    for (var p in emps[j]) {
                        temp[empId + '_' + deptId][p] = emps[j][p];
                    }
                } else {
                    localEmps.push(emps[j]);
                    // console.log('new emp add ' + emps[j])
                }
            }
            // 增加新建服务号；如不是新建，则修改数据
            for (var j = 0; j < services.length; j++) {
                var userId = services[j].SUserId;
                if (delSerives[userId]) continue;
                if (tempService[userId]) {
                    for (var p in services[j]) {
                        tempService[userId][p] = services[j][p];
                    }
                } else {
                    localServices.push(services[j]);
                }
            }
            // 过滤已注销部门
            for (var i = 0; i < depts.length; i++) {
                if (depts[i].SStatus.toLowerCase() == 'n') {
                    delDepts[depts[i].SUserId] = depts[i];
                }
            }
            for (var i = localDepts.length - 1; i >= 0; i--) {
                var deptId = localDepts[i].SDeptId;
                if (delDepts[deptId]) {
                    localDepts.splice(i, 1);
                }
            }
            var tempDept = {};
            for (var i = 0; i < localDepts.length; i++) {
                tempDept[localDepts[i].SDeptId] = localDepts[i];
            }
            // 增加新添加部门；如不是新添加，则修改数据
            for (var j = 0; j < depts.length; j++) {
                var deptId = depts[j].SDeptId;
                if (delDepts[deptId]) continue;
                if (tempDept[deptId]) {
                    for (var p in depts[j]) {
                        tempDept[deptId][p] = depts[j][p];
                    }
                } else {
                    localDepts.push(depts[j]);
                }
            }
            localData[id].emps = localEmps;
            localData[id].depts = localDepts;
            localData[id].services = localServices;
            for (var i = 0; i < localEmps.length; i++) {
                that.empCache[localEmps[i].SEmpId] = localEmps[i];
            }
            for (var i = 0; i < localDepts.length; i++) {
                that.deptCache[localDepts[i].SDeptId] = localDepts[i];
            }
            mergeing = false;
            // rootScope.$broadcast('entDataReady',id);
            if (queue.length) {
                var _temp = queue.shift();
                that.mergeEntsData(_temp.id, _temp.depts, _temp.emps, _temp.services);
            } else {
                // 存入localStorage
                that.safeSave(localData);
                localData = undefined;
            }
            // 
            that.getCompanyDataSuccess();
        }
    })(),
    safeSave: function (obj) {
        let that = this;
        var entMap = {};
        // console.log(that.ents);
        for (var i = 0; i < that.ents.length; i++) {
            entMap[that.ents[i].SEntId] = that.ents[i];
        }
        var arr = [];
        for (var p in obj) {
            if (entMap[p]) {
                arr.push(obj[p]);
                // obj[p].lastUpdateTime = loginTime;
                obj[p].lastUpdateTime = this.getNow();
                obj[p].name = entMap[p].SEntName;
            }
        }
        arr.sort(function (v1, v2) {
            return v1.emps.length > v2.emps.length ? 1 : -1;
        });
        var res = this.setLs('ents', obj);
        if (!res) {
            arr.pop();
            var _obj = {};
            for (var i = 0; i < arr.length; i++) {
                _obj[arr[i].id] = arr[i];
            }
            this.safeSave(_obj);
        } else {
            // this.createEntMap();
            // console.log(obj);
        }
    },
    // getCompanyDataSuccess(){
    //     // 个人 SUserId f43245bd9824430b973fbf57320bb38b this.ents[0].SUserId
    //     JSON.parse(localStorage.getItem("usermsg"))
    //     var tree=this.getOrganizeTree('f43245bd9824430b973fbf57320bb38b','')
    // },
    getCompanyDataSuccess() {
        // 个人 SUserId f43245bd9824430b973fbf57320bb38b this.ents[0].SUserId
        var msg = this.getLs("usermsg");
        var loginUserId = msg.userId;
        this.getOrganizeTree(loginUserId, '');
        // console.group(tree); 

    },
    getOrganizeTree(currentUser, deptId) {
        let that = this;
        this.deptTree.length = 0;
        console.log(this.getLs('ents'))
        var _ents = this.getLs('ents');
        _ents = _ents || {};
        // console.log(this.ents)
        var _map = {};
        for (var i = 0; i < this.ents.length; i++) {
            _map[this.ents[i].SEntId] = 1;
        }
        for (var p in _ents) {
            if (!_map[p]) continue;
            var depts = _ents[p].depts;
            var emps = _ents[p].emps;
            var deptsMapTemp = {};
            for (var i = 0; i < depts.length; i++) {
                var _deptId = depts[i].SDeptId.toLowerCase();
                var parentId = depts[i].SParentId.toLowerCase();
                deptsMapTemp[_deptId] = depts[i];
                depts[i].SDeptId = _deptId;
                depts[i].SParentId = parentId;
                depts[i].ChildDepts = [];
                depts[i].ChildEmps = [];
                depts[i].showChild = false;
                depts[i].level = 0;
                depts[i].IsEmp = false;
                depts[i].IsDept = true;
                depts[i].entId = p;
            }
            var empsMapTemp = {};
            for (var i = 0; i < emps.length; i++) {
                emps[i].IsEmp = true;
                emps[i].SDeptId = emps[i].SDeptId.toLowerCase();
                var idx = emps[i].SDeptId + '_' + emps[i].SEmpId;
                empsMapTemp[idx] = emps[i];
                emps[i].entId = p;
            }
            for (var i = 0; i < emps.length; i++) {
                var parentId = emps[i].SDeptId;
                if (parentId && parentId != '0') {
                    if (deptsMapTemp[parentId]) {
                        deptsMapTemp[parentId].ChildEmps.push(emps[i]);
                    };
                }
                if (currentUser == emps[i].SUserId) {
                    var mineDept = deptId ? deptsMapTemp[deptId] : deptsMapTemp[emps[i].SDeptId];
                    while (mineDept) {
                        mineDept.showChild = true;
                        mineDept = deptsMapTemp[mineDept.SParentId];
                    }
                }
            }
            for (var _p in deptsMapTemp) {
                var parentId = deptsMapTemp[_p].SParentId;
                if (parentId && parentId != '0') {
                    if (deptsMapTemp[parentId]) {
                        deptsMapTemp[parentId].ChildDepts.push(deptsMapTemp[_p]);
                    }
                } else {
                    this.deptTree.push(deptsMapTemp[_p]);
                    this.deptTreeMap[p] = depts;
                }
            }

            for (var i = 0; i < depts.length; i++) {
                if (depts[i].SParentId != '0') {
                    var parent = deptsMapTemp[depts[i].SParentId];
                    if (parent) {
                        var level = 1;
                        while (parent && parent.SParentId != '0') {
                            level++;
                            parent = deptsMapTemp[parent.SParentId];
                        }
                        depts[i].level = level;
                    }
                } else {
                    depts[i].level = 0;
                    depts[i].showChild = true;
                }
            }
            for (var _p in deptsMapTemp) {
                deptsMapTemp[_p].ChildDepts.sort(function (v1, v2) {
                    if (v1.NOrder == v2.NOrder) {
                        return v1.SDeptName > v2.SDeptName ? 1 : -1;
                    } else {
                        return v1.NOrder > v2.NOrder ? 1 : -1;
                    }
                })
                deptsMapTemp[_p].ChildEmps.sort(function (v1, v2) {
                    if (v1.NOrder == v2.NOrder) {
                        return v1.SEmpName > v2.SEmpName ? 1 : -1;
                    } else {
                        return v1.NOrder > v2.NOrder ? 1 : -1;
                    }
                })
            }
        }
        this.forChildren(this.deptTree);
        console.log(this.deptTree);
        this.fatherthis.treeData = this.deptTree;
        return this.deptTree;
    },
    // 改造树类型 数据
    forChildren(data) {
        let that = this;
        // console.log(data)
        data.forEach(item => {
            if (item.ChildDepts) {
                item.children = item.ChildDepts.concat(item.ChildEmps)
                item.children.forEach(element => {
                    if (element.SDeptName) {
                        element.label = element.SDeptName;
                        element.id = element.SDeptId;
                        element.img = '';
                        element.phone='';
                    } else if (element.SEmpName) {
                        element.label = element.SEmpName;
                        element.phone=element.SPhone;
                        element.id =element.SUserId+'_'+element.SDeptId;
                        element.img = element.SAvatar ? element.SAvatar : require("../assets/images/defaultHeadImage.jpg");
                        // 员工id 等于自己的 禁止选中
                        // if(element.SUserId== that.userid){
                        //     element.disabled =true;
                        // }
                    }
                });
                if (item.SDeptName) {
                    item.label = item.SDeptName;
                    item.id = item.SDeptId;
                    item.img = '';
                    item.phone='';
                } else if (item.SEmpName) {
                    item.label = item.SEmpName;
                    item.phone=item.SPhone;
                    item.id = item.SUserId+'_'+item.SDeptId;
                    item.img = item.SAvatar ? item.SAvatar : require("../assets/images/defaultHeadImage.jpg");
                    // 员工id 等于自己的 禁止选中
                    //   if(item.SUserId== that.userid){
                    //     item.disabled =true;
                    // }
                }
                this.forChildren(item.ChildDepts)
            } else {
                return false
            }
        })
    },
    // createEntMap : function(){
    //     var that = this;
    //     var list = [];
    //     var localData = this.getLs('ents') || {};
    //     var _temp = {};
    //      console.log(that.ents);
    //     for(var i=0;i<that.ents.length;i++){
    //         var _id = that.ents[i].SEntId;
    //         _temp[_id] = 1;
    //         var _emps = localData[_id] ? (localData[_id].emps) || [] : [];
    //         for(var j=0;j<_emps.length;j++){
    //             that.empCache[_emps[j].SUserId] = _emps[j];
    //         }
    //         var _services = localData[_id] ? (localData[_id].services) || [] : [];
    //         for(var j=0;j<_services.length;j++){
    //             _services[j].isService = true;
    //             _services[j].entId =_id;
    //             that.serviceCache[_services[j].SUserId] = _services[j];
    //         }
    //         var _depts = localData[_id] ? (localData[_id].depts) || [] : [];
    //         for(var j=0;j<_depts.length;j++){
    //             that.deptCache[_depts[j].SDeptId] = _depts[j];
    //         }
    //     }
    //     for(var p in localData){
    //         if(!_temp[p]){
    //             delete localData[p];
    //         }
    //         if(!localData[p]){
    //             continue;
    //         }
    //         that.entMap[p] = {
    //             deptsMap : {},
    //             empsMap : {},
    //             empsUserIdMap : {}
    //         };
    //         for(var i=0;i<localData[p].depts.length;i++){
    //             that.entMap[p].deptsMap[localData[p].depts[i].SDeptId] = localData[p].depts[i];
    //         }
    //         for(var i=0;i<localData[p].emps.length;i++){
    //             var empId = localData[p].emps[i].SEmpId;
    //             var userId = localData[p].emps[i].SUserId;
    //             if(!that.entMap[p].empsMap[empId]){
    //                 that.entMap[p].empsMap[empId] = [];
    //             }
    //             that.empCache[userId] = localData[p].emps[i];
    //             that.entMap[p].empsMap[empId].push(localData[p].emps[i]);
    //             that.entMap[p].empsUserIdMap[userId] = localData[p].emps[i];
    //         }
    //     }
    //     console.log(that.entMap);
    //     // that.safeSave(localData);
    // },
}