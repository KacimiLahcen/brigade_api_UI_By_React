
export default function PlateCard({ name, price, description, is_available }) { //  OR PlateCard(props)
  return (
    <div className="border rounded p-4">
      <br></br>
  <h2>{name}</h2>     {/* OR <h2>{props.name}</h2> */}
 <p>{price} MAD</p>
 <p>{description} MAD</p>
 {is_available && <span className="text-green-600">Disponible</span>}
 </div>
 
  );
}

