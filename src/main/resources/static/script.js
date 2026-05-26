let editingEmployeeId = null;

document
    .getElementById("employeeForm")
    .addEventListener("submit", async function(event) {

    event.preventDefault();

if(
    document.getElementById("name").value.trim() === "" ||

    document.getElementById("email").value.trim() === "" ||

    document.getElementById("department").value.trim() === "" ||

    document.getElementById("salary").value.trim() === ""
) {

    const message =
        document.getElementById("message");

    message.innerText =
        "Please fill all fields!";

    message.className = "error";

    return;
}

   const name =
    document.getElementById("name").value.trim();

const email =
    document.getElementById("email").value.trim();

const department =
    document.getElementById("department").value.trim();

const salary =
    document.getElementById("salary").value.trim();

const message =
    document.getElementById("message");

const namePattern = /^[A-Za-z ]+$/;

const departmentPattern = /^[A-Za-z ]+$/;

const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(
    !name ||
    !email ||
    !department ||
    !salary
) {

    message.innerText =
        "All fields are required!";

    message.style.color = "red";

    return;
}

if(!namePattern.test(name)) {

    message.innerText =
        "Name should contain only letters!";

    message.style.color = "red";

    return;
}

if(!emailPattern.test(email)) {

    message.innerText =
        "Enter valid email address!";

    message.style.color = "red";

    return;
}

if(!departmentPattern.test(department)) {

    message.innerText =
        "Department should contain only letters!";

    message.style.color = "red";

    return;
}

if(isNaN(salary)) {

    message.innerText =
        "Salary should contain numbers only!";

    message.style.color = "red";

    return;
}

const employee = {

    name: name,

    email: email,

    department: department,

    salary: salary
};

    let url =
        "http://localhost:8082/employees/register";

    let method = "POST";

    if(editingEmployeeId !== null) {

        url =
            `http://localhost:8082/employees/${editingEmployeeId}`;

        method = "PUT";
    }

    try {

        await fetch(url, {

            method: method,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(employee)
        });

        const message =
    document.getElementById("message");

showToast("Employee Added Successfully!");
message.style.color = "green";
message.className = "success";

        document.getElementById("employeeForm").reset();

        editingEmployeeId = null;

        document.querySelector("button").innerText =
            "Add Employee";

        loadEmployees();

    } catch(error) {

        console.error(error);
    }
});

async function loadEmployees() {

    const response =
        await fetch("http://localhost:8082/employees");

    const employees = await response.json();

    const tableBody =
        document.getElementById("employeeTableBody");

    tableBody.innerHTML = "";

    document.getElementById("totalEmployees")
    .innerText = employees.length;

const itCount = employees.filter(
    employee =>
        employee.department.toLowerCase() === "it"
).length;

document.getElementById("itEmployees")
    .innerText = itCount;

const hrCount = employees.filter(
    employee =>
        employee.department.toLowerCase() === "hr"
).length;

document.getElementById("hrEmployees")
    .innerText = hrCount;

    employees.forEach(employee => {

        tableBody.innerHTML += `

        <tr>

            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>

            <td class="action-buttons">

                <button onclick="editEmployee(
                    ${employee.id},
                    '${employee.name}',
                    '${employee.email}',
                    '${employee.department}',
                    '${employee.salary}'
                )">
                    Edit
                </button>

                <button onclick="deleteEmployee(${employee.id})">
                    Delete
                </button>

            </td>

        </tr>
        `;
    });
}

async function deleteEmployee(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this employee?");

    if(!confirmDelete) {
        return;
    }

    await fetch(
        `http://localhost:8082/employees/${id}`,
        {
            method: "DELETE"
        }
    );

    const message =
    document.getElementById("message");

showToast("Employee Deleted Successfully!");

message.className = "success";

    loadEmployees();
}

function editEmployee(
    id,
    name,
    email,
    department,
    salary
) {

    editingEmployeeId = id;

    document.getElementById("name").value = name;

    document.getElementById("email").value = email;

    document.getElementById("department").value = department;

    document.getElementById("salary").value = salary;

    document.querySelector("button").innerText =
        "Update Employee";
}

document
    .getElementById("searchInput")
    .addEventListener("keyup", function() {

    const value =
        this.value.toLowerCase();

    const rows =
        document.querySelectorAll("#employeeTableBody tr");

    rows.forEach(row => {

        row.style.display =
            row.innerText.toLowerCase().includes(value)
                ? ""
                : "none";
    });
});

loadEmployees();
showToast("Toast Working!");
document
    .getElementById("darkModeToggle")
    .addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");
});
document
    .getElementById("logoutBtn")
    .addEventListener("click", function() {

    localStorage.removeItem("loggedIn");

    window.location.href = "login.html";
});
function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.innerText = message;

    toast.style.display = "block";

    setTimeout(() => {

        toast.style.display = "none";

    }, 3000);
}