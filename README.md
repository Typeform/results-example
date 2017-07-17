# results-example

This is an example application which utilizes the Typeform authentication mechanism,
and also calls the responses API to plot the simple forms data.

The application has two main enpoints:

- `/` — an index page which provides an interface to log in and log out actions;
- `/results/:id` — a page which plots the graph for the particular form identified by the `:id` parameter
(for example `/results/urFORM` will display the plot for the form identified by `urFORM`).


## Getting started

### Option 1 (using Heroku)

Click the button below, and follow the instructions :)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/typeform/results-example/tree/master)

If you need to deploy to Heroku manually, please follow the instructions below.

### Option 2 (run locally)

#### Requirements

- More or less recent versions of Node.js and NPM installed
- [Heroku CLI client](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up) (optional, if you plan to deploy your application to Heroku)

#### Installation
To install the application and its dependencies:

```
$ git clone https://github.com/Typeform/results-example.git

$ cd results-example
$ npm install
```

#### Environment
To run the application you would need to setup some environment variables. The easiest way is to create a `.env` file and then export it's contents before running the application:

```
$ cat .env
AUTHORIZATION_URL='http://api.challenge.typeform.com/authorize'
TOKEN_URL='http://api.challenge.typeform.com/token'
TYPEFORM_API_URL='http://api.challenge.typeform.com'

REDIRECT_URI_BASE='http://localhost:5000'

CLIENT_ID='<your_client_id>'
CLIENT_SECRET='<your_client_secret>'

$ export $(cat .env)
```

#### Running
And finally to run the application:

```
$ npm start
```

