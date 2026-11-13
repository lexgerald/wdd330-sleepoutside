import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const STORAGE_KEY = "so-comments";

// Returns all comments for one product, newest last
export function getComments(productId) {
  const all = getLocalStorage(STORAGE_KEY) || {};
  return all[productId] || [];
}

// Adds a comment { name, text, date } for a product
export function addComment(productId, name, text) {
  const all = getLocalStorage(STORAGE_KEY) || {};
  if (!all[productId]) all[productId] = [];
  all[productId].push({
    name: name.trim(),
    text: text.trim(),
    date: new Date().toISOString(),
  });
  setLocalStorage(STORAGE_KEY, all);
}