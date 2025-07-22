export function WatchMovie({ movie, onDeleteWatched }) {
  return (
    <li className="list-item">
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteWatched(movie.imdbID);
          }}
          aria-label={`Remove ${movie.Title} from watched list`}
        >
          ✕
        </button>
      </div>
    </li>
  );
}
