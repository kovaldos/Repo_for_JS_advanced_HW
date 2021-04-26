Vue.component("search-form", {
    props: ["value"],
    template:`
        <input type="text" class="header__search"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)">`
});