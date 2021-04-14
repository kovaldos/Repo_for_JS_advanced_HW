const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses"
/**
 * Базовый класс каталога товаров
 *параметр по умолчанию - контейнер (div с классом container) для католога
 */
class ProductsList {
    constructor(container = ".products") {
        this.container = container;
        this.goods = [];
        this.allProducts = [];//массив объектов
        // this._fetchProducts();
        this._getProducts() // теперь берем массив объектов с товарами как будто с сервера
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render();
            });
    }


    /**
     *Метод для заполнения массива goods объектами с товарами
     * @private инкапсулирован в данный базовый класс
     */
    // _fetchProducts() {
    //     this.goods = [
    //         {id: 1, title: "Notebook", price: 2000},
    //         {id: 2, title: "Mouse", price: 20},
    //         {id: 3, title: "Keyboard", price: 200},
    //         {id: 4, title: "Gamepad", price: 50}
    //     ];
    // }
    /**
     * Метод берет с API массив объектов со свойствами товаров
     * @returns {Promise<any>} возвращает промис
     * @private инкапсулирован в базовый класс ProductList
     */
    _getProducts(){
        return fetch(`${API}/catalogData.json`)//возвращается промис
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goods) {
            const productObj = new ProductItem(product);// объект на основе класса ProductItem
            this.allProducts.push(productObj);
            block.insertAdjacentHTML("beforeend", productObj.render());
        }
    }

    /**
     * Метод вычисляет общую стоимость товаров в массиве goods
     * и выводит в консоль
      */
    getTotalSum () {
        return this.goods.reduce((sum, item) => sum + item.price, 0);
    }
}

/**
 * Базовый класс единицы товара
 * принимает в качсетве аргумента единицу товара и картинку-заглушку по умолчанию
 */
class ProductItem {
    constructor(product, img = "http://placehold.it/250x300") {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    /**
     * Метод класса ProductItem возвращает разметку единицы товара
     * @returns {string} строка с блоком html разметки
     */
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src ="${this.img}" alt="product">
                <h3>${this.product_name}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

//класс корзины и его методы.
class ShopCart {
    //Метод добавляет в корзину товар
    addGoods() {

    }

    //Метод удаляет товар из корзины
    removeGoods() {

    }
    //Метод передает html-разметку товаров в корзину
    render() {

    }
}

//класс элемента корзины
class ShopCartItem {
    //Метод передает html-разметку товара
    render() {

    }
}

let list = new ProductsList();//объект класса ProductList
list.render();//отрисовываем объект list

