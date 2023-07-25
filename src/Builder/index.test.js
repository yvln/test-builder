import React from 'react';
import Builder from './index.jsx'; 
import { documentWithOneButton } from './utils/mockDocument.js'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { default as userEvent } from '@testing-library/user-event';

const mockButton = {
    label: 'Button',
    id: '4b1debfd-3dfd-2bad-9edf-5b0d7b3dcbfd',
    attributes: {
        buttonBackgroundColor: '#06D6A0',
        buttonColor: '#ffffff',
        buttonFontSize: 16,
        buttonRadius: 4,
        horizontalAlign: 'center',
    },
    content: "Click me!",
    type: 'single',
}

describe('Builder', () => {
  test('renders the initial document', () => {
    render(<Builder document={documentWithOneButton([mockButton])} />);
    expect(screen.getByText(mockButton.content)).toBeInTheDocument();
  });

  test('removes item when user deletes the item', async() => {
    render(<Builder document={documentWithOneButton([mockButton])} />);
    // click needed to open the panel
    const buttonInDocument = screen.getByTestId(mockButton.id);
    userEvent.click(buttonInDocument);

    const deleteItemButton = await screen.findByText('Delete');
    userEvent.click(deleteItemButton);

    await waitForElementToBeRemoved(() => screen.queryByText((mockButton.content)));
    expect(screen.queryByText(mockButton.content)).toBeNull();
  });
});
