import { DishDto } from '@fullstack/sdk/src';
import { Box, BoxProps, Typography } from '@mui/material';

type TagsAllergensProps = {
  dish: Omit<DishDto, 'id'>;
};
const Item = (props: BoxProps) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        textAlign: 'left',
        p: 0.1,
        ...sx,
      }}
      {...other}
    />
  );
};

const style = {
  variant: 'caption',
  borderRadius: '16px',
  color: 'white',
  bgcolor: 'primary.main',
  padding: 1,
};
const TagsAllergens = ({ dish }: TagsAllergensProps) => (
  <Box sx={{ flexDirection: 'row', display: 'flex' }}>
    <Item>
      <Typography variant='h6'>Tagi: </Typography>
    </Item>
    <Item sx={{ pl: 1 }}>
      <Typography sx={style}>{dish.tags[0]}</Typography>
    </Item>
    <Item sx={{ pl: 1, pr: 1 }}>
      <Typography sx={style}>{dish.tags[1]}</Typography>
    </Item>
    <Item>
      <Typography variant='h6'>Alergeny: </Typography>
    </Item>
    <Item sx={{ pl: 1 }}>
      <Typography sx={style}>{dish.allergens[0] != undefined ? dish.allergens[0] : 'Brak'}</Typography>
    </Item>
    <Item sx={{ pl: 1 }}>
      <Typography sx={style}>{dish.allergens[1]}</Typography>
    </Item>
  </Box>
);

export { TagsAllergens };
