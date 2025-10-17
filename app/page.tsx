import { getHome} from "../sanity/lib/sanity.client";
import Home from "../components/Home";

export default async function HomePage() {

  const data = await getHome(); // Fetch landing page content

  return <Home data={data}/>
  
}