
// ключ доступа для API mailboxlayer.com
let ACCESS_KEY = '29204408aa55754e1acab46a821db12a';

/**
 * отправка запроса на проверку email
 *
 * @param event - объект события onsubmit
 */
function verify(event) {

    event.preventDefault();

    // введенный email
    let email = document.getElementById('path_email_input').value;

    // если ничего не ввели
    if(email === '') {
        return;
    }

    // покажем прелоадер
    showPreloader();

    // формируем url запроса
    let url = `https://apilayer.net/api/check?access_key=${ACCESS_KEY}&email=${email}`;

    // формируем запрос
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onreadystatechange = () => {

        // скроем прелоадер
        hidePreloader();

        // если запрос успешный
        if(xhr.readyState === 4 && xhr.status === 200) {

            // преобразуем в объект
            let response = JSON.parse(xhr.responseText);

            // если email валидный
            if (response.format_valid) {
                onSuccess();
                return;
            }

            onError();
        }
    };

    xhr.send();
}

/**
 * отображение сообщения об ошибке
 */
function onError() {

    // контейнер текста результата
    let element = document.getElementById('path_validation_result');

    // отображаем текст
    element.innerText = 'Invalid Format';

    // добавляем класс красного текста
    element.classList.add('red_text');

    // показываем элемент
    element.classList.remove('hidden');
}

/**
 *  при успешной проверке email
 */
function onSuccess() {

    // контейнер текста результата
    let element = document.getElementById('path_validation_result');

    // отображаем текст
    element.innerText = 'Valid Format';

    // удаляем класс красного текста
    element.classList.remove('red_text');

    // показываем элемент
    element.classList.remove('hidden');
}

/**
 * обработчик ввода текста в инпут
 */
function onInput() {

    // скроем отображение результата проверки
    document.getElementById('path_validation_result').classList.add('hidden');
}

/**
 * отображение прелоадера
 */
function showPreloader() {
    document.getElementById('path_preloader').classList.remove('display_none');
}

/**
 * скрытие прелоадера
 */
function hidePreloader() {
    document.getElementById('path_preloader').classList.add('display_none');
}

