// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;

// Функция для отображения данных пользователя
function displayUserData() {
    // Получаем данные пользователя
    const user = tg.initDataUnsafe.user;
    
    if (user) {
        // Отображаем имя пользователя
        document.getElementById('user-name').textContent = `${user.first_name} ${user.last_name || ''}`.trim();
        
        // Отображаем аватар пользователя (если есть)
        if (user.photo_url) {
            document.getElementById('user-avatar').src = user.photo_url;
        } else {
            // Заглушка, если аватара нет
            document.getElementById('user-avatar').src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
        }
        
        // Дополнительная информация о пользователе
        document.getElementById('user-info').textContent = `@${user.username || 'username_not_set'}`;
    } else {
        // Если данные пользователя недоступны
        document.getElementById('user-name').textContent = 'Гость';
        document.getElementById('user-avatar').src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
        document.getElementById('user-info').textContent = 'Войдите в Telegram';
    }
}

// Когда WebApp готов
tg.ready();
tg.expand(); // Разворачиваем на весь экран

// Отображаем данные пользователя
displayUserData();
