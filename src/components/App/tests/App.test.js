import React from 'react';
import toJson from 'enzyme-to-json';
import { create } from 'react-test-renderer';
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
let props;

beforeEach(() => {
    props = {
        setGameState: jest.fn(),
    };
    store = mockStore(initialState);
    component = shallow(<App {...props} />);
    console.log('debug', component.debug());
});

describe('<App /> rendering', () => {
    it('renders the component', () => {
        expect(toJson(component)).toMatchSnapshot();
    });
});

describe('<Add /> lifecycle method invocations', () => {
    /* it('should change the state componentState componentDidMount method is invoked', () => {
        expect(component.state('componentState')).toEqual('mounted');
    }); */

    /*
    1#
        const spy = jest.spyOn(Component.prototype, 'methodName');
        const wrapper = mount(<Component {...props} />);
        wrapper.instance().methodName();
        expect(spy).toHaveBeenCalled();
    2#
        it("shows a list of users", async () => {
            const component = create(<Users />);
            const instance = component.getInstance();
            await instance.componentDidMount();
            console.log(instance.state) // << HERE IS THE SNITCH!
        });
    */
    it('should call fetchPhrase during componentDidMount', async () => {
        const fetchPhrase = jest.fn();
        const instance = component.instance();
        const spyCDM = jest.spyOn(instance, 'componentDidMount');
        const fetchPhraseMock = jest.spyOn(instance, 'fetchPhrase');
        await instance.componentDidMount();
        expect(instance.componentDidMount).toHaveBeenCalledTimes(1);
        expect(instance.fetchPhrase).toHaveBeenCalledTimes(1);
    });

    it('should call setGameState during componentDidMount', () => {
        const setGameStateFake = jest.spyOn(App.prototype, 'setGameState');
        expect(setGameStateFake).toHaveBeenCalledTimes(1);
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
*/
