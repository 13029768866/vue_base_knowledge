new Vue({
    el: '#app',
    data: {
        isBurst: false,
        process: 100
    },
    methods: {
        handleClickTrack() {
            this.process -= 20;
            if (this.process <= 0) {
                this.isBurst = true
            }
        },
        handleClickReset() {
            this.process = 100;
            this.isBurst = false;
        }
    },
    computed: {

    }
})