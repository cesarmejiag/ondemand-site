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
function handleDigitKeyup(event) {
    const el = event.target;
    const parent = el.parentNode;

    if (event.keyCode === 8) {
        const prev = q('input', parent.previousElementSibling);

        if (prev) {
            prev.value = '';
            prev.focus();
        }

    } else if (event.keyCode > 48 && event.keyCode < 58) {
        if (el.value !== '') {
            const next = q('input', parent.nextElementSibling);
            
            if (next) {
                next.focus();
            }
        }
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

if (location.pathname.indexOf('detail') >= 0) {
    bind(searchToJson());

} else if (location.pathname.indexOf('auth') >= 0) {
    const digits = qa('.code .digit');
    
    addListener('keyup', digits, handleDigitKeyup);

} else {

}

// http://127.0.0.1:8080/detail.html?nombre=American%20Pie%20Presents%3A%20Girls%20Rules&precio=55.00&tarjeta=baz%20***6789