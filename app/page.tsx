import { getInterim} from "../sanity/lib/sanity.client";
import Interim from "../components/Interim";

export default async function HomePage() {

  const data = await getInterim(); // Fetch landing page content

  return <Interim content={data}/>
  
}