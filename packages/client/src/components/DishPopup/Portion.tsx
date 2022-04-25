import { DishDto } from '@fullstack/sdk';
import { Box, BoxProps, Typography } from '@mui/material';

type PortionProps = {
  dish: Omit<DishDto, 'id'>;
};
const Item = (props: BoxProps) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        m: 1,
        width: '85%',
        textAlign: 'center',
        pb: 0.3,
        pl: 2,
        ...sx,
      }}
      {...other}
    />
  );
};

const style = {
  borderRadius: '16px',
  bgcolor: 'primary.background',
  padding: 1,
};
const Portion = ({ dish }: PortionProps) => (
  <>
    <Typography variant='h6'>W porcji {dish.portionWeight}g</Typography>
    <Box sx={{ flexDirection: 'column' }}>
      <Item />
      <Item sx={style}>
        <Typography variant='caption'>KALORIE: {dish.calories.perPortion}</Typography>
      </Item>
      <Item sx={style}>
        <Typography variant='caption'>TŁUSZCZE: {dish.fats.perPortion}</Typography>
      </Item>
      <Item sx={style}>
        <Typography variant='caption'>BIAŁKA: {dish.proteins.perPortion}</Typography>
      </Item>
      <Item sx={style}>
        <Typography variant='caption'>WĘGLOWODANY: {dish.carbohydrates.perPortion}</Typography>
      </Item>
    </Box>
  </>
);

export { Portion };
