let globalIdPelicula,
  globalImagenPelicula,
  globalNombrePelicula,
  globalNumeroCuentaClienteCadenaBaz,
  globalBotonPago,
  globalCompras,
  globalTokenOperacion,
  globalHeaders,
  globalGiftCard,
  globalGiftCardPayment;

/**
 * Bind JSON to HTML.
 * @param {object} values
 */
function bind(values) {
  const $tags = $("[data-id]");

  $tags.each(function () {
    const $tag = $(this);
    const id = $tag.data("id");
    const value = values[id];

    if (id === "precio") {
      $tag.html(formatAmount(value));
    } else if (id === "saldo") {
      if (value === "false") {
        setTimeout(() => { showAdvice($tag, true); }, 500);
      }
    } else {
      $tag.html(value);
    }
  });
}

/**
 * Parse string to object and then bind.
 * @param {string} strJson
 */
function bindFromStr(strJson) {
  try {
    const json = JSON.parse(strJson);
    bind(json);
  } catch (err) {
    console.log(err);
  }
}

/**
 * Change screen.
 * @param {jQuery} $screen
 * @param {function} callback
 */
function changeScreen($screen, callback) {
  $(".screen").addClass("no-visible");
  $screen.removeClass("no-visible");

  typeof callback === "function" && callback();
}

/**
 * Get amount with currency format.
 * @param {number} amount
 * @returns {string}
 */
function formatAmount(amount) {
  return ("$ " + Number(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 * @returns {String}
 */
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

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
}

/**
 * Handle digit keyup event.
 * @param {KeyboardEvent} event
 */
function handleDigitKeyup({ target, keyCode }) {
  const $parent = $(target.parentNode);

  if (keyCode === 8) {
    if ($parent.prev().length > 0) {
      const $input = $parent.prev().find("input");

      $input.val("");
      $input.focus();
    }
  } else if (keyCode > 47 && keyCode < 58) {
    if (target.value !== "") {
      if ($parent.next().length > 0) {
        const $input = $parent.next().find("input");
        $input.focus();
      }
    }
  }

  validateCode();
}

/**
 * Apply number filter.
 * @param {Event} event
 */
function numberFilter(event) {
  const filter = /^\d{0,1}$/;

  if (filter.test(this.value)) {
    this.oldValue = this.value;
    this.oldSelectionStart = this.selectionStart;
    this.oldSelectionEnd = this.selectionEnd;
  } else if (this.hasOwnProperty("oldValue")) {
    this.value = this.oldValue;
    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
  } else {
    this.value = "";
  }
}

/**
 * Do fake request.
 * @param {function} callback
 */
function fakeRequest(code, callback) {
  setTimeout(() => { callback(code === "000001"); }, 1500);
}

/**
 * Parse location.search to JSON.
 * @returns object
 */
function searchToJson() {
  const pairs = location.search.substring(1).split("&");
  const object = {};
  let i = 0;

  for (; i < pairs.length; i++) {
    if (pairs[i] === "") { continue; }

    const parts = pairs[i].split("=");
    object[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return object;
}

/**
 * Show or hide advice.
 * @param {jQuery} $el
 * @param {boolean} flag
 */
function showAdvice($el, flag) {
  if (flag) {
    $el.addClass("no-visible");
  } else {
    $el.removeClass("no-visible");
  }
}

/**
 * Show or hide loader.
 * @param {boolean} show
 */
function showLoader(show) {
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
}

/**
 * Show or hide error screen.
 * @param {jqXHR} jqXHR
 * @param {string} textStatus
 * @param {string} errorThrown
 */
function showErrorScreen(jqXHR, textStatus, errorThrown) {
  const genericError = 'Tuvimos un problema al conectar con nuestros servicios.';

  $(".error-screen")
    .find('[data-id="mensaje"]')
    .text(jqXHR.responseJSON?.mensaje || genericError);
  $(".error-screen")
    .find('[data-id="folio"]')
    .text(jqXHR.responseJSON?.folio || "-");

  changeScreen($(".error-screen"));
  showLoader(false);
}

/**
 * Validate code from client.
 * @returns {boolean}
 */
function validateCode() {
  const $code = $(".auth-screen .code");
  const $digits = $(".auth-screen .digit input");
  let code = "";

  $digits.each(function () {
    code += this.value;
  });

  if (code.length === 6) {
    showLoader(true);

    fakeRequest(code, (success) => {
      if (success) {
        $code.addClass("valid");

        changeScreen($(".resume-screen"), () => {
          showLoader(false);
        });
      } else {
        showLoader(false);
        $code.addClass("invalid");

        setTimeout(() => {
          $digits.each(function () {
            $(this).val("");
          });
          $digits.eq(0).focus();
        }, 100);
      }
    });
  } else {
    $code.removeClass("valid invalid");
  }
}

// Initialize Detail Screen components.
const searchJson = searchToJson();

showLoader(true);
request.movieById(
  searchJson["id"],
  function (data) {
    console.log("%o", data);

    const { resultado: { datosFlujo, headers, idFlujo }, } = data;

    globalHeaders = headers;

    if (idFlujo === "COMPRA_GIFTCARD") {
      const { giftCard, giftCardPayment } = datosFlujo;

      globalGiftCard = giftCard;
      globalGiftCardPayment = giftCardPayment;

      $('.gitCard-amout').find('[data-id="nombre"]').text(globalGiftCard.name);
      $('.gitCard-amout').find('[data-id="montos"]').empty();

      globalGiftCard.amounts.forEach(amount => {
        const optionEl = document.createElement('option');

        optionEl.setAttribute('value', amount.id);
        optionEl.innerText = formatAmount(amount.precios);
        optionEl.obj = amount;
        optionEl.classList.add('colorPrice');

        $('.gitCard-amout').find('[data-id="montos"]').append(optionEl);
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
  request.paymentButton({ transaccion: { ...globalBotonPago, tokenOperacion: globalTokenOperacion }, }, paymentButtonHeaders, function (data) {
      console.log("scripts.js: Payment button. %o", data);

      const { resultado: { fechaOperacion, horaOperacion }, } = data;
      request.buyMovie(globalIdPelicula, { transaccion: { ...globalCompras, fechaOperacion: data.resultado.fechaOperacion, numeroMovimiento: data.resultado.numeroMovimiento, }, }, buyMovieHeaders, function (data) {
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

// Initialize Auth Screen components.
const $digits = $(".auth-screen .digit input");

$digits.on("keypress keydown keyup input change paste", numberFilter);
$digits.on("keyup", handleDigitKeyup);

$digits.eq(0).focus();

// Initialize share button.
$(".share-btn").on("click", function () {
  console.log("scripts.js: Sharing ticket");
});

// Initialize movie button.
$(".movie-btn").on("click", function () {
  console.log("scripts.js: Go to movie button click.");
  console.log("scripts.js: %s detected.", getMobileOperatingSystem());

  const seeMovieHref = getMobileOperatingSystem() === 'iOS' 
    ? `gssapp://sapp?flowName=GSIFMod&data=${btoa(globalIdPelicula)}`
    : `intent://?verPelicula?data=${btoa(globalIdPelicula)}#Intent;scheme=sappdl;action=android.intent.action.VIEW;S.browser_fallback_url=https%3A%2F%2Fplay.google.com/store/apps/details?id=mx.app.baz.superapp;end`;

  $(".success-screen").find('[data-id="nombre"]').text(globalNombrePelicula);
  $(".success-screen")
    .find(".see-movie-href")
    .attr("href", seeMovieHref);

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
