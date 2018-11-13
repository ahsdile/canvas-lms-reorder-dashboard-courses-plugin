
const url = '/api/v1/users/self/custom_data';
const namespace = 'ahsdile/canvas-theme-sort-dashboard-courses-plugin';


function makeSortable() {
    $('#DashboardCard_Container > .ic-DashboardCard__box').sortable({
        containment: 'parent',
        items: '> .ic-DashboardCard',
        update: function () {
            saveCardOrder(getCardOrder());
        }
    });
}

function saveCardOrder(order) {
    let params = {
        ns: namespace,
        data: order
    };
    
    $.ajax({
        type: 'PUT',
        url,
        data: params
    });
}

function loadCardOrder() {
    let params = {
        ns: namespace
    };
    
    $.getJSON(url, params, function (data) {
        setCardOrder(data.data.map(item => Number(item)));
    });
}

function getCardOrder() {
    let links = Array.from(document.querySelectorAll('#DashboardCard_Container > .ic-DashboardCard__box a.ic-DashboardCard__link'));
    
    return links.map(link => Number(link.href.match(/courses\/(\d+)$/)[1]));
}

function setCardOrder(newOrder) {
    let box = document.querySelector('#DashboardCard_Container > .ic-DashboardCard__box');
    let cards = box.querySelectorAll('.ic-DashboardCard');
    let currentOrder = getCardOrder();

    for (let i = newOrder.length - 1; i >= 0; i--) {
        let j = currentOrder.indexOf(newOrder[i]);
        
        if (j === -1) continue;

        box.insertBefore(cards[j], box.firstChild);
    };
}


export default function (app) {
    app.addRouteListener('dashboard', function (params) {
        app.addReadyListener('#DashboardCard_Container > .ic-DashboardCard__box > .ic-DashboardCard', function () {
            loadCardOrder();
            makeSortable();
        });
    });
}
