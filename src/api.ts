const BASE_URL = "https://api.coinpaprika.com/v1";

export interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}
export async function fetchCoins() {
    return (
        (await fetch(`${BASE_URL}/coins`).then((req) => req.json())) as ICoin[]
    ).splice(0, 100);
}

interface ICoinInfo {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}
export async function fetchCoinInfo(coinId: string) {
    return (await fetch(`${BASE_URL}/coins/${coinId}`).then((req) =>
        req.json()
    )) as ICoinInfo;
}

interface IUSD {
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_15m: number;
    percent_change_30m: number;
    percent_change_1h: number;
    percent_change_6h: number;
    percent_change_12h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    percent_change_30d: number;
    percent_change_1y: number;
    ath_price: number;
    ath_date: string;
    percent_from_price_ath: number;
}
interface ICoinTickers {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: IUSD;
    };
}

export async function fetchCoinTickers(coinId: string) {
    return (await fetch(`${BASE_URL}/tickers/${coinId}`).then((req) =>
        req.json()
    )) as ICoinTickers;
}

export async function fetchCoinHistory(coinId: string) {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 24 * 7;
    return await fetch(
        `${BASE_URL}/coins/${coinId}/ohlcv/historical/start=${startDate}&end=${endDate}`
    ).then((req) => req.json());
}
