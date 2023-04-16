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
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <h1 className="text-6xl font-bold">Cities</h1>
      <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
        <ul>
        {cities.length > 0 && cities.map((city) => (
          <li
            key={city.id}
            className="flex flex-col items-center justify-center w-64 h-64 p-6 mt-6 border rounded-lg shadow-xl"
          >
            <h3 className="mb-3 text-xl font-bold">{city.name}</h3>
            <p className="mb-3">{city.country}</p>
            <p className="mb-3">{city.population}</p>
          </li>
        )) }
        {!cities || cities.length === 0 && (
          <li
            className="flex flex-col items-center justify-center w-64 h-64 p-6 mt-6 border rounded-lg shadow-xl"
          >
            <h3 className="mb-3 text-xl font-bold">No cities found</h3>
            </li>
            )}
        </ul>
      </div>
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
  }
}
