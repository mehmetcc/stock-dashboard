const nextConfig = {
  env: {
    NEXT_PUBLIC_STOCKS_API_URL:
      process.env.NEXT_PUBLIC_STOCKS_API_URL ||
      'http://localhost:8000/api/v1/stock',
    NEXT_PUBLIC_WEBSOCKET_URL:
      process.env.NEXT_PUBLIC_WEBSOCKET_URL ||
      'ws://localhost:8000/api/v1/ws',
  },
};

export default nextConfig;
