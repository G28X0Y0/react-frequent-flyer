import '@testing-library/jest-dom';
import { defineFeature, loadFeature } from 'jest-cucumber';

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';

const feature = loadFeature('./src/features/states-calculated-based-on-points.feature');

defineFeature(feature, test => {
  beforeEach(() => {
    render(<App />);
  });
  test('Upgrade status based on points', ( { given, when, then, and } ) => {

    given(/^Club Member is a (.*) FrequentFlyer member$/, async (statusArg) => {
      const homeMenuOption = screen.getByText('Home');
      fireEvent.click(homeMenuOption);
      await waitFor(() => {
        expect(screen.getByText('Create New Member')).toBeInTheDocument()
      });

      // // console.log('executing given');
      const linkElement = screen.getByText('Frequent Flyer Club');
      expect(linkElement).toBeInTheDocument();

      // const homeMenuOption = screen.getByText('Home');

      const firstName = screen.getByLabelText('First Name');
      const lastName = screen.getByLabelText('Last Name');
      const submit = screen.getByText(/save/i);


      fireEvent.change(firstName, { target: { value: 'John' } });
      fireEvent.change(lastName, { target: { value: 'Appleseed' } });

      // @ts-ignore
      expect(firstName.value).toBe('John');
      // @ts-ignore
      expect(lastName.value).toBe('Appleseed');

      //
      // Create new member
      //
      //
      fireEvent.click(submit, new MouseEvent('click') );

      await waitFor(() => parseInt(''+ screen.getByTestId('id')));
      await waitFor(() => screen.getByTestId('status'));

      let id = await parseInt(''+ screen.getByTestId('id').textContent);
      const statusLabel = screen.getByTestId('status');

      expect(id).toBeGreaterThan(-1);
      expect(statusLabel.textContent).toBe('Bronze');

      //
      //
      // Change member status by going to Edit screen
      //
      //
      const editMenuOption = screen.getByText('Edit');
      fireEvent.click(editMenuOption);
      await waitFor(() => {
        expect(screen.getByText('Edit New Member')).toBeInTheDocument()
      });

      // Change points value
      const statusField = screen.getByLabelText('Status');
      await waitFor(() => {
        fireEvent.change(statusField, {target: {value: statusArg}});
      });

      // Save changes
      fireEvent.click(submit, new MouseEvent('click') );

      // Make sure data was saved
      await waitFor(() => parseInt(''+ screen.getByTestId('id').textContent));
      id = await parseInt(''+ screen.getByTestId('id').textContent);
      expect(id).toBeGreaterThan(-1);

      await waitFor(() => screen.getByTestId('status'));
      const endingStatus = screen.getByTestId('status').textContent;
      // expect(endingStatus).toBe(statusArg);
    });

    and(/^Club Member has (.*) status points$/, async (pointsArg) => {
      // console.log('executing and');
      // Grab fields
      const points = screen.getByLabelText('Points');
      const submit = screen.getByText(/save/i);

      // Change points value
      fireEvent.change(points, { target: { value: pointsArg } });

      // Save changes
      fireEvent.click(submit, new MouseEvent('click') );

      // Make sure data was saved
      await waitFor(() => parseInt(''+ screen.getByTestId('id').textContent));
      const id = await parseInt(''+ screen.getByTestId('id').textContent);
      expect(id).toBeGreaterThan(-1);
    });

    when(/^Club Member earns (.*) extra status points$/, async (pointsArg) => {
      // console.log('executing when');
      // Change points
      const points = screen.getByLabelText('Points');
      const submit = screen.getByText(/save/i);

      // Save changes
      fireEvent.change(points, { target: { value: pointsArg } });
      fireEvent.click(submit, new MouseEvent('click') );

    });

    then(/^Club Member should have a status of (.*)$/, async (statusArg) => {
      // console.log('executing then');
      await waitFor(() => screen.getByTestId('status'));
      const status = screen.getByTestId('status').textContent;
      expect(status).toBe(statusArg);
    });

  })
});
