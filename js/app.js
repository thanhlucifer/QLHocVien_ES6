document.addEventListener('DOMContentLoaded', () => {
    const addPersonForm = document.getElementById('addPersonForm');
    const personTableBody = document.querySelector('#personTable tbody');
    const submitButton = document.getElementById('submitButton');
    const personList = new ListPerson();
    let isEditing = false;
    let editingPersonId = null;

    // Tải dữ liệu từ localStorage
    loadFromLocalStorage();

    // Xử lý sự kiện thêm/cập nhật người dùng
    addPersonForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const id = document.getElementById('id').value;
        const email = document.getElementById('email').value;
        const type = document.getElementById('type').value;

        let person;
        if (type === 'student') {
            person = new Student(name, address, id, email);
        } else if (type === 'employee') {
            person = new Employee(name, address, id, email);
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

    function saveToLocalStorage() {
        localStorage.setItem('personList', JSON.stringify(personList.getPersons()));
    }

    function loadFromLocalStorage() {
        const data = localStorage.getItem('personList');
        if (data) {
            personList.setPersons(JSON.parse(data));
            renderTable();
        }
    }

    function renderTable() {
        personTableBody.innerHTML = '';
        personList.getPersons().forEach(person => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${person.name}</td>
                <td>${person.address}</td>
                <td>${person.id}</td>
                <td>${person.email}</td>
                <td>${person.type}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editPerson('${person.id}')">Sửa</button>
                    <button class="btn btn-danger btn-sm" onclick="deletePerson('${person.id}')">Xóa</button>
                </td>
            `;
            personTableBody.appendChild(row);
        });
    }

    window.deletePerson = function(id) {
        personList.removePerson(id);
        saveToLocalStorage();
        renderTable();
    }

    window.editPerson = function(id) {
        const person = personList.getPerson(id);
        if (person) {
            document.getElementById('name').value = person.name;
            document.getElementById('address').value = person.address;
            document.getElementById('id').value = person.id;
            document.getElementById('email').value = person.email;
            document.getElementById('type').value = person.type;
            isEditing = true;
            editingPersonId = id;
            submitButton.textContent = 'Update';
        }
    }
});
