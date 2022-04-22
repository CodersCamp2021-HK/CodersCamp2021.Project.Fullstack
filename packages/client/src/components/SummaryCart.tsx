import { DishDto, DishesApi } from '@fullstack/sdk/src';
import { Create, DeleteOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import { useEffect, useState } from 'react';

import { apiConfiguration } from '../config';
import { SubOrder, useShoppingCart } from '../context';

const dishesApi = new DishesApi(apiConfiguration);

interface CartPriceDisplayProps {
  nextStep: () => void;
}

const CartPriceDisplay = ({ nextStep }: CartPriceDisplayProps) => (
  <Stack p={4} bgcolor='common.white' gap={4}>
    <Stack direction='row' justifyContent='space-between' alignItems='center'>
      <Typography variant='h4'>Do zapłaty</Typography>
      <Typography variant='h5' fontWeight='bold'>
        800 zł
      </Typography>
    </Stack>
    <Button
      variant='contained'
      color='secondary'
      size='large'
      disableElevation
      sx={{ borderRadius: 8, px: 8, alignSelf: 'flex-end' }}
      onClick={nextStep}
    >
      Dalej
    </Button>
  </Stack>
);

interface CartDaysDisplayProps {
  cart: SubOrder[];
  dishMap: Record<string, DishDto>;
}

const CartDaysDisplay = ({ cart, dishMap }: CartDaysDisplayProps) => (
  <>
    {cart.map((suborder) => {
      const weekday = _.capitalize(suborder.deliveryDate.toLocaleString('pl-PL', { weekday: 'long' }));
      const date = suborder.deliveryDate.toLocaleDateString();

      return (
        <Box key={date} bgcolor='common.white'>
          <Stack direction='row' alignItems='center' p={4} color='common.white' bgcolor='primary.dark'>
            <Typography variant='h6' minWidth='11rem'>
              {weekday}
            </Typography>
            <Typography variant='h6' color='secondary.main'>
              {date}
            </Typography>
            <IconButton sx={{ ml: 'auto' }}>
              <Create sx={{ color: 'common.white' }} />
            </IconButton>
          </Stack>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Danie</TableCell>
                <TableCell>Wykluczone składniki</TableCell>
                <TableCell>Cena</TableCell>
                <TableCell>Ilość</TableCell>
                <TableCell>Razem</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {suborder.dishes.map(({ dishId, excludedIngredients, count = 1 }) => {
                const dish = dishMap[dishId];

                return (
                  <TableRow key={dishId}>
                    <TableCell>{dish.photo && <img alt={dish.name} src={dish.photo} />}</TableCell>
                    <TableCell>{dish.name}</TableCell>
                    <TableCell>
                      <ul>
                        {excludedIngredients?.map((ingredient) => (
                          <li key={ingredient}>{ingredient}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>{dish.price} zł</TableCell>
                    <TableCell>{count}</TableCell>
                    <TableCell>{dish.price * count} zł</TableCell>
                    <TableCell>
                      <Stack alignItems='center'>
                        <IconButton>
                          <DeleteOutline />
                        </IconButton>
                        <IconButton>
                          <Create />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      );
    })}
  </>
);

interface SummaryCartProps {
  nextStep: () => void;
}

const SummaryCart = ({ nextStep }: SummaryCartProps) => {
  const { cart } = useShoppingCart();

  const [dishMap, setDishMap] = useState<Record<string, DishDto>>({});

  useEffect(() => {
    new Set(cart.flatMap((suborder) => suborder.dishes)).forEach(async ({ dishId }) => {
      const dish = await dishesApi.findDishById({ id: dishId });
      setDishMap((oldMap) => ({ ...oldMap, [dishId]: dish }));
    });
  }, [cart]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <CartDaysDisplay cart={cart} dishMap={dishMap} />
      </Grid>
      <Grid item xs={12} md={4}>
        <CartPriceDisplay nextStep={nextStep} />
      </Grid>
    </Grid>
  );
};

export { SummaryCart };
