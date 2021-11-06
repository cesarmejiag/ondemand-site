export const request = {
  // BASE_URL: 'https://apigateway.superappbaz.com/integracion/superapp', // Dev
  BASE_URL: "https://api.baz.app/superapp", // Prod

  /**
   * Request buyMovie service.
   * @param {number} idMovie
   * @param {object} body
   * @param {object} headers
   * @param {function} success
   * @param {function} error
   */
  buyMovie(idMovie, body, headers, success, error) {
    const url = `${request.BASE_URL}/diversion/gestion-peliculas/v1/peliculas/${idMovie}/compras`;
    request.send(url, "POST", body, headers, success, error);
  },

  /**
   * Request operationById service.
   * @param {string} idOperation
   */
  operationById(idOperation, success, error) {
    const url = `${request.BASE_URL}/canal/clientes/gestion-sesiones/v1/portal/operaciones/${idOperation}`;
    // Use fake header for the first time because at this point the web page hasn't communication with mobile device.
    const headers = {
      "x-sicu": "3bad1290ac4600a569162efaa09117ea",
      "x-id-interaccion": "123e4567-e89b-12d3-a456-426655440000",
      "x-token-usuario": "SRfVZrTYvdm7mzzZmcuiDViACkAx",
    };
    request.send(url, "GET", undefined, headers, success, error);
  },

  /**
   * Request payment button service.
   * @param {object} body
   * @param {object} headers
   * @param {function} success
   * @param {function} error
   */
  paymentButton(body, headers, success, error) {
    const url = `${request.BASE_URL}/pagos/captacion/traspasos/v1/boton-pago`;
    request.send(url, "POST", body, headers, success, error);
  },

  /**
   * Request payment giftcard service.
   * @param {number} idOperator
   * @param {object} body
   * @param {object} headers
   * @param {function} success
   * @param {function} error
   */
  paymentGiftcard(idOperator, body, headers, success, error) {
    const url = `${request.BASE_URL}/pagos/corresponsalia-bancaria/operaciones-arcus/v1/operadores/${idOperator}/recargas/tarjetas-regalo`;
    request.send(url, "POST", body, headers, success, error);
  },

  /**
   * Make request.
   * @param {string} url
   * @param {string} method
   * @param {object} body
   * @param {object} jsonHeaders
   * @param {function} success
   * @param {function} error
   */
  send(url, method, body, jsonHeaders, success, error) {
    console.log(`request.js: Request [${method}] ${url}`);

    $.ajax({
      url,
      method,
      contentType: "application/json",
      processData: false,
      timeout: 10000,
      headers: jsonHeaders,
      data: JSON.stringify(body),
      success: function (data, textStatus, jqXHR) {
        console.log(`request.js: Response [${method}] ${url} %o`, data);
        success(data, textStatus, jqXHR);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(`request.js: Response [${method}] ${url}`);
        error(jqXHR, textStatus, errorThrown);
      },
    });
  },
};
