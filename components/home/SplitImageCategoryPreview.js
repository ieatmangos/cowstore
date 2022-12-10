export default function SplitImageCategoryPreview({ categories }) {
  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-gray-50">
          <body class="h-full">
          ```
        */}
      <div className="grid min-h-full grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
        {categories?.map((cat) => {
          return (
            <div key={cat.id} className="relative flex">
              <img
                src={cat.images[0].file.url}
                alt={cat.name}
                className="absolute inset-0 object-cover object-center w-full h-full"
              />
              <div className="relative flex flex-col items-start justify-end w-full p-8 bg-black bg-opacity-40 sm:p-12">
                <h2 className="text-lg font-medium text-white text-opacity-75">
                  {cat.name}
                </h2>
                <p className="mt-1 text-2xl font-medium text-white">
                  {`${cat.description}`}
                </p>
                <a
                  href="#"
                  className="mt-4 rounded-md bg-white py-2.5 px-4 text-sm font-medium text-gray-900 hover:bg-gray-50"
                >
                  Shop {cat.name}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
