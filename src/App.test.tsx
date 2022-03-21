import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import App from './App';

test('renders screen', () => {
  render(<App />);
  const linkElement = screen.getByText('Frequent Flyer Club');
  expect(linkElement).toBeInTheDocument();
});

test('enters data in fields', async () => {
  act(() => {
  render(<App />);
  });
  const firstName = screen.getByLabelText('First Name');
  const lastName = screen.getByLabelText('Last Name');
  const submit = screen.getByText(/save/i);

  fireEvent.change(firstName, { target: { value: 'John' } });
  fireEvent.change(lastName, { target: { value: 'Appleseed' } });

  expect(firstName.value).toBe('John');
  expect(lastName.value).toBe('Appleseed');

   fireEvent.click(submit, new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }));

  // await waitFor(() => expect(screen.getByText(/Your Member Id:/i).textContent).toBe('Your Member Id: 0'));
  let id = -1;
  await waitFor(() => {
    id = parseInt(screen.getByTestId('id').textContent);
  })
  expect(id).toBeGreaterThan(-1);
})
