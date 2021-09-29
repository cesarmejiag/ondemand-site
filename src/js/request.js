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
        // const url = 'https://apigateway.superappbaz.com/integracion/superapp/diversion/gestion-peliculas/v1/peliculas/' + idMovie + '/compras';
        const url = 'https://api.baz.app/superapp/diversion/gestion-peliculas/v1/peliculas/' + idMovie + '/compras';
        request.send(url, 'POST', body, headers, success)
    },

    /**
     * Get movie by id operation.
     * @param {string} idOperation 
     */
    movieById: function(idOperation, success, error) {
        // const url = 'https://apigateway.superappbaz.com/integracion/superapp/canal/clientes/gestion-sesiones/v1/portal/operaciones/' + idOperation;
        /* const url = 'https://api.baz.app/superapp/canal/clientes/gestion-sesiones/v1/portal/operaciones/' + idOperation;
        request.send(url, 'GET', undefined, {
            'x-sicu': '3bad1290ac4600a569162efaa09117ea',
            'x-id-interaccion': '123e4567-e89b-12d3-a456-426655440000',
            'x-token-usuario': 'SRfVZrTYvdm7mzzZmcuiDViACkAx'
        }, success, error); */

        success({
            "resultado": {
              "datosFlujo": {
                "giftCard": {
                  "amount": 0,
                  "amounts": [
                    {
                      "precios": "150.00",
                      "comision": "3.75",
                      "id": "13722"
                    },
                    {
                      "precios": "300.00",
                      "comision": "7.5",
                      "id": "13723"
                    }
                  ],
                  "commission": "",
                  "email": "",
                  "id": "",
                  "name": "netflix",
                  "phone": ""
                },
                "giftCardPayment": {
                  "geolocalizacion": {
                    "latitud": "19.3093762",
                    "longitud": "-99.1872467"
                  },
                  "notificacion": {
                    "celular": "5540129225",
                    "correo": "evelchaher@gmail.com"
                  },
                  "token": "",
                  "transaccionOperacion": {
                    "cuenta": "11561200001040",
                    "monto": ""
                  }
                }
              },
              "headers": {
                "Authorization": "Bearer eyJraWQiOiJKMmhRXC9xbGJyeEYxXC9iazBOa1I3eHd5d1Z1UGE5dmxXTkF3Tm1IYlVhd2s9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI2MmowdjBmOXIxb2tqc2U2cXV2aWNic2RodSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoic3VwZXJhcHAtcHJvZFwvcHJvZCIsImF1dGhfdGltZSI6MTYzMjk0MDU5OCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfQ1JGNHJBNUMwIiwiZXhwIjoxNjMyOTQ0MTk4LCJpYXQiOjE2MzI5NDA1OTgsInZlcnNpb24iOjIsImp0aSI6IjBkOTY2NTA3LWFlNzktNDc5Mi1hMTA5LWQxYTNlY2RiMjY4MSIsImNsaWVudF9pZCI6IjYyajB2MGY5cjFva2pzZTZxdXZpY2JzZGh1In0.ntgDAh0EBohISWvVQ6SxFUOrla6b9HZnddcrUj81HM7MtWNQYePfNN7-M81Kh1XINUYMnwfk5tDD9gfNc7zJ_dofzkxPNvOyJm_KnxlvuXxsrxviEDBapW_tYjB6-mHQrVzcMvgh554aFCc259sxdVV9d54OZP7fTsRhF4IQAfrdCQlUXBtQ9qYcLqJ4ZyyojmcA8XtgXJa2A_jnPutR_5Xrxadv3uoYlgKAFYBBCuzM06jNJzzI-86u9i6aq0rzMwz0OzPfgEURdo6JNEuD6qUO1r3HxAiaYGHX9coivEgEVp40HSmx6fKvgu1BXaDvkLKSYf9FHUtNFRLsBnaf6w",
                "x-sicu": "bd8152d9432a40859cf82dcbd646b689",
                "x-id-interaccion": "3e4fe2e9-7f95-4419-bbe9-5dd95e134f59",
                "x-token-usuario": "f75efdbf2d754bd8108e2da610c1761a",
                "x-token-auth-bearer": "eyJraWQiOiJKMmhRXC9xbGJyeEYxXC9iazBOa1I3eHd5d1Z1UGE5dmxXTkF3Tm1IYlVhd2s9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI2MmowdjBmOXIxb2tqc2U2cXV2aWNic2RodSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoic3VwZXJhcHAtcHJvZFwvcHJvZCIsImF1dGhfdGltZSI6MTYzMjk0MDU5OCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfQ1JGNHJBNUMwIiwiZXhwIjoxNjMyOTQ0MTk4LCJpYXQiOjE2MzI5NDA1OTgsInZlcnNpb24iOjIsImp0aSI6IjBkOTY2NTA3LWFlNzktNDc5Mi1hMTA5LWQxYTNlY2RiMjY4MSIsImNsaWVudF9pZCI6IjYyajB2MGY5cjFva2pzZTZxdXZpY2JzZGh1In0.ntgDAh0EBohISWvVQ6SxFUOrla6b9HZnddcrUj81HM7MtWNQYePfNN7-M81Kh1XINUYMnwfk5tDD9gfNc7zJ_dofzkxPNvOyJm_KnxlvuXxsrxviEDBapW_tYjB6-mHQrVzcMvgh554aFCc259sxdVV9d54OZP7fTsRhF4IQAfrdCQlUXBtQ9qYcLqJ4ZyyojmcA8XtgXJa2A_jnPutR_5Xrxadv3uoYlgKAFYBBCuzM06jNJzzI-86u9i6aq0rzMwz0OzPfgEURdo6JNEuD6qUO1r3HxAiaYGHX9coivEgEVp40HSmx6fKvgu1BXaDvkLKSYf9FHUtNFRLsBnaf6w",
                "x-id-operacion-conciliacion": "hc9xT1lvH0mWwhtjP1dAwQ",
                "x-id-dispositivo": "d20b09f6-dcdb-4981-a2ba-975f34ed500b",
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
              "idFlujo": "COMPRA_GIFTCARD"
            }
          }
          );
    },

    /**
     * Register payment.
     * @param {object} body
     * @param {object} headers
     * @param {function} success
     * @param {function} error
     */
    paymentButton: function (body, headers, success, error) {
        // const url = 'https://apigateway.superappbaz.com/integracion/superapp/pagos/captacion/traspasos/v1/boton-pago';
        const url = 'https://api.baz.app/integracion/superapp/pagos/captacion/traspasos/v1/boton-pago';
        request.send(url, 'POST', body, headers, success, error);
    },

    /**
     * Get selected gift card.
     * @param {strign} idOperation
     * @param {function} success
     * @param {function} error
     */
    payGiftCard: function (idOperation, success, error) {
        // const url = 'https://apigateway.superappbaz.com/integracion/superapp/pagos/captacion/traspasos/v1/boton-pago';
        const url = 'https://api.baz.app/integracion/superapp/pagos/captacion/traspasos/v1/boton-pago';
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
            headers: jsonHeaders, 
            data: JSON.stringify(body),
            success,
            error
        });
    }
};