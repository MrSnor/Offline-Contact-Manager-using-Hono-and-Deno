import { html, render } from "lit-html";

// This is a lit-html template function. It returns a lit-html template.
const cTableTemplate = (name) => html`
  <div class="px-4 sm:px-6 lg:px-8 flex justify-between">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Contact List
      </h2>
      <!-- <p class="mt-3 text-xl text-gray-500 sm:mt-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus repellat laudantium.</p> -->
    </div>
    <!-- Search Bar -->
    <div class="max-w-3xl w-[24rem]">
      <div class="mt-1 relative rounded-md shadow-sm">
        <!-- Search Icon -->
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          name="search"
          id="search-input"
          class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
          placeholder="Search by company name"
        />
        <!-- cross icon (to clear search) -->
        <div
          class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          id="clear-search-btn"
        >
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div class="flex justify-end items-center">
        <div class="ml-3 relative">
          <div>
            <!-- multiple options dropdown -->
            <label for="options" class="sr-only">Options</label>
            <select
              id="select-filter-options"
              name="options"
              class="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
              <option value="company">Company</option>
              <option value="contactPerson">Contact Person</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <!-- options dropdown -->
  </div>
  <div class="mt-10 bg-white pb-4 sm:pb-5">
    <div class="relative">
      <div class="absolute inset-0 bg-gray-50"></div>
      <div class="relative mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto">
          <div class="rounded-lg bg-white shadow-lg overflow-x-auto">
            <table
              id="contacts-table"
              class="min-w-full divide-y divide-gray-200 px-8"
            >
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contact Person
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Job Title
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Company Name
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Industry Type
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Official Email ID
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Mobile Number 1
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Mobile Number 2
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200"></tbody>
            </table>
            <!-- Pagination component -->
          </div>
          <div id="pagination" class="flex items-center justify-center pt-2">
            <button
              id="pagination-previous"
              class="w-10 h-10 text-black grid place-content-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6 ring-0 hover:ring rounded-full ring-gray-400 transition duration-200"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <span id="pagination-value" class="text-center">Page 1</span>
            <button
              id="pagination-next"
              class="w-10 h-10 text-black grid place-content-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6 ring-0 hover:ring rounded-full ring-gray-400 transition duration-200"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

render(cTableTemplate(), document.getElementById("contacts-table"));
