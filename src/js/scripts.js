let globalIdPelicula, globalBotonPago, globalCompras, globalHeaders;

/**
 * Bind JSON to HTML.
 * @param {object} values
 */
function bind(values) {
    const $tags = $('[data-id]');

    $tags.each(function () {
        const $tag = $(this);
        const id = $tag.data('id');
        const value = values[id];

        if (id === 'precio') {
            $tag.html(formatAmount(value));
        } else if (id === 'saldo') {
            if (value === 'false') {
                setTimeout(() => { showAdvice($tag, true); }, 500);
            }
        } else {
            $tag.html(value);
        }
    });
}

/**
 * Parse string to object and then bind.
 * @param {string} strJson 
 */
function bindFromStr(strJson) {
    try {
        const json = JSON.parse(strJson);
        bind(json);
    } catch (err) { console.log(err); }
}

/**
 * Change screen.
 * @param {jQuery} $screen
 * @param {function} callback
 */
function changeScreen($screen, callback) {
    $('.screen').addClass('no-visible');
    $screen.removeClass('no-visible');

    callback();
}

/**
 * Get amount with currency format.
 * @param {number} amount 
 * @returns {string}
 */
function formatAmount(amount) {
    return '$ ' + Number(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Handle digit keyup event.
 * @param {KeyboardEvent} event
 */
function handleDigitKeyup({ target, keyCode }) {
    const $parent = $(target.parentNode);

    if (keyCode === 8) {
        if ($parent.prev().length > 0) {
            const $input = $parent.prev().find('input');

            $input.val('');
            $input.focus();
        }

    } else if (keyCode > 47 && keyCode < 58) {
        if (target.value !== '') {
            if ($parent.next().length > 0) {
                const $input = $parent.next().find('input');
                $input.focus();
            }
        }
    }

    validateCode();
}

/**
 * Apply number filter.
 * @param {Event} event
 */
function numberFilter(event) {
    const filter = /^\d{0,1}$/;

    if (filter.test(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
    } else if (this.hasOwnProperty('oldValue')) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
    } else {
        this.value = '';
    }
}

/**
 * Do fake request.
 * @param {function} callback
 */
function fakeRequest(code, callback) {
    setTimeout(() => {
        callback(code === '000001');
    }, 1500);
}

/**
 * @param {string} strJson
 */
function payMovie(strJson) {

}

/**
 * Parse location.search to JSON.
 * @returns object
 */
function searchToJson() {
    const pairs = location.search.substring(1).split('&');
    const object = {};
    let i = 0;

    for (; i < pairs.length; i++) {
        if (pairs[i] === '') {
            continue;
        }

        const parts = pairs[i].split('=');
        object[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
    }

    return object;
}

/**
 * Show or hide advice.
 * @param {jQuery} $el 
 * @param {boolean} flag 
 */
function showAdvice($el, flag) {
    if (flag) {
        $el.addClass('no-visible');
    } else {
        $el.removeClass('no-visible');
    }
}

/**
 * Show or hide loader.
 * @param {boolean} show
 */
function showLoader(show) {
    let $loader = $('.loader');

    if (show) {
        if ($loader.length <= 0) {
            $loader = $('<div class="loader">');
        }

        $('body').append($loader);
        setTimeout(() => $loader.addClass('loader-visible'), 10);

    } else {
        $loader.removeClass('loader-visible');
        setTimeout(() => $loader.remove(), 375);

    }
}

/**
 * Validate code from client.
 * @returns {boolean}
 */
function validateCode() {
    const $code = $('.auth-screen .code');
    const $digits = $('.auth-screen .digit input');
    let code = "";

    $digits.each(function () {
        code += this.value;
    });

    if (code.length === 6) {
        showLoader(true);

        fakeRequest(code, success => {
            if (success) {
                $code.addClass('valid');

                changeScreen($('.resume-screen'), () => {
                    showLoader(false);
                });
            } else {
                showLoader(false);
                $code.addClass('invalid');

                setTimeout(() => {
                    $digits.each(function () { $(this).val(''); });
                    $digits.eq(0).focus();
                }, 100);
            }
        });
    } else {
        $code.removeClass('valid invalid');
    }
}


// Initialize Detail Screen components.
const searchJson = searchToJson();

showLoader(true);
request.movieById(searchJson['idOperacion'], function (data) {
    console.log('%o', data);
    changeScreen($('.detail-screen'), function () {
        const { datosFlujo: { idPelicula, nombrePelicula, numeroCuentaClienteCadenaBaz, botonPago, compras }, headers } = data.resultado;
        
        globalIdPelicula = idPelicula;
        globalBotonPago = botonPago.transaccion;
        globalCompras = compras.transaccion;
        globalHeaders = headers;

        $('.detail-screen').find('[data-id="nombre"]').text(nombrePelicula);
        $('.detail-screen').find('[data-id="precio"]').text(formatAmount(globalBotonPago.detallePago.montoEnvio));
        $('.detail-screen').find('[data-id="tarjeta"]').text(numeroCuentaClienteCadenaBaz);
        
        showLoader(false);
    });
}, function () {

});






const $advices = $('.advice.fixed');

$advices.each(function () {
    const $advice = $(this);
    const $closeBtn = $advice.find('.close-btn');

    $closeBtn.on('click', function () {
        showAdvice($advice, false);
    });
});

$('.detail-screen .swipe-btn').swipe({
    cb: function () {
        showLoader(true);

        setTimeout(() => {
            console.log('scripts.js: Open digital sign');
            const headers = {
                "x-sicu": globalHeaders['x-sicu'],
                "x-id-interaccion": globalHeaders['x-id-interaccion'],
                "x-token-usuario": globalHeaders['x-token-usuario'],
                "accept": "",
                "Authorization": "Bearer " + globalHeaders['x-token-auth-bearer'],
                "x-nombre-dispositivo": "",
                "x-id-dispositivo": "",
                "x-sistema-dispositivo": "",
                "x-version-dispositivo": "",
                "x-version-aplicacion": "",
                "x-modelo-dispositivo": "",
                "x-fabricante-dispositivo": "",
                "x-serie-procesador": "",
                "x-operador-telefonia": "",
                "x-latitud": "",
                "x-longitud": "",
                "x-id-operacion-conciliacion": globalHeaders['x-id-operacion-conciliacion'],
                "x-id-lealtad": ""
            };

            showLoader(true);
            request.paymentButton({ "transaccion": globalBotonPago }, headers, function (data) {
                console.log('scripts.js: Payment button. %o', data);
                request.buyMovie(globalIdPelicula, { "transaccion": { ...globalCompras, fechaOperacion: data.resultado.fechaOperacion, numeroMovimiento: data.resultado.fechaOperacion } }, headers, function (data) {
                    console.log('scripts.js: Buy movie. %o', data);
                    changeScreen($('.resume-screen'));
                    showLoader(false);
                });
            });
        }, 500);
    }
});


// Initialize Auth Screen components.
const $digits = $('.auth-screen .digit input');

$digits.on('keypress keydown keyup input change paste', numberFilter)
$digits.on('keyup', handleDigitKeyup);

$digits.eq(0).focus();


// Initialize close buttons.
$('.screen header .close-btn').on('click', function () {
    console.log('scripts.js: Closing WebView');

});


// Initialize share button.
$('.share-btn').on('click', function () {
    console.log('scripts.js: Sharing ticket');

});


// Initialize movie button.
$('.movie-btn').on('click', function () {
    console.log('scripts.js: Play movie');

});
