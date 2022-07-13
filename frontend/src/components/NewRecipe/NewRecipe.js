/* eslint-disable object-curly-newline */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-prototype-builtins */
/* eslint-disable operator-linebreak */
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngridients } from '../../store/ingridients/reducer';
import {
  getBases,
  setBase,
  deleteBase,
  addIngridient,
  changeBaseWeight,
  changeIngridientWeight,
  deleteIngridient,
  normalizeRecipe,
} from '../../store/newrecipes/reducer';

function NewRecipe() {
  const dispatch = useDispatch();
  const { ingridients } = useSelector((state) => state.ingridients);
  const {
    base,
    bases,
    recipe,
    ingridients: currIngridients,
  } = useSelector((state) => state.newrecipes);
  const [selectValue, setSelectValue] = React.useState('');

  React.useEffect(() => {
    dispatch(getIngridients());
    dispatch(getBases());
  }, [dispatch]);

  const handleChooseBase = React.useCallback((event) => {
    setSelectValue(event.target.value);
  }, []);

  const handleClickBase = React.useCallback(() => {
    dispatch(setBase(selectValue));
    setSelectValue('');
  }, [dispatch, selectValue]);

  const handleClickDeleteBase = React.useCallback(() => {
    dispatch(deleteBase());
    setSelectValue('');
  }, [dispatch]);

  const handleChangeBaseWeight = React.useCallback(
    (event) => {
      dispatch(changeBaseWeight(event.target.value));
    },
    [dispatch],
  );

  const handleClickNormalize = React.useCallback(() => {
    if (recipe.weight) {
      console.log('first');
      dispatch(normalizeRecipe());
    }
  }, [dispatch, recipe.weight]);

  const handleChangeIngridientWeight = React.useCallback(
    (event, id) => {
      dispatch(changeIngridientWeight({ value: event.target.value, id }));
    },
    [dispatch],
  );

  console.log('currIngridients', currIngridients);

  const handleClickIngridient = React.useCallback(() => {
    if (selectValue !== '') {
      const choiseIngridient = ingridients.find((ingridient) => ingridient.id === selectValue);
      dispatch(addIngridient(choiseIngridient));
    }
    setSelectValue('');
  }, [dispatch, selectValue, ingridients]);

  const handleClickDeleteIngridient = React.useCallback(
    (id) => {
      console.log('delete id', id);
      dispatch(deleteIngridient(id));
      setSelectValue('');
    },
    [dispatch],
  );

  return (
    <Box sx={{ width: '100%', typography: 'body1', padding: '24px' }}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">Ингридиент</TableCell>
                  <TableCell align="center">Масса на 10 кг продукта, кг</TableCell>
                  <TableCell align="center">Цена за 1 кг, руб</TableCell>
                  <TableCell align="center">Стоимость 10 кг, руб</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {base && (
                  <TableRow>
                    <TableCell align="left">
                      <IconButton>
                        <DeleteIcon onClick={handleClickDeleteBase} />
                      </IconButton>
                    </TableCell>
                    <TableCell align="left">{base.title}</TableCell>
                    <TableCell align="center">
                      <OutlinedInput
                        size="small"
                        type="number"
                        sx={{ maxWidth: 120 }}
                        value={base.weight}
                        onChange={handleChangeBaseWeight}
                        Base // defaultValue="0"
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          'aria-label': 'weight',
                          step: '0.01',
                          min: '0',
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">{base.price}</TableCell>
                    <TableCell align="center">{Math.round(base.total_price * 100) / 100}</TableCell>
                  </TableRow>
                )}
                {!!currIngridients.length && (
                  <>
                    {currIngridients.map((currIngridient) => (
                      <TableRow key={currIngridient.id}>
                        <TableCell align="left">
                          <IconButton>
                            <DeleteIcon
                              onClick={() => handleClickDeleteIngridient(currIngridient.id)}
                            />
                          </IconButton>
                        </TableCell>
                        <TableCell align="left">{currIngridient.title}</TableCell>
                        <TableCell align="center">
                          <OutlinedInput
                            size="small"
                            type="number"
                            sx={{ maxWidth: 120 }}
                            value={currIngridient.weight}
                            onChange={(event) =>
                              handleChangeIngridientWeight(event, currIngridient.id)
                            }
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                              'aria-label': 'weight',
                              step: '0.01',
                              min: '0',
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">{currIngridient.price}</TableCell>
                        <TableCell align="center">
                          {Math.round(currIngridient.total_price * 100) / 100}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="left">
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-select-small">Выбрать</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={selectValue}
                        label="Выбрать"
                        onChange={handleChooseBase}>
                        <MenuItem value="0">
                          <em>Не выбрано</em>
                        </MenuItem>
                        {base
                          ? ingridients.map((ingridient) => (
                              <MenuItem key={ingridient.id} value={ingridient.id}>
                                {ingridient.title}
                              </MenuItem>
                            ))
                          : bases.map((baseItem) => (
                              <MenuItem key={baseItem.id} value={baseItem.id}>
                                {baseItem.title}
                              </MenuItem>
                            ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1.2, maxWidth: 10 }}>
                      <Button
                        onClick={!base ? handleClickBase : handleClickIngridient}
                        variant="contained">
                        +
                      </Button>
                    </FormControl>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="right">Итого</TableCell>
                  <TableCell align="center">
                    <Button onClick={handleClickNormalize}>
                      {Math.round(recipe.weight * 100) / 100 || 0} кг
                    </Button>
                  </TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">
                    {Math.round(recipe.total_price * 100) / 100 || 0} руб
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item container direction="column" spacing={2} xs={12} md={4}>
          <Grid item>Карточка</Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default NewRecipe;
