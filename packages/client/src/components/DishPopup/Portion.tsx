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
      <Item>
        <Typography sx={style}>KALORIE: {dish.calories.perPortion}</Typography>
      </Item>
      <Item>
        <Typography sx={style}>TŁUSZCZE: {dish.fats.perPortion}</Typography>
      </Item>
      <Item>
        <Typography sx={style}>BIAŁKA: {dish.proteins.perPortion}</Typography>
      </Item>
      <Item>
        <Typography sx={style}>WĘGLOWODANY: {dish.carbohydrates.perPortion}</Typography>
      </Item>
    </Box>
  </>
);

export { Portion };
