# Sherry Blossoms Website

## Overview
A static e-commerce-style website for Sherry Blossoms, a brand curating premium fragrances, handcrafted keychains, and lifestyle gifts. Built with vanilla HTML/CSS/JS and served via a Node.js Express server.

## Project Architecture
- **server.js** - Express server serving static files from root directory on port 5000
- **index.html** - Main HTML page
- **style.css** - Stylesheet
- **script.js** - Client-side JavaScript
- ***.jpg** - Product images (keychains, fragrances)

## Dependencies
- express - Web server framework
- helmet - Security headers (CSP disabled for Replit compatibility)
- express-rate-limit - Rate limiting
- express-basic-auth - Optional basic authentication

## Running
```
node server.js
```
Server binds to `0.0.0.0:5000`.

## Deployment
Configured for autoscale deployment with `node server.js`.
