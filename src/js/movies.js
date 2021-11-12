import { request } from "./request";
import { bind, changeScreen, showErrorScreen, showLoader } from "./screen-utils";

let globals = {};

/**
 * Show resume screen.
 */
const showResumeScreen = () => {
  const { headers, datosFlujo } = globals;
  const { idPelicula, botonPago, tokenOperacion, numeroCuentaClienteCadenaBaz, nombrePelicula } = datosFlujo;
  const body = { transaccion: { ...botonPago, tokenOperacion } };

  showLoader(true);
  request.paymentButton(body, headers, (data) => {
    const { resultado: { fechaOperacion, horaOperacion, numeroMovimiento } } = data;
    const body = { transaccion: { fechaOperacion, numeroMovimiento } };
    const buyMovieHeaders = { ...headers };

    delete buyMovieHeaders["x-id-operacion-conciliacion"];

    request.buyMovie(idPelicula, body, buyMovieHeaders, (data) => {
      const { folio } = data;

      bind($(".resume-screen"), {
        fecha: `${fechaOperacion}, ${horaOperacion}`,
        precio: botonPago.detallePago.montoEnvio,
        tarjeta: numeroCuentaClienteCadenaBaz,
        nombre: nombrePelicula,
        folio: folio 
      });

      // Attach click handler to change the view.
      $(".resume-screen .movie-btn").on("click", showSuccessScreen);

      changeScreen($(".resume-screen"));
      showLoader(false);
    }, showErrorScreen);
  }, showErrorScreen);
}

/**
 * Show success screen.
 */
const showSuccessScreen = () => {
  console.log(`movies.js: ${getMobileOperatingSystem()} detected.`);

  const { idPelicula, nombrePelicula, imagenPelicula } = globals.datosFlujo;
  const seeMovieHref = getMobileOperatingSystem() === "iOS"
    ? `gssapp://sapp?flowName=GSIFMod&data=${btoa(idPelicula)}`
    : `intent://?verPelicula?data=${btoa(idPelicula)}#Intent;scheme=sappdl;action=android.intent.action.VIEW;S.browser_fallback_url=https%3A%2F%2Fplay.google.com/store/apps/details?id=mx.app.baz.superapp;end`;

  bind($(".success-screen"), { nombre: nombrePelicula });
  $(".success-screen").find(".see-movie-href").attr("href", seeMovieHref);

  // Wait for image is already loaded.
  if (imagenPelicula) {
    $(`<img src="${imagenPelicula}">`).on("load", function () {
      $(".success-screen")
        .find('[data-id="imagen"]')
        .attr("style", `background-image: url(${imagenPelicula})`)
        .addClass("displayed");
    });
  }

  changeScreen($(".success-screen"));
}

export const initMovies = (data) => {
  console.log("movies.js: Initialize movies.");

  const { resultado: { headers, datosFlujo } } = data;
  const { nombrePelicula, botonPago, numeroCuentaClienteCadenaBaz } = datosFlujo;

  // Store globals, their will be used again in other services.
  globals = { ...globals, ...datosFlujo, headers };
  console.log("movies.js: Stored globals %o", globals);

  bind($(".detail-screen"), {
    nombre: nombrePelicula,
    precio: botonPago.transaccion.detallePago.montoEnvio,
    tarjeta: numeroCuentaClienteCadenaBaz
  });
  
  // Attach click handler to change the view.
  $(".detail-screen .rent-button").on("click", showResumeScreen);

  changeScreen($(".detail-screen"));
  showLoader(false);
};
