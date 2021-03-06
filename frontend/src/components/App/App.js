// eslint-disable-next-line import/no-unresolved, import/extensions
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { theme } from './theme';
import { getUser } from '../../store/auth/reducer';
import './App.css';
import MainPage from '../MainPage/MainPage';
import Bases from '../Bases/Bases';
import FormAddIngridients from '../FormAddIngridients/FormAddIngridients';
import Ingridients from '../Ingridients/ingridients';
import Auth from '../Auth/Auth';
import BossMainPage from '../BossMainPage/BossMainPage';
import BossAddEmpoyees from '../BossAddEmpoyees/BossAddEmpoyees';
import BossStatisticPrice from '../Statistics/MarketPriceAndCost/MarkertPriceAndCost';
import BossStatisticProduction from '../Statistics/LineStat/LineStat';
import TechnologBases from '../TechnologBases/TechnologBases';
import NewRecipe from '../NewRecipe/NewRecipe';
import Profile from '../Profile/Profile';
import EditProfile from '../Profile/editProfile';
import Employees from '../Employees/Employees';
import Error from '../Error/Error';
import { ThemeProvider } from '@emotion/react';

function App() {
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.auth);
  console.log(login, 'Это стейт логин в компоненте App.js');

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {login.id ? (
          <>
            {login.role === 'Директор' ? (
              <Route path="/" element={<MainPage />}>
                <Route path="/" element={<BossMainPage />} />
                <Route path="/boss/employees" element={<Employees />} />
                <Route path="/boss/addEmpoyees" element={<BossAddEmpoyees />} />
                <Route path="/boss/statistic/production" element={<BossStatisticPrice />} />
                <Route path="/boss/statistic/price" element={<BossStatisticProduction />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/editProfile" element={<EditProfile />} />
                <Route path="*" element={<Error />} />
              </Route>
            ) : login.role === 'Повар' && login.isWorks ? (
              <Route path="/" element={<MainPage />}>
                <Route path="/" element={<Bases />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Error />} />
              </Route>
            ) : login.isWorks ? (
              <Route path="/" element={<MainPage />}>
                <Route path="/" element={<TechnologBases />} />
                {/* <Route path="/" element={<NewRecipe />} /> */}
                <Route path="/recipes/new" element={<NewRecipe />} />
                <Route path="/formAddIngridients" element={<FormAddIngridients />} />
                <Route path='/profile' element={<Profile />} />
                <Route path="/ingridients" element={<Ingridients />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Error />} />
              </Route>
            ) : (
              <Route path="/" element={<MainPage />}>
                <Route path="*" element={<Error />} />
              </Route>
            )}
          </>
        ) : (
          <>
            <Route path="/" element={<Auth />} />
            <Route path="*" element={<Error />} />
          </>
        )}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
