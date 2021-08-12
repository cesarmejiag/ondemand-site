const request = {
    /**
     * Authenticate.
     * @param {function} success
     * @param {function} error
     */
    auth: function (success, error) {
        const url = "https://omm6oug5pg.execute-api.us-east-1.amazonaws.com/desarrollo/oauth2/v1/token";
        const headers = {
            "Authorization": "Basic " + btoa("18h8vanvrh4pui1lrntc1niljf" + ":" + "1ge31bhjrdk9d0ja14mft8qepi4clkt805jqb2svqvmb4so1v4g7"),
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": "XSRF-TOKEN=b4a54f1b-afe5-4aee-9a76-00f920418b6e"
        };
        const body = "grant_type=client_credentials";

        request.send(url, 'POST', body, headers, success, error);
    },

    /**
     * Pay.
     * @param {object} headers
     * @param {object} body
     * @param {boolean} production
     * @param {function} success
     * @param {function} error
     */
    pay: function (headers, body, production, success, error) {
        const url = production 
            ? "https://api.bazappgs.com/superapp/pagos/captacion/traspasos/v1/boton-pago"
            // ? "https://api.baz.app/superapp/pagos/captacion/traspasos/v1/boton-pago"
            : "https://apigateway.superappbaz.com/integracion/superapp/pagos/captacion/traspasos/v1/boton-pago";
            // : "http://127.0.0.1:3000"
            
        const raw = JSON.stringify(body);

        request.send(url, 'POST', raw, headers, success, error);
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
        /* const headers = new Headers();

        for (let prop in jsonHeaders) {
            headers.append(prop, jsonHeaders[prop]);
        }

        fetch(url, { method, headers, body, redirect: 'follow' })
            .then(response => response.json())
            .then(success)
            .catch(error); */
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