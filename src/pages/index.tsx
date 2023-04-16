import CityItem from "@/components/city-item"

type City = {
  id: number,
  name: string
  country: string,
  population: number
 } 

  type props = {
    cities: City[]
  }

  export default function Home({ cities} : props) {

  return (
    <main className="flex flex-col items-center min-h-screen p-24">
      <h1 className="text-6xl font-bold">Cities</h1>
      <ul className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
        {cities.length > 0 && cities.map((city) => (
          <CityItem city={city} key={city.id}/>
        )) }
        {!cities || cities.length === 0 && (
          <li
            className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full"
          >
            <h3 className="mb-3 text-xl font-bold">No cities found</h3>
            </li>
            )}
      </ul>
    </main>
  )
}

export async function getStaticProps() {
  const {URL} = process.env
  
  const res = await fetch(`${URL}/api/cities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
          },
        })
    const cities = await res.json()
  return {
    props: {
      cities,
    },
    revalidate: 10,
  }
}
