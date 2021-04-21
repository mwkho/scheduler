import React from "react";
import { render, cleanup, waitForElement, fireEvent, queryByText, prettyDOM, getByText, getAllByTestId, getByAltText, getByPlaceholderText} from "@testing-library/react";
import Application from "components/Application";

import axios from "axios";

afterEach(cleanup);

describe('Application', () => {
  xit("defaults to Monday and changes the schedule when a new day is selected", () => {

    const {getByText} = render(<Application />);
    return waitForElement(() => getByText('Monday'))
    .then(() => {
      fireEvent.click(getByText('Tuesday'));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();  
    })
  });

    it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
      const { container } = render(<Application />);
    
      await waitForElement(() => getByText(container, "Archie Cohen"));
    
      const appointments = getAllByTestId(container, "appointment");
      const appointment = appointments[0];
    
      fireEvent.click(getByAltText(appointment, "Add"));
    
      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: "Lydia Miller-Jones" }
      });
    
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
      fireEvent.click(getByText(appointment, "Save"));
    
      expect(getByText(appointment, "Saving...")).toBeInTheDocument();
    
      await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    
      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );
      // console.log(prettyDOM(day));

      expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    });
    
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
     // 1. Render the Application.
      const { container } = render(<Application />);

      // 2. Wait until the text "Archie Cohen" is displayed.
      await waitForElement(() => getByText(container, "Archie Cohen"));

      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );
        console.log(prettyDOM(day));
      // 3. Click the "Delete" button on the booked appointment.
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );

      fireEvent.click(getByAltText(appointment, "Delete"));

      // 4. Check that the confirmation message is shown.
      expect(
        getByText(appointment, "Do you want to cancel the interview?")
      ).toBeInTheDocument();

      // 5. Click the "Confirm" button on the confirmation.
      fireEvent.click(queryByText(appointment, "Confirm"));

      // 6. Check that the element with the text "Deleting" is displayed.
      expect(getByText(appointment, "Deleting...")).toBeInTheDocument();

      // 7. Wait until the element with the "Add" button is displayed.
      await waitForElement(() => getByAltText(appointment, "Add"));

      // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );
        console.log(prettyDOM(day));
      expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
});

  xit("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => queryByText(container, "Archie Cohen"));
    
    // 3. Click the "Delete" button on the booked appointment.
    const appointments = getAllByTestId(container, 'appointment');

    const appointment = appointments.find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    // change the name and the interviewer
    fireEvent.click(getByAltText(appointment, 'Edit'));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {target: {value: 'bob'}});

    // click the save
    fireEvent.click(getByText(appointment, 'Save'));

    // expect to see the saving display
    expect(getByText(appointment, 'Saving...')).toBeInTheDocument();

    //wait for the update appointment to render
    await waitForElement(() => getByText(container, 'bob'));

    // check for monday day list
    const liItems = getAllByTestId(container, 'day')
    const liItem = liItems.find(element => getByText(element, 'Monday'));
    expect(getByText(liItem, "1 spot remaining")).toBeInTheDocument();
    // see that 1 spot remainig

  })

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

      // 1. Render the Application.
      const { container } = render(<Application />);

      // 2. Wait until the text "Archie Cohen" is displayed.
      await waitForElement(() => queryByText(container, "Archie Cohen"));
      
      // 3. Click the "Delete" button on the booked appointment.
      const appointments = getAllByTestId(container, 'appointment');
  
      const appointment = appointments.find(
        appointment => queryByText(appointment, "Archie Cohen")
      );
  
      // change the name and the interviewer
      fireEvent.click(getByAltText(appointment, 'Edit'));
      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {target: {value: 'bob'}});
  
      // click the save
      fireEvent.click(getByText(appointment, 'Save'));
    // expect to see the saving display
    expect(getByText(appointment, 'Saving...')).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, 'Error'))

      });
  xit("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce()

      // 1. Render the Application.
      const { container } = render(<Application />);

      // 2. Wait until the text "Archie Cohen" is displayed.
      await waitForElement(() => queryByText(container, "Archie Cohen"));
      
      // 3. Click the "Delete" button on the booked appointment.
      const appointments = getAllByTestId(container, 'appointment');
  
      const appointment = appointments.find(
        appointment => queryByText(appointment, "Archie Cohen")
      );
      fireEvent.click(getByAltText(appointment, 'Delete'));
      // 4. Check that the confirmation message is shown.
      expect(getByText(appointment, 'Do you want to cancel the interview?')).toBeInTheDocument();
      // 5. Click the "Confirm" button on the confirmation.
      fireEvent.click(getByText(appointment, 'Confirm'));
      // 6. Check that the element with the text "Deleting" is displayed.
      expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
      await waitForElement(() => getByText(appointment, 'Error'))
    });
})
