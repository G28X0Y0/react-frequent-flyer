# DevSecOps Frequent Flyer REST Microservice

## Description

The goal of this project is to demostrate how TDD and BDD can be used to test application code effectively.

The project's code has a set of unit-tests, BBD tests and integration test that can be executed on demand or as part a CI/CD pipeline.


## Dependencies

The language of choice for this project is `Typescript`. The following frameworks and tools were used to create this project:

- NodeJs > 10.x
- NestJs: A framework to build Node.js server-side applications
- Jest: A test framework for unit-test and e2e tests
- Jest-Cucumber: a tool to create and run BBD tests 

## Change Log
| Version | Notes|
|---------|------|
|1.0.0| Initial release |

### Business Case used for this project
> Flying High Airlines is a large commercial airline that runs both international and domestic flights. Flying High has been under pressure due to increasing costs and com- petition from low-cost carriers, so management has recently launched a new and improved version of their Frequent Flyer program to try to retain existing customers and attract new ones. This new program will offer many compelling reasons to join; like all Frequent Flyer programs, members will accumulate points when they fly, but members will also benefit from many exclusive privileges, such as access to lounges and faster boarding lines, and they’ll be able to easily spend their accumulated miles on flights and on other purchases for themselves or their family members.
>
> As part of this initiative, management wants a new website where Frequent Flyer members can see their current status in real time, redeem points, and book flights. The existing system just sends out paper account statements to members each month to tell them how many points they’ve accumulated. In addition, the Flying High call center is currently overloaded with calls, as Frequent Flyer members can only benefit from their member privileges and use their accumulated points if they book over the phone. Management hopes that being able to book directly online instead of over the phone will encourage Frequent Flyer members to book more often with Flying High.
>
> In this chapter, and throughout the rest of the book, we’ll use examples from this project to illustrate the concepts and techniques we discuss.

##### BDD Definitions

- Feature: In BDD terms, a feature is a piece of software functionality that helps users or other stakeholders achieve some business goal. A feature is not a user story, but it can be described by one or several user stories.

- A user story is a way of breaking the feature down into more manageable chunks to make them easier to implement and deliver.

- Examples BDD practitioners use concrete examples to build up a shared understanding of how a feature should behave. These examples also help flush out and clarify ambiguities and uncertainties in the requirements

##### BDD Features

The following two features were implemented in this project:

> Feature: Frequent Flyer status is calculated based on points
> As a Frequent Flyer member
> I want my status to be upgraded as soon as I earn enough points
> So that I can benefit from my higher status sooner
>
> Scenario: New members should start out as BRONZE members
> Given user is not a Frequent Flyer member
> When user registers on the Frequent Flyer program
> Then user should have a status of BRONZE
>
> Scenario Outline:
> Given "Dinesh Go" is a "initialStatus" FrequentFlyer member
> And "Dinesh Go" has "initialStatusPoints" status points
> When he earns "extraPoints" extra status points
> Then he should have a status of "finalStatus"
>
> Examples: Status points required for each level
>
> | initialStatus | initialStatusPoints | extraPoints | finalStatus |
>
> | Bronze | 0 | 300 | Silver |
>
> | Bronze | 100 | 200 | Silver |
>
> | Silver | 0 | 699 | Gold |
>
> | Gold | 0 | 1500 | Platinum |
>

This feature was copied from chapter 10 of the book BDD In Action.

Notice that for the last scenario an "examples" table is defined. This table is used by cucumber as scenarios to use to run the BDD tests with

## Code Structure

- Source code and unit-tests are located in the `src` folder
- e2e tests are stored in the `test` folder
- BDD features and step definitions are located in the `features` folder

## Project Instructions
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
