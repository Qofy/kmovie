 import { useState, useEffect } from "react"
 import StarRating from "../StarRating"
 import { Loading } from "./Loading"

export function MoviesDetails ({selectedId, onCloseMovie, onHandleWatched, watched}){
  const [movie, setMovie]=useState({})
  const [isLoading, setisLoading] = useState(false)
  const [userRating, setUserRating] = useState("")

  const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
  const watchUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating
useEffect(function(){
  async function getMoviesDtail() {
    setisLoading(true)
    const res = await fetch(`https://www.omdbapi.com/?apikey=5b45f040&i=${selectedId}`)
    const data = await res.json()
    setisLoading(false)
    setMovie(data)
    console.log(data)
  }
  getMoviesDtail()
},[selectedId])

  useEffect(function(){
    if (!movie.Title) return;
    document.title =`Movie | ${movie.Title}`
  },[movie.Title])

function handleAdd(){
  const newwatchedMovie = {
    Title: movie.Title,
    imdbID: selectedId,
    Year: movie.Year,
    Poster: movie.Poster,
    imdbRating: Number(movie.imdbRating),
    Runtime: Number(movie.Runtime.split(" ").at(0)),
    userRating
  }
  onHandleWatched(newwatchedMovie)
  onCloseMovie()
}  return <div className="details">
    {isLoading ? <Loading/>:
   <>
    <header>
  <button className="btn-back" onClick={onCloseMovie}>
    ←
  </button>
  <img src={movie.Poster} alt={`Poster of ${movie.Poster}`}/>
    <div className="details-overview">
      <h2>
        {movie.Title}
      </h2>
      <p>
        {movie.Released} • {movie.Runtime}
      </p>
      <p>{movie.Genre}</p>
      <p>
        <span>⭐️</span>
        {movie.imdbRating} IMDb rating
      </p>
    </div>
    </header>
    <section>
      <div className="rating">

      {!isWatched? (
      <>
      <StarRating maxRating={10} size={24} onSetRating={setUserRating}/>
      {
        userRating > 0 &&
      <button className="btn-add" onClick={()=> handleAdd()}>+ Add</button>
      }</>):
      <p>You have rated this movie {watchUserRating}🌟</p>
    }

      </div>
      <p>
        <em>{movie.Plot}</em>
      </p>
      <p>Starring {movie.Actor}</p>
      <p>Directed by {movie.Director}</p>
    </section>
    </>
}
    </div>
}