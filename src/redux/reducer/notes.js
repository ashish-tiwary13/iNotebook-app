const initialState = [];

const notesStore = (state = initialState, action) => {
    switch (action.type) {
        case "GETNOTES":
        return state=action.payload;
        case "ADDNOTE":
        return state=action.payload;
        case "DELETENOTE":
        return state=action.payload;
        case "EDITNOTE":
        return state=action.payload;
        default:
        return state;
    }
};

export default notesStore;