import clientPromise from "../../../../lib/mongo-db"

export default async (req, res) => {
  try {
    const client = await clientPromise
    const db = client.db("cities")

    const cities = await db.collection("cities").find({}).toArray()
    // Get all cities
    if (req.method === "GET") {
      res.json(cities)
    // Add a new city
    } else if (req.method === "POST") {
      const { name, country, population } = req.body

      if (!name || !country || !population) {
        res.status(422).json({ message: "Invalid input." })
        return
      }

      if (cities.find((city) => city.name === name)) {
        res.status(422).json({ message: "City already exists." })
        return
      }

      const newCity = await db.collection("cities").insertOne({
        name,
        country,
        population,
        dateAdded: new Date().toISOString(),
      })

      res.status(201).json({ message: "Success!" })
    }
  } catch (e) {
    console.error(e)
  }
}
