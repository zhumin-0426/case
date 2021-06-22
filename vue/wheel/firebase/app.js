var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

new Vue({
    el: "#demo",
    data: {
        newUser: {
            name: "Mrzhu",
            email: "18820854754@139.com"
        }
    },
    computed: {
        validation: function () {
            return {
                name: !!this.newUser.name.trim(),
                email: emailRE.test(this.newUser.email)
            }
        },
        isValid: function () {
            var validation = this.validation
            return Object.keys(validation).every(function (key) {
                return validation[key]
            })
        }
    },
    methods: {
        addUser: function () {
            if (this.isValid) {
                this.newUser.name = ''
                this.newUser.email = ''
            }
        }
    },
})