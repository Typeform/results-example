# results-example

This is an example application which utilizes the Typeform authentication mechanism,
and also calls the responses API to plot the simple forms data.

The application has a set of endpoints:

- `/` — an index page which, depending on the authentication state displays either a prompt to authenticate, or the user profile of the logged in user;
- `/login` — a shortcut which redirects the user to the Typeform authorization page for this application;
- `/logout` — an edpoint to remove the token from the application's session;
- `/callback` — an endpoint which is used by the OAuth mechanism during the authentication;
— and finally `/results/:id` — an endpoint which plots the graph for the form identified by `:id` parameter
(e.g. `/results/urFORM` will display the plot for the form identified by `urFORM`).

## Getting started

### Option 1 (using Heroku)

Click the button below, and follow the instructions :)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/typeform/results-example/tree/master)

### Option 2 (run locally)

For running the application locally you need any more or less recent version of Node.js installed. To install the application and its dependencies:

```
$ git clone https://github.com/Typeform/results-example.git

$ cd results-example
$ npm install
```

To run the application you would need to setup some environment variables. The easiest way is to create a `.env` file and then export it's contents before running the application:

```
$ cat .env
AUTHORIZATION_URL='http://api.joken.typeform.com/authorize'
TOKEN_URL='http://api.joken.typeform.com/token'
TYPEFORM_API_URL='http://api.joken.typeform.com'

REDIRECT_URI_BASE='http://localhost:5000'

CLIENT_ID='<your_client_id>'
CLIENT_SECRET='<your_client_secret>'

$ export $(cat .env)
```

And finally to run the application:

```
$ npm start
```

## Legal

This application is licensed under the MIT license. This is NOT an officical Typeform product.

Copyright (c) 2017 Typeform S.L.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

