const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
/**
 * Базовый класс списка всех товаров
 */
class GoodsList {
    constructor(url, container, list = list2){
        this.container = container;
        this.list = list;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this._init();
    }
    getJson(url){
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    handleData(data){
        this.goods = [...data];
        this.render();
    }

    // Почему не работает? Или неправильно вызываю?
    getTotalSum(){
        return this.allProducts.reduce((sum, item) => sum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            //console.log(this.constructor.name);
            const productObj = new this.list[this.constructor.name](product);//мы сделали объект товара либо CartItem, либо ProductItem в зависимости от того, какой конструктор вызывает?
            // свойство name - это название конструктора?
            console.log(productObj);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML("beforeend", productObj.render());
        }
    }
    _init(){
        return false
    }
}

/**
 * Базовый класс единицы товара
 */
class Item{
    constructor(elem, img = "http://placehold.it/250x300"){
        this.product_name = elem.product_name;
        this.price = elem.price;
        this.id_product = elem.id_product;
        this.img = img;
    }
    render(){//генерация html-разметки товара для каталога товаров
        return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Product-image">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn"
                    data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>`
    }
}

/**
 * Подкласс-наследик базового класса списка товаров
 */
class ProductsList extends GoodsList{
    constructor(cart, container = ".products", url = "/catalogData.json"){
        super(url, container);//вызываем базовый класс каталога товаров
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));//handleData запускает отрисовку либо каталога товаров, либо списка товаров корзины
    }
    _init(){
        document.querySelector(this.container).addEventListener("click", e => {
            if(e.target.classList.contains("buy-btn")){
                //console.log(e.target);
                this.cart.addProduct(e.target);
            }
        });

    }
}

/**
 * Подкласс - наследник класса единицы товара
 */
class ProductItem extends Item{}

/**
 * Класс корзины. Наследует от базового класса списка товаров
 */
class Cart extends GoodsList{
    constructor(container = ".cart-block", url = "/getBasket.json"){
        super(url, container);
        this.getJson()
            .then(data => {
                this.handleData(data.contents);//вывели все товары в корзине
            });
    }

    /**
     * Метод добавдяет в корзину единицу товара при нажатии на кнопку "купить"
     * @param element единица товара
     */
    addProduct(element){
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result === 1){
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if(find){
                        find.quantity++;
                        this._updateCart(find);
                    } else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset['price'],
                            product_name: element.dataset['name'],
                            quantity: 1
                        };
                        this.goods = [product];
                        this.render();
                    }
                } else {
                    alert("Error");
                }
            })
    }

    /**
     * Метод удаляет товар из корзины при нажатии кнопки "удалить товар из корзины (.del-btn)"
     * @param element единица товара
     */
    removeProduct(element){
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if(data.result === 1){
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if(find.quantity > 1){
                        find.quantity--;
                        this._updateCart(find);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                    }
                } else {
                    alert("Error");
                }
            })
    }

    /**
     * Метод передает в соответствующую разметку изменение стоимости и количества товаров в корзине
     * @param product
     * @private инкапсулирован в класс Корзины
     */
    _updateCart(product){
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector(".product-quantity").textContent = `Quantity: ${product.quantity}`;
        block.querySelector(".product-price").textContent = `$${product.quantity*product.price}`;
    }

    /**
     * Метод отображает или скрывает блок корзины при нажатии на кнопку корзины,
     * а также удаляет товары из корзины при нажатии кнопки "удалить товар из корзины(del-btn)"
     * @private инкапсулирован в класс Корзины
     */
    _init(){
        document.querySelector(".btn-cart").addEventListener("click", () => {
            document.querySelector(this.container).classList.toggle("invisible");
        });
        document.querySelector(this.container).addEventListener("click", e => {
            if(e.target.classList.contains("del-btn")){
                this.removeProduct(e.target);
            }
        })
    }

}

/**
 * Класс - наследник базового класса единицы товара
 */
class CartItem extends Item{
    constructor(el, img = "http://placehold.it/100x100"){
        super(el, img);
        this.quantity = el.quantity;
    }

    /**
     * Метод возвращает строку с разметкой товаров в корзине
     * @returns {string}
     */
    render(){
        return `<div class="cart-item" data-id="${this.id_product}">
            <div class="product-bio">
            <img src="${this.img}" alt="Product-image">
            <div class="product-desc">
            <p class="product-title">${this.product_name}</p>
            <p class="product-quantity">Quantity: ${this.quantity}</p>
        <p class="product-single-price">$${this.price} each</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">$${this.quantity*this.price}</p>
            <button class="del-btn" data-id="${this.id_product}">&times;</button>
        </div>
        </div>`
    }
}

const list2 = {
    ProductsList: ProductItem,
    Cart: CartItem
};

let cart = new Cart();
let products = new ProductsList(cart);//Если мы хотим использовать в классе
//методы другого класса, то удобнее всего в конструктор передать объект класса,
//методы которого нам нужны в данном классе
//products.getJson(`getProducts.json`).then(data => products.handleData(data));