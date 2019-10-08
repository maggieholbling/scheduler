import React from "react";

import { render, cleanup } from "@testing-library/react";
import { waitForElement } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";

import Appointment from "components/Appointment/index";

afterEach(cleanup);

//just a guess - needs fixing
describe("Appointment", () => {
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async() => {
    const { getByText, getByAltText, getByPlaceholderText, getByTestId } = render(<Appointment />);
    await waitForElement(() => getByText("Archie Cohen"))
      .then(() => {
        fireEvent.click(getByAltText("Add"));
        fireEvent.change(getByPlaceholderText("Enter Student Name"), {
          target: { value: "Lydia Miller-Jones" }
        });
        fireEvent.click(getByTestId("interviewer"));
        fireEvent.click(getByText("Save"));
        //async?
        
        expect(getByText("Saving")).toBeInTheDocument();
        //needs async function
        await waitForElement(() => getByText("Lydia Miller-Jones"))
          .then(() => {
            //needs to make sure it's in the same daylistitem
            expect(getByText("Monday")).toBeInTheDocument();
            expect(getByText("no spots remaining")).toBeInTheDocument();
          });
      });
  });
});