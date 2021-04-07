class GoodsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
    }

    _fetchProducts() {
        this.goods = [
            {id: 1, title: "Notebook", price: 2000},
            {id: 2, title: "Mouse", price: 20},
            {id: 3, title: "Keyboard", price: 200},
            {id: 4, title: "Gamepad", price: 50},
        ];
    }
    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goods) {
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", productObj.render());
        }
    }
// Метод для вычисления общей стоимости товаров в массиве
    getTotalSum () {
        let sum = 0;
        this.goods.forEach(product => sum += product.price);
        console.log(sum);
    }

}

class ProductItem {
    constructor(product, img = "https://picsum.photos/250/300?random=1") {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src ="${this.img}" alt="product">
                <h3>${this.title}</h3>
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
    //Метод передает html-разметку товаров в корзине
    render() {

    }
}

//класс элемента корзины
class ShopCartItem {
    //Метод передает html-разметку товара
    render() {

    }
}

let list = new GoodsList();
list.render();
list.getTotalSum();
