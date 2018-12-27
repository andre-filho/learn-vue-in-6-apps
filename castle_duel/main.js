new Vue({
    name: 'game',
    el: '#app',
    template: `
        <div id="#app">
            <top-bar
                :turn="turn"
                :players="players"
                :current-player-index="currentPlayerIndex"/>
            <transition name="fade">
                <hand :cards="testHand"
                    v-if="!activeOverlay"/>
            </transition>
        </div>
                `,
    data: state,
    mouted () {
        console.log(this.$data === state)
    },
    created () {
        this.testHand = this.createTestHand()
    },
    computed: {},
    methods: {
        createTestHand () {
            const cards = []
            const ids = Object.keys(cards)
            for (let i = 0; i < 5; i++) {
                cards.push(this.testDrawCard())
            }
            return cards
        },
        testDrawCard () {
            const ids = Object.keys(cards)
            const randomId = ids[Math.floor(Math.random() * ids.length)]
            return {
                uid: cardUid++,
                id: randomId,
                def: cards[randomId],
            }
        },
    },
})

window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})
