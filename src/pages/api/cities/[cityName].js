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
      res.status(201).json({ message: "Success!" })
    }
    // Delete city by name
    else if (req.method === "DELETE") {
      res.status(201).json({ message: "Success!" })
    }
  } catch (e) {
    console.error(e)
  }
}
