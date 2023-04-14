import { Inter } from 'next/font/google'
import clientPromise from '../../lib/mongo-db'

const inter = Inter({ subsets: ['latin'] })


  type props = {
    cities: any
  }

export default function Home({ cities} : props) {
  console.log(cities)
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <h1 className="text-6xl font-bold">Hello World</h1>
      
    </main>
  )
}

export async function getStaticProps() {

  try {
    const client = await clientPromise;
    const db = client.db("cities")

    const cities = await db.collection("cities").find({}).toArray()
    console.log(cities)
    return {
        props: { cities: JSON.parse(JSON.stringify(cities)) },
    };
} catch (e) {
    console.error(e);
}
}
