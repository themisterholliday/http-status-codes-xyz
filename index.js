import express from 'express';
import httpstatuscodes from 'http-status-codes';

const { StatusCodes, getReasonPhrase } = httpstatuscodes;
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const response = `
    Hello, welcome to httpstatuscodes.xyz!

    <p>To make a request simply add the status code to the end of the url, for example httpstatuscodes.xyz/200.</p>

    <p>By default a GET request will return a body with the status code name, i.e. "200 OK". If you would like no body returned simply add httpstatuscodes.xyz?body=flase to the end of the url, for example httpstatuscodes.xyz/200?body=false</p>
    `;
  res.send(response);
});

app.get('/favicon.ico', (req, res) => res.status(204));

function processRequest(request, response) {
  const inputCode = Number(request.params.code);

  if (
    Number.isNaN(inputCode) ||
    inputCode > 599 ||
    inputCode < 200 ||
    StatusCodes[inputCode] === undefined
  ) {
    response.status(501).send('501 Not implemented');

    return;
  }
  const phrase = getReasonPhrase(inputCode);
  const withBody =
    request.query.body === 'true' || request.query.body === undefined;
  if (withBody) {
    const responseBody = `${inputCode} ${phrase}`;
    response.status(inputCode).send(responseBody);
  } else {
    response.status(inputCode).send();
  }
}

app.get('/:code', function (req, res) {
  processRequest(req, res);
});
app.post('/:code', function (req, res) {
  processRequest(req, res);
});
app.put('/:code', function (req, res) {
  processRequest(req, res);
});
app.patch('/:code', function (req, res) {
  processRequest(req, res);
});
app.delete('/:code', function (req, res) {
  processRequest(req, res);
});
app.copy('/:code', function (req, res) {
  processRequest(req, res);
});
app.head('/:code', function (req, res) {
  processRequest(req, res);
});
app.options('/:code', function (req, res) {
  processRequest(req, res);
});
app.lock('/:code', function (req, res) {
  processRequest(req, res);
});
app.unlock('/:code', function (req, res) {
  processRequest(req, res);
});
app.propfind('/:code', function (req, res) {
  processRequest(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
