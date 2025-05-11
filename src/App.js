import { useEffect, useState } from "react";
// import StarRating from "./StarRating";
import { WatchSummary } from "./component/WatchSummary";
// import { WatchMovie } from "./component/WatchMovie";
import { MoviesDetails } from "./component/MovieDetails";
import { Main } from "./component/Main";
import { Box } from "./component/Box";
// import { Logo } from "./component/Logo";
import { Search } from "./component/Search";
import { NumResult } from "./component/NumResult";
import { ErrorMessage } from "./component/ErrorMessage";
import { Nav } from "./component/Nav";
import { Loading } from "./component/Loading";
import { WatchedMovieList } from "./component/WatchMovieList";
// import { Movie } from "./component/Movie";
import { MovieList } from "./component/MovieList";
export default function App() {
  const [query, setQuery] = useState("avengers");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");

  const handleSelectedMovie = (id) => setSelectedId((selectedId) =>(id === selectedId ? null : id)); 
  const handleCloseMovie = () => setSelectedId(null); 
  const handleAddWatched = (movie) => setWatched([...watched, movie])
  function handleDeletedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }
  const abortController = new AbortController();
  useEffect(
    ()=>{
    async function fetchMovie() {
   try{
     setisLoading(true);
     setError("");
      const res = await fetch(`https://www.omdbapi.com/?apikey=5b45f040&s=${query}`,
      {signal: abortController.signal}
      );

        if(!res.ok){
          throw new Error("Something went wrong")
        }

        const data = await res.json();
        if(data.Response === 'False'){throw new Error("Movie not Found")}
        setMovies(data.Search);
      }
      catch (error){
        if (error.name !== "Abort error")
        setError(error.message)
        setError("")
      }finally{
        setisLoading(false)
      };
      };

    if(query.length < 3){
      setMovies([]);
      setError("");
      return;
    };
    fetchMovie();
    return function(){abortController.abort()}
    
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
         selectedId ? (<MoviesDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} onHandleWatched= {handleAddWatched} watched={watched}/>):
         (
        <>
      <WatchSummary watched={watched}/>
      <WatchedMovieList watched={watched} onDeleteWatched ={handleDeletedMovie}/>
      </>
         )
      }
      </Box> 

     </Main>
    </>
  );
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

