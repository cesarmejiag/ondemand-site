const request = {
    // BASE_URL: 'https://apigateway.superappbaz.com/integracion/superapp', // Dev
    BASE_URL: 'https://api.baz.app/superapp', // Prod

    /**
     * Make a payment.
     * @param {number} idMovie 
     * @param {object} body 
     * @param {object} headers 
     * @param {function} success 
     * @param {function} error 
     */
    buyMovie: function (idMovie, body, headers, success, error) {
        const url = `${request.BASE_URL}/diversion/gestion-peliculas/v1/peliculas/${idMovie}/compras`;
        request.send(url, 'POST', body, headers, success);
    },

    /**
     * Get movie by id operation.
     * @param {string} idOperation 
     */
    operationById: function(idOperation, success, error) {
        const url = `${request.BASE_URL}/canal/clientes/gestion-sesiones/v1/portal/operaciones/${idOperation}`;
        request.send(url, 'GET', undefined, {
            'x-sicu': '3bad1290ac4600a569162efaa09117ea',
            'x-id-interaccion': '123e4567-e89b-12d3-a456-426655440000',
            'x-token-usuario': 'SRfVZrTYvdm7mzzZmcuiDViACkAx'
        }, success, error);
    },

    /* _operationById: function(idOperation, success) {
        success(
          {
            "mensaje": "Operación Exitosa.",
            "folio": "ed710a6d3e390f32-ed710a6d3e390f32",
            "resultado": {
              "idFlujo": "COMPRA_GIFTCARD",
              "headers": {
                "x-id-dispositivo": "2793EBCA05A34BCFAF1DD3D96724EF85",
                "x-sistema-dispositivo": "x-sistema-dispositivo",
                "x-nombre-dispositivo": "x-nombre-dispositivo",
                "accept": "",
                "x-token-auth-bearer": "eyJraWQiOiJkczdRNlBTbE9ZNStuMnJjXC9PdjJqTGp5eWZRS2VJdmFjRXcwWHlNQm80cz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxOGg4dmFudnJoNHB1aTFscm50YzFuaWxqZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiVXN1YXJpb1wvZGVsZXRlIFVzdWFyaW9cL3JlYWQgVXN1YXJpb1wvdXBkYXRlIiwiYXV0aF90aW1lIjoxNjM1MjkwNTM3LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9FaEZuSU9JRzAiLCJleHAiOjE2MzUyOTQxMzcsImlhdCI6MTYzNTI5MDUzNywidmVyc2lvbiI6MiwianRpIjoiMmFiMGJiN2UtNzc3NS00YTNlLTgwYTgtNmVmZGE4ZmQyMjhmIiwiY2xpZW50X2lkIjoiMThoOHZhbnZyaDRwdWkxbHJudGMxbmlsamYifQ.VxD3Ro77azhQOGT3ziWFZGBLC3KAEaTlD8P00yIK6_UhbhbV5GB4iOIBDFxKmkoXPavDkCdGfAUH9s_gFpl0hV72dC2fC5VpQkh8ia8poLay1EkmpXZBJVq2n7PEEuc5p_4S5PpTmj0TZ8c25-QTtahXeaDzPoPJtNy4ctofUbCYutx7SVEiS-2pq1APkoAlwxKR9586jFydGzn3xZdAltZVVMLOZox-a40YhdW4MkbKM_9l1DGB0zxNR-7w8SsdSb0TaUesFfZJ795wxIn7UAYNulSf_0qjcILdy6dn8Duq4dJArj5tMUOy2xBA7015wqxVe4dyGYugVGV32vrEjw",
                "x-version-dispositivo": "x-version-dispositivo",
                "x-fabricante-dispositivo": "x-fabricante-dispositivo",
                "x-operador-telefonia": "AT&T",
                "x-serie-procesador": "",
                "x-latitud": "19.3091382458455",
                "x-longitud": "-99.18728059249855",
                "Authorization": "Bearer eyJraWQiOiJkczdRNlBTbE9ZNStuMnJjXC9PdjJqTGp5eWZRS2VJdmFjRXcwWHlNQm80cz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxOGg4dmFudnJoNHB1aTFscm50YzFuaWxqZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiVXN1YXJpb1wvZGVsZXRlIFVzdWFyaW9cL3JlYWQgVXN1YXJpb1wvdXBkYXRlIiwiYXV0aF90aW1lIjoxNjM1MjkwNTM3LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9FaEZuSU9JRzAiLCJleHAiOjE2MzUyOTQxMzcsImlhdCI6MTYzNTI5MDUzNywidmVyc2lvbiI6MiwianRpIjoiMmFiMGJiN2UtNzc3NS00YTNlLTgwYTgtNmVmZGE4ZmQyMjhmIiwiY2xpZW50X2lkIjoiMThoOHZhbnZyaDRwdWkxbHJudGMxbmlsamYifQ.VxD3Ro77azhQOGT3ziWFZGBLC3KAEaTlD8P00yIK6_UhbhbV5GB4iOIBDFxKmkoXPavDkCdGfAUH9s_gFpl0hV72dC2fC5VpQkh8ia8poLay1EkmpXZBJVq2n7PEEuc5p_4S5PpTmj0TZ8c25-QTtahXeaDzPoPJtNy4ctofUbCYutx7SVEiS-2pq1APkoAlwxKR9586jFydGzn3xZdAltZVVMLOZox-a40YhdW4MkbKM_9l1DGB0zxNR-7w8SsdSb0TaUesFfZJ795wxIn7UAYNulSf_0qjcILdy6dn8Duq4dJArj5tMUOy2xBA7015wqxVe4dyGYugVGV32vrEjw",
                "x-id-operacion-conciliacion": "CP88kT1AmvzTNlgnU_LsPA",
                "x-id-lealtad": "",
                "x-token-usuario": "d657671be3a34f79b106065412420a91",
                "x-id-interaccion": "646BC19C-817E-498B-902B-1221CD3350AD",
                "x-version-aplicacion": "x-version-aplicacion",
                "x-modelo-dispositivo": "x-modelo-dispositivo",
                "x-sicu": "bb693233b5d24ceebfe2f2e79a63593c"
              },
              "datosFlujo": {
                "giftCard": {
                  "amount": 0,
                  "phone": "5611728189",
                  "id": "",
                  "email": "justcristianvillegas@gmail.com",
                  "commission": "",
                  "name": "amazon",
                  "amounts": [
                    { "id": "13696", "comision": "5.29", "precios": ["300.00"] },
                    { "id": "13697", "comision": "8.82", "precios": [] }
                  ]
                },
                "giftCardPayment": {
                  "transaccion": {
                    "geolocalizacion": {
                      "latitud": "19.3093762",
                      "longitud": "-99.1872467"
                    },
                    "transaccionOperacion": { "monto": "", "cuenta": "11561200002025" },
                    "token": "",
                    "notificacion": {
                      "celular": "5611728189",
                      "correo": "justcristianvillegas@gmail.com"
                    }
                  }
                }
              }
            }
          }
        );
    }, */

    /**
     * Register payment.
     * @param {object} body
     * @param {object} headers
     * @param {function} success
     * @param {function} error
     */
    paymentButton: function (body, headers, success, error) {
        const url = `${request.BASE_URL}/pagos/captacion/traspasos/v1/boton-pago`;
        request.send(url, 'POST', body, headers, success, error);
    },

    /**
     * Pay giftcard.
     * @param {number} idOperator
     * @param {object} body 
     * @param {object} headers 
     * @param {function} success 
     * @param {function} error 
     */
    paymentGiftcard: function (idOperator, body, headers, success, error) {
      const url = `${request.BASE_URL}/pagos/corresponsalia-bancaria/operaciones-arcus/v1/operadores/${idOperator}/recargas/tarjetas-regalo`;
      request.send(url, 'POST', body, headers, success, error);
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
    send: function (url, method, body, jsonHeaders, success, error) {
        $.ajax({
            url,
            method,
            contentType: 'application/json',
            processData: false,
            timeout: 10000,
            headers: jsonHeaders,
            data: JSON.stringify(body),
            success,
            error
        });
    }
};