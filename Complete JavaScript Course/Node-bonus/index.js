const fs = require("fs");
const http = require("http");
const url = require("url");

// utf-8 character encoding, if we dont specify it, it will return buffer instead of a file
const json = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
// console.log(__dirname);
// console.log(json);

// array of the 5 data objects
const laptopData = JSON.parse(json);
// console.log(laptopData);

// callback function that will be called each time someone access the server
const server = http.createServer((req, res) => {
	const pathName = url.parse(req.url, true).pathname; //true --> query is passed into an object
	console.log(url.parse(req.url, true));
	const id = url.parse(req.url, true).query.id;

	if (pathName === "/products" || pathName === "/") {
		// set http header, small msg to let browser know what kind of data is coming in
		res.writeHead(200, { "Content-type": "text/html" });
		res.end("This is the Products page");
	} else if (pathName === "/laptop" && id < laptopData.length) {
		// load html, replace placeholder with real text and then send
		// it to the browser each time theres a request of laptop
		res.writeHead(200, { "Content-type": "text/html" });
		// this is asynchronous file read usually its synchronous
		//getting the html file
		fs.readFile(
			`${__dirname}/templates/template-laptop.html`,
			"utf-8",
			(err, data) => {
				const laptop = laptopData[id];
				// replace returns a new string, we are using regex here
				let output = data.replace(/{%PRODUCTNAME%}/g, laptop.productName);
				// we do output = output because if we do data, that means we are not updating the latest one
				// we only keep making one changes at a time at the original one
				output = output.replace(/{%IMAGE%}/g, laptop.image);
				output = output.replace(/{%PRICE%}/g, laptop.price);
				output = output.replace(/{%SCREEN%}/g, laptop.screen);
				output = output.replace(/{%CPU%}/g, laptop.cpu);
				output = output.replace(/{%STORAGE%}/g, laptop.storage);
				output = output.replace(/{%RAM%}/g, laptop.ram);
				output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
				// send to browser
				res.end(output);
			}
		);
		// res.end(`This is the Laptop page for laptop ${id}`);
	} else {
		// this is when we use 404
		res.writeHead(404, { "Content-type": "text/html" });
		res.end("URL was not found on the server");
	}
});

// tell node.js to always listen to a certain port and ip address
server.listen(1337, "127.0.0.1", () => {
	console.log("listening on 1337");
});
