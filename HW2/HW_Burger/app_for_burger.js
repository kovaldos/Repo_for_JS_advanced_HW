//класс описывает вложенные свойства елементов бургера
class Param {
    constructor(element) {
        this.name = element.value;//название свойства (
        this.price = +element.dataset.price;
        this.calories = +element.dataset.calories;
    }
}

class Burger {
    constructor(size, add, topping){
        this.size = new Param(this._select(size));//у свойства есть вложенные свойства
        this.add = new Param(this._select(add));//поэтому они созданы как объекты класса Param
        this.toppings = this._getToppings(topping);
    }

    _select(name) {
        return document.querySelector(`input[name="${name}"]:checked`);
    }

    _getToppings(name) {
        let result = [];
        this._selectAll(name).forEach(elem => result.push(new Param(elem)));
        return result;
    }

    _selectAll(name) {
        return document.querySelectorAll(`input[name="${name}"]:checked`);
    }

    _sumPrice() {
        let result = this.size.price + this.add.price;
        this.toppings.forEach(topping => result += topping.price);
        return result;
    }

    _sumCalories() {
        let result = this.size.calories + this.add.calories;
        this.toppings.forEach(topping => result += topping.calories);
        return result;
    }

    showSum(price, calories){
        document.querySelector(price).textContent = this._sumPrice();
        document.querySelector(calories).textContent = this._sumCalories();
    }
}

