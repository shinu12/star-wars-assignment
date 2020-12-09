import starWarApi from "../apis/starWarApi";
import { ADDPLANETS } from "./type";

export const getPlanet = data => {
  console.log(data);
  return (dispatch, getState) => {
   if(isNaN(data))
   {
    starWarApi
    .get(`/planets/?search=` + data)
    .then(response => {
      dispatch({ type: ADDPLANETS, payload: response.data });
    })
    .catch(error => console.log(error));
   }
   else if(!isNaN(data)){
    starWarApi
    .get(`/planets/?page=` + data)
    .then(response => {
      dispatch({ type: ADDPLANETS, payload: response.data });
    })
    .catch(error => console.log(error));
   }
    
  };
};
