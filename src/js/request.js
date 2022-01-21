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
    request.send(url, "GET", undefined, headers, success, error);
    /* setTimeout(() => {
      success({
        "mensaje": "Operación Exitosa.",
        "folio": "5721c87a6aca900e-5721c87a6aca900e",
        "resultado": {
          "idFlujo": "RENTA_PELICULA",
          "headers": {
            "x-sicu": "a46a165f2a4746e7abcc4de915c6000d",
            "x-id-interaccion": "6f3264cf-9486-4a0a-8ddc-b3bfddc923ae",
            "x-token-usuario": "34a360c2248444356db82dca75e01bc7",
            "Authorization": "Bearer eyJraWQiOiJkczdRNlBTbE9ZNStuMnJjXC9PdjJqTGp5eWZRS2VJdmFjRXcwWHlNQm80cz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyNnQ0OWQ1djhrYTZhcTlvZnFiajQyNWU5ZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiVXN1YXJpb1wvZGVsZXRlIFVzdWFyaW9cL3JlYWQgVXN1YXJpb1wvdXBkYXRlIiwiYXV0aF90aW1lIjoxNjQxODU1MjQ1LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9FaEZuSU9JRzAiLCJleHAiOjE2NDE4NTg4NDUsImlhdCI6MTY0MTg1NTI0NSwidmVyc2lvbiI6MiwianRpIjoiNDkxZWEyZGEtYWNmZC00NzEyLTgwNjktYmQ4NjU4ZTRhOTVhIiwiY2xpZW50X2lkIjoiMjZ0NDlkNXY4a2E2YXE5b2ZxYmo0MjVlOWYifQ.dRpc5L3tJmZtiIQX3ZdJqvCbktHi8_00Ou8e03SssFwJb3FezUjuTsbDxhmQ9woYN36tVvItdKdVxwm6Qu_yZTgSqXBVu2lhyKH2NSw0kE8Y9DaOCQnlpoMfPg0B87DNHMPvJ7UHjc7mHEPFRaqebfj0-M8zYcx24BdiHFmAzK9Mk-pTjb0VLRvcQ_ulJzV5swraeVs2cAGon3dtNJUiVP7dQqcCooj3a2lFCpTsL97PeoV8TmZelTUDOweEefCCYB2usKBO_EvxJNhEBsUzlxychqmkBeKX-nfkXHM6FAla2wkXLEcgioxCVSF6KL3sbYE2oyoKjwoH8XTvA2d9bA",
            "x-id-operacion-conciliacion": "CP88kT1AmvzTNlgnU_LsPA",
            "x-id-dispositivo": "72c4f7a5-c942-438a-820e-0874b4037fea",
            "accept": "",
            "x-nombre-dispositivo": "",
            "x-sistema-dispositivo": "WEB",
            "x-version-dispositivo": "",
            "x-version-aplicacion": "",
            "x-modelo-dispositivo": "",
            "x-fabricante-dispositivo": "",
            "x-serie-procesador": "",
            "x-operador-telefonia": "",
            "x-latitud": "",
            "x-longitud": "",
            "x-id-lealtad": ""
          },
          "datosFlujo": {
            "idPelicula": "74308",
            "nombrePelicula": "En busca de la grandeza",
            "imagenPelicula": "https://imgn.cdn.iutpcdn.com/IMGS/VOD/COVER/550763-8c.jpg",
            "numeroCuentaClienteCifradoRsa": "ZIFDUrf7907AY5ZqXk4fnXlJE1GsMDUGv8G1aiS0U/j4YQl6zcXcLRv1KxYbhr7bjbK3mnA1C+ch\nE7Z3xAWaOqKqM92yr+awF+zG+DeyZfps0rVrvv8JO5GkJNzrz0ZF1CobxnA8GXGrVbPakGgLcyRw\n6UCtssIiGqg2ne3iRhEBJ1zIurwh1dGB3XAlHY1JklFZX+B2TsdyVuc8TkJ0BzmQHnL2hP2dg2QB\nY5M0PJouhRGAnJz4XKz6tsMI44x/MGm/KGU1J7yRK2NpP3vmHldkzU4gQXyE+Nd4+NEWVZSv9jJD\ne+CuHnaHeWNBVYck9da55OGm3IWji/niE0bbTg==\n",
            "numeroCuentaClienteCadenaBaz": "baz***",
            "botonPago": {
              "transaccion": {
                "primerTokenVerificacion": "",
                "requiereFactura": true,
                "geolocalizacion": {
                  "latitud": "sXW2VpWSgj6SFIfzabZzKg",
                  "longitud": "sXW2VpWSgj6SFIfzabZzKg"
                },
                "beneficiario": {
                  "idEmpresaCifrado": "N6STSd6swrKvfMp2Zyynrg",
                  "idEmpresa": "TP00000002"
                },
                "traspaso": {
                  "cuentaOrigen": "",
                  "monto": "1dfFtRHJAn3KJVyd8mONj8ceUhElp_2XtPn3u_P5y4o",
                  "concepto": "Cargo por renta de película"
                },
                "detallePago": {
                  "comision": "0.0",
                  "iva": "0.0",
                  "montoEnvio": "55",
                  "cantidadProductos": "1",
                  "idReferenciaPago": "0101000000743082022"
                }
              }
            },
            "compras": {
              "transaccion": {
                "calidadPelicula": "HD",
                "monto": "1dfFtRHJAn3KJVyd8mONj8ceUhElp_2XtPn3u_P5y4o",
                "numeroReferencia": "5YuMiDsVus5Mfd0GEM6ECA2kemE9OYe623m_2wC_D1s",
                "fechaOperacion": "",
                "numeroMovimiento": "",
                "peliculaGratuita": false,
                "numeroCuentaCliente": ""
              }
            },
            "tokenOperacion": "yqFBzgNrXQZP0WYGlpgr4A"
          }
        }
      });
    }, 1000); */
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
