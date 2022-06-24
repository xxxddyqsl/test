var Main = {
    // props:{//这里是组件可以接受的参数，也就是相当于面向原型写组件时的配置参数，用户可以传递不同参数，自己定义组件
    // list:{//列表内容
    //     type:Array,
    //     default:[]
    // }
    // },
    template: `
    <div class="modal">
        测试main{{tableItem}}
        <button  @click="golog" >返回</button>
    </div>
    `,
    components: {
        // 跳转传入的参数
        tableItem: {}
      },
    data() {
        return {
            
        }
    },
    created() {
        // 初始化
        this.init();

    },
    methods: {
        init() {
            // console.log(this.$route.query.constraints);
            // console.log(JSON.parse(this.$route.query.constraints));
            // 接收 log 跳转 传入的 constraints 值
            this.tableItem = JSON.parse(this.$route.query.constraints);
            console.log(this.tableItem);
        },
        // 返回
        golog() {
            this.$router.go(-1);
        }
    },
    // 销毁前状态
    beforeDestroy() {
        // console.group("beforeDestroy 销毁前状态 LogDetails===============》");
    },
    destroyed() {
        // console.group("destroyed 销毁完成状态 LogDetails===============》");
    }
}