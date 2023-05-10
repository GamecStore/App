class validateForm {
    constructor(form) {
        this.form = form;
        this.inputs = document.getElementById('gameSearch');
    }


    validate() {
        let value = this.inputs.value.trim();
        if (value === '') {
            document.getElementById('gameSearch').style.border = '2px solid red';
            document.getElementById('gameSearch').placeholder = 'Please enter a game title';
            console.log('Please enter a game title');
        }

    }

}


const form = document.getElementById('gameSearchForm');
const test = new validateForm(form);
form.addEventListener('submit', event => {
    event.preventDefault();

    test.validate();
});
