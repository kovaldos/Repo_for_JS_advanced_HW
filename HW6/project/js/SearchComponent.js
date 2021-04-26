Vue.component("search-form", {
    props: ["value"],
    template:`
        <form action="#" class="header__form" @submit.prevent="$parent.filter">
        <input type="text" class="header__search"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)">
        <button type="submit" class="search-btn"><i class="fas fa-search"></i></button>
        </form>`
});