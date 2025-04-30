import { useEffect, useState } from "react";

export default function App() {
  const [query, setQuery] = useState("avengers");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");

  const handleSelectedMovie = (id) => setSelectedId((selectedId) =>(id === selectedId ? null : id)); 
  const handleCloseMovie = () => setSelectedId(null); 

  useEffect(
    ()=>{
    async function fetchMovie() {
   try{
     setisLoading(true);
     setError("");
      const res = await fetch(`https://www.omdbapi.com/?apikey=5b45f040&s=${query}`);

        if(!res.ok){
          throw new Error("Something went wrong")
        }

        const data = await res.json();
        if(data.Response === 'False'){throw new Error("Movie not Found")}
        setMovies(data.Search);
      }
      catch (error){
        setError(error.message)
      }finally{
        setisLoading(false)
      };
      };

    if(query.length < 3){
      setMovies([]);
      setError("");
      return;
    };
    fetchMovie()
    
  },[query])

  return (
    <>
     <Nav>
        <Search query={query} setQuery={setQuery}/>
        <NumResult movies={movies}/>
     </Nav>
     
     <Main>
      <Box>
     {isLoading && <Loading/>}
     {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectedMovie}/>}
     {error && <ErrorMessage message={error}/>}
     </Box>

     <Box>     
      {
         selectedId ? (<MoviesDetails selectedId={selectedId} onCloseMovie={handleCloseMovie}/>):
         (
        <>
      <WatchSummary watched={watched}/>
      <WatchMovieList watched={watched}/>
      </>
         )
      }
      </Box> 

     </Main>
    </>
  );
}

function Loading(){
  return <h3 className="loader">Loading....</h3>
}

function ErrorMessage({message}){
  return(
    <h3 className="error"><span>⛔️</span>{message}</h3>
  )
}

function Nav({children}) {
  return(
    <nav className="nav-bar">
     <Logo/>
        {children}
    </nav>
  )
}

function NumResult({movies}){
  return(
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  )
}

function Logo(){
  return(
    <div className="logo">
      <span role="img">🍿</span>
      <h1>KMovie</h1>
    </div>
  )
}

function Search({query, setQuery}){
  return(
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}

function Main({children}){
  return( 
    <main className="main">
     {children}        
    </main> 
  )
}

function Box({children}){
  const [isOpen, setIsOpen] = useState(true);

  return(
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  )
}

// function WatchBox(){
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return(
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//          <WatchSummary watched = {watched}/>
//          <WatchMovieList watched = {watched}/>
//         </>
//       )}
//     </div>
//   )
// }

function MoviesDetails ({selectedId, onCloseMovie}){
  return <div className="details">
  <button className="btn-back" onClick={onCloseMovie}>
    ←
  </button>
    {selectedId}
    </div>
}

function WatchMovieList({watched}){
  return(
    <ul className="list">
    {watched.map((movie) => (
    <WatchMovie movie={movie} key={movie.imdbID}/>
    ))}
  </ul>
  )
}

function WatchMovie({movie}){
  return(
    <li >
    <img src={movie.Poster} alt={`${movie.Title} poster`} />
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>
    </div>
  </li>
  )
}

function WatchSummary({watched}){
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  
  return(
    <div className="summary">
    <h2>Movies you watched</h2>
    <div>
      <p>
        <span>#️⃣</span>
        <span>{watched.length} movies</span>
      </p>
      <p>
        <span>⭐️</span>
        <span>{avgImdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{avgUserRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{avgRuntime} min</span>
      </p>
    </div>
    </div>
  )
}

function MovieList({movies, onSelectMovie}){
  return(
    <ul className="list list-movies">
      {movies?.map((movie) => (
     <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}/>
      ))}
    </ul>
  )
}

function Movie({movie, onSelectMovie}){
  return(
    <li onClick={() => onSelectMovie(movie.imdbID)}>
    <img src={movie.Poster} alt={`${movie.Title} poster`} />
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>🗓</span>
        <span>{movie.Year}</span>
      </p>
    </div>
  </li>
  )
}

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);