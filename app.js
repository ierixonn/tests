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

// Функция для инициирования платежа
async function initiatePayment() {
    try {
        // Получаем invoice_link от вашего Python-бота
        const response = await fetch('https://yourpythonanywhere.pythonanywhere.com/create_invoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: tg.initDataUnsafe.user?.id,
                amount: 20 // 20 Stars
            })
        });
        
        const data = await response.json();
        
        if (data.invoice_link) {
            tg.openInvoice(data.invoice_link, (status) => {
                if (status === 'paid') {
                    tg.showAlert('✅ Спасибо! 20 Stars успешно зачислены!');
                }
            });
        } else {
            tg.showAlert('Ошибка при создании платежа');
        }
    } catch (error) {
        tg.showAlert('Ошибка соединения с сервером');
        console.error('Payment error:', error);
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
    paymentBtn.style.fontSize = '16px';
    
    paymentBtn.addEventListener('click', initiatePayment);
    
    document.body.appendChild(paymentBtn);
}

// Инициализация приложения
tg.ready();
tg.expand();

displayUserData();
createPaymentButton();
