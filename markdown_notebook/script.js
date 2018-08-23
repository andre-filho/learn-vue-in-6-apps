new Vue({
    el: '#notebook',
    data() {
        return {
            content: 'this is a note',
        }
    },
    computed: {
        notePreview () {
            return marked(this.content)
        }
    },
    watch: {
        content: { 
            handler: 'saveNote',
        },
    },
    methods: {
        saveNote () {
            console.log('saving note:', this.content)
            localStorage.setItem('content', this.content)
            this.reportOperation('saving')
        },
        reportOperation (opName) {
            console.log('the', opName, 'opertation was completed')
        },
        catchNoteIfExists () {
            if (localStorage.getItem('content')) {
                this.content = localStorage.getItem('content')
            }
        },
    },
    mount () {
        this.catchNoteIfExists()
    }
})

console.log('restored note:', localStorage.getItem('content'))
