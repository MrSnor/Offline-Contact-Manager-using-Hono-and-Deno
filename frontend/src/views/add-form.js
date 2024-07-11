import { render, html } from "lit-html";

const addFormTemplate = () => html`
  <div class="divide-y divide-gray-200 sm:space-y-5 pb-5">
    <div class="space-y-6 pt-4 sm:space-y-5 sm:pt-6">
      <div class="space-y-6 sm:space-y-5">
        <div
          class="hidden sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
        >
          <!-- ID -->
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
              class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm sm:max-w-xs sm:text-sm focus:border-gray-300 focus:ring-transparent bg-gray-300 cursor-not-allowed"
              placeholder="AEUI/123456"
              disabled
            />
            <span class="text-xs px-0.5">ID will be auto generated</span>
          </div>
        </div>
        <div
          class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-gray-200 sm:pt-5"
        >
          <!-- Title -->
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
              class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
              placeholder="Mr/Ms"
            />
          </div>
        </div>

        <div
          class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
        >
          <!-- Contact Person -->
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
              class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-sm sm:text-sm"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div
          class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
        >
          <!-- Job Title -->
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
              class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
              placeholder="Software Engineer"
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
              class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
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
              placeholder="Bangalore, India"
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
              placeholder="Software Development"
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
              placeholder="8KqzB@example.com"
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
              class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
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
              class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
              placeholder="9876543210"
              minlength="10"
              oninvalid="this.setCustomValidity('Please enter a 10-digit phone number.')"
              oninput="this.setCustomValidity('')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="pt-5">
    <div class="flex justify-end">
      <button
        type="button"
        class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        id="cancel-add-btn"
        data-micromodal-close
        aria-label="Close this dialog window"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add Contact
      </button>
    </div>
  </div>
`;

render(addFormTemplate(), document.getElementById("add-form"));
