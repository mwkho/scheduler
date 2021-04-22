# Interview Scheduler
An interview scheduler webapp based on the React framework which allows administration to 
create, edit, and delete interviews.

The API server can be found and cloned from here: 
https://github.com/mwkho/scheduler-api

Development uses Storybook and the Webpack Development Server.
All automated testing were done through Cypress and Jest.

!["Initial load"](https://github.com/mwkho/scheduler/blob/master/docs/InitialLoad.png) 
!["Confirming a delete and editing an interview"](https://github.com/mwkho/scheduler/blob/master/docs/ConfirmAndEdit.png) 
!["Deleting an interview"](https://github.com/mwkho/scheduler/blob/master/docs/Delete-animation.png) 

## Getting Started
1. Fork this repository, then clone your fork of this repository.
2. Install dependencies with `npm install`.
3. Follow the instructions in the API server and start it.
4. Starting the app with `npm start`. The app will be served at http://localhost:8000/. 
  > Note: This will also start the Webpack Development Server

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies
* axios
* @testing-library/react-hooks
* react-test-renderer
* cypress