import Link from "next/link"
import { useRef } from "react"

type City = {
    name: string
    country: string,
    population: number
   } 

const sendCityData = async (cityData : City) => {
    const {URL} = process.env
    
    const res = await fetch(`/api/cities`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cityData)
    })
    const data = await res.json()
    console.log(data)
}

export default function NewCity() {
    const cityNameRef = useRef<HTMLInputElement>(null)
    const countryRef = useRef<HTMLInputElement>(null)
    const populationRef = useRef<HTMLInputElement>(null)

    const handleFormSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const cityName = cityNameRef.current?.value
        const country = countryRef.current?.value
        const population = populationRef.current?.value

        if (!cityName || !country || !population) {
            return
        }

        sendCityData({name: cityName, country, population: parseInt(population)})

        cityNameRef.current.value = ""
        countryRef.current.value = ""
        populationRef.current.value = ""
        
        console.log({cityName, country, population: parseInt(population)})
        
    }
    
  return (
    <main className="flex flex-col items-center min-h-screen p-24">
    <form onSubmit={handleFormSubmit}>
      <div className="space-y-12">
        <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Add new city</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Fill out the form in order to add a new city.</p>

          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-4 sm:grid-cols-6">

            <div className="sm:col-span-5">
              <label htmlFor="city-name" className="block text-sm font-medium leading-6 text-gray-900">
                City name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city-name"
                  id="city-name"
                  ref={cityNameRef}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-5">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="country"
                  id="country"
                  ref={countryRef}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-5">
              <label htmlFor="population" className="block text-sm font-medium leading-6 text-gray-900">
                Population
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="population"
                  id="population"
                  ref={populationRef}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end mt-6 gap-x-6">
        <Link href="/">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        </Link>
        <button
          type="submit"
          className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add
        </button>
      </div>
    </form>
    </main>
  )
}
