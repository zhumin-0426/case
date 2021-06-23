var Index = {
    template: '#index-template',
    methods: {
        getRouter: function () {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        },
        jumpGoodsDetail: function () {
            this.$router.push({ name: 'goods', params: { id: 123 } })
            /**
             * 相似的方法：$router.replace 
             * 不同之处：$router.replace方法不会在window.history中添加记录
             * */
            /**
             * 相似的方法：$router.go()
             * 该方法接受一个整数作为参数，和window作用基本相同 
             * */
        }
    },
    watch: {
        $route(to, from) {
            // 对路由变化作出响应...
            console.log(to, form)
        }
    }
}