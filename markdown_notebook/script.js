new Vue({
    el: '#notebook',
    data () {
        return {
            notes: [],
            selectedId: null
        }
    },
    // pre-computed properties or those that need logic behind them
    computed: {
        notePreview () {
            return this.selectedNote ? marked(this.selectedNote.content) : ''
        },
        selectedNote () {
            // return matching note with selectedId
            return this.notes.find(note => note.id === this.selectedId) 
            // if (this.selectedId != null) {
            //     return this.notes.find(note => note.id === this.selectedId) 
            // }
            // else {
            //     return {
            //         content: ''
            //     }   
            // }
        },
    },
    // watch for changes
    watch: {
    },
    // general functions
    methods: {
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
        selectNote (note) {
            this.selectedId = note.id
        },
    }
})

console.log('restored note:', localStorage.getItem('content'))
