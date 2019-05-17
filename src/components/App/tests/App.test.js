import React from 'react';
import ReactDOM from 'react-dom';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { App } from '../App';

// 1 method mount- mounts the whole tree of components
// 2 shallow- do shallow render
// jest.fn() - creates anonymous function which always returns true

const initialState = {
    gameID: 0,
    category: '',
    encodedPhrase: '',
    failsCounter: 0,
    endState: null,
    letterStatus: {},
};
const mockStore = configureStore();
let component;
let store;

beforeEach(() => {
    store = mockStore(initialState);
    component = shallow(<App store={store} />);
});


describe('<App /> rendering', () => {
    it('renders the component', () => {
        expect(toJson(component)).toMatchSnapshot();
    });
});

/* 
describe('<App /> rendering', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });

    it('fetches data correctly', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('<Add /> lifecycle method invocations', () => {
    it('should change the state componentState componentDidMount method is invoked', () => {
        expect(component.state('componentState')).toEqual('mounted');
    });

    it('should call fetchPhrase during componentDidMount', () => {
        const fetchPhraseFake = jest.spyOn(App.prototype, 'fetchPhrase');
        expect(fetchPhraseFake).toHaveBeenCalledTimes(1);
    });

    it('should call setGameState during componentDidMount', () => {
        const setGameStateFake = jest.spyOn(App.prototype, 'setGameState');
        expect(setGameStateFake).toHaveBeenCalledTimes(1);
    });
});
 */