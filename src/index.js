
function saveCardOrder(order) {
    let positions = {};
    
    order.forEach(function (item, index) {
        positions['course_' + item] = index;
    });
    
    $.ajax({
        type: 'PUT',
        url: '/api/v1/users/self/dashboard_positions',
        data: {
            dashboard_positions: positions
        }
    });
}

function loadCardOrder() {
    $.ajax({
        type: 'DELETE',
        url: '/api/v1/users/self/custom_data',
        data: {
            ns: 'ahsdile/canvas-theme-sort-dashboard-courses-plugin'
        }
    }).success(function (data) {
        if (data.data !== undefined) {
            let order = data.data.map(item => Number(item));

            setCardOrder(order);
            saveCardOrder(order);
        }
    });
}

function setCardOrder(newOrder) {
    let box = document.querySelector('#DashboardCard_Container > .ic-DashboardCard__box');
    let cards = box.querySelectorAll('.ic-DashboardCard');
    let links = document.querySelectorAll('#DashboardCard_Container > .ic-DashboardCard__box a.ic-DashboardCard__link');
    let currentOrder = Array.from(links).map(link => Number(link.href.match(/courses\/(\d+)$/)[1]));

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
        });
    });
}
