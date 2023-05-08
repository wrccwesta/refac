const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

// Create Express Server
const app = express();

// Configuration
const PORT = 5555;
const HOST = "127.0.0.1";

app.use(morgan("dev"));
app.use(
	"/northplay/",
	createProxyMiddleware({
		protocol: 'https:',
		target: `http://127.0.0.1:8080`,
		changeOrigin: true,
	})
);

app.use(
	"/sanctum/csrf-cookie",
	createProxyMiddleware({
		protocol: 'https:',
		target: `http://127.0.0.1:8080`,
		changeOrigin: true,
	})
);


app.use(
	"/",
	createProxyMiddleware({
		target: `http://127.0.0.1:3000`,
		changeOrigin: true,
	})
);


// Starting our Proxy server
app.listen(PORT, HOST, () => {
	console.log(`Starting Proxy at ${HOST}:${PORT}`);
});