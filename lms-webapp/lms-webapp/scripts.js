// Mock in-memory storage
let students = [];
let courses = [];

// Generic function to fetch and populate tables
function fetchData(apiEndpoint, tableId) {
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector(`#${tableId} tbody`);
            if (!tbody) return;

            tbody.innerHTML = '';
            data.forEach(row => {
                const tr = document.createElement('tr');
                Object.values(row).forEach(val => {
                    const td = document.createElement('td');
                    td.textContent = val || '-';
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
        })
        .catch(err => console.error('Error fetching data:', err));
}

// Handle student form submission
document.getElementById('studentForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const student = {
        studentID: document.getElementById('studentID').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };
    students.push(student);
    displayStudents();
});

function displayStudents() {
    const container = document.getElementById('studentList');
    if (!container) return;
    container.innerHTML = '<h2>Registered Students</h2>';
    students.forEach((s, i) => {
        container.innerHTML += `<p>${i+1}. ${s.firstName} ${s.lastName} - ${s.email}</p>`;
    });
}

// Same reusable logic can be extended for other forms