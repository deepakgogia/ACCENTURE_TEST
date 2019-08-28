export const ADD_BOOK = "ADD_BOOK";
export const SHOW_BOOK = "SHOW_BOOK";

function getAllData() {
  return fetch("/JsonData/BookDetails.json", { method: "GET" })
    .then(out => out.json())
    .then(out => {
      return out;
    });
}

export const getApiData = () => dispatch =>
  getAllData().then(out =>
    dispatch({
      type: SHOW_BOOK,
      payload: out
    })
  );

export const addTempBook = data => ({
  type: ADD_BOOK,
  payload: data
});
