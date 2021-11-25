/**
 * Capitalize text.
 * @param {string} text 
 */
 export const capitalize = (text) => {
  // Implement.
};

/**
 * Format amount to currency format.
 * @param {number} amount
 * @returns {string}
 */
export const formatAmount = (amount) =>
  `$ ${Number(amount)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

/**
 * Get today date with format.
 * @returns {string}
 */
export const getTodayDate = () => {
  const months = [
    "Ene", "Feb", "Mar", "Abr",
    "May", "Jun", "Jul", "Ago",
    "Sep", "Oct", "Nov", "Dic",
  ];
  const now = new Date();
  const date = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  const hour = `${now.getHours()}:${now.getMinutes()}`;

  return `${date}, ${hour}`;
};

/**
 * Send notification to google analtyics.
 * @param {Object} data
 */
export const gaEvent = ({ cateogry, action, label }) => {
  console.log('utils.js: ')
};

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 * @returns {String}
 */
export const getMobileOperatingSystem = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }
  if (/android/i.test(userAgent)) {
    return "Android";
  }
  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  return "unknown";
};

/**
 * Apply mask to user account.
 * @param {string} account
 * @returns {string}
 */
export const maskAccount = (account) =>
  account.replace(/(\d+)(?=\d{4})/, "baz ***");

/**
 * Parse location.search to JSON.
 * @returns {object}
 */
export const searchToJson = () => {
  const pairs = location.search.substring(1).split("&");
  const object = {};
  let i = 0;

  for (; i < pairs.length; i++) {
    if (pairs[i] === "") {
      continue;
    }

    const parts = pairs[i].split("=");
    object[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return object;
};
