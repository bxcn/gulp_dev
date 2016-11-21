const addNote = ({ dispatch }) => {
  dispatch('ADD_NOTE');
};

const editNote = ({ dispatch }, e) => {
  dispatch('EDIT_NOTE', e.target.value);
};

const deleteNote = ({ dispatch }) => {
  dispatch('DELETE_NOTE');
};

const updateActiveNote = ({ dispatch }, note) => {
  dispatch('SET_ACTIVE_NOTE', note);
};

const toggleFavorite = ({ dispatch }) => {
  dispatch('TOGGLE_FAVORITE');
};
