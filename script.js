const studentForm = document.getElementById("studentForm");
const studentTable = document.querySelector("#studentTable tbody");
let editIndex = null;

// Load from local storage
window.onload = () => {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.forEach(student => addStudentToTable(student));
};

studentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  if (!validateForm(name, studentId, email, contact)) return;

  const student = { name, studentId, email, contact };

  const students = JSON.parse(localStorage.getItem("students")) || [];

  if (editIndex !== null) {
    students[editIndex] = student;
    updateTable();
    editIndex = null;
  } else {
    students.push(student);
    addStudentToTable(student);
  }

  localStorage.setItem("students", JSON.stringify(students));
  studentForm.reset();
});

// Validation Function
function validateForm(name, id, email, contact) {
  const nameRegex = /^[A-Za-z ]+$/;
  const idRegex = /^[0-9]+$/;
  const contactRegex = /^[0-9]{10}$/;
  const emailRegex = /^\S+@\S+\.\S+$/;

  if (!name || !id || !email || !contact) {
    alert("All fields are required.");
    return false;
  }

  if (!nameRegex.test(name)) {
    alert("Name must contain only letters.");
    return false;
  }

  if (!idRegex.test(id)) {
    alert("Student ID must contain only numbers.");
    return false;
  }

  if (!contactRegex.test(contact)) {
    alert("Contact number must be a valid 10-digit number.");
    return false;
  }

  if (!emailRegex.test(email)) {
    alert("Invalid email format.");
    return false;
  }

  return true;
}

// Add Row
function addStudentToTable(student, index = null) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${student.name}</td>
    <td>${student.studentId}</td>
    <td>${student.email}</td>
    <td>${student.contact}</td>
    <td>
      <button class="action-btn edit-btn" onclick="editStudent(${studentTable.rows.length})">Edit</button>
      <button class="action-btn delete-btn" onclick="deleteStudent(${studentTable.rows.length})">Delete</button>
    </td>
  `;

  studentTable.appendChild(row);
}

// Refresh Table
function updateTable() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  studentTable.innerHTML = "";
  students.forEach(addStudentToTable);
}

// Edit Student
window.editStudent = function (index) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.studentId;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;
  editIndex = index;
};

// Delete Student
window.deleteStudent = function (index) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  updateTable();
};