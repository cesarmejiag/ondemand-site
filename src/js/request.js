const request = {

    buyMovie: function (idMovie, headers, body, success, error) {
        const url = 'apigateway.superappbaz.com/integracion/superapp/diversion/gestion-peliculas/v1/peliculas/' + idMovie + '/compras';

        request.send(url, 'POST', body, headers, )
    },

    /**
     * Get movie by id operation.
     * @param {string} idOperation 
     */
    movieById: function(idOperation, success, error) {
        const url = 'https://apigateway.superappbaz.com/integracion/superapp/canal/clientes/gestion-sesiones/v1/portal/operaciones/' + idOperation;
        request.send(url, 'GET', undefined, {
            'x-sicu': '3bad1290ac4600a569162efaa09117ea',
            'x-id-interaccion': '123e4567-e89b-12d3-a456-426655440000',
            'x-token-usuario': 'SRfVZrTYvdm7mzzZmcuiDViACkAx'
        }, success, error);
        
        /* setTimeout(function() {
            success({
                "datosFlujo": {
                   "idPelicula": "46657",
                   "nombrePelicula": "La piel fría",
                   "imagenPelicula": "https://imgn.cdn.iutpcdn.com/IMGS/VOD/COVER/345354-8c.jpg",
                   "numeroCuentaClienteCifradoRsa": "rMyLCzUViflVuvkBULKhMt4sHM9+ixFvcTLt3Rq4LHmntKNgBZ/TU5Kt8gcJekwNnz7MXDFh3pmr\nncU/laB97th/xNK3+G5J6crzCEG69p/JiS+vyzHhEMtSMugoW1YSjrvcTc4YJwBmpAZZSmmQmVYJ\n/p+NBzMgAGuuHUw7ITYdfht2m50+ND9Lk8cZ92l99DDFbPpswdlpwkoow/U2+SkQ44d4bFahE0FF\nLjHzdguYtxz4zd96e2VPQbCf7t0KojbM8bGcZfg/Q6mg3fMCADwAGdIT7zCkbj/Ah8mzQks4Q3ef\nXNKZyfPP+3tfBgFv8LmFYedURrjLMREa8aHYiA==\n",
                   "numeroCuentaClienteCadenaBaz": "baz***7890",
                   "botonPago": {
                      "section": "mi_diversion",
                      "flow": "mis_peliculas",
                      "amount": "55",
                      "commission": 0.0,
                      "concept": "Cargo por renta de película",
                      "idCompany": "TP00000002",
                      "idOperacionConciliacion": "CP88kT1AmvzTNlgnU_LsPA",
                      "idReferencePay": "01010000004665720217890",
                      "iva": 0.0,
                      "quantity": 1,
                      "requireBill": true,
                      "shippingAmount": "55"
                   },
                   "compras": {
                      "calidadPelicula": "HD",
                      "montoCifrado": "1dfFtRHJAn3KJVyd8mONj8ceUhElp_2XtPn3u_P5y4o",
                      "numeroReferenciaCifradoAlnova": "zlDFxBKbYaEbPmpokRzzOE0SxZmrZD4HqKRvMOsYK3I",
                      "numeroCuentaClienteCifradoAlnova": "WBVXHjx09gkRlUkPvZ9AF8sGlY5nILZ2bZmt6CvUU2c",
                      "fechaOperacion": "",
                      "numeroMovimiento": "",
                      "peliculaGratuita": false
                   }
                },
                "headers": {
                   "x-sicu": "a46a165f2a4746e7abcc4de915c6000d",
                   "x-id-interaccion": "6ec6ee06-9325-4f1f-b26e-22c74cc5c52f",
                   "x-token-usuario": "298a640a78e56520834cee087590c89f",
                   "x-token-auth-bearer": "eyJraWQiOiJkczdRNlBTbE9ZNStuMnJjXC9PdjJqTGp5eWZRS2VJdmFjRXcwWHlNQm80cz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyNnQ0OWQ1djhrYTZhcTlvZnFiajQyNWU5ZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiVXN1YXJpb1wvZGVsZXRlIFVzdWFyaW9cL3JlYWQgVXN1YXJpb1wvdXBkYXRlIiwiYXV0aF90aW1lIjoxNjMyNTA1NDg3LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9FaEZuSU9JRzAiLCJleHAiOjE2MzI1MDkwODcsImlhdCI6MTYzMjUwNTQ4NywidmVyc2lvbiI6MiwianRpIjoiNzdmZjY3ZTYtMGEzNy00ZWY3LWFkOWItZDdlYjMwMzcxM2E1IiwiY2xpZW50X2lkIjoiMjZ0NDlkNXY4a2E2YXE5b2ZxYmo0MjVlOWYifQ.fBLBEAox1b0e9JyY3nOazoxi-SBdrwaLjCsG0q4nO_P8bm2l5hgJIMTUIgZvJ9rqe6NTOTr-NDPw6GVNqDx5M5cmzxoextfyg6BObKivlhJwTLCfUq7W1ylvgHdA6rU6n0azb0YwuBXjPKfkNDZ1a2I1WihrrZnkU5olvSV9H9d_8_o6zT2P1Y5BktrMSa1TUa6bUibKkPTeFBBqZG-84sZkac66XGyowBYqtRdviQYJihPJcvLFWc4BadXIF8pKTAEzI1SJZxctapxctd95n0NVU027cs_W6jWw-uKeD6voXfH2jPpIZyVaQVPmw0zuN5aBmqdCOzjygiy4JPAAeA"
                },
                "idFlujo": "RENTA_PELICULA"
             });
        }, 1000); */
    },

    /**
     * Payment button.
     * @param {object} body
     * @param {object} headers
     * @param {function} success
     * @param {function} error
     */
    paymentButton: function (body, headers, success, error) {
        const url = 'https://apigateway.superappbaz.com/integracion/superapp/pagos/captacion/traspasos/v1/boton-pago';
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
            headers: jsonHeaders, 
            data: body,
            success,
            error
        });
    }
};