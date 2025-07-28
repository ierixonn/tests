const tg = window.Telegram.WebApp;

// Функция для отображения данных пользователя
function displayUserData() {
    const user = tg.initDataUnsafe.user;
    
    if (user) {
        document.getElementById('user-name').textContent = `${user.first_name} ${user.last_name || ''}`.trim();
        
        if (user.photo_url) {
            document.getElementById('user-avatar').src = user.photo_url;
        } else {
            document.getElementById('user-avatar').src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
        }
        
        document.getElementById('user-info').textContent = `@${user.username || 'username_not_set'}`;
    } else {
        document.getElementById('user-name').textContent = 'Гость';
        document.getElementById('user-avatar').src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
        document.getElementById('user-info').textContent = 'Войдите в Telegram';
    }
}

// Функция для открытия платежного интерфейса
function openPayment() {
    if (tg && tg.openInvoice) {
        tg.showPopup({
            title: 'Пополнение Stars',
            message: 'Вы хотите купить 20 Telegram Stars?',
            buttons: [
                {id: 'buy', type: 'default', text: 'Купить 20 ⭐'},
                {type: 'cancel'}
            ]
        }, function(buttonId) {
            if (buttonId === 'buy') {
                tg.openInvoice('your_invoice_link_here', function(status) {
                    if (status === 'paid') {
                        tg.showAlert('Спасибо за покупку! Ваши Stars успешно зачислены.');
                    }
                });
            }
        });
    } else {
        tg.showAlert('Платежная система недоступна в этом режиме');
    }
}

// Создаем кнопку для платежа
function createPaymentButton() {
    const paymentBtn = document.createElement('button');
    paymentBtn.textContent = 'Купить 20 Telegram Stars ⭐';
    paymentBtn.style.marginTop = '20px';
    paymentBtn.style.padding = '10px 20px';
    paymentBtn.style.backgroundColor = '#0088cc';
    paymentBtn.style.color = 'white';
    paymentBtn.style.border = 'none';
    paymentBtn.style.borderRadius = '5px';
    paymentBtn.style.cursor = 'pointer';
    
    paymentBtn.addEventListener('click', openPayment);
    
    document.body.appendChild(paymentBtn);
}

// Инициализация приложения
tg.ready();
tg.expand();

displayUserData();
createPaymentButton();
