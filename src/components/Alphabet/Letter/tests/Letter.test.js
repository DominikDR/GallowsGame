import React from 'react';
import { shallow } from 'enzyme';
import Letter from '../Letter';

//1 method mount- mounts the whole tree of components
//2 shallow- do shallow render
test('Letter changes after click', () => {
// Render a checkbox with label in the document
    const component = shallow(
        <Letter 
            letter={letter}
            gameID={gameID}
            failsCounter={failsCounter}
            onLetterClick={onLetterClick} 
        />
    );
    console.log("debug", component.debug)
    expect(true).toEqual(false);
});