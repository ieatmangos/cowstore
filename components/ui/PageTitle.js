export default function PageTitle({ title, msg, h3 }) {
  return (
    <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
      {h3 ? (
        <h3 className="text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h3>
      ) : (
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h1>
      )}
      <p className="max-w-xl mt-4 text-sm text-gray-800">{msg}</p>
    </div>
  );
}
