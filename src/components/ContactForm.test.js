import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ContactForm from "./ContactForm";

test("renders Contact Form without errors", () => {
  render(<ContactForm />);
});

test("User can fill out and submit form", async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);

  fireEvent.change(firstNameInput, {
    target: { value: "Afton", name: "firstName" },
  });

  fireEvent.change(lastNameInput, {
    target: { value: "Slone", name: "lastName" },
  });

  fireEvent.change(emailInput, {
    target: { value: "afton.slone@gmail.com", name: "email" },
  });

  const button = screen.getByRole("button");
  fireEvent.click(button);

  const firstNameOutput = await screen.findByText(/Afton/i);
  const lastNameOutput = await screen.findByText(/Slone/i);
  const emailOutput = await screen.findByText(/afton.slone@gmail.com/i);
  expect(firstNameOutput).toBeTruthy();
  expect(lastNameOutput).toBeTruthy();
  expect(emailOutput).toBeInTheDocument();
});
