import React from 'react';
import { shallow } from 'enzyme';
import Letter from '../Letter';
import { LETTER_STATUS_CORRECT, LETTER_STATUS_INCORRECT } from '../../../../../consts';

//1 method mount- mounts the whole tree of components
//2 shallow- do shallow render
// jest.fn() - creates anonymous function which always returns true

describe('<Letter />', () => {
    describe('Matches snapshot', () => {
        it('letter is neither correct nor incorrect', () => {
            const component = shallow(
                <Letter 
                    letter="D"
                    gameID={0}
                    onLetterClick={jest.fn()} 
                />
            );
            expect(component).toMatchSnapshot();
        });
        
        it('letter is correct', async () => {
            const component = shallow(
                <Letter 
                    letter="D"
                    gameID={0}
                    onLetterClick={jest.fn()} 
                />
            );
            await component.setState({ letterStatus: LETTER_STATUS_CORRECT });
            expect(component).toMatchSnapshot();
        });

        it('letter is incorrect', async () => {
            const component = shallow(
                <Letter 
                    letter="D"
                    gameID={0}
                    onLetterClick={jest.fn()} 
                />
            );
            await component.setState({ letterStatus: LETTER_STATUS_INCORRECT });
            expect(component).toMatchSnapshot();
        });

    })

})