// api.js

const API_SEARCH_DOMAIN = "https://gnews.io/api/v4/search?q=";
const API_KEY = process.env.REACT_APP_API_KEY;

// 定义诈骗类别的关键词映射
const scamKeywords = {
  "scams": '"scam" OR "fraud"',
  "investment Scams": '"investment scam" OR "investment fraud" OR "financial scam"',
  "romance Scams": '"romance scam" OR "dating scam" OR "online dating fraud"',
  "phishing Scams": '"phishing scam" OR "cybercrime" OR "email fraud"',
};

// 修改 endpointPath 函数
export const endpointPath = (country, query) => {
  let searchQuery = query;

  // 如果查询词是预定义的诈骗类别之一，使用其对应的关键词
  if (scamKeywords[query]) {
    searchQuery = scamKeywords[query];
  } else {
    // 否则将用户输入的 query 加上 "scam" 作为关键词
    searchQuery = `${query} scam`;
  }

  // 使用 search 端点进行关键词搜索
  return `${API_SEARCH_DOMAIN}${encodeURIComponent(searchQuery)}&country=${country}&lang=en&apikey=${API_KEY}`;
};
