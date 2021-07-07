/**
 * Add handler when an event occur to an element.
 * @param {string} events
 * @param {Node|NodeList} els
 * @param {function} handler
 */
 function addListener(events, els, handler) {
    const add = (events, el, handler) => {
        events.split(' ').forEach(event => el.addEventListener(event, handler));
    };

    if (els instanceof NodeList) {
        [].forEach.call(els, el => add(events, el, handler));
    } else {
        add(events, els, handler);
    }
}

/**
 * Bind JSON to HTML.
 * @param {object} values
 */
 function bind(values) {
    const tags = qa('[data-id]');

    [].forEach.call(tags, tag => {
        const id = tag.dataset['id'];
        const value = values[id];
        
        if (id === 'precio') {
            tag.innerHTML = formatAmount(value);    
        } else if (id === 'saldo') {
            if (value === 'false') {
                setTimeout(() => { showAdvice(tag, true); }, 500);
            }
        } else {
            tag.innerHTML = value;
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
function handleDigitKeyup({target, keyCode}) {
    const parent = target.parentNode;
    
    if (keyCode === 8) {
        const prev = parent.previousElementSibling;

        if (prev) {
            const input = q('input', prev);
            input.value = '';
            input.focus();
        }

    } else if (keyCode > 47 && keyCode < 58) {
        if (target.value !== '') {
            const next = parent.nextElementSibling;

            if (next) {
                const input = q('input', next);
                input.focus();
            }
        }
    }

    validateCode();
}

/**
 * Apply number filter.
 */
function numberFilter(e) {
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
 * @param {HTMLElement} el 
 * @param {boolean} flag 
 */
function showAdvice(el, flag) {
    if (flag) {
        el.classList.remove('no-visible');
    } else {
        el.classList.add('no-visible');
    }
}

/**
 * Do querySelector.
 * @param {string} selector
 * @param {HTMLElement} context
 * @returns Node
 */
 function q(selector, context) {
    return (context || document).querySelector(selector);
}

/**
 * Do querySelectorAll.
 * @param {string} selector
 * @param {HTMLElement[]} context
 * @returns NodeList
 */
 function qa(selector, context) {
    return (context || document).querySelectorAll(selector);
}

/**
 * Validate code from client.
 * @returns {boolean}
 */
function validateCode() {
    const codeEl = q('.auth-screen .code');
    const digits = qa('.auth-screen .digit input');
    let code = "";

    [].forEach.call(digits, digit => {
        code += digit.value;
    });

    if (code.length === 6) {
        if (code === '000001') {
            codeEl.classList.add('valid');
        } else {
            codeEl.classList.add('invalid');
        }
    }
}

if (location.pathname.indexOf('detail') >= 0) {
    const advices = qa('.advice.fixed');

    [].forEach.call(advices, advice => {
        const closeBtn = q('.close-btn', advice);
        addListener('click', closeBtn, () => { showAdvice(advice, false); });
    });

    $('.swipe-btn').swipe();

    bind(searchToJson());

} else if (location.pathname.indexOf('auth') >= 0) {
    const digits = qa('.auth-screen .digit input');
    
    addListener('keypress keydown keyup input change paste', digits, numberFilter);
    addListener('keyup', digits, handleDigitKeyup);

    digits[0].focus();

} else {

}
