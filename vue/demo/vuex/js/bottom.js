var ProductBottom = {
    template: "#bottom-template",
    computed:{
        fruits:function(){
            return this.$store.getters.filtersFruits
        }
    },
    methods: {
        reducePrice:function(){
            this.$store.dispatch('reducePrict',{num:2})
        }
    },
}