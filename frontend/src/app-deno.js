import "./style.css";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import MicroModal from "micromodal";
import debounce from "debounce";

MicroModal.init();
// Create an instance of Notyf
const notyf = new Notyf();
const apiUrl = "http://localhost:3002/api/contacts";
// add new contact button
const addNewContactBtn = document.getElementById("add-new-contact-btn");
addNewContactBtn.addEventListener("click", () => {
  MicroModal.show("add-form-modal");
});

// pagination buttons
const paginationValue = document.querySelector("#pagination-value");
const prevBtn = document.querySelector("#pagination-previous");
const nextBtn = document.querySelector("#pagination-next");

// default page number
let pageNumber = 1;
paginationValue.textContent = `Page ${pageNumber}`;

let totalItems = 0; // total number of items
const itemsPerPage = 10; // number of items per page
let totalPages = 0; // total number of pages

// function to calculate total pages
function calculateTotalPages() {
  totalPages = Math.ceil(totalItems / itemsPerPage);
  paginationValue.textContent = `Page ${pageNumber} of ${totalPages}`;
}

// function for previous button
prevBtn.addEventListener("click", () => {
  if (pageNumber > 1) {
    pageNumber--;
    fetchContactsToHtml();
  }
});

// function for next button
nextBtn.addEventListener("click", () => {
  if (pageNumber < totalPages) {
    pageNumber++;
    fetchContactsToHtml();
  }
});

// check for search options select-filter-options
const selectFilterOptions = document.getElementById("select-filter-options");
let selectValue = selectFilterOptions.value;

selectFilterOptions.addEventListener("change", (event) => {
  selectValue = event.target.value;
});

// function to fetch and display contacts
function fetchContactsToHtml(searchValue = "") {
  fetch(`${apiUrl}`)
    .then((response) => response.json())
    .then((contacts) => {
      let filteredContacts = contacts;

      const contactsTable = document.getElementById("contacts-table");
      // clear contacts table
      contactsTable.querySelector("tbody").innerHTML = "";

      // Display a message when there are no contacts in the database
      if (filteredContacts.length === 0) {
        const noContactsRow = document.createElement("tr");
        noContactsRow.setAttribute("data-empty", "true");
        noContactsRow.classList.add("bg-white");
        noContactsRow.innerHTML = `
          <td
            colspan="10"
            class="text-center font-medium text-gray-500 py-3"
          >
            No contacts found. Please add some.
          </td>`;
        document
          .getElementById("contacts-table")
          .querySelector("tbody")
          .appendChild(noContactsRow);

        // make pagination 0
        paginationValue.textContent = `0 pages`;
        return;
      }
      // Filter contacts based on company value
      if (selectValue === "company" && searchValue.trim() !== "") {
        filteredContacts = contacts.filter((contact) =>
          contact.companyName.toLowerCase().includes(searchValue.toLowerCase())
        );
      }

      // Filter contacts based on name value
      if (selectValue === "contactPerson" && searchValue.trim() !== "") {
        filteredContacts = contacts.filter((contact) =>
          contact.contactPerson
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        );
      }

      totalItems = filteredContacts.length;
      calculateTotalPages();

      // for pagination
      const startIndex = (pageNumber - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedContacts = filteredContacts.slice(startIndex, endIndex);

      // Display a message when there are no search matches
      if (paginatedContacts.length === 0) {
        const noResultsRow = document.createElement("tr");
        noResultsRow.classList.add("bg-white");
        noResultsRow.innerHTML = `
          <td colspan="10" class="px-6 py-4 whitespace-nowrap text-center">
            No results found for the search query.
          </td>
        `;
        contactsTable.querySelector("tbody").appendChild(noResultsRow);

        // make pagination 0
        paginationValue.textContent = `0 pages`;

        return;
      }

      paginatedContacts.forEach((contact) => {
        const row = document.createElement("tr");
        row.classList.add("bg-white");

        row.innerHTML = `
              <td class="px-6 py-4 whitespace-nowrap">${contact.title}</td>
              <td class="px-6 py-4 whitespace-nowrap">${contact.contactPerson}</td>
              <td class="px-6 py-4 whitespace-nowrap">${contact.jobTitle}</td>
              <td class="px-6 py-4 whitespace-nowrap">${contact.companyName}</td>
              <td class="px-6 py-4 whitespace-nowrap">${contact.location}</td>
              <td class="px-6 py-4 whitespace-nowrap">${contact.industryType}</td>
              <td class="px-6 py-4 whitespace-nowrap">${contact.officialEmailId}</td>
              <td class="px-6 py-4 whitespace-nowrap">${contact.mobileNumber1}</td>
              <td class="px-6 py-4 whitespace-nowrap">${contact.mobileNumber2}</td>
              <td class="px-6 py-4 whitespace-nowrap">
              <button class="edit-btn bg-indigo-600 hover:bg-indigo-900 text-white px-2 rounded text-sm" data-id="${contact["id_"]}">Edit</button>
              <button class="delete-btn bg-red-600 hover:bg-red-900 text-white px-2 rounded text-sm" data-id="${contact["id_"]}">Delete</button>
              </td>
    `;
        contactsTable.querySelector("tbody").appendChild(row);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

fetchContactsToHtml();

// function to fetch amd return the contact
function fetchContacts() {
  try {
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((contacts) => contacts);
  } catch (error) {
    console.error(error);
  }
}

const addForm = document.getElementById("add-form");

// Add contact
addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const newContact = Object.fromEntries(formData);

  fetch(`${apiUrl}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newContact),
  })
    .then(async (response) => {
      if (!response.ok) {
        // if email already exists
        if (response.status === 400) {
          const data = await response.json();
          alert(data.error);
          throw new Error(data.error);
        }
        // if name already exists
        else if (response.status === 409) {
          const doYouWantToContinue = confirm(
            "Name already exists. Do you want to continue?"
          );

          if (!doYouWantToContinue) {
            const data = await response.json();
            throw new Error(data.error);
          }
        }
      }

      // if name already exists but still want to continue or if everything is fine
      return response.json();
    })
    .then((data) => {
      // contact successfully added
      notyf.success("Contact successfully added!!");
      event.target.reset();
      fetchContactsToHtml();
      // MicroModal.close("add-form-modal");
    })
    .catch((error) => {
      console.error(error);
      notyf.error(error.message);
    });

  let isEmailSame = false;
  let isNameSame = false;

  // Validation for same email
  // fetch(`${apiUrl}/check`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(newContact),
  // })
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     if (data.detail.status_code === 400) {
  //       // notyf.error("Email already exists").options = {
  //       //   duration: 5000,
  //       // };
  //       isEmailSame = true;
  //       alert(data.detail.message);
  //     }

  //     // name same
  //     if (data.detail.status_code === 401) {
  //       const isContinue = confirm(data.detail.message);
  //       if (isContinue === false) {
  //         isNameSame = true;
  //         return;
  //       }
  //       isNameSame = false;

  //       // MicroModal.close("add-form-modal");
  //       // MicroModal.show("name-conflict-modal");
  //     }

  //     if (!(isEmailSame || isNameSame)) {
  //       fetch(`${apiUrl}`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(newContact),
  //       })
  //         .then((response) => response.json())
  //         .then((contact) => {
  //           // alert("Contact added successfully!");

  //           event.target.reset();
  //           fetchContactsToHtml();

  //           // hide the add form
  //           // MicroModal.close("add-form-modal");

  //           // success notification
  //           notyf.success("Contact added successfully!");
  //         })
  //         .catch((error) => {
  //           // alert("Error adding contact: " + error);
  //           notyf.error("Error adding contact: " + error);
  //           console.error(error);
  //         });
  //     }

  //     // if (!isNameSame) {
  //     //   fetch(`${apiUrl}/create`, {
  //     //     method: "POST",
  //     //     headers: {
  //     //       "Content-Type": "application/json",
  //     //     },
  //     //     body: JSON.stringify(newContact),
  //     //   })
  //     //     .then((response) => response.json())
  //     //     .then((contact) => {
  //     //       // alert("Contact added successfully!");

  //     //       event.target.reset();
  //     //       fetchContactsToHtml();

  //     //       // hide the add form
  //     //       // MicroModal.close("add-form-modal");

  //     //       // success notification
  //     //       notyf.success("Contact added successfully!");
  //     //     })
  //     //     .catch((error) => {
  //     //       // alert("Error adding contact: " + error);
  //     //       notyf.error("Error adding contact: " + error);
  //     //       console.error(error);
  //     //     });
  //     // }
  //   });
});

// Delete contact
const contactsTable = document.getElementById("contacts-table");
contactsTable.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const contactId = event.target.getAttribute("data-id");
    const contact = await fetch(`${apiUrl}/${contactId}`).then((response) =>
      response.json()
    );
    // get name and email of the contact
    const contactPerson = contact.contactPerson;
    const officialEmailId = contact.officialEmailId;

    // check if the user really wants to delete the contact
    if (
      !confirm(
        `Are you sure you want to delete ${contactPerson} with email (${officialEmailId})?`
      )
    ) {
      return;
    }
    fetch(`${apiUrl}/${contactId}`, { method: "DELETE" })
      .then(() => {
        // alert("Contact deleted successfully!");
        notyf.success("Contact deleted successfully!");
        fetchContactsToHtml();
      })
      .catch((error) => {
        // alert("Error deleting contact: " + error);
        notyf.error("Error deleting contact: " + error);
        console.error(error);
      });
  }
});

// Edit contact
contactsTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("edit-btn")) {
    const id = event.target.getAttribute("data-id");
    fetch(`${apiUrl}/${id}`)
      .then((response) => response.json())
      .then((contact) => {
        const editForm = document.getElementById("edit-form");
        editForm.querySelector("#id_").value = contact["id_"];
        editForm.querySelector("#title").value = contact.title;
        editForm.querySelector("#contactPerson").value = contact.contactPerson;
        editForm.querySelector("#jobTitle").value = contact.jobTitle;
        editForm.querySelector("#companyName").value = contact.companyName;
        editForm.querySelector("#location").value = contact.location;
        editForm.querySelector("#industryType").value = contact.industryType;
        editForm.querySelector("#officialEmailId").value =
          contact.officialEmailId;
        editForm.querySelector("#mobileNumber1").value = contact.mobileNumber1;
        editForm.querySelector("#mobileNumber2").value = contact.mobileNumber2;

        // Show the edit form
        MicroModal.show("edit-form-modal");

        // scroll to the edit form (not working on the first 1-2 clicks)
        // editForm.scrollIntoView({
        //   behavior: "smooth",
        //   block: "center",
        // });

        // scroll to the top of the page
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((error) => {
        // alert("Error editing contact: " + error);
        console.error(error);
      });
  }
});

// Update contact
const editForm = document.getElementById("edit-form");
editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const updatedContact = Object.fromEntries(formData);
  fetch(`${apiUrl}/${updatedContact["id_"]}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedContact),
  })
    .then(() => {
      // alert("Contact updated successfully!");

      // success notification
      notyf.success("Contact updated successfully!");
      event.target.reset();
      fetchContactsToHtml();
    })
    .catch((error) => {
      // alert("Error updating contact: " + error);
      // error notification
      notyf.error("Error updating contact: " + error);
      console.error(error);
    })
    .finally(() => {
      // Hide the edit form
      MicroModal.close("edit-form-modal");
    });
});

// Cancel edit
const cancelEditBtn = document.getElementById("cancel-edit-btn");
cancelEditBtn.addEventListener("click", () => {
  MicroModal.close("edit-form-modal");

  // Reset the form
  editForm.querySelector("#id_").value = "";
  editForm.querySelector("#title").value = "";
  editForm.querySelector("#contactPerson").value = "";
  editForm.querySelector("#jobTitle").value = "";
  editForm.querySelector("#companyName").value = "";
  editForm.querySelector("#location").value = "";
  editForm.querySelector("#industryType").value = "";
  editForm.querySelector("#officialEmailId").value = "";
  editForm.querySelector("#mobileNumber1").value = "";
  editForm.querySelector("#mobileNumber2").value = "";
});

// Make a search function that filters by the company name and how to implement it such that it will filter the table when the user types in the search bar
function searchByCompanyName() {
  const searchInput = document.getElementById("search-input");
  const searchValue = searchInput.value;

  // Debounce the search function
  searchInput.oninput = debounce(function () {
    pageNumber = 1; // Reset page number on search
    fetchContactsToHtml(searchValue);
  }, 300);
}

// clear search bar
const clearSearchBtn = document.getElementById("clear-search-btn");
clearSearchBtn.addEventListener("click", () => {
  const searchInput = document.getElementById("search-input");
  searchInput.value = "";
  fetchContactsToHtml();
});

// Call the search function when the user types in the search bar
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", searchByCompanyName);

// Get all input elements with the "required" attribute
const requiredInputs = document.querySelectorAll("input[required]");

// Loop through each required input
requiredInputs.forEach((input) => {
  // Create the required input span element
  const requiredSpan = document.createElement("span");
  requiredSpan.classList.add(
    "required-input-span",
    "text-xs",
    "px-0.5",
    "text-red-600"
  );
  requiredSpan.textContent = "* Required";

  // Insert the required input span after the input element
  input.insertAdjacentElement("afterend", requiredSpan);
});

// download/export the contact data
const downloadBtn = document.getElementById("download-contacts-btn");

// function to download/export the table data
function downloadContactsData() {
  try {
    fetch(`${apiUrl}/download`)
      .then((response) => {
        if (response.ok) {
          const blob = response.blob();
          return blob;
        } else {
          notyf.error("Error downloading data: " + response.statusText);
        }
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "contacts.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
  } catch (error) {
    console.error(error);
    notyf.error("Error downloading data: " + error);
  }
}

downloadBtn.addEventListener("click", downloadContactsData);

// button for adding demo contacts
const demoContactsBtn = document.getElementById("add-demo-contacts");
demoContactsBtn.addEventListener("click", async () => {
  const doYouWantToContinue = confirm(
    "Are you sure you want to add demo contacts?"
  );
  if (!doYouWantToContinue) {
    notyf.error("Add demo contacts cancelled.");
    return;
  }
  try {
    const response = await fetch(`${apiUrl}/add-demo-contacts`, {
      method: "POST",
    });

    if (response.ok) {
      fetchContactsToHtml();
      notyf.success("Demo contacts added successfully!");
    } else {
      notyf.error("Error adding demo contacts: " + response.statusText);
    }
  } catch (error) {
    notyf.error("Error adding demo contacts: " + error);
  }
});

// button for deleting all contacts from database
const deleteAllBtn = document.getElementById("delete-all-contacts-btn");
deleteAllBtn.addEventListener("click", async () => {
  const doYouWantToContinue = confirm(
    "Are you sure you want to delete all contacts?"
  );
  if (doYouWantToContinue) {
    try {
      const response = await fetch(`${apiUrl}/clear`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchContactsToHtml();
        notyf.success("All contacts deleted successfully!");
      } else {
        notyf.error("Error deleting contacts: " + response.statusText);
      }
    } catch (error) {
      notyf.error("Error deleting contacts: " + error);
    }
  } else {
    notyf.error("Deletion cancelled.");
  }
});
