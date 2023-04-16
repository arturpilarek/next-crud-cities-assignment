import clientPromise from "../../../../lib/mongo-db"

export default async (req, res) => {
  const { cityName } = req.query

  try {
    const client = await clientPromise
    const db = client.db("cities")
    const city = await db
      .collection("cities")
      .find({ name: cityName.toLowerCase() })
      .toArray()

    // Get city by name
    if (req.method === "GET") {
      res.json(city[0])

      // Modify city by name
    } else if (req.method === "PUT") {
      const { name, country, population } = req.body

      if (!name || !country || !population) {
        res.status(422).json({ message: "Invalid input." })
        return
      }

      if (city[0].name !== name) {
        res.status(422).json({ message: "City name cannot be changed." })
        return
      }

      const updatedCity = await db.collection("cities").updateOne(
        { name: cityName.toLowerCase() },
        {
          $set: {
            name,
            country,
            population,
            dateAdded: new Date().toISOString(),
          },
        }
      )

      res.status(201).json({ message: "Success!" })
    }

    // Delete city by name
    else if (req.method === "DELETE") {
      const deletedCity = await db
        .collection("cities")
        .deleteOne({ name: cityName })

      if (deletedCity.deletedCount === 0) {
        res.status(422).json({ message: "Deletion failed." })
        return
      }
      res.status(201).json({ message: "Deletion succeded!" })
    }
  } catch (e) {
    console.error(e)
  }
}
