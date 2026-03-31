
export default function PlateCard({ name, price, description, is_available }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition">
      <h2 className="text-xl font-bold text-gray-800">{name}</h2>
      <p className="text-gray-600 my-2">{description}</p>
      <div className="flex justify-between items-center mt-4">
        <p className="text-orange-600 font-semibold">{price} MAD</p>
        
        {/* is the plate available */}
        {is_available ? (
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
             Disponible
          </span>
        ) : (
          <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">
            Non disponible
          </span>
        )}
      </div>
      <br></br>
      <br></br>
    </div>
  );
}