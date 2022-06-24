var FRAMEID = 'vidioMeeting';
/* 创建组件构造器  */
var Login = {
    props: {//这里是组件可以接受的参数，也就是相当于面向原型写组件时的配置参数，用户可以传递不同参数，自己定义组件
        cardTitle: {//卡片标题
            type: String,
            default: '测试demo'
        },
        list: {//列表内容
            type: Array,
            default: []
        }
    },
    template: `
        <div class="modal">
            <div class="modal-header">
                <h4>{{cardTitle}}</h4>
            </div>
            <div class="modal-content">
                <div>
                    账号：<input class="" type="text" value=""  />
                    密码：<input class="" type="text" value=""  />
                </div>
            </div>
            <div class="modal-footer">
                <input class="btn blue" type="button" value="登录" @click="okHandle" />
                
            </div>
        </div>
    `,
    methods: {//这里定义的组件的方法，利用$emit()进行父子组件通信，子组件通过点击事件告诉父组件触发一个自定义事件，$emit()方法第二个参数也可以用来传递数据
        okHandle() {
            let row = [{ id: 'a', Text: '测试传递参数' }]
            // this.$emit("ok");
            // this.$router.push({ name: 'main', });
            //   编程式导航-params传递参数-JS代码内部跳转 + 传递参数
            console.log(row);
            this.$router.push({
                path: "/main",
                query: {
                    constraints: JSON.stringify(row),
                }
            });
        },
        cancelHandle() {
            this.$emit('cancel')
        }
    }
}