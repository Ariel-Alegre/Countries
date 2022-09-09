import axios from "axios";

export const GETALLCOUNTRIES = "GET_ALL_COUNTRIES";
export const POSTACTIVITY = "POST_ACTIVITY";
export const GETCOUNTRYDETAIL= "GET_COUNTRY_DETAIL";
export const GETACTIVITIES= "GET_ACTIVITIES";
export const ALLFILTERS= "ALL_FILTERS";
export const GET_BY_NAME = 'GET_BY_NAME';
export const FILTER_CONTINENT = "FILTER_CONTINENT";




export function getByName(name){
  return async function(dispatch){
      try {
          const json = await axios.get('http://localhost:3001/countries?name=' + name);
          return dispatch({
              type: 'GET_BY_NAME',
              payload: json.data
          })
      } catch (error) {
          console.log('No se pudo encontrar el pais')
      };
  };
};
export const getCountries = () => {        
  return async (dispatch) => { 
    let allCountries = await axios.get("http://localhost:3001/countries"); 
    return dispatch({                          
      type: GETALLCOUNTRIES,
      payload: allCountries.data,
    });
  };
};

export const postActivity = (payload) => { 
  return async (dispatch) => {
    const response = await axios.post( 
      "http://localhost:3001/activity", payload
    );
    return response.data;  
  };
};

export const getCountryDetail = (id) => {  
  return async (dispatch) => {   
    const response = await axios.get(       
      `http://localhost:3001/countries/${id}`
    );
    return dispatch({         
       type: GETCOUNTRYDETAIL,
      payload: response.data,
     });
  };
};

export const getActivitiesList = () => { 
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/activity"); 
    return dispatch({  
      type: GETACTIVITIES,
      payload: response.data,
    });
  };
};

export const allFilters = (payload) => { 
  if (payload.countrySearch !== "") { 
    return async (dispatch) => {
      const response = await axios.get(
        `http://localhost:3001/countries?name=${payload.countrySearch}` 
      );
      return dispatch({
        type: ALLFILTERS,
        payload: { response: response.data, condition: payload },
      });
    };
  } else {
    return {
      type: ALLFILTERS,
      payload: { response: "", condition: payload },
    };
  }
};
export function filterByContinent(payload){
  return {
      type: FILTER_CONTINENT,
      payload
  };
};
