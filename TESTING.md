# Unit Testing Best Practices
This guide describes a set of best practices for NodeJs and React testing.

## General Testing Practices

### Simplicity
Testing code should be simple in design. Test only as much as needed. **Don't strive for 100% coverage**

### Name testing code properly
A test report should indicate if the current application version satisfies the requirements, specially, to people not necessarily familiar with the code.
With this goal in mind, do the following:
- Clearly indicate what is being tested: `ProductsService.addNewProduct`, name methods/function properly
- Explain the scenario being tested: *"No price is passed to the method"*
- Indicate what is expected: should return *"Product not approved"*

### Structure test code by the *AAA* pattern
Within each unit-test method/function code do the following: 
- 1st A: Arrange(group) together setup code for test scenario i.e. adding data to the DB, create mocks, etc.
- 2nd A: Arrange together execution code
- 3rd A: Arrange together all assertions 

### Describe test expectations in business language using BDD style assertions
Coding your test in a declarative style allows the reader to understand the objective of the test easily. 
Using BDD style `expect` and `should` assertions (human-like language) in your code achieves that goal. 

### Test only public methods/functions
Don't test private methods/functions. Whenever a public behavior is tested, the private implementation is implicitly tested.

### Use realistic test data
The more realistic the test input is, the greater the chances are to catch bugs early.

### Test data should be independent for each test
Each test should add and act on its own set of data to prevent test coupling. 

### Don't Catch errors, expect them
Tests code should verify that exceptions are thrown when appropriate.

### Group tests in sets
Use tagging or other methods of grouping tests so that they can be executed only in the appropriate context or when needed.

### Use a linter to check for errors
To avoid coding mistakes, use a linting tool to check your unit-test code 

## General UI Testing Practices

### Use element attributes unlikely to change for querying
Query HTML elements based on attributes that are likely to survive changes unlike CSS selectors, labels and the like.

### Use framework built-in support for async calls
Don't use `setTimeOut`, etc., to wait for calls to complete instead, use the mechanism prescribed by the testing framework you're using.

### Have a small set of  e2e test
e2e tests are brittle and slow. Have only a small set of essential e2e tests. 


## React Testing Practices

### Stick with the community's recommendations
In the latest version of React, the documentation recommends the use of `Jest` and `Testing-Library`, stick for these for better community support.
If you're using an older version of React consult the documentation for that version to know which are the recommended test frameworks.

### Clean up after each test
Teardown any artifact, test data, etc., created for each test after it completes. Use the `afterEach` method for code clean up.

### Keep object type separate from each other
Keep display/UI code separate from program logic and side-effects. This will make it easier to write tests for each category of objects.

### Mimic user interaction when testing components
You should test your components functionality from the user's perspective. This will give you the confidence the app will function as intended.

### Test only user functionality
Don't test superfluous details(3rd party libraries, etc.), focus your testing efforts in testing business functionality.

### Use shallow rendering for unit-testing
Shallow rendering only renders the component being tested, this allows you to test the component in isolation.

### Use Render/Mount for integration tests
To test how a component interacts with its dependencies and context, use `Render/Mount`.

### Try keeping lifecycle methods clean of business logic
If you have business logic embedded in life cycle methods try extracting it so that it can be tested independently. 
The goal here is to not write life cycle tests which are already covered by React.


## React BDD Testing 
Developers can use BDD tests to guarantee business requirements are being properly implemented. 
BDD test ride on top of the existent "testing infrastructure" provided by React. 
This makes it easy for the developer to implement since there is no extra set up needed.

### Dependencies
To start writing BDD test, install the `jest-cucumber` package in your project:

``` npm i jest-cucumber --save-dev```

Using this library makes it possible for your BDD tests to run along the rest of tests in the app's code.

`jest-cucumber` makes it possible for the developer to use `jest` style assertions and syntax and at the same time write tests in [cucumber](https://cucumber.io) style. 

### BDD Tests code location
Inside the `src` folder create a folder called `features`. Inside the `features` folder create a folder called `step-definitions`.

In the `features` folder you should store `*.feature` files containing BDD features and scenarios written using the Gherkin syntax.

In the `step-definitions` folder you should store the code to run each feature. 

### Writing BDD tests
For general info on getting started with `jest-cucumber` and writing BDD tests, you can read this article [React Behavior Driven Development (BDD)](https://codeburst.io/react-behavior-driven-development-bdd-535afd364e5f).
Although this guide is a bit outdated, it'll give you an overall idea of the process. The React POC repo (**URL Coming soon**) contains a fully functional example you can use as reference.

The process of writing BDD test is the same as writing unit and integration tests.  
The POC uses `testing-library` style tests which render components in `shallow` DOM. 
Then, using `jest-cucumber` the tests read each feature/scenario and executes them.
So, the "glue" that unites both `testing-library` and BDD features and it makes all happening is the `jest-cucumber` library. 
 
### Running BDD tests
To run all tests use the following command:

```npm test```

This will execute all unit-test and BDD tests.

## Resources:
Most of the concepts in this guide were derived from the following sources:
- [Javascript Testing Best Pracitces](https://github.com/goldbergyoni/javascript-testing-best-practices/)
- [Mocks Aren't Stubs](https://martinfowler.com/articles/mocksArentStubs.html)
- [Modern React Testing](https://blog.sapegin.me/all/react-testing-1-best-practices/)
- [Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Unit-testing React Components](https://medium.com/javascript-scene/unit-testing-react-components-aeda9a44aae2)
- [How to test React components: the complete guide](https://www.freecodecamp.org/news/testing-react-hooks/)
- [What should we test (ReactJS Components)](https://hackernoon.com/what-should-we-test-reactjs-components-647ded674928)
- [React Behavior Driven Development (BDD)](https://codeburst.io/react-behavior-driven-development-bdd-535afd364e5f)
