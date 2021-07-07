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
 * Make request.
 * @param {string} url 
 * @param {string} method
 * @param {object} body
 * @param {object} headers 
 * @param {function} callback 
 */
function request(url, method, body, headers, callback) {
    $.ajax({
        url: 'https://omm6oug5pg.execute-api.us-east-1.amazonaws.com/desarrollo/oauth2/v1/token',
        method: 'POST',
        body: { 'grant_type': 'client_credentials' },
        beforeSend: function (jqXHR) {
            jqXHR.setRequestHeader('Authorization', "Basic " + btoa('18h8vanvrh4pui1lrntc1niljf' + ":" + '1ge31bhjrdk9d0ja14mft8qepi4clkt805jqb2svqvmb4so1v4g7'));
        },
        success: function () {
            console.log(arguments);
        }
    });
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
        if (code === '000001') {
            $code.addClass('valid');
        } else {
            $code.addClass('invalid');
        }
    }
}

if (location.pathname.indexOf('detail') >= 0) {
    const $advices = $('.advice.fixed');

    $advices.each(function () {
        const $advice = $(this);
        const $closeBtn = $advice.find('.close-btn');

        $closeBtn.on('click', function () {
            showAdvice($advice, false);
        });
    });

    $('.swipe-btn').swipe({
        cb: function () {
            console.log('swipe from detail');
        }
    });

    bind(searchToJson());

} else if (location.pathname.indexOf('auth') >= 0) {
    const $digits = $('.auth-screen .digit input');

    $digits.on('keypress keydown keyup input change paste', numberFilter)
    $digits.on('keyup', handleDigitKeyup);

    $digits.eq(0).focus();

} else {

}
