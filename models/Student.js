
class Student extends Person {
    constructor(name, address, id, email, mathGrade = 0, physicsGrade = 0, chemistryGrade = 0) {
        super(name, address, id, email);
        this.type = 'student';
        this.mathGrade = mathGrade;
        this.physicsGrade = physicsGrade;
        this.chemistryGrade = chemistryGrade;
    }

    calculateAverageGrade() {
        const numberOfSubjects = 3; // Assume always calculating average of three subjects: Math, Physics, Chemistry
        const totalGrades = this.mathGrade + this.physicsGrade + this.chemistryGrade;
        return totalGrades / numberOfSubjects;
    }
}
