# results-example

This is an example application which utilizes the Typeform authentication mechanism,
and also calls the responses API to plot the simple forms data.

The application has two main endpoints:

- `/` — an index page which provides an interface to log in and log out actions;
- `/results/:id` — a page which plots the graph for the particular form identified by the `:id` parameter
(for example `/results/urFORM` will display the plot for the form identified by `urFORM`).


## Getting started

### Deploy to Heroku

You can deploy your application to Heroku in one click using the button below and following the instructions.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/typeform/results-example/tree/master)

### Development

#### Requirements

- More or less recent versions of Node.js and NPM installed
- [Heroku CLI client](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up) (needed if you plan to work with Heroku)

#### Installation
To install the application and its dependencies:

```
$ git clone https://github.com/Typeform/results-example.git

$ cd results-example
$ npm install
```

#### Running
To run the application you would need to setup some environment variables. The easiest way is to create a `.env` file and then export it's contents before running the application:

```
$ cat .env
TYPEFORM_API_BASE_URL=https://api.typeform.com
APPLICATION_URL=http://localhost:5000

CLIENT_ID=<your_client_id>
CLIENT_SECRET=<your_client_secret>

$ export $(cat .env)
```

And finally to run the application:

```
$ npm start
```

#### [Re-]deploying to Heroku

In order to be able to deploy your changes to Heroku, you need to add a Heroku remote to your git repository:

```
$ heroku git:remote -a <your_heroku_application_name>
```

To deploy the changes to Heroku just push them to the `heroku` remote:

```
$ git push heroku master
```
