import { DishDto, OrderDishDto } from '@fullstack/sdk';
import { Chip, styled, Table, TableBody, TableCell, TableFooter, TableRow, Typography } from '@mui/material';

import { sumDishProperty } from './shared';

const NutrientsTableBody = styled(TableBody)(() => ({
  '& .MuiTableCell-root': {
    border: 'none',
    padding: '0.125rem 0.25rem',
    fontSize: '1.25rem',
  },
}));

const NUTRIENTS = [
  {
    label: 'Kalorie',
    path: 'calories.perPortion',
    unit: 'kcal',
  },
  {
    label: 'Tłuszcze',
    path: 'fats.perPortion',
    unit: 'g',
  },
  {
    label: 'Białko',
    path: 'proteins.perPortion',
    unit: 'g',
  },
  {
    label: 'Węglowodany',
    path: 'carbohydrates.perPortion',
    unit: 'g',
  },
] as const;

interface OrderDayFooterProps {
  dishes: OrderDishDto[];
  dishMap: Record<string, DishDto>;
}

const OrderDayFooter = ({ dishes, dishMap }: OrderDayFooterProps) => {
  const dayPrice = sumDishProperty(dishes, dishMap, 'price');

  return (
    <TableFooter sx={({ palette }) => ({ color: palette.common.white, background: palette.primary.light })}>
      <TableRow>
        <TableCell colSpan={2} sx={{ pl: 8, py: 4 }}>
          <Typography variant='h5' fontWeight='bold' pb={2}>
            Podsumowanie dnia
          </Typography>
          <Table>
            <NutrientsTableBody>
              {NUTRIENTS.map(({ label, path, unit }) => (
                <TableRow key={label}>
                  <TableCell>{label}</TableCell>
                  <TableCell>
                    {sumDishProperty(dishes, dishMap, path)} {unit}
                  </TableCell>
                </TableRow>
              ))}
            </NutrientsTableBody>
          </Table>
        </TableCell>
        <TableCell colSpan={3} />
        <TableCell align='center'>
          <Chip
            label={`${dayPrice} zł`}
            sx={({ palette }) => ({
              backgroundColor: palette.secondary.dark,
              color: palette.primary.contrastText,
              typography: { xs: 'h5', xl: 'h4' },
              py: 3,
              borderRadius: 16,
            })}
          />
        </TableCell>
        <TableCell />
      </TableRow>
    </TableFooter>
  );
};

export { OrderDayFooter };
