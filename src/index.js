
const url = '/api/v1/users/self/dashboard_positions';
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
    let positions = {};
    
    order.forEach(function (item, index) {
        positions['course_' + item] = index;
    });
    
    $.ajax({
        type: 'PUT',
        url,
        data: {
            dashboard_positions: positions
        }
    });
}

function loadCardOrder() {
    const oldUrl = '/api/v1/users/self/custom_data';
    let params = {
        ns: namespace
    };
    
    $.ajax({
        dataType: "json",
        url: oldUrl,
        data: params,
        success: function (data) {
            let order = data.data.map(item => Number(item));
            
            $.ajax({
                type: 'DELETE',
                url: oldUrl,
                data: params
            });
        
            saveCardOrder(order);
            setCardOrder(order);
        },
        error: function () {
            let order = [];
            
            $.getJSON(url, function (data) {
                Object.keys(data.dashboard_positions).map(function (item, index) {
                    order[data.dashboard_positions[item]] = Number(item.replace(/course_(\d+)/, '$1'));
                });
                
                setCardOrder(order);
            });
        }
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
