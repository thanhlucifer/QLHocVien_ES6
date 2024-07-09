class Customer extends Person {
    constructor(name, address, id, email, companyName, invoiceValue, rating) {
        super(name, address, id, email);
        this.companyName = companyName;
        this.invoiceValue = invoiceValue;
        this.rating = rating;
        this.type = 'customer';
    }
}
