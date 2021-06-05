/**
 * 由于使用的是单一状态树，当数据非常庞大时，这时的store会显得非常臃肿
 * 这个时候我们采用代码分割
*/
// var module = {
//     state: () => ({ ... }),
//     mutations: { ... },根节点状态在低三个参数
//     actions: { ... }, 根节点状态在context.rootState
//     getters: { ... }根节点状态在低三个参数
// }
/**
 * vuex插件
 * 注意：
 * 1.不能在插件中直接改变状态 只能通过mutatins提交
 * */
const myPlugin = store => {
    // 当 store 初始化后调用
    store.subscribe((mutation, state) => {
        console.log('plugins', mutation)
        console.log('plugins', state)
        // 每次 mutation 之后调用
        // mutation 的格式为 { type, payload }
    })
}
var store = new Vuex.Store({
    // strict: process.env.NODE_EVN !== 'production' ? true : false,
    // modules:{a:module},
    plugins: [myPlugin],
    state: {
        fruits: [
            { name: "apple", price: "10" },
            { name: "banana", price: "20" },
            { name: "watermelon", price: "30" },
            { name: "pineapple", price: "40" },
        ],
    },
    getters: {
        filtersFruits: function (state) {//getters也可作为第二个参数
            return state.fruits.map(function (fruit) {
                return {
                    name: "**" + fruit.name + "**",
                    price: "$" + fruit.price
                }
            })
        }
    },
    mutations: {
        reducePrict: function (state, nums) {
            state.fruits.forEach(item => {
                item.price -= nums.num
            })
        }
    },
    /**
     * actions类似于mutations
     * 不同点：
     * actions提交的是mutatios
     * actions可以包含任意异步操作
     * */
    actions: {
        reducePrict: function ({ commit }, nums) {
            setTimeout(function () {
                // commit('reducePrict',nums)
                console.log('a')
            }, 1000)
        }
    }
})