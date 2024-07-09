class Customer extends Person {
    constructor(name, address, id, email) {
        super(name, address, id, email);
        this.type = 'customer';
    }
}