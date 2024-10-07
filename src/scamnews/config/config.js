import moment from "moment";

export const navbarBrand = "Scam News";
export const header = (category) => `Newest ${category} `;
export const noFound = "No Results Found";
export const searching = "Searching...";

export const arrow = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
  </svg>
);

export const navs = [
  { nav: "Investment", page: "/categories/investment-scam" },
  { nav: "Dating & Romance", page: "/categories/romance-scam" },
  { nav: "Travel, prizes and lottery scams", page: "/categories/phishing-scam" },
];

export const router = [
  { path: "/scam", key: "scam", category: "scams", country: "au" },
  { path: "/categories/investment-scam", key: "investment-scam", category: "investment Scams", country: "au" },
  { path: "/categories/romance-scam", key: "romance-scam", category: "romance Scams", country: "au" },
  { path: "/categories/phishing-scam", key: "phishing-scam", category: "phishing Scams", country: "au" }
];

export const summary = "Channel and PublishedAt";
export const newsChannel = (channel) => `${channel}`;
export const lastUpdate = (published) => `${moment(published).format("ddd, DD MMM YYYY HH:mm:ss")}`;
