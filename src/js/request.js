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
        const url = 'https://api.baz.app/superapp/canal/clientes/gestion-sesiones/v1/portal/operaciones/' + idOperation;
        request.send(url, 'GET', undefined, {
            'x-sicu': '3bad1290ac4600a569162efaa09117ea',
            'x-id-interaccion': '123e4567-e89b-12d3-a456-426655440000',
            'x-token-usuario': 'SRfVZrTYvdm7mzzZmcuiDViACkAx'
        }, success, error);
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
        const url = 'https://api.baz.app/superapp/pagos/captacion/traspasos/v1/boton-pago';
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