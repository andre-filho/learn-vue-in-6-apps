new Vue({
    name: 'game',
    el: '#app',
    template: `
        <div id="#app">
            <top-bar/>
        </div>
    `,
    data: state,
    mouted () {
        console.log(this.$data === state)
    }
})

window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})
