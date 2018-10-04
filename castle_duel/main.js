new Vue({
    name: 'game',
    el: '#app',
    template: `
        <div id="#app">
            <top-bar
                :turn="turn"
                :players="players"
                :current-player-index="currentPlayerIndex"/>
            <hand
                :cards="testHand"/>
        </div>
    `,
    data: state,
    mouted () {
        console.log(this.$data === state)
    },
    computed: {
        testCard () {
            return cards.archers
        },
    },
    methods: {
        handlePlay () {
            console.log('you played a card')
        },
    },
})

window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})
