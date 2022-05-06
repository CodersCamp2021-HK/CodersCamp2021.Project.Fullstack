import { AllergensEnum, DishTagsEnum } from '@fullstack/sdk/src';
import { Box, BoxProps, Typography } from '@mui/material';

type TagsAllergensProps = {
  allergens: AllergensEnum[] | undefined;
  tags: DishTagsEnum[] | undefined;
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
  borderRadius: '50px',
  color: 'white',
  padding: 1,
};
const TagsAllergens = ({ allergens = [], tags = [] }: TagsAllergensProps) => (
  <Box sx={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>
    <Item>
      <Typography variant='caption'>Tagi:</Typography>
    </Item>
    {(tags ?? []).length > 0 ? (
      tags?.map((tag) => (
        <Item sx={{ pl: 0.5 }} key={tag}>
          <Typography bgcolor='primary.main' variant='caption' sx={style}>
            {tag.toUpperCase()}
          </Typography>
        </Item>
      ))
    ) : (
      <Typography variant='h6' sx={{ pl: 1, pr: 1 }}>
        Brak
      </Typography>
    )}

    <Item>
      <Typography variant='caption' sx={{ pl: 1 }}>
        Alergeny:
      </Typography>
    </Item>
    {(allergens ?? []).length > 0 ? (
      allergens?.map((allergen) => (
        <Item sx={{ pl: 0.5 }} key={allergen}>
          <Typography bgcolor='rgba(27, 94, 32, 50%)' variant='caption' sx={style}>
            {allergen.toUpperCase()}
          </Typography>
        </Item>
      ))
    ) : (
      <Typography variant='h6' sx={{ pl: 1, pr: 1 }}>
        Brak
      </Typography>
    )}
  </Box>
);

export { TagsAllergens };
