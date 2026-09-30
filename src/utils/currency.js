// Live Currency Service - Euro, Dollar, and Turkish Lira Real-Time Rates

const DEFAULT_RATES = {
  EUR: 55.60,
  USD: 49.00,
  EUR_USD: 1.13,
  lastUpdated: new Date().toISOString()
};

export async function fetchLiveRates() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/EUR', {
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    
    if (data && data.rates && data.rates.TRY) {
      const eurTry = parseFloat(data.rates.TRY);
      const eurUsd = parseFloat(data.rates.USD) || 1.13;
      const usdTry = eurTry / eurUsd;
      
      const rates = {
        EUR: eurTry,
        USD: usdTry,
        EUR_USD: eurUsd,
        lastUpdated: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      };
      
      try {
        localStorage.setItem('avrupa_live_rates', JSON.stringify(rates));
      } catch (e) {}

      return rates;
    }
  } catch (err) {
    console.warn('Live rate fetch failed, using fallback or cached rates', err);
  }

  // Fallback to cache or defaults
  try {
    const cached = localStorage.getItem('avrupa_live_rates');
    if (cached) return JSON.parse(cached);
  } catch (e) {}

  return DEFAULT_RATES;
}

export function convertFromTRY(priceTRY, targetCurrency, rates = DEFAULT_RATES) {
  if (!priceTRY || priceTRY <= 0) return 0;
  if (targetCurrency === 'TRY') return priceTRY;
  
  if (targetCurrency === 'EUR') {
    const rate = rates.EUR || 55.60;
    return Math.round(priceTRY / rate);
  }
  
  if (targetCurrency === 'USD') {
    const rate = rates.USD || 49.00;
    return Math.round(priceTRY / rate);
  }

  return priceTRY;
}

export function formatCurrency(amount, currency) {
  if (currency === 'TRY') {
    return `${Math.round(amount).toLocaleString('tr-TR')} ₺`;
  }
  if (currency === 'EUR') {
    return `€${Math.round(amount).toLocaleString('de-DE')}`;
  }
  if (currency === 'USD') {
    return `$${Math.round(amount).toLocaleString('en-US')}`;
  }
  return `${amount}`;
}
