# Otter Sign up form!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project is a single page web application which allows users to 'request an invitation' via a form in a modal.

Users are able to click a CTA, which then opens a modal containing a form. The form requires 'name', 'email' and confirm email' to be filled in.

This form performs validation, which will display any errors to the user and prevent the form from being completed.

If all validation is passed, the form makes a mock API, during this mock API call a loading state is displayed. The modal is then closed.

The form contains keyboard focus accessibility.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
