const elForm = document.querySelector(".js-form");
const elName = document.querySelector(".js-input-name");
const elRelationship = document.querySelector(".js-input-relationship");
const elPhone = document.querySelector(".js-input-phone");
const elContact = document.querySelector(".js-contact");

const localData = JSON.parse(window.localStorage.getItem("conatcts"));
const contact = localData || [];

const addNewContact = (array, node) => {
  window.localStorage.setItem("conatcts", JSON.stringify(contact));
  node.textContent = "";
  array.forEach((el) => {
    const newName = document.createElement("h4");
    const newRelationship = document.createElement("h5");
    const newPhone = document.createElement("p");
    const newEditButton = document.createElement("button");
    const newDeleteButton = document.createElement("button");

    newName.setAttribute(
      "class",
      "border border-start-0 border-bottom-0 border-end-0 border-success mt-4"
    );
    newRelationship.setAttribute("class", "js-relationship");
    newPhone.setAttribute(
      "class",
      "rounded border border-primary p-2 d-inline-block me-auto m-0"
    );
    newEditButton.setAttribute(
      "class",
      "js-edit-btn btn btn-warning ms-5 me-3"
    );
    newDeleteButton.setAttribute("class", "js-delete-btn btn btn-danger");
    newEditButton.dataset.contacId = el.id;
    newDeleteButton.dataset.contacId = el.id;

    newName.textContent = "name: " + el.name;
    newRelationship.textContent = "relationship: " + el.relation;
    newPhone.textContent = el.phone;
    newEditButton.textContent = "EDIT";
    newDeleteButton.textContent = "DELETE";

    elContact.appendChild(newName);
    elContact.appendChild(newRelationship);
    elContact.appendChild(newPhone);
    elContact.appendChild(newEditButton);
    elContact.appendChild(newDeleteButton);

    elName.value = "";
    elRelationship.value = "";
    elPhone.value = "";
  });
};

if(contact.length !== 0) {
  addNewContact(contact, elContact);
}else {
  const elTitle = document.createElement('h3')
  elTitle.textContent = 'Contacts No ❌'
  elContact.appendChild(elTitle)
  elTitle.setAttribute('class', 'text-center')
}
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const findedIndex = contact.findIndex((item) => item.phone === elPhone.value);

  if (findedIndex >= 0) {
    alert("There is a user with such a number");
  } else {
    const userContact = {
      id: contact.length + 1,
      name: elName.value,
      relation: elRelationship.value,
      phone: elPhone.value,
    };

    contact.push(userContact);
    addNewContact(contact, elContact);

  }
});

elContact.addEventListener("click", (evt) => {
  if (evt.target.matches(".js-delete-btn")) {
    let contactId = evt.target.dataset.contacId;

    let findedContact = contact.findIndex((el) => el.id == contactId);

    contact.splice(findedContact, 1);
    addNewContact(contact, elContact);
  }

  if (evt.target.matches(".js-edit-btn")) {
    let contactId = evt.target.dataset.contacId;

    let findedContact = contact.find((el) => el.id == contactId);
    let editName = prompt("edit name", findedContact.name);
    let editRelation = prompt("relationship", findedContact.relation);
    let editPhone = prompt("editPhone", findedContact.phone);

    findedContact.name = editName;
    findedContact.relation = editRelation;
    findedContact.phone = editPhone;

    addNewContact(contact, elContact);
  }
});


const btnMode = document.querySelector('.dark-mode-btn')
let theme = false

btnMode.addEventListener('click' , () => {
  theme =!theme
  const bg = theme ? "dark" : "light";
  window.localStorage.setItem('theme' , bg)
  changeTheme()
})

function changeTheme () {
  if(window.localStorage.getItem('theme') == 'dark') {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
}
changeTheme()

