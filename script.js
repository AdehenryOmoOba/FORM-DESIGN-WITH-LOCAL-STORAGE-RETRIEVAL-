// import eventLogger from "./test";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
///////////////////////////////////////////////////
const icon = $(".icon");
const menu = $(".menu");
const save = $(".save");
const retrieve = $(".retrieve");
const email = $("#email");
const comment = $("#comment");
const country = $("#country");
const checkboxes = $$(`input[type="checkbox"]`);
const date = $("#date-input");
const radioOption = $$(`input[type="radio"]`);
const button = $("button");

menu.addEventListener("click", () => {
  icon.classList.toggle("fa-times");

  save.classList.toggle("hide");
  retrieve.classList.toggle("hide");
  // eventLogger("menu clicked");
});
save.addEventListener("click", () => {
  localStorage.setItem("formData", JSON.stringify(getFormData()));
  // eventLogger("New item stored in local storage");
});
retrieve.addEventListener("click", () => {
  let storedData = JSON.parse(localStorage.getItem("formData"));
  console.log(storedData);

  email.value = storedData.email;
  comment.value = storedData.comment;
  country.value = storedData.country;
  date.value = storedData.dateOfBirth;
  for (let i = 0; i < checkboxes.length; i++) {
    if (storedData.hobbies.includes(checkboxes[i].value))
      checkboxes[i].checked = true;
  }

  for (let i = 0; i < radioOption.length; i++) {
    if (radioOption[i].value === storedData.language)
      radioOption[i].checked = true;
  }
  // eventLogger("Retrieved data from local storage");
});

function getFormData(event) {
  if (event) event.preventDefault();
  const hobbies = [];
  let language = "";
  checkboxes.forEach((box) => {
    if (box.checked) hobbies.push(box.value);
  });
  radioOption.forEach((radio) => {
    if (radio.checked) language = radio.value;
  });

  const formData = {
    email: email.value,
    comment: comment.value,
    country: country.value,
    dateOfBirth: date.value,
    hobbies: hobbies,
    language: language,
  };

  // eventLogger("New form data submited");
  return formData;
}

button.addEventListener("click", (e) => {
  console.log(getFormData(e));
});
