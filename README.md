# ₿ Crypto Price Tracker

Real-time cryptocurrency price tracker with market analytics, search, and multi-currency support. Powered by CoinGecko API.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![CoinGecko](https://img.shields.io/badge/API-CoinGecko-8DC647?style=flat-square&logo=coingecko)

## 🌐 Live Demo

**🔗 [View Live →](https://rizaahmad25.github.io/crypto-price-tracker/)**

## ✨ Features

- 📈 **Real-time Prices** — Live cryptocurrency prices with auto-refresh every 60 seconds
- 🔍 **Search** — Search any cryptocurrency by name or symbol
- 🚀 **Gainers/Losers** — Filter by top gainers and losers
- 💱 **Multi-Currency** — USD, IDR, EUR, BTC, ETH display
- 📊 **Market Stats** — Total market cap, 24h volume, BTC dominance
- ⏱️ **Time Frames** — 1h, 24h, 7d price changes
- 📱 **Responsive** — Works on desktop and mobile
- 🌙 **Dark Theme** — Beautiful dark UI with gradient accents
- ⚡ **Zero Dependencies** — Pure HTML/CSS/JS, no build step needed

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/rizaahmad25/crypto-price-tracker.git
cd crypto-price-tracker

# Open directly in browser
open index.html

# Or use a local server
npx serve .
python3 -m http.server 8000
```

No build step required — just open `index.html` in your browser!

## 🏗️ Architecture

```
├── index.html       # Main page structure
├── app.js           # Application logic (220+ lines)
│   ├── CoinGecko API integration
│   ├── Price formatting & display
│   ├── Search & filtering
│   ├── Market stats calculation
│   └── Auto-refresh timer
└── style.css        # Dark theme styles
```

## 🔧 Tech Stack

| Technology | Purpose |
|-----------|---------|
| HTML5 | Semantic page structure |
| CSS3 | Dark theme with gradients |
| Vanilla JS | Zero-dependency application logic |
| CoinGecko API | Real-time crypto market data |

## 📡 API Integration

Uses [CoinGecko API v3](https://www.coingecko.com/en/api/documentation) (free, no key required):

- `GET /coins/markets` — Top coins by market cap with price changes
- `GET /search` — Token search
- `GET /global` — Global market stats (market cap, volume, BTC dominance)
- Rate limit: ~10-30 requests/minute (free tier)

## 🎯 Usage

1. **View top coins** — Default view shows top 50 by market cap
2. **Search** — Type a coin name to filter
3. **Filter** — Click "Gainers" or "Losers" to sort by performance
4. **Switch currency** — Use dropdown to change display currency
5. **Auto-refresh** — Prices update automatically every 60 seconds

## 🛣️ Roadmap

- [ ] WebSocket real-time updates (Binance, Coinbase)
- [ ] Price alerts with browser notifications
- [ ] Technical indicators (RSI, MACD, Bollinger Bands)
- [ ] Portfolio tracking
- [ ] Multi-exchange price comparison
- [ ] Historical price charts
- [ ] Whale alert monitoring

## 📄 License

MIT License

---

Built with ❤️ by [Riza Ahmad](https://github.com/rizaahmad25) | Data from [CoinGecko](https://www.coingecko.com/)
