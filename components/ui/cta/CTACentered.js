export default function Centered() {
  return (
    <div>
      <div className="">
        <div className="px-4 py-12 mx-auto text-center max-w-7xl sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">A treasure chest awaits</span>
            {/* <span className="block">Indulge in steak</span> */}
          </h2>
          <div className="flex justify-center mt-8">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700"
              >
                Get started
              </a>
            </div>
            <div className="inline-flex ml-3">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-teal-700 bg-teal-100 border border-transparent rounded-md hover:bg-teal-200"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
