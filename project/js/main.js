/**
 * Массив объектов
 * @type {({price: number, id: number, title: string}|
 * {price: number, id: number, title: string}|
 * {price: number, id: number, title: string}|
 * {price: number, id: number, title: string})[]}
 */
const products = [
    {id: 1, title: "Notebook", price: 2000},
    {id: 2, title: "Mouse", price: 20},
    {id: 3, title: "Keyboard", price: 200},
    {id: 4, title: "Gamepad", price: 50},
];
/**
 * Функция для формирования верстки каждого товара
 * @param product объект из массива
 * @returns {string} разметку для товара
 */
const renderProduct = (product) => {
    return `<div class="product-item">
                <img src="https://picsum.photos/250/300?random=1">
                <h3>${product.title}</h3>
                <p>${product.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
/**
 * функциональное выражение формирует страницу с товарами
 * @param list массив объектов (товаров), сформированный методом map, который перебирает массив с товарами
 * и добавляет туда разметку каждого товара
 */
const renderPage = (list) => {
    document.querySelector(".products").innerHTML = list.map(item => renderProduct(item)).join("");
    //убираем запятые методом join с пустым разделителем
    //запятые - разделитель по умолчанию в массиве.
};

renderPage(products);