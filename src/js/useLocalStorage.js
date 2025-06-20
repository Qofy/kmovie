import { useState, useEffect } from "react";
 export function useLocalStorageState(intialState, key){
 //if fuction is used in useState u can't pass in a parameter or call a function in the useState Hook 
   const [value, setValue] = useState(function(){
    const storeValue = localStorage.getItem(key)
    return storeValue ? JSON.parse(storeValue):intialState;
   });
  //Storing watched move in the localstorage
  useEffect(function(){
    localStorage.setItem("watched", JSON.stringify(value))
  },[value,key])

  return [value, setValue]
}