import { WatchMovie } from "./WatchMovie"
export function WatchMovieList({watched}){
  return(
    <ul className="list">
    {watched.map((movie) => (
    <WatchMovie movie={movie} key={movie.imdbID}/>
    ))}
  </ul>
  )
}

