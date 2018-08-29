new Vue({
    el: '#notebook',
    data () {
        return {
            notes: JSON.parse(localStorage.getItem('notes')) || [],
            selectedId: localStorage.getItem('selected-id') || null,
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
        },
        sortedNotes () {
            return this.notes.slice()
            .sort((a, b) => a.created - b.created)
            .sort((a, b) => (a.favorite === b.favorite) ? 0
                : a.favorite ? -1
                : 1
            )
        },
        linesCount () {
            if (this.selectedNote) {
                // number of new lines
                return this.selectedNote.content.split(/\r\n|\r|\n/).length            }
        },
        wordsCount () {
            var s = this.selectedNote.content
            // turns \n in %20
            s = s.replace(/\n/g, ' ')
            // removes start and ending \n
            s = s.replace(/(^\s*)|(\s*$)/gi, '')
            // turn duplicated %20 into 1
            s = s.replace(/\s\s+/gi, ' ')
            // finally returns number of spaces
            return s.split(' ').length
        },
        charactersCount () {
            if (this.selectedNote) {
                return this.selectedNote.content.split('').length
            }
        }
    },
    // watch for changes
    watch: {
        notes: {
            handler: 'saveNotes',
            // need this to track changes in objects inside the array
            deep: true,
        },
        selectedId (val) {
            localStorage.setItem('selected-id', val)
        }
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
        saveNotes () {
            localStorage.setItem('notes', JSON.stringify(this.notes))
            console.log('Notes saved!', new Date())
        },
        deleteNote () {
            if (this.selectedNote && confirm('delete note?')) {
                const index = this.notes.indexOf(this.selectedNote)
                if (index !== -1) {
                    this.notes.splice(index, 1)
                }
            }
        },
        favoriteNote () {
            // this.selectedNote.favorite = !this.selectedNote.favorite
            // ^ == XOR
            // this.selectedNote.favorite = this.selectedNote.favorite ^ true
            this.selectedNote.favorite ^= true
        }
    }
})

Vue.filter('date', time => moment(time)
    .format('DD/MM/YY, HH:mm'))
