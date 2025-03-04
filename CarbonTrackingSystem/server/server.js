const express = require('express');
const app = express();
const port = 3000;
const path = require('path')

app.get('/', (req, res) => {
  res.send('Hello World from Node.js server!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.use(express.static(path.join(__dirname, '../dist/your-angular-project')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/your-angular-project/index.html'));
});
