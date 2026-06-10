<div align="center">

# ₿ Crypto Price Tracker

A beautiful, real-time cryptocurrency price tracker built with vanilla HTML, CSS, and JavaScript.

Powered by [CoinGecko API](https://www.coingecko.com/) — no API key required.

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-blue?style=for-the-badge)](https://rizaahmad25.github.io/crypto-price-tracker/)

</div>

---

## 📸 Features

- 🔄 **Real-time prices** — Auto-refreshes every 60 seconds
- 🔍 **Search** — Find any cryptocurrency instantly
- 📊 **Market stats** — Total market cap, 24h volume, BTC dominance
- 🚀 **Gainers/Losers** — Filter by best and worst performers
- 💱 **Multi-currency** — USD, IDR, EUR, BTC, ETH
- 📱 **Responsive** — Works on desktop and mobile
- 🌙 **Dark theme** — Easy on the eyes

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure |
| CSS3 | Styling (dark theme, responsive) |
| JavaScript (ES6+) | Fetch API, DOM manipulation |
| CoinGecko API | Cryptocurrency data |

## 🚀 Getting Started

### Option 1: Open directly
Simply open `index.html` in your browser.

### Option 2: Live Server (recommended)
```bash
# Using VS Code Live Server extension
# Or using Python
python -m http.server 8000
# Then open http://localhost:8000
```

### Option 3: GitHub Pages
1. Fork this repository
2. Go to Settings → Pages
3. Select branch: `main`
4. Your site will be live at `https://yourusername.github.io/crypto-price-tracker/`

## 📁 Project Structure

```
crypto-price-tracker/
├── index.html      # Main HTML file
├── style.css       # Styling (dark theme)
├── app.js          # JavaScript logic
└── README.md       # This file
```

## 🔧 API Reference

This project uses the [CoinGecko API](https://www.coingecko.com/en/api/documentation) (free tier):

- **No API key required**
- **Rate limit:** ~10-30 calls/minute
- **Endpoints used:**
  - `/coins/markets` — Get coin prices and market data
  - `/global` — Get global market stats

## 🎨 Customization

### Change default currency
In `app.js`, modify:
```javascript
let currentCurrency = 'usd'; // Change to 'idr', 'eur', 'btc', 'eth'
```

### Change refresh interval
In `app.js`, modify:
```javascript
setInterval(async () => {
    await loadCoins();
}, 60000); // Change 60000 (ms) to your preferred interval
```

### Change number of displayed coins
In `app.js`, modify:
```javascript
renderCoins(allCoins.slice(0, 50)); // Change 50 to your preferred number
```

## 📝 What I Learned

- Fetching data from REST APIs using `fetch()`
- DOM manipulation and dynamic rendering
- CSS Grid and Flexbox for responsive layouts
- Handling async/await operations
- Error handling for API rate limits

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [RimuroHengky](https://github.com/rizaahmad25)**

</div>
