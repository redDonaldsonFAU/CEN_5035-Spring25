const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

app.get('*', (request, response) => {
	const status = {
		Status: "Running"
	};

	response.send(status);;
});

app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
});

app.post("/signup", (request, response) => {
	console.log(JSON.stringify(request));

	response.send('OK');
});
