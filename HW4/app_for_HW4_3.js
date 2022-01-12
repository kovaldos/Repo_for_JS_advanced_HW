class FormValidator {
    constructor(form) {
        this.form = form;
        this.patterns = {
            name: /^[a-zа-яЁ]/+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[a-zа-я0-9._-]+@[a-z0-9-_]+\.[a-z0-9-_]{2,4}/iu
        }
        this.error = {
            name: "Имя должно содержать только буквы.",
            phone: "Телефон имеет вид +7(000)000-0000.",
            email: "E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru."
        }
        this.errorClass = "error-msg";
        this.valid = false;
        this._validateForm();

    }
    validate(regexp, value){
        regexp.test(value)
    }
    _validateForm(){
        let errors = [...document.getElementById(this.form).querySelectorAll(`.${this.errorClass}`)];
        for (let error of errors){
            error.remove();
        }
        let formFields = [...document.getElementById(this.form).getElementsByTagName("input")];
        for (let field of formFields){
            this._validate(field);
        }
        if(![...document.getElementById(this.form).querySelectorAll(".error")].length){
            this.valid = true;
        }
    }
    _validate(field){
        if(this.patterns[field.name]){
            if(!this.patterns[field.name].test(field.value)){
                field.classList.add("error");
                this._addErrorMsg(field);
                this._watchField(field);
            }
        }
    }
    _addErrorMsg(field){
        let error = `<div class="${this.errorClass}">${this.errors[field.name]}</div> `;
        field.parentNode.insertAdjacentHTML("beforeend", error);
    }
    _watchField(field){
        field.addEventListener("input", () => {
            let error = field.parentNode.querySelector(`.${this.errorClass}`);
            if(this.patterns[field.name].test(field.value)){
                field.classList.remove("error");
                field.classList.add("success");
                if(error){
                    error.remove();
                }
            } else {
                field.classList.remove("success");
                field.classList.add("error");
                if(!error){
                    this._addErrorMsg(field);
                }
            }
        })
    }
}