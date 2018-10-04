Vue.component('top-bar', {
    template: `
    <div
        class="top-bar"
        :class="'player-' + currentPlayerIndex">
        <div class="player p0">
            {{ players[0].name }}
        </div>
        <div class="turn-counter">
            <img
                src="svg/turn.svg"
                class="arrow"/>
            <div class="turn">
                Turn {{ turn }}
            </div>
        </div>
        <div class="player p1">
            {{ players[1].name }}
        </div>
    </div>
    `,
    props: [
        'players',
        'currentPlayerIndex',
        'turn',
    ],
    created () {
        console.log(this.players)
    },
})

Vue.component('card', {
    template: `
        <div
            class="card"
            :class="'type-' + def.type"
            @click="play">
            <div class="title">
                {{ def.title }}
            </div>
            <img class="separator" src="svg/card-separator.svg"/>
            <div
                class="description">
                <div v-html="def.description"></div>
            </div>
            <div
                class="note"
                v-if="def.note">
                <div v-html="def.note"></div>
            </div>
        </div>
    `,
    props: [
        'id',
        'def'
    ],
    methods: {
        play () {
            this.$emit('play')
        },
    },
})

Vue.component('hand', {
    template: `
        <div class="hand">
            <div class="wrapper">
                <card
                    v-for="card of cards"
                    :def="card.def" />
            </div>
        </div>
    `,
    props: ['cards'],
    methods: {
        createTestHand () {
            const cards = []
            // Get the possible ids
            const ids = Object.keys(cards)
            // Draw 5 cards
            for (let i = 0; i < 5; i++) {
                cards.push(testDrawCard())
            }
            return cards
        },
        testDrawCard () {
            // Choose a card at random with the ids
            const ids = Object.keys(cards)
            const randomId = ids[Math.floor(Math.random() * ids.length)]
            // Return a new card with this definition
            return {
                // Unique id for the card
                uid: cardUid++,
                // Id of the definition
                id: randomId,
                // Definition object
                def: cards[randomId],
            }
        },
    },
    created () {
        this.testHand = this.createTestHand()
    },
})
