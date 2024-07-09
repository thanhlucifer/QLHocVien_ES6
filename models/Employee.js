// Lớp Employee kế thừa từ Person
class Employee extends Person {
    constructor(name, address, id, email, workDays, salaryPerDay) {
        super(name, address, id, email);
        this.workDays = workDays;
        this.salaryPerDay = salaryPerDay;
        this.type = 'employee';
    }

    // Tính lương
    calculateSalary() {
        return this.workDays * this.salaryPerDay;
    }
}
