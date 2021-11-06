let globalIdPelicula,
  globalImagenPelicula,
  globalNombrePelicula,
  globalNumeroCuentaClienteCadenaBaz,
  globalBotonPago,
  globalCompras,
  globalTokenOperacion,
  globalHeaders,
  globalGiftCard,
  globalGiftCardPayment,
  globalValueId;

showLoader(true);
request.operationById(searchJson["id"], function (data) {
    console.log("%o", data);

    const { resultado: { datosFlujo, headers, idFlujo }, } = data;

    globalHeaders = headers;

    if (idFlujo === "COMPRA_GIFTCARD") {
      const { giftCard, giftCardPayment } = datosFlujo;

      globalGiftCard = giftCard;
      globalGiftCardPayment = giftCardPayment;

      $(".gitCard-amout").find('[data-id="nombre"]').text(globalGiftCard.name);

      const $selectAmount = $(".gitCard-amout").find('[data-id="montos"]');
      $selectAmount.empty();

      globalGiftCard.amounts.forEach((amount) => {
        if (amount.precios.length > 0 && amount.precios) {
          const optionEl = document.createElement("option");

          optionEl.setAttribute("value", amount.id);
          optionEl.innerText = formatAmount(amount.precios[0]);
          optionEl.obj = amount;
          optionEl.classList.add("colorPrice");

          $selectAmount.append(optionEl);
        }
      });

      globalValueId = $selectAmount.val();
      $selectAmount.on("change", function () {
        globalValueId = $selectAmount.val();
      });

      changeScreen($(".gitCard-amout"));
    } else {
      const {
        idPelicula,
        imagenPelicula,
        nombrePelicula,
        numeroCuentaClienteCadenaBaz,
        botonPago,
        compras,
        tokenOperacion,
      } = datosFlujo;

      globalIdPelicula = idPelicula;
      globalImagenPelicula = imagenPelicula;
      globalNombrePelicula = nombrePelicula;
      globalNumeroCuentaClienteCadenaBaz = numeroCuentaClienteCadenaBaz;
      globalBotonPago = botonPago.transaccion;
      globalCompras = compras.transaccion;
      globalTokenOperacion = tokenOperacion;

      // Fill detail screen.
      $(".detail-screen").find('[data-id="nombre"]').text(globalNombrePelicula);
      $(".detail-screen")
        .find('[data-id="precio"]')
        .text(formatAmount(globalBotonPago.detallePago.montoEnvio));
      $(".detail-screen")
        .find('[data-id="tarjeta"]')
        .text(globalNumeroCuentaClienteCadenaBaz);

      changeScreen($(".detail-screen"));
    }

    showLoader(false);
  },
  showErrorScreen
);

const $advices = $(".advice.fixed");
$advices.each(function () {
  const $advice = $(this);
  const $closeBtn = $advice.find(".close-btn");

  $closeBtn.on("click", function () {
    showAdvice($advice, false);
  });
});

$(".rent-button").on("click", function () {
  console.log("scripts.js: Click rent button.");

  const paymentButtonHeaders = { ...globalHeaders };
  const buyMovieHeaders = { ...globalHeaders };

  delete buyMovieHeaders["x-id-operacion-conciliacion"];

  showLoader(true);
  request.paymentButton(
    {
      transaccion: { ...globalBotonPago, tokenOperacion: globalTokenOperacion },
    },
    paymentButtonHeaders,
    function (data) {
      console.log("scripts.js: Payment button. %o", data);

      const {
        resultado: { fechaOperacion, horaOperacion },
      } = data;
      request.buyMovie(
        globalIdPelicula,
        {
          transaccion: {
            ...globalCompras,
            fechaOperacion: data.resultado.fechaOperacion,
            numeroMovimiento: data.resultado.numeroMovimiento,
          },
        },
        buyMovieHeaders,
        function (data) {
          console.log("scripts.js: Buy movie. %o", data);

          const { folio } = data;
          // Fill resume screen.
          $(".resume-screen")
            .find('[data-id="fecha"]')
            .text(`${fechaOperacion}, ${horaOperacion}`);
          $(".resume-screen")
            .find('[data-id="precio"]')
            .text(formatAmount(globalBotonPago.detallePago.montoEnvio));
          $(".resume-screen")
            .find('[data-id="tarjeta"]')
            .text(globalNumeroCuentaClienteCadenaBaz);
          $(".resume-screen")
            .find('[data-id="nombre"]')
            .text(globalNombrePelicula);
          $(".resume-screen")
            .find('[data-id="precio"]')
            .text(formatAmount(globalBotonPago.detallePago.montoEnvio));
          $(".resume-screen").find('[data-id="folio"]').text(folio);

          changeScreen($(".resume-screen"));
          showLoader(false);
        },
        showErrorScreen
      );
    },
    showErrorScreen
  );
});

