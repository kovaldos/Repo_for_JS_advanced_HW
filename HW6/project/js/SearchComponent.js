Vue.component("search-form", {
    template:`
        <form action="#" class="header__form" @submit.prevent="$parent.filter">
        <input type="text" class="header__search"
        v-model="$parent.searchLine">
        <button type="submit" class="search-btn"><i class="fas fa-search"></i></button>
        </form>`
});