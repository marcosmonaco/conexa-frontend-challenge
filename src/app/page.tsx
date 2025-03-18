import MainPage from "@/components/Main";
import {getAllCharacters, getAllEpisodes} from "@/service/serviceDataFetch";

export const revalidate = 86400; // Revalidar la página cada 24 horas

export default async function Home() {
  // Obtener todos los personajes y episodios en el servidor
  const characters = await getAllCharacters();
  const episodes = await getAllEpisodes();

  return <MainPage initialCharacters={characters} allEpisodes={episodes} />;
}
