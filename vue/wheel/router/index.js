var routes = [
    // { path: '/', redirect: '/login', alias: "/a" },//从定向以及别名
    {
        path: '/',
        component: Login,
        meta: { requiresAuth: true }
    },
    { path: '/index/', component: Index },
    {
        path: '/user/:id',
        component: User,
        children: [
            {
                path: 'profile/:id',
                component: Profile,
                props: true,
                // beforeEnter: (to, from, next) => {
                //     console.log('to:', to);
                //     console.log('from:', from);
                //     if (to.path === '/user/1/profile/1') {
                //         next({ path: '/' })
                //     }
                // }
                /**
                 * 设置props为true，这样可以将参数以属性的形式传递给组件
                 * 当props为一个对象时，参数会按原样传递给组件
                 * props也可以是一个函数 可以利用该函数将参数转变为不同的类型
                */
            }
        ],
    },
    {
        path: '/goods',
        name: "goods",
        component: Goods
    },
    // 通配符路由
    { path: '*', component: Error404 }
]
var router = new VueRouter({
    routes,
    scrollBehavior(to,from,savedPosition){
        console.log('savedPosition',savedPosition)
    }
})
/**
 * 全局前置守卫(当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，
 * 此时导航在所有守卫 resolve 完之前一直处于 等待中)
 * to:即将进入的路由对象
 * form:当前导航正要离开的路由
 * next:一定要用该方法来调用resolve钩子函数
 * */
router.beforeEach(function (to, form, next) {
    next()
})