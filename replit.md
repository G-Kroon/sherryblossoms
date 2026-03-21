# Sherry Blossoms

A boutique static website for Sherry Blossoms, a South African business specializing in premium fragrances, handcrafted keychains, and lifestyle gifts.

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (no framework)
- **Server:** Node.js + Express (static file server)
- **Fonts/Icons:** Google Fonts (Playfair Display, Inter), Font Awesome v6.5.0

## Key Dependencies

- `express` — static file serving
- `helmet` — HTTP security headers
- `express-rate-limit` — rate limiting (trust proxy enabled for Replit)
- `express-basic-auth` — optional preview password protection

## Project Structure

```
/
├── index.html        # Main HTML entry point
├── style.css         # All styles (responsive, mobile-first)
├── script.js         # Product data + UI logic (filtering, search, modal)
├── server.js         # Express server (port 5000, 0.0.0.0)
├── package.json      # npm config
├── *.jpg             # Product and brand images
```

## Running the App

```bash
npm install
npm start
```

Server runs at `http://0.0.0.0:5000`.

## Features

- Dynamic product grid populated from JS data
- Real-time filtering by category (Keychains, Fragrances, Gifts) and price
- Quick View modal with multiple product images
- WhatsApp order integration
- Accessible (ARIA roles, keyboard focus management, skip link)

## Environment Variables

- `ENABLE_BASIC_AUTH=true` — enable password protection
- `BASIC_AUTH_USER` — username (default: `demo`)
- `BASIC_AUTH_PASS` — password (default: `demo`)

## Deployment

Configured for autoscale deployment running `node server.js`.
