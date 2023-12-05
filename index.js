const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');

//For env File 
dotenv.config();

const app = express();

// Define the target URL you want to proxy to (the HTTP endpoint).
const target = process.env.BASE_URL_TARGET || 'http://54.85.110.11';

// Create a proxy middleware that will handle requests to the API.
const apiProxy = createProxyMiddleware({
  target,
  changeOrigin: true, // Needed for changing the host header to the target URL's host
  secure: false, // Set this to false to avoid SSL certificate verification
});

// Use the API proxy middleware for requests to the /api route.
app.use('/api', apiProxy);

// Start the proxy server on a port (e.g., 3001).
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port} and proxying to ${target}`);
});
