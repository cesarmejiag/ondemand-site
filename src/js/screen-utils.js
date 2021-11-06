import { formatAmount, maskAccount } from "./utils";

/**
 * Bind JSON values to HTML elements.
 * @param {jQuery} $screen
 * @param {object} values
 */
export const bind = ($screen, values) => {
  const $tags = $screen.find("[data-id]");

  $tags.each(function () {
    const $tag = $(this);
    const id = $tag.data("id");
    const value = values[id];

    if (id === "precio") {
      $tag.text(formatAmount(value));
    } else if (id === "montos") {
      $tag.empty().append(value);
    } else if (id === "tarjeta") {
      $tag.text(maskAccount(value));
    } else if (id === "imagen") {
      // Seriusly do nothing.
    } else {
      $tag.text(value);
    }
  });
};

/**
 * Parse string to object and then bind.
 * @param {string} strJson
 */
export const bindFromStr = (strJson) => {
  try {
    const json = JSON.parse(strJson);
    bind(json);
  } catch (err) {
    console.log(err);
  }
};

/**
 * Change screen.
 * @param {jQuery} $screen
 * @param {function} callback
 */
export const changeScreen = ($screen, callback) => {
  $(".screen").addClass("no-visible");
  $screen.removeClass("no-visible");

  typeof callback === "function" && callback();
};

/**
 * Show or hide advice.
 * @param {jQuery} $el
 * @param {boolean} flag
 */
export const showAdvice = ($el, flag) => {
  if (flag) {
    $el.addClass("no-visible");
  } else {
    $el.removeClass("no-visible");
  }
};

/**
 * Show or hide loader.
 * @param {boolean} show
 */
export const showLoader = (show) => {
  let $loader = $(".loader");

  if (show) {
    if ($loader.length <= 0) {
      $loader = $('<div class="loader">');
    }

    $("body").append($loader);
    setTimeout(() => $loader.addClass("loader-visible"), 10);
  } else {
    $loader.removeClass("loader-visible");
    setTimeout(() => $loader.remove(), 375);
  }
};

/**
 * Show or hide error screen.
 * @param {jqXHR} jqXHR
 * @param {string} textStatus
 * @param {string} errorThrown
 */
export const showErrorScreen = (jqXHR) => {
  bind($(".error-screen"), {
    mensaje: jqXHR.responseJSON?.mensaje || "Tuvimos un problema al conectar con nuestros servicios.",
    folio: jqXHR.responseJSON?.folio || "-",
  });

  changeScreen($(".error-screen"));
  showLoader(false);
};
