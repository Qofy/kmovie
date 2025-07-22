export function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> result
      {movies.length !== 1 ? "s" : ""}
    </p>
  );
}
