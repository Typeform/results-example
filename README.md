# results-example

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/typeform/results-example/tree/master)

This is an example application which utilizes the Typeform authentication mechanism,
and also calls the responses API to plot the simple forms data.

The application has a set of endpoints:

- `/` — an index page which, depending on the authentication state displays either a prompt to authenticate, or the user profile of the logged in user;
- `/login` — a shortcut which redirects the user to the Typeform authorization page for this application;
- `/logout` — an edpoint to remove the token from the application's session;
- `/callback` — an endpoint which is used by the OAuth mechanism during the authentication;
— and finally `/results/:id` — an endpoint which plots the graph for the form identified by `:id` parameter
(e.g. `/results/urFORM` will display the plot for the form identified by `urFORM`).

