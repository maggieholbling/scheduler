import React from "react";

import { render, cleanup } from "@testing-library/react";
import { waitForElement } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";

import Appointment from "components/Appointment/index";

afterEach(cleanup);

//just a guess - needs fixing
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});