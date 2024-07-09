// Lớp Student kế thừa từ Person
class Student extends Person {
    constructor(name, address, id, email, math, physics, chemistry) {
        super(name, address, id, email);
        this.math = math;
        this.physics = physics;
        this.chemistry = chemistry;
        this.type = 'student';
    }

    // Tính điểm trung bình
    getAverageScore() {
        return (this.math + this.physics + this.chemistry) / 3;
    }
}