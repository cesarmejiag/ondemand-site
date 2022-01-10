import { request } from "./request";
import { changeScreen, showErrorScreen, showLoader } from "./screen-utils";
import { formatAmount, ga, getTodayDate } from "./utils";

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

  // Attach click handler to change the view.
  $(".detail-screen .pay-button").on("click", () => {
    showResumeScreen();
    ga('ui_interaction', {
      "screen_name": "resumen",
      "type": "click",
      "element": "pagar"
    });
  });

  console.log(globals);

  changeScreen($(".detail-screen"), {
    tarjeta: cuenta,
    servicio: name,
    precio: globals.selectedAmount.precios[0],
  }, {
    "screen_name": "resumen"
  });
};

/**
 * Show resume screen.
 */
const showResumeScreen = () => {
  const { headers, giftCard, giftCardPayment, selectedAmount } = globals;
  const { name } = giftCard;
  const body = { ...giftCardPayment };

  body.transaccion.transaccionOperacion.monto = selectedAmount.precios[0];
  headers['x-id-marca-tarjeta'] = `${selectedAmount.id} | ${name}`;
  showLoader(true);

  request.paymentGiftcard(selectedAmount.id, body, headers, (data) => {
    const { transaccion: { transaccionOperacion: { cuenta } } } = giftCardPayment;

    // Attach click handler to change the view.
    $(".resume-screen .giftcard-btn").on("click", () => {
      showSuccessScreen();
      ga('ui_interaction', {
        "screen_name": "pago_exitoso",
        "type": "click",
        "element": "continuar"
      });
    });

    console.log("giftcard.js: Show resume screen.");

    changeScreen($(".resume-screen"), {
      fecha: getTodayDate(),
      precio: selectedAmount.precios[0],
      tarjeta: cuenta,
      nombre: name,
      folio: data.folio
    }, {
      "event_name": "pago_tarjetas_digitales_success",
      "screen_name": "pago_exitoso",
      "product": name,
      "amount": formatAmount(selectedAmount.precios[0])
    });

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

  if (giftcards.indexOf(name) !== -1) {
    $(`<img src="../../assets/images/logo-${name}.png">`).on("load", function () {
        $(".success-screen")
          .find('[data-id="imagen"]')
          .attr("style", `background-image: url(../../assets/images/logo-${name}.png)`)
          .addClass("displayed");
      }
    );
  }

  changeScreen($(".success-screen"), {
    nombre: name,
    precio: selectedAmount.precios[0]
  }, {
    "screen_name": "felicidades"
  });
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
  $(".gitCard-amout .button").on("click", () => {
    showDetailScreen();
    ga('ui_interaction', {
      "screen_name": "elegir_monto",
      "type": "click",
      "element": "continuar"
    });
  });

  changeScreen($(".gitCard-amout"), {
    nombre: name,
    montos: createAmountOptions(amounts),
  }, {
    "screen_name": "elegir_monto"
  });
};
