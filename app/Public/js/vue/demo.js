const Home = {
  template: `<div class="red">Home {{$route.params.id}}</div>`
}

const Company = {
  template: '<div class="blue">Company {{$route.params.id}}</div>'
}

const routes = [
  {component: Home, path: "/Home/:id"},
  {component: Company, path: "/Company/:id"}
];

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
});

const app = new Vue({
  data () {
    return {
      count: 0
    }
  },
  router
}).$mount('#app');


const mapState = Vuex.mapState;

const store = new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    doneTodos: state => {
      return state.count;
    }
  },
  mutations: {
    increment ( state ) {
      state.count++;
    }
  },
  actions: {
    increment ( state ) {
      state.commit('increment');
    }
  }
});

const Counter = {

  template:`<div class="asd">{{counts}}</div>`,
  computed: mapState({
    counts: state => state.count
  })
};


new Vue({
  store,
  template:`<div>
    <Counter>asdfasdf</Counter>
  </div>`,
  components:{Counter}
}).$mount('#storeApp');




















































/*// 现在，应用已经启动了！
const mapState = Vuex.mapState;

const ToolbarStore = new Vuex.Store({
  getters: {
    activeNote: state => state.activeNote
  },
  actions: {
    addNote,
    deleteNote,
    toggleFavorite
  }
});


const Toolbar = {
  ToolbarStore,
  template: `
      <div id="toolbar">
        <div>123</div>
        <i @click="addNote" class="glyphicon glyphicon-plus"></i>
        <i @click="toggleFavorite"
          class="glyphicon glyphicon-star"
          :class="{starred: activeNote.favorite}"></i>
        <i @click="deleteNote" class="glyphicon glyphicon-remove"></i>
      </div>
  `,
  computed: {}
}

const NotesListStore = new Vuex.Store({
  getters: {
      notes: state => state.notes,
      activeNote: state => state.activeNote
    },
    actions: {
      updateActiveNote
    }
});

const NotesList = {
  data () {
    return {
      show: 'all'
    }
  },
  NotesListStore,
  computed: {
    filteredNotes () {
      if (this.show === 'all'){
        return this.notes
      } else if (this.show === 'favorites') {
        return this.notes.filter(note => note.favorite)
      }
    }
  },
  template: `
      <div id="notes-list">
        <div id="list-header">
          <h2>Notes | coligo</h2>
          <div class="btn-group btn-group-justified" role="group">
            <!-- All Notes button -->
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-default"
                @click="show = 'all'"
                :class="{active: show === 'all'}">
                All Notes
              </button>
            </div>
            <!-- Favorites Button -->
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-default"
                @click="show = 'favorites'"
                :class="{active: show === 'favorites'}">
                Favorites
              </button>
            </div>
          </div>
        </div>
        <!-- render notes in a list -->
        <div class="container">
          <div class="list-group">
            <a v-for="note in filteredNotes"
              class="list-group-item" href="#"
              :class="{active: activeNote === note}"
              @click="updateActiveNote(note)">
              <h4 class="list-group-item-heading">
                {{note.text.trim().substring(0, 30)}}
              </h4>
            </a>
          </div>
        </div>
      </div>
  `,
  computed: mapState({
  })
};

const Editor = {
  template: `
      <div id="note-editor">
        <textarea
          :value="activeNoteText"
          @input="editNote"
          class="form-control">
        </textarea>
      </div>
  `,
  computed:{}
}


const vue = new Vue({
  store, // inject store to all children
  el: '#app',
  components: {
    Toolbar,
    NotesList,
    Editor
  },
  template: `
      <div id="app">
        <toolbar></toolbar>
        <notes-list></notes-list>
        <editor></editor>
      </div>
  `
})*/
