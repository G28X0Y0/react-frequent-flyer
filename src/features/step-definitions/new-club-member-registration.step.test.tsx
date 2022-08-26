import '@testing-library/jest-dom';
import { defineFeature, loadFeature } from 'jest-cucumber';

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';


const feature = loadFeature('./src/features/new-club-member-registration.feature');

defineFeature(feature, test => {
  test('New members should start out as BRONZE members', ({ given, when, then }) => {
    let id = -1;

    given('user is not a Frequent Flyer member', () => {
      render(<App />);
      const linkElement = screen.getByText('Frequent Flyer Club');
      expect(linkElement).toBeInTheDocument();
    })

    when('user registers on the Frequent Flyer program', async () => {
      const firstName = screen.getByLabelText('First Name');
      const lastName = screen.getByLabelText('Last Name');
      const submit = screen.getByText(/save/i);


      fireEvent.change(firstName, { target: { value: 'John' } });
      fireEvent.change(lastName, { target: { value: 'Appleseed' } });

      fireEvent.change(firstName, {target: { value: 'Mark'}});
      fireEvent.change(lastName, {target: {value: 'Sorensen'}})

      // @ts-ignore
      expect(firstName.value).toBe('John');
      // @ts-ignore
      expect(lastName.value).toBe('Appleseed');


      fireEvent.click(submit, new MouseEvent('click') );

      await waitFor(() => expect(screen.getByText(/Your Member Id is/i).textContent).toBe('Your Member Id is : 0'));
      id = parseInt(''+ screen.getByTestId('id').textContent);
      expect(id).toBeGreaterThan(-1);
    });

    then('user should have a status of BRONZE', async () => {
      const status = screen.getByTestId('status');
      expect(status.textContent).toBe('Bronze');
    });

  })
});
