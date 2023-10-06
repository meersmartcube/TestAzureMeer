import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

store.subscribe(()=>{
  //console.log(store.getState())
});

ReactDOM.render(
  <Provider store={store}>
    <App isAuthorized={store.getState().auth.isSignedIn}/>
  </Provider>,
  document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
