import { request } from "./request";
import {
  bind,
  changeScreen,
  showErrorScreen,
  showLoader,
} from "./screen-utils";
import { formatAmount, getTodayDate } from "./utils";

let globals = {};

/**
 * Create amount options.
 * @param {object[]} amounts
 * @returns {jQuery[]}
 */
const createAmountOptions = (amounts) =>
  amounts.map((amount) =>
    $("<option>")
      .addClass("colorPrice")
      .data("amount", amount)
      .attr("value", amount.id)
      .text(formatAmount(amount.precios[0]))
  );

/**
 * Show detail screen.
 */
const showDetailScreen = () => {
  console.log("giftcard.js: Show detail screen.");

  const { name } = globals.giftCard;
  const { transaccion: { transaccionOperacion: { cuenta } } } = globals.giftCardPayment;

  bind($(".detail-screen"), {
    tarjeta: cuenta,
    servicio: name,
    precio: globals.selectedAmount.precios[0],
  });

  // Attach click handler to change the view.
  $(".detail-screen .pay-button").on("click", showResumeScreen);

  changeScreen($(".detail-screen"));
};

/**
 * Show resume screen.
 */
const showResumeScreen = () => {
  const { headers, giftCard, giftCardPayment, selectedAmount } = globals;
  const body = { ...giftCardPayment };
  body.transaccion.transaccionOperacion.monto = selectedAmount.precios[0];

  showLoader(true);
  request.paymentGiftcard(selectedAmount.id, body, headers, (data) => {
    const { name } = giftCard;
    const { transaccion: { transaccionOperacion: { cuenta } } } = giftCardPayment;

    bind($(".resume-screen"), {
      fecha: getTodayDate(),
      precio: selectedAmount.precios[0],
      tarjeta: cuenta,
      nombre: name,
      folio: data.folio
    });

    console.log("giftcard.js: Show resume screen.");

    changeScreen($(".resume-screen"));
    showLoader(false);

    // Attach click handler to change the view.
    $(".resume-screen .giftcard-btn").on("click", showSuccessScreen);

  }, showErrorScreen);
};

/**
 * Show success screen.
 */
const showSuccessScreen = () => {
  console.log("giftcard.js: Show success screen.");

  const { giftCard: { name },  selectedAmount } = globals;
  const giftcards = [
    "amazon", "blim", "nintendo", "playstation",
    "spotify", "uber", "xbox", "netflix", "cinepolis",
  ];

  bind($(".success-screen"), {
    nombre: name,
    precio: selectedAmount.precios[0]
  });

  if (giftcards.indexOf(name) !== -1) {
    $(`<img src="../../assets/images/logo-${name}.png">`).on("load", function () {
        $(".success-screen")
          .find('[data-id="imagen"]')
          .attr("style", `background-image: url(../../assets/images/logo-${name}.png)`)
          .addClass("displayed");
      }
    );
  }

  changeScreen($(".success-screen"));
};

/**
 * Initialize giftcard.
 * @param {Object} data
 */
export const initGiftcard = (data) => {
  console.log("giftcard.js: Initialize giftcards.");

  const { resultado: { datosFlujo, headers } } = data;
  const { giftCard, giftCardPayment } = datosFlujo;
  const { name, amounts } = giftCard;
  const $amountsSelect = $(".gitCard-amout").find('[data-id="montos"]');

  // Store globals, their will be used again in other services.
  globals = { ...globals, headers, giftCard, giftCardPayment };
  console.log("giftcard.js: Stored globals %o", globals);

  bind($(".gitCard-amout"), {
    nombre: name,
    montos: createAmountOptions(amounts),
  });

  // Store first value and attach change handler to update selectedAmount.
  globals.selectedAmount = $amountsSelect
    .find("option:selected")
    .data("amount");

  $amountsSelect.on("change", function () {
    globals.selectedAmount = $amountsSelect
      .find("option:selected")
      .data("amount");
  });

  // Attach click handler to change the view.
  $(".gitCard-amout .button").on("click", showDetailScreen);

  changeScreen($(".gitCard-amout"));
  showLoader(false);
};
