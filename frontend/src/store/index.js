import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/reducer';
// import storeReducer from './stores/reducer'
import recipeReducer from './recipes/reducer';
import technologReducer from './technolog/reducer';
import ingridientsReducer from './ingridients/reducer';
import newRecipes from './newrecipes/reducer';
import bossReduserReducer from './boss/reducer'
import profileReducer from './profile/reducer'


export default configureStore({
  reducer: {
    auth: authReducer,
    // store: storeReducer,
    recipes: recipeReducer,
    newrecipes: newRecipes,
    technolog: technologReducer,
    ingridients: ingridientsReducer,
    boss: bossReduserReducer ,
    profile: profileReducer,
  },
});