// Initialize share button.
$(".share-btn").on("click", function () {
  console.log("scripts.js: Sharing ticket");
});

// Initialize movie button.
$(".movie-btn").on("click", function () {
  console.log("scripts.js: Movie button click.");
  console.log("scripts.js: %s detected.", getMobileOperatingSystem());

  const seeMovieHref =
    getMobileOperatingSystem() === "iOS"
      ? `gssapp://sapp?flowName=GSIFMod&data=${btoa(globalIdPelicula)}`
      : `intent://?verPelicula?data=${btoa(
          globalIdPelicula
        )}#Intent;scheme=sappdl;action=android.intent.action.VIEW;S.browser_fallback_url=https%3A%2F%2Fplay.google.com/store/apps/details?id=mx.app.baz.superapp;end`;

  $(".success-screen").find('[data-id="nombre"]').text(globalNombrePelicula);
  $(".success-screen").find(".see-movie-href").attr("href", seeMovieHref);

  // Wait for image is already loaded.
  if (globalImagenPelicula) {
    $(`<img src="${globalImagenPelicula}">`).on("load", function () {
      $(".success-screen")
        .find('[data-id="imagen"]')
        .attr("style", `background-image: url(${globalImagenPelicula})`)
        .addClass("displayed");
    });
  }

  changeScreen($(".success-screen"));
});

// * Change screen gitCard-amout -> detail-screen
$(".gitCard-amout .button").on("click", function () {
  console.log("scripts.js: Go to resume screen.");

  const { name, amounts } = globalGiftCard;
  const {
    transaccion: {
      transaccionOperacion: { cuenta },
    },
  } = globalGiftCardPayment;
  const amount = amounts.find((a) => a.id === globalValueId);

  $(".detail-screen").find('[data-id="tarjeta"]').text(maskAccount(cuenta));
  $(".detail-screen").find('[data-id="servicio"]').text(name);
  $(".detail-screen")
    .find('[data-id="precio"]')
    .text(formatAmount(amount.precios[0]));

  changeScreen($(".detail-screen"));
});

// * Change screen detail-screen -> resume-screen
$(".detail-screen .pay-button").on("click", function () {
  console.log("scripts.js: Pay giftcard");

  const { name, amounts } = globalGiftCard;
  const {
    transaccion: {
      transaccionOperacion: { cuenta },
    },
  } = globalGiftCardPayment;
  const body = { ...globalGiftCardPayment };
  const amount = amounts.find((a) => a.id === globalValueId);

  body.transaccion.transaccionOperacion.monto = amount.precios[0];

  showLoader(true);
  request.paymentGiftcard(
    globalValueId,
    body,
    globalHeaders,
    function (data) {
      console.log("scripts.js: Payment giftcard. %o", data);

      changeScreen($(".resume-screen"));

      // Fill resume screen.
      $(".resume-screen").find('[data-id="fecha"]').text(getTodayDate());
      $(".resume-screen")
        .find('[data-id="precio"]')
        .text(formatAmount(amount.precios[0]));
      $(".resume-screen").find('[data-id="tarjeta"]').text(maskAccount(cuenta));
      $(".resume-screen").find('[data-id="nombre"]').text(name);
      $(".resume-screen")
        .find('[data-id="precio"]')
        .text(formatAmount(amount.precios[0]));
      $(".resume-screen").find('[data-id="folio"]').text(data.folio);

      showLoader(false);
    },
    showErrorScreen
  );
});

// * Change screen resume-screen -> success-screen
$(".giftcard-btn").on("click", function () {
  console.log("scripts.js: Giftcard button click.");

  const { name, amounts } = globalGiftCard;
  const amount = amounts.find((a) => a.id === globalValueId);
  const giftcards = [
    "amazon",
    "blim",
    "nintendo",
    "playstation",
    "spotify",
    "uber",
    "xbox",
    "netflix",
    "cinepolis",
  ];

  $(".success-screen").find('[data-id="nombre"]').text(name);
  $(".success-screen")
    .find('[data-id="precio"]')
    .text(formatAmount(amount.precios[0]));

  if (giftcards.indexOf(name) !== -1) {
    $(`<img src="../../assets/images/logo-${name}.png">`).on(
      "load",
      function () {
        $(".success-screen")
          .find('[data-id="imagen"]')
          .attr(
            "style",
            `background-image: url(../../assets/images/logo-${name}.png)`
          )
          .addClass("displayed");
      }
    );
  }

  changeScreen($(".success-screen"));
});