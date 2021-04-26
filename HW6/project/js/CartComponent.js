Vue.component("cart", {
    props: ["cartGoods", "img", "visibility"],
    template: `
        <div class="cart-block" v-show="visibility"> 
            <cart-item v-for="item of cartGoods" :key="item.id_product" :img="img" :cart-item="item"></cart-item>
            <p v-if="!cartGoods.length">Ваша корзина пуста :(</p>    
        </div>`
});

Vue.component("cart-item", {
    props: ["img", "cartItem"],
    template: `
        <div class="cart-item">
            <div class="product-bio">
                <img :src="img" alt="Product image">
                <div class="product-desc">
                    <div class="product-title">{{ cartItem.product_name }}</div>
                    <div class="product-quantity">Количество: {{ cartItem.quantity }}</div>
                    <div class="product-single-price"> {{ cartItem.price }} за единицу товара</div>
                </div>
            </div>
            <div class="right-block">
                <div class="product-amount">{{cartItem.price*cartItem.quantity}}</div>
                <button class="del-btn" @click="$root.removeProduct(cartItem)">&times;</button>
            </div>
        </div>
    `
})