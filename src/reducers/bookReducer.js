import { ADD_BOOK, SHOW_BOOK } from "./../actions/bookAction";
export let iniState = [
  {
    name: "",
    count: 10,
    year: "",
    isbn: "",
    author: "",
    imagerurl: "",
    description: ""
  }
];
export default (state, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return [...state.concat([action.payload])];
    case SHOW_BOOK:
      return [...action.payload];
    default:
      return state;
  }
};
