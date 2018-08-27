new Vue({
    el: '#notebook',
    data () {
        return {
            content: localStorage.getItem('content') || 'you can write in **markdown**',
            notes: []
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
        addNote () {
            const time = Date.now()
            // default new note
            const note = {
                id: String(time),
                title: 'New note ' + (this.notes.length + 1),
                content: '**Hi!** This notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting.',
                created: time,
                favorite: false,
            }
            this.notes.push(note)
        },
    }
})

console.log('restored note:', localStorage.getItem('content'))
