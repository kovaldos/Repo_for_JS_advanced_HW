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
 *Функция формирует и возвращает разметку единицы товара для каталога
 * @param product единица товара из массива products
 * @param img картинка по умолчанию
 * @returns {string}
 */
const renderProduct = (product, img = "http://placehold.it/250x300") => {
    return      `<div class="product-item">
                <img src="${img}" alt="product-img">
                <h3>${product.title}</h3>
                <p>${product.price}</p>
                <button class="buy-btn">Купить</button>
                </div>`
};
/**
 * функция формирует страницу каталога
 * @param list список - массив объектов (товаров), сформированный методом map, который перебирает массив с товарами
 * и добавляет туда разметку каждого товара и кладется в div с классом .products
 */
const renderPage = (list) => {
    document.querySelector(".products").innerHTML = list.map(productItem => renderProduct(productItem)).join("");
    //убираем запятые из массива методом join с пустым разделителем
    //запятые - разделитель по умолчанию в массиве.
};

renderPage(products);