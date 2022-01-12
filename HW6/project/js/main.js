const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: "#app",
    data: {
        catalogUrl: "/catalogData.json",
        cartUrl: "/getBasket.json",
        cartGoods: [],
        goods: [],
        filteredGoods: [],
        imgCatalog: "https://via.placeholder.com/180x200",
        imgCart: "https://via.placeholder.com/90x100",
        searchLine: "",
        showCart: false,
        // showBadRequestError: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        addProduct(item) {
            let find = this.cartGoods.find(elem => elem.id_product === item.id_product);
            if (find) {
                find.quantity++;
            } else {
                const product = Object.assign({quantity: 1}, item);//создание нового объекта на основе двух, указанных в параметрах метода assign
                this.cartGoods.push(product);
            }
        },

        removeProduct(item) {

            if (item.quantity > 1) {
                item.quantity--;
            } else {
                this.cartGoods.splice(this.cartGoods.indexOf(item), 1);
            }
        },

        filter() {
            let regExp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(elem => regExp.test(elem.product_name));
        }

    },

    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let elem of data) {
                    this.goods.push(elem);
                    this.filteredGoods.push(elem)
                }
            });

        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let elem of data.contents) {
                    this.cartGoods.push(elem);
                }
            });

        // this.getJson(`getProducts.json`)
        //     .then(data => {
        //         for (let elem of data) {
        //             this.goods.push(elem);
        //         }
        //     })
    }
})

