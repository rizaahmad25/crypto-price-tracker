// Crypto Price Tracker App
// API: CoinGecko (free, no API key required)

const API_BASE = 'https://api.coingecko.com/api/v3';
let allCoins = [];
let currentCurrency = 'usd';
let currentFilter = 'all';

// Currency symbols
const currencySymbols = {
    usd: '$',
    idr: 'Rp',
    eur: '€',
    btc: '₿',
    eth: 'Ξ'
};

// Format number with commas
function formatNumber(num, decimals = 2) {
    if (num === null || num === undefined) return '--';
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(decimals);
}

// Format price based on currency
function formatPrice(price) {
    if (!price) return '--';
    const symbol = currencySymbols[currentCurrency] || '';
    
    if (currentCurrency === 'idr') {
        return symbol + price.toLocaleString('id-ID');
    }
    if (currentCurrency === 'btc' || currentCurrency === 'eth') {
        return symbol + price.toFixed(8);
    }
    if (price < 0.01) return symbol + price.toFixed(6);
    if (price < 1) return symbol + price.toFixed(4);
    return symbol + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Format percentage change
function formatChange(change) {
    if (change === null || change === undefined) return '<span class="price-change">--</span>';
    const isPositive = change >= 0;
    const arrow = isPositive ? '▲' : '▼';
    const className = isPositive ? 'positive' : 'negative';
    return `<span class="price-change ${className}">${arrow} ${Math.abs(change).toFixed(2)}%</span>`;
}

// Fetch coins data from CoinGecko
async function fetchCoins(page = 1) {
    try {
        const response = await fetch(
            `${API_BASE}/coins/markets?vs_currency=${currentCurrency}&order=market_cap_desc&per_page=100&page=${page}&sparkline=false&price_change_percentage=1h,24h,7d`
        );
        
        if (!response.ok) throw new Error('API rate limit reached');
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching coins:', error);
        return [];
    }
}

// Fetch global market data
async function fetchGlobalData() {
    try {
        const response = await fetch(`${API_BASE}/global`);
        const data = await response.json();
        
        const global = data.data;
        
        document.getElementById('totalMarketCap').textContent = 
            '$' + formatNumber(global.total_market_cap.usd);
        document.getElementById('totalVolume').textContent = 
            '$' + formatNumber(global.total_volume.usd);
        document.getElementById('btcDominance').textContent = 
            global.market_cap_percentage.btc.toFixed(1) + '%';
    } catch (error) {
        console.error('Error fetching global data:', error);
    }
}

// Render coins to table
function renderCoins(coins) {
    const tbody = document.getElementById('cryptoBody');
    
    if (coins.length === 0) {
        tbody.innerHTML = `
            <tr><td colspan="8" class="loading">
                No coins found. Try a different search.
            </td></tr>
        `;
        return;
    }
    
    tbody.innerHTML = coins.map((coin, index) => `
        <tr>
            <td>${coin.market_cap_rank || index + 1}</td>
            <td>
                <div class="coin-cell">
                    <img src="${coin.image}" alt="${coin.name}" class="coin-icon" loading="lazy">
                    <div>
                        <div class="coin-name">${coin.name}</div>
                        <div class="coin-symbol">${coin.symbol}</div>
                    </div>
                </div>
            </td>
            <td><strong>${formatPrice(coin.current_price)}</strong></td>
            <td>${formatChange(coin.price_change_percentage_1h_in_currency)}</td>
            <td>${formatChange(coin.price_change_percentage_24h)}</td>
            <td>${formatChange(coin.price_change_percentage_7d_in_currency)}</td>
            <td>${formatNumber(coin.market_cap)}</td>
            <td>${formatNumber(coin.total_volume)}</td>
        </tr>
    `).join('');
}

// Apply filter
function filterCoins(filter) {
    currentFilter = filter;
    
    // Update active button
    document.querySelectorAll('.controls button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    let filtered = [...allCoins];
    
    if (filter === 'gainers') {
        filtered = filtered.filter(c => c.price_change_percentage_24h > 0);
        filtered.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    } else if (filter === 'losers') {
        filtered = filtered.filter(c => c.price_change_percentage_24h < 0);
        filtered.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
    }
    
    renderCoins(filtered.slice(0, 50));
}

// Search functionality
function searchCrypto() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (!query) {
        renderCoins(allCoins.slice(0, 50));
        return;
    }
    
    const results = allCoins.filter(coin => 
        coin.name.toLowerCase().includes(query) || 
        coin.symbol.toLowerCase().includes(query) ||
        coin.id.toLowerCase().includes(query)
    );
    
    renderCoins(results);
}

// Change currency
async function changeCurrency() {
    currentCurrency = document.getElementById('currencySelect').value;
    await loadCoins();
}

// Refresh prices
async function refreshPrices() {
    await loadCoins();
    await fetchGlobalData();
}

// Load all coins
async function loadCoins() {
    const tbody = document.getElementById('cryptoBody');
    tbody.innerHTML = `
        <tr><td colspan="8" class="loading">
            <div class="spinner"></div>
            Loading prices...
        </td></tr>
    `;
    
    // Fetch first 200 coins (2 pages)
    const [page1, page2] = await Promise.all([
        fetchCoins(1),
        fetchCoins(2)
    ]);
    
    allCoins = [...page1, ...page2];
    renderCoins(allCoins.slice(0, 50));
    
    // Update last updated time
    document.getElementById('lastUpdate').textContent = new Date().toLocaleTimeString();
}

// Event listeners
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchCrypto();
});

// Initialize app
async function init() {
    await Promise.all([
        loadCoins(),
        fetchGlobalData()
    ]);
    
    // Auto-refresh every 60 seconds
    setInterval(async () => {
        await loadCoins();
        await fetchGlobalData();
    }, 60000);
}

// Start the app
init();
