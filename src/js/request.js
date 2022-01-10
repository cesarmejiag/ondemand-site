export const request = {
  BASE_URL: 'https://apigateway.superappbaz.com/integracion/superapp', // Dev
  // BASE_URL: "https://api.baz.app/superapp", // Prod

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
    // request.send(url, "GET", undefined, headers, success, error);
    success({"mensaje":"Operación Exitosa.","folio":"3a4961bec6696fe7-3a4961bec6696fe7","resultado":{"idFlujo":"COMPRA_GIFTCARD","headers":{"x-id-dispositivo":"2793EBCA05A34BCFAF1DD3D96724EF85","x-sistema-dispositivo":"iOS","x-nombre-dispositivo":"iPhone de Cristian Eduardo","x-version-dispositivo":"15.1.1","x-operador-telefonia":"AT&T","Accept":"*/*","x-fabricante-dispositivo":"Apple","Content-Type":"application/json","x-latitud":"19.27955118009466","x-longitud":"-99.18507884265779","x-serie-procesador":"00000000-0000-0000-0000-000000000000","Authorization":"Bearer eyJraWQiOiJkczdRNlBTbE9ZNStuMnJjXC9PdjJqTGp5eWZRS2VJdmFjRXcwWHlNQm80cz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxOGg4dmFudnJoNHB1aTFscm50YzFuaWxqZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiVXN1YXJpb1wvZGVsZXRlIFVzdWFyaW9cL3JlYWQgVXN1YXJpb1wvdXBkYXRlIiwiYXV0aF90aW1lIjoxNjQxODU1MzAxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9FaEZuSU9JRzAiLCJleHAiOjE2NDE4NTg5MDEsImlhdCI6MTY0MTg1NTMwMSwidmVyc2lvbiI6MiwianRpIjoiZmQ3NGEzZTUtOTRmNC00NDkxLWI5MTktZTVkNThkNDdlYjcxIiwiY2xpZW50X2lkIjoiMThoOHZhbnZyaDRwdWkxbHJudGMxbmlsamYifQ.cm7VouaAGAo2RYuCjAXIfTNPOYVhZjCBLmPIuJUvG_Olwn-9hwOPc2v_MHthJYxWcDYX4IQPzNfqWvnkH0T1BOPTgA3gVb8AjzrPFw4eq_jgKC2G9IFkF5hC38mq3hsgpZSE8GMqOXNTe3U2Piccl7bHsmeTT-fSEa3cGo_GFNyXrdKk9BYWF2DTwD94KRjh-j5Srw7KOJzpKjLzM4kt9hgxxzGnwXXsmpSzhiyje2fSx_WGM8qoBCc79EEShbvmFTVf8OmbMDGMRBy47BtR1Rnvx8dSqRfYs_PQIJML27nE3dCbaw0keUmKtgwovgbwYxs5HNTrWu0Oy7m1x5kc_w","x-id-lealtad":"","x-token-usuario":"efa400dbfbe2ffaa688474e547772d71","x-id-interaccion":"8D857C86-74C5-489D-9C14-09F9BFB145F2","x-version-aplicacion":"1.1.7","x-modelo-dispositivo":"iPhone 12 Mini","x-sicu":"bb693233b5d24ceebfe2f2e79a63593c"},"datosFlujo":{"giftCard":{"amount":0,"phone":"5611728189","id":"","email":"justcristianvillegas@gmail.com","commission":"","name":"amazon","amounts":[{"id":"13696","comision":"5.29","precios":["300.00"]},{"id":"13697","comision":"8.82","precios":[]}]},"giftCardPayment":{"transaccion":{"geolocalizacion":{"latitud":"19.27955118009466","longitud":"-99.18507884265779"},"transaccionOperacion":{"monto":"","cuenta":""},"token":"51818091","notificacion":{"celular":"5611728189","correo":"justcristianvillegas@gmail.com"}}}}}});
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
