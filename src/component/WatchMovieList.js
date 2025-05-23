import { WatchMovie } from "./WatchMovie";

export function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchMovie 
          key={movie.imdbID} 
          movie={movie} 
          onDeleteWatched={onDeleteWatched} 
        />
      ))}
    </ul>
  );
}
