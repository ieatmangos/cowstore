export default function NoMatchingResults({ resetFilters }) {
  return (
    <div className={`bg-gray-50`}>
      <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              No results found
            </h3>
            <div className="max-w-xl mt-2 text-sm text-gray-500">
              <p>Try removing a filter from above or reseting them all </p>
            </div>
            <div className="mt-5">
              <button
                onClick={resetFilters}
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 font-medium text-teal-700 bg-teal-100 border border-transparent rounded-md hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:text-sm"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
