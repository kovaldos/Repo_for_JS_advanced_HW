const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

/**
 * Базовый класс каталога товаров
 *параметр по умолчанию - контейнер (div с классом container) для католога
 */
class ProductsList {
    constructor(container = ".products") {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.renderObj()
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)//возвращается промис
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    // /**
    //  *Метод для заполнения массива goods объектами с товарами
    //  * @private инкапсулирован в данный базовый класс
    //  */
    // _fetchProducts() {
    //     this.goods = [
    //         {id: 1, title: "Notebook", price: 2000},
    //         {id: 2, title: "Mouse", price: 20},
    //         {id: 3, title: "Keyboard", price: 200},
    //         {id: 4, title: "Gamepad", price: 50}
    //     ];
    // }

    /**
     *Метод базового класса
     *создает объекты с товарами
     */
    renderObj() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);// объект на основе класса ProductItem
            this.allProducts.push(productObj);
            block.insertAdjacentHTML("beforeend", productObj.renderGoods());
        }
    }

    /**
     * Метод вычисляет общую стоимость товаров в массиве goods
     * и выводит в консоль
     */
    getTotalSum() {
        console.log(this.goods.reduce((sum, {price}) => sum + price, 0));
    }
}

/**
 * Базовый класс единицы товара
 * принимает в качеcтве аргумента единицу товара и картинку-заглушку по умолчанию
 */
class ProductItem {
    constructor(product, img = "http://placehold.it/250x300") {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    renderGoods() {
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
    constructor(container = ".cart-block") {
        this.container = container;
        this.goods = [];
        this.cartProducts = [];
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data.contents];
                this.render()
            });
    }

    _getProducts() {

        return fetch(`${API}/getBasket.json`)//возвращается промис

            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    //Метод добавляет в корзину товар
    addGoods() {

    }

    //Метод удаляет товар из корзины
    removeGoods() {

    }

    //Метод передает html-разметку товаров в корзину
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const cartProductObj = new ShopCartItem(product);
            this.cartProducts.push(cartProductObj);
            block.insertAdjacentHTML("beforeend", cartProductObj.render());
        }
    }
}

//класс элемента корзины
class ShopCartItem {
    constructor(product, img = "http://placehold.it/100x100"){
        this.title = product.product_name;
        this.price = product.price;
        this.quantity = product.quantity
        this.id = product.id_product;
        this.img = img;
    }
    //Метод передает html-разметку товара
    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
            <div class="product-bio">
            <img src="${this.img}" alt="Product-image">
            <div class="product-desc">
            <p class="product-title">${this.title}</p>
            <p class="product-quantity">Quantity: ${this.quantity}</p>
        <p class="product-single-price">$${this.price} each</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">$${this.quantity*this.price}</p>
            <button class="del-btn" data-id="${this.id}">&times;</button>
        </div>
        </div>`
    }
}

const list = new ProductsList();//объект класса ProductList
const basket = new ShopCart();
list.renderObj();//отрисовываем объект list
list.getTotalSum();
basket.render();
