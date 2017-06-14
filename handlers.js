const fetch = require('node-fetch');

class Handlers {
    constructor (typeform_api_url) {
        this.TYPEFORM_API_URL = typeform_api_url;
    }

    indexHandler(req, res) {
        if (!req.isAuthenticated()) {
            return res.end(`
            <body>
                <h3>Hello stranger!</h3>
                <p>You're not authenticated, you need to <a href="/login">authenticate via Typeform</a>.
            </body>
            `)
        }

        let data = JSON.stringify(req.user);
        return res.end(`
        <body>
            <h3>Hello, $username!</h3>
            <p>Here's your profile:</p><p style="color: blue;">${data}</p>
            <p>Maybe you want to <a href="/logout">log out</a>?</p>
        </body>
        `);
    }

    displayResultsHandler(req, res) {
        fetch(`${this.TYPEFORM_API_URL}/forms/${req.params.id}/responses`, {
            headers: {
                Authorization: `Bearer ${req.user.access_token}`,
            }
        })
        .then(res => res.json())
        .then(d => {
            let xdata = [];
            let ydata = [];
            d.items.forEach(item => {
                if (item.answers) {
                    if (item.answers[0].type == "number") {
                        xdata.push(xdata[xdata.length-1]+1 || 1);
                        ydata.push(item.answers[0].number);
                    }
                }
            })

            res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
            </head>
            <body>
                <canvas id="canvas" width="800" height="400"></canvas>
                <script>
                    var data = {
                        labels: ${JSON.stringify(xdata)},
                        datasets: [
                            {
                                label: "Answer",
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 1,
                                data: ${JSON.stringify(ydata)},
                                stack: 1,
                            },                        
                        ]
                    };

                    var options = {scales: {yAxes: [{stacked: true}]}};

                    var myBarChart = new Chart(document.querySelector('#canvas'), {
                        type: 'bar',
                        data: data,
                        options: options
                    });
                </script>
            </body>
            </html>
            `)
        })
        .catch(e => {
            console.log(e);
            return res.end(e.toString());
        })
    }
}

module.exports = Handlers;