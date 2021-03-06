import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadBaseRecipeById,
  putBasesPlan,
  setStockVisibles,
  resetStock,
  resetTodos,
} from '../../store/recipes/reducer';

export default function BasicCard({ base }) {
  const dispatch = useDispatch();
  const { stockVisibles } = useSelector((state) => state.recipes);
  const handleClick = React.useCallback(() => {
    dispatch(setStockVisibles({ id: base.id }));
    dispatch(
      putBasesPlan({ id: base.id, plan: base.plan - base.stock < 0 ? 0 : base.plan - base.stock }),
    );
  }, [dispatch, base]);

  console.log('Before stockVisibles[base.id]', stockVisibles[base.id]);

  const handleOpenRecipe = React.useCallback(() => {
    dispatch(loadBaseRecipeById(base.id));
  }, [dispatch]);

  const handleClickReset = React.useCallback(() => {
    dispatch(resetStock({ id: base.id }));
    dispatch(resetTodos({ id: base.id }));
    if (stockVisibles[base.id]) {
      dispatch(setStockVisibles({ id: base.id }));
    }
  }, [dispatch, base, stockVisibles]);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 20, fontWeight: 900 }} gutterBottom>
          {base.category} {'        '}
          <Button size="small" onClick={handleOpenRecipe}>
            показать рецепт
          </Button>
        </Typography>
        <Typography variant="h5" component="div">
          {Math.round(base.plan * 100) / 100} кг
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          всего в производство на сегодня
        </Typography>
        <Typography variant="h5" component="div">
          {base.stock ? Math.round(base.stock * 100) / 100 : 0} {'кг      '}
          <Button variant="outlined" size="small" onClick={handleClickReset}>
            сброс
          </Button>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          произведено сегодня
        </Typography>
        <Typography variant="h5" component="div">
          {base.plan - base.stock < 0 ? 0 : Math.round((base.plan - base.stock) * 100) / 100} кг
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          осталось произвести
        </Typography>
      </CardContent>
      {!stockVisibles[base.id] && (
        <CardActions>
          <Button size="small" onClick={handleClick}>
            Начать производство базы
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
