export default function ProductCuts({ product }) {
  return (
    <div className="">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Cuts </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the cuts of meat come in this package.
          </p>
        </div>
      </div>
      <div className="mt-8 -mx-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Name
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Cuts
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Weight
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
              >
                Total Weight
              </th>
            </tr>
          </thead>
          {/* {product.cuts.map(({ cut_name, weight, amount, id }) => (
            <li key={id} className="text-gray-400">
              <span className="text-gray-600">{cut_name}</span>
              <span className="text-gray-600">{amount}</span>
              <span className="text-gray-600">{weight}</span>
            </li>
          ))} */}
          <tbody className="bg-white divide-y divide-gray-200">
            {product?.cuts?.map(({ cut_name, weight, amount, id }) => (
              <tr key={id}>
                <td className="w-full py-4 pl-4 pr-3 text-sm font-medium text-gray-900 max-w-0 sm:w-auto sm:max-w-none sm:pl-6">
                  {cut_name}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only sm:hidden">Weight</dt>
                    <dd className="mt-1 text-gray-500 truncate sm:hidden">
                      {weight} lbs
                    </dd>
                    <dt className="sr-only sm:hidden">Cuts</dt>
                    <dd className="mt-1 text-gray-500 truncate sm:hidden">
                      {amount} pcs
                    </dd>
                  </dl>
                </td>

                <td className="hidden px-3 py-4 text-sm text-right text-gray-500 sm:table-cell">
                  {amount}
                </td>
                <td className="hidden px-3 py-4 text-sm text-right text-gray-500 sm:table-cell">
                  {weight}
                </td>
                <td className="px-3 py-4 text-sm text-right text-gray-500 whitespace-nowrap">
                  {amount * weight} lbs
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
