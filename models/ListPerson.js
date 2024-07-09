class ListPerson {
    constructor() {
        this.persons = [];
    }

    addPerson(person) {
        this.persons.push(person);
    }

    removePerson(id) {
        this.persons = this.persons.filter(person => person.id !== id);
    }

    updatePerson(id, updatedPerson) {
        const index = this.persons.findIndex(person => person.id === id);
        if (index !== -1) {
            this.persons[index] = updatedPerson;
        }
    }

    getPerson(id) {
        return this.persons.find(person => person.id === id);
    }

    getPersons() {
        return this.persons;
    }

    setPersons(persons) {
        this.persons = persons;
    }
}
