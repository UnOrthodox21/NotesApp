export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};


const state =  {
    notes: [
      {
        title: 'Say hi', 
        content: 'Hey you', 
        user_id: 2, 
        is_public: 0,
      },
      {
      title: 'Make food', 
      content: 'You have to wash the dishes', 
      user_id: 2, 
      is_public: 0,
      },
      {
      title: 'Clean the room', 
      content: 'You have to clean the room', 
      user_id: 2, 
      is_public: 0,
      },
    ],
  };

  
const getters = {


// Notes Getters
  retrieveNotes(state) {
    return state.notes;
  },


  };



const mutations = {



// Notes Mutations


  };



 const actions =  {


// Note Actions




  };

