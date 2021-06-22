var Login = {
    template: "#login-template",
    data: function () {
        return {
            account: "18820854754",
            password: "admin"
        }
    },
    computed: {
        validation: function () {
            return {
                name: this.account === "18820854754" ? true : false,
                password: this.password === 'admin' ? true : false
            }
        },
        isValid: function () {
            var validation = this.validation
            return Object.keys(validation).every(function (key) {
                return validation[key]
            })
        }
    },
    created() {
        console.log('route',this.$route)
    },
    methods: {
        userLogin: function () {
            if (this.isValid) {
                alert('登入成功！');
                localStorage.setItem('id', 1)
            }
        }
    },
};