import { request } from "./request";
import { bind, changeScreen, showErrorScreen, showLoader } from "./screen-utils";

let globals = {};

/**
 * Show resume screen.
 */
const showResumeScreen = () => {
  const { headers } = globals;
  const body = { transaccion: { ...globals.datosFlujo.botonPago } }; // Aquí me quedé

  showLoader(true);
  request.paymentButton(body, headers, () => {}, showErrorScreen);
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
