const initialState = {
  dogs: [],
  temperaments: [],
  allDogs: [],
  details: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_DOGS":
      action.payload.forEach((element) => {
        if (!element.temperaments[0]) {
          element.temperaments[0] = "Sin Temperamentos";
        }
        if (element.weight.length < 2) {
          element.weight[1] = 0;
        }
      });
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case "GET_TEMPERAMENTS":
      const fitteresTemp = action.payload.filter((temp) => temp.name !== "");
      return {
        ...state,
        temperaments: fitteresTemp,
      };

    case "GET_FILTER_TEMPERAMENTS":
      let allDogs = state.allDogs;
      let dogs = state.dogs;
      let filteredDogs = [];
      if (action.payload === "Todos") {        
        filteredDogs = dogs;
      } else {        
        for (let i = 0; i < allDogs.length; i++) {          
          let found = allDogs[i].temperaments.find((t) => t === action.payload);
          if (i > 171) {
            found = allDogs[i].temperaments.find((t) => t.name === action.payload);
          }
          if (found) {
            filteredDogs.push(allDogs[i]);
          }
        }
      }
      return {
        ...state,
        allDogs: filteredDogs,
      };
    case "GET_BREED":
      action.payload.forEach((element) => {
        if (!element.temperaments[0]) {
          element.temperaments[0] = "Sin Temperamentos";
        }
      });
      return {
        ...state,
        allDogs: action.payload,
      };
    case "ORDER_BY_NAME":
      const sortedName =
        action.payload === "A-Z"
          ? state.allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
            // console.log(sortedName);
      return {
        ...state,
        allDogs: sortedName,
      };
    case "ORDER_BY_WEIGHT":
      const sortedWeight =
        action.payload === "min_weight"
          ? state.allDogs.sort((a, b) => {
              if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                return 1;
              }
              if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                return -1;
              }
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                return -1;
              }
              if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                return 1;
              }
              return 0;
            });
            // console.log(sortedWeight);
      return {
        ...state,
        allDogs: sortedWeight,
      };
    case "SHOW_DOG_DETAILS":
      let myDetails = action.payload;
      if (!myDetails[0].temperaments[0]) {
        myDetails[0].temperaments[0] = "Sin Temperamentos";
      }
      return {
        ...state,
        details: myDetails,
      };
    default:
      return state;
  }
};

export default rootReducer;
