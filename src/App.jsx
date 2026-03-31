import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'

import './App.css'

import PlateCard from "./MyComponents/PlateCard";

function App() {

  const plates = [
    { id: 1, name: "Pizza Margherita", price: 65, description: "Classic tomato and mozzarella", is_available: true },
    { id: 2, name: "Pasta Carbonara", price: 80, description: "Creamy pasta with bacon", is_available: false },
    { id: 3, name: "Couscous Royal", price: 120, description: "Traditional Moroccan couscous", is_available: true },
    { id: 4, name: "Tanjiya kech", price: 75, description: "Traditional Marrrakech Tanjiya", is_available: true }
  ];






  // const [count, setCount] = useState(0)



  const [search, setSearch] = useState(""); //empty to contain search texxt;


  const filteredPlates = plates.filter(plate =>
    plate.name.toLowerCase().includes(search.toLowerCase())
  );




  return (
    <>


      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-orange-600">
          Menu de Recommandation
        </h1>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> */}

          {/* send data by Props  */}
          {/* {plates.map(plate => (
            <PlateCard
              key={plate.id}
              name={plate.name}
              price={plate.price}
              description={plate.description}
              is_available={plate.is_available}
            />
          ))}
        </div> */}
      </div>



      <div className="p-8">


        <input
          type="text"
          placeholder="Find a plat"
          className="border p-2 mb-4 w-full "
          value={search}
        onChange={(e) => setSearch(e.target.value)} // update state for each inserted text
      />

        <div className="grid gap-4">
          {/* show filteredPlates or the msg if nothing found */}
          {filteredPlates.length > 0 ? (
            filteredPlates.map(plate => (
              <PlateCard key={plate.id} {...plate} />
            ))
          ) : (
            <p>Aucun plat trouvé.</p>
          )}
        </div>
      </div>






    </>
  )
}

export default App
