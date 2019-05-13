import { createStore } from 'redux';
import reducer from './reducers';

const store = createStore(
    reducer, window.__REDUX_DEVTOOLS_EXTENSION__ // eslint-disable-line no-underscore-dangle, no-undef
    && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line no-underscore-dangle, no-undef
);
export default store;
