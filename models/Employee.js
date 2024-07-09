class Employee extends Person {
    constructor(name, address, id, email, salary = 0, daysWorked = 0) {
        super(name, address, id, email);
        this.type = 'employee';
        this.salary = salary;
        this.daysWorked = daysWorked;
    }

    calculateSalary() {
        const salaryVND = this.salary * this.daysWorked;
        return `${salaryVND.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`;
    }
}
