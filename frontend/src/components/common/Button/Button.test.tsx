import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with label', () => {
    const onClickMock = jest.fn();
    const label = 'Click me';

    render(<Button label={label} variant="default" onClick={onClickMock} />);

    const buttonElement = screen.getByText(label);
    expect(buttonElement).toBeInTheDocument();

    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalled();
  });

});

// 'Jest' is the tool that will automatically find and run tests.
// Use the command 'npm test' for Jest to find and execute all .test.tsx files