import { html, render } from "lit-html";
// import AddEditFormTemplate from "../components/add-edit-form";

const editFormTemplate = () => html`
  <!-- ID -->
  <div
    class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
  >
    <label
      for="id_"
      class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >ID:</label
    >
    <div class="mt-1 sm:col-span-2 sm:mt-0">
      <input
        type="text"
        id="id_"
        name="id_"
        required
        readonly
        class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm sm:text-sm focus:border-gray-300 focus:ring-transparent bg-gray-300 cursor-not-allowed"
        placeholder="123"
      />
    </div>
  </div>

  <!-- Title -->
  <div
    class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
  >
    <label
      for="title"
      class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >Title:</label
    >
    <div class="mt-1 sm:col-span-2 sm:mt-0">
      <input
        type="text"
        id="title"
        name="title"
        required
        class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Mr/Ms"
      />
    </div>
  </div>

  <!-- Contact Person -->
  <div
    class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
  >
    <label
      for="contactPerson"
      class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >Contact Person:</label
    >
    <div class="mt-1 sm:col-span-2 sm:mt-0">
      <input
        type="text"
        id="contactPerson"
        name="contactPerson"
        required
        class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="John Doe"
      />
    </div>
  </div>

  <!-- Job Title -->
  <div
    class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
  >
    <label
      for="jobTitle"
      class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >Job Title:</label
    >
    <div class="mt-1 sm:col-span-2 sm:mt-0">
      <input
        type="text"
        id="jobTitle"
        name="jobTitle"
        required
        class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Manager"
      />
    </div>
  </div>

  <!-- Company Name -->
  <div
    class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
  >
    <label
      for="companyName"
      class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >Company Name:</label
    >
    <div class="mt-1 sm:col-span-2 sm:mt-0">
      <input
        type="text"
        id="companyName"
        name="companyName"
        required
        class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="ABC Pvt. Ltd."
      />
    </div>
  </div>

  <!-- Location -->
  <div
    class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
  >
    <label
      for="location"
      class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >Location:</label
    >
    <div class="mt-1 sm:col-span-2 sm:mt-0">
      <input
        type="text"
        id="location"
        name="location"
        required
        class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Mumbai, India"
      />
    </div>
  </div>

  <!-- Industry Type -->
  <div
    class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
  >
    <label
      for="industryType"
      class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >Industry Type:</label
    >
    <div class="mt-1 sm:col-span-2 sm:mt-0">
      <input
        type="text"
        id="industryType"
        name="industryType"
        required
        class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
        placeholder="Education"
      />
    </div>
  </div>

  <!-- Official Email ID -->
  <div
    class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
  >
    <label
      for="officialEmailId"
      class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >Official Email ID:</label
    >
    <div class="mt-1 sm:col-span-2 sm:mt-0">
      <input
        type="email"
        id="officialEmailId"
        name="officialEmailId"
        required
        class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-md sm:text-sm"
        placeholder="5pJt8@example.com"
      />
    </div>
  </div>

  <!-- Mobile Number 1 -->
  <div
    class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
  >
    <label
      for="mobileNumber1"
      class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >Mobile Number 1:</label
    >
    <div class="mt-1 sm:col-span-2 sm:mt-0">
      <input
        type="tel"
        id="mobileNumber1"
        name="mobileNumber1"
        required
        class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="9876543210"
        minlength="10"
        oninvalid="this.setCustomValidity('Please enter a 10-digit phone number.')"
        oninput="this.setCustomValidity('')"
      />
    </div>
  </div>

  <!-- Mobile Number 2 -->
  <div
    class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
  >
    <label
      for="mobileNumber2"
      class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >Mobile Number 2:</label
    >
    <div class="mt-1 sm:col-span-2 sm:mt-0">
      <input
        type="tel"
        id="mobileNumber2"
        name="mobileNumber2"
        class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="9876543210"
        minlength="10"
        oninvalid="this.setCustomValidity('Please enter a 10-digit phone number.')"
        oninput="this.setCustomValidity('')"
      />
    </div>
  </div>

  <!-- <button type="submit">Edit Contact</button>
        <button type="button" id="cancel-edit-btn">Cancel</button> -->

  <div class="pt-5">
    <div class="flex justify-end">
      <button
        type="button"
        id="cancel-edit-btn"
        class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Edit Contact
      </button>
    </div>
  </div>
`;

render(editFormTemplate(), document.getElementById("edit-form"));
