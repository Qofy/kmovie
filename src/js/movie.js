import { useState, useEffect } from "react";

export function useMovie(query){
 const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");

    useEffect(
      function(){
      const abortController = new AbortController();
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
      // handleCloseMovie()
      fetchMovie();
      return function(){abortController.abort()}
      
    },[query])
    return {isLoading, movies,error}
}