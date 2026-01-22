/* ================== DATA ================== */
class Contact {
  constructor(name, email, phone, city) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.city = city;
  }
}

let contacts = [];
let editIndex = -1;
/* ================== ELEMENTS ================== */
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const cityInput = document.querySelector("#city");

const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const phoneError = document.querySelector("#phoneError");

const addBtn = document.querySelector("#addBtn");
const updateBtn = document.querySelector("#updateBtn");
const cancelBtn = document.querySelector("#cancelBtn");

const contactList = document.querySelector("#contactList");
const countSpan = document.querySelector("#count");
const formTitle = document.querySelector("#formTitle");
const searchInput = document.querySelector("#search");

/* ================== VALIDATION ================== */
function validateForm() {
  let valid = true;

  // Reset
  [nameInput, emailInput, phoneInput].forEach((i) =>
    i.classList.remove("invalid")
  );
  nameError.innerText = emailError.innerText = phoneError.innerText = "";

  /* ================= NAME VALIDATION ================= */
  const nameRegex = /^[A-Za-z\s]+$/;
  const name = nameInput.value.trim();
  if (name === "") {
    nameError.innerText = "Name is required";
    nameInput.classList.add("invalid");
    valid = false;
  } else if (!nameRegex.test(name)) {
    nameError.innerText = "Name can only contain letters and spaces";
    nameInput.classList.add("invalid");
    valid = false;
  }

  // ================= EMAIL VALIDATION =================
  const emailVal = emailInput.value.trim();

  if (emailVal.length < 5) {
    emailError.innerText = "Email address too short";
    emailInput.classList.add("invalid");
    valid = false;
  } else {
    const parts = emailVal.split("@");

    if (parts.length !== 2) {
      emailError.innerText = "Email must contain a single @";
      emailInput.classList.add("invalid");
      valid = false;
    } else if (parts[0].trim().length < 1) {
      emailError.innerText = "The name part of email is too short";
      emailInput.classList.add("invalid");
      valid = false;
    } else if (parts[1].trim().length < 3) {
      emailError.innerText = "The domain part of email is too short";
      emailInput.classList.add("invalid");
      valid = false;
    } else if (parts[1].indexOf(".") === -1) {
      emailError.innerText = "Incomplete domain name";
      emailInput.classList.add("invalid");
      valid = false;
    }
  }

  // ================= PHONE VALIDATION =================
  const phonePattern = /^\d{10,15}$/;
  if (phoneInput.value.trim() === "") {
    phoneError.innerText = "Phone is required";
    phoneInput.classList.add("invalid");
    valid = false;
  } else if (!phonePattern.test(phoneInput.value.trim())) {
    phoneError.innerText = "Enter a valid phone number (10-15 digits)";
    phoneInput.classList.add("invalid");
    valid = false;
  }

  return valid;
}

/* ================== ADD ================== */
addBtn.addEventListener("click", () => {
  if (!validateForm()) return;

  const contact = new Contact(
    nameInput.value.trim(),
    emailInput.value.trim(),
    phoneInput.value.trim(),
    cityInput.value.trim()
  );

  contacts.push(contact);
  clearForm();
  displayContacts();
});

/* ================== DISPLAY ================== */
function displayContacts(list = contacts) {
  contactList.innerHTML = "";

  if (list.length === 0) {
    contactList.innerText = "No contacts yet";
  }

  for (let i = 0; i < list.length; i++) {
    const div = document.createElement("div");
    div.className = "contact";
    if (i === editIndex) div.classList.add("editing");

    div.innerHTML = `
              <strong>${list[i].name}</strong><br>
              Email: ${list[i].email}<br>
              Phone: ${list[i].phone}<br>
              City: ${list[i].city || "-"}<br><br>
              <button class="edit-btn" onclick="editContact(${i})">Edit</button>
              <button class="delete-btn" onclick="deleteContact(${i})">Delete</button>
          `;

    contactList.appendChild(div);
  }

  countSpan.innerText = contacts.length;
}

/* ================== EDIT ================== */
function editContact(index) {
  editIndex = index;
  const c = contacts[index];

  nameInput.value = c.name;
  emailInput.value = c.email;
  phoneInput.value = c.phone;
  cityInput.value = c.city;

  formTitle.innerText = "Edit Contact";
  addBtn.classList.add("hidden");
  updateBtn.classList.remove("hidden");
  cancelBtn.classList.remove("hidden");

  displayContacts();
}

/* ================== UPDATE ================== */
updateBtn.addEventListener("click", () => {
  if (!validateForm()) return;

  contacts[editIndex] = new Contact(
    nameInput.value.trim(),
    emailInput.value.trim(),
    phoneInput.value.trim(),
    cityInput.value.trim()
  );

  clearForm();
  displayContacts();
});

/* ================== DELETE ================== */
function deleteContact(index) {
  if (confirm("Are you sure you want to delete this contact?")) {
    contacts.splice(index, 1);
    clearForm();
    displayContacts();
  }
}

// /* ================== SEARCH ================== */
// searchInput.addEventListener("keyup", () => {
//   const text = searchInput.value.toLowerCase();

//   const filtered = contacts.filter(
//     (c) =>
//       c.name.toLowerCase().includes(text) ||
//       c.email.toLowerCase().includes(text) ||
//       c.phone.toLowerCase().includes(text)
//   );

//   displayContacts(filtered);
// });

/* ================== CLEAR ================== */
cancelBtn.addEventListener("click", clearForm);

function clearForm() {
  nameInput.value = emailInput.value = phoneInput.value = cityInput.value = "";
  editIndex = -1;

  formTitle.innerText = "Add Contact";
  addBtn.classList.remove("hidden");
  updateBtn.classList.add("hidden");
  cancelBtn.classList.add("hidden");

  displayContacts();
}

/* ================== Search ================== */

searchInput.addEventListener("keyup", () => {
  const text = searchInput.value.toLowerCase();
  const filtered = contacts.filter((c) => c.name.toLowerCase().includes(text));

  displayContacts(filtered);
});
