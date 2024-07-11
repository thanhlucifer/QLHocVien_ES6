document.addEventListener('DOMContentLoaded', () => {
    const addPersonForm = document.getElementById('addPersonForm');
    const personTableBody = document.querySelector('#personTable tbody');
    const submitButton = document.getElementById('submitButton');
    const personList = new ListPerson();
    let isEditing = false;
    let editingPersonId = null;

    // Load data from localStorage
    loadFromLocalStorage();

    // Handle add/update person event
    addPersonForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const id = document.getElementById('id').value;
        const email = document.getElementById('email').value;
        const type = document.getElementById('type').value;

        const tbMa = document.getElementById('tbMa');
        const tbName = document.getElementById('tbName');
        const tbEmail = document.getElementById('tbEmail');
        const tbLoai = document.getElementById('tbLoai');
        
        let isValid = true;

        // Validate fields
        if (!checkAccountFormat(id, tbMa)) isValid = false;
        if (!checkName(name, tbName)) isValid = false;
        if (!checkEmail(email, tbEmail)) isValid = false;
        if (!checkPosition(type, tbLoai)) isValid = false;
        if (!isValid) {
            return;
        }

        let person;
        if (type === 'student') {
            const mathGrade = Number(prompt('Nhập điểm Toán:'));
            const physicsGrade = Number(prompt('Nhập điểm Lý:'));
            const chemistryGrade = Number(prompt('Nhập điểm Hóa:'));
            person = new Student(name, address, id, email, mathGrade, physicsGrade, chemistryGrade);
        } else if (type === 'employee') {
            const salary = Number(prompt('Nhập lương:'));
            const daysWorked = Number(prompt('Nhập số ngày làm việc:'));
            person = new Employee(name, address, id, email, salary, daysWorked);
        } else if (type === 'customer') {
            person = new Customer(name, address, id, email);
        }

        if (isEditing) {
            personList.updatePerson(editingPersonId, person);
            isEditing = false;
            editingPersonId = null;
            submitButton.textContent = 'Thêm người dùng';
        } else {
            personList.addPerson(person);
        }

        saveToLocalStorage();
        renderTable();
        addPersonForm.reset();
    });

    // Save data to localStorage
    function saveToLocalStorage() {
        localStorage.setItem('personList', JSON.stringify(personList.getPersons()));
    }

    // Load data from localStorage and convert to appropriate class instances
    function loadFromLocalStorage() {
        const data = localStorage.getItem('personList');
        if (data) {
            const parsedData = JSON.parse(data);
            const persons = parsedData.map(obj => {
                if (obj.type === 'student') {
                    return new Student(obj.name, obj.address, obj.id, obj.email, obj.mathGrade, obj.physicsGrade, obj.chemistryGrade);
                } else if (obj.type === 'employee') {
                    return new Employee(obj.name, obj.address, obj.id, obj.email, obj.salary, obj.daysWorked);
                } else if (obj.type === 'customer') {
                    return new Customer(obj.name, obj.address, obj.id, obj.email);
                }
                return null;
            }).filter(person => person !== null);
    
            personList.setPersons(persons);
            renderTable();
        }
    }

    // Render table with optional filtered persons
    function renderTable(filteredPersons = null) {
        personTableBody.innerHTML = '';
        (filteredPersons || personList.getPersons()).forEach(person => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${person.name}</td>
                <td>${person.address}</td>
                <td>${person.id}</td>
                <td>${person.email}</td>
                <td>${person.type}</td>
                <td>${person.type === 'student' ? person.calculateAverageGrade().toFixed(2) : '-'}</td>
                <td>${person.type === 'employee' ? person.calculateSalary() : '-'}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editPerson('${person.id}')">Sửa</button>
                    <button class="btn btn-danger btn-sm" onclick="deletePerson('${person.id}')">Xóa</button>
                </td>
            `;
            personTableBody.appendChild(row);
        });
    }

    // Delete person by id
    window.deletePerson = function(id) {
        personList.removePerson(id);
        saveToLocalStorage();
        renderTable();
    }

    // Edit person by id
    window.editPerson = function(id) {
        const person = personList.getPerson(id);
        if (person) {
            document.getElementById('name').value = person.name;
            document.getElementById('address').value = person.address;
            document.getElementById('id').value = person.id;
            document.getElementById('email').value = person.email;
            document.getElementById('type').value = person.type;
            if (person.type === 'employee') {
                // Set salary and daysWorked fields
                document.getElementById('salary').value = person.salary;
                document.getElementById('daysWorked').value = person.daysWorked;
            }
            isEditing = true;
            editingPersonId = id;
            submitButton.textContent = 'Update';
        }
    }

    // Sort persons by name
    window.sortByName = function() {
        personList.sortByName();
        renderTable();
    }

    // Filter persons by type
    window.filterByType = function() {
        const type = document.getElementById('filterType').value;
        if (type) {
            const filteredPersons = personList.getPersons().filter(person => person.type === type);
            renderTable(filteredPersons);
        } else {
            renderTable();
        }
    }
});
