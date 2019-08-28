import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import AppRoute from "./Routing/routes";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import appReducers from './reducers/bookReducer';

const App = () => {
  return (
    <>
      <AppRoute />
    </>
  );
};

export default App;

const store = createStore(appReducers, applyMiddleware(thunk));
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

