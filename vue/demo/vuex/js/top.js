var ProductTop = {
    template: "#top-template",
    computed: {//vuex.mapState vuex.Getter vuex.Mutations vuex.mapActions 辅助函数
        fruits: function () {
            return this.$store.getters.filtersFruits
        }
    },
    methods: {
        reducePrice:function(){
            this.$store.commit('reducePrict',{num:1})
        }
    },
}