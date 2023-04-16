import { useEffect } from "react"
import { useRouter } from "next/router"

    type City = {
        id: number,
        name: string
        country: string,
        population: number
        }

    type props = {
        city: City
    }
    
    export default function CityItem({city} : props) {

        const router = useRouter()

        const refreshData = () => {
            router.replace(router.asPath);
          }
          
          useEffect(() => {
             refreshData()
          }, [])
          
        const handleDeleteCity = async () => {
            const res = await fetch(`/api/cities/${city.name}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await res.json()
            refreshData()
        }
  
    return (
            <li
              className="flex flex-col items-center justify-center w-64 h-64 p-6 mt-6 border rounded-lg shadow-xl"
            >
              <h3 className="mb-3 text-xl font-bold">{city.name}</h3>
              <p className="mb-3">{city.country}</p>
              <p className="mb-3">{city.population}</p>
              <button className="p-2 bg-red-400" onClick={handleDeleteCity} >Delete city</button>
            </li>
    )
  }
  