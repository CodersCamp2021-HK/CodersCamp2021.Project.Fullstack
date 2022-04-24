import { AllergensEnum, DishDto, DishTagsEnum } from '@fullstack/sdk/src';
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
  variant: 'caption',
  borderRadius: '16px',
  color: 'white',
  bgcolor: 'primary.main',
  padding: 1,
};
const TagsAllergens = ({ allergens = [], tags = [] }: TagsAllergensProps) => (
  <Box sx={{ flexDirection: 'row', display: 'flex' }}>
    {(tags ?? []).length > 0 ? (
      <>
        <Item>
          <Typography variant='h6'>Alergeny: </Typography>
        </Item>
        {tags?.map((tag) => (
          <Item sx={{ pl: 1, pr: 1 }} key={tag}>
            <Typography sx={style}>{tag}</Typography>
          </Item>
        ))}
      </>
    ) : (
      <Typography variant='h6' sx={{ pl: 1, pr: 1 }}>
        Brak
      </Typography>
    )}

    {(allergens ?? []).length > 0 ? (
      <>
        <Item>
          <Typography variant='h6'>Alergeny: </Typography>
        </Item>
        {allergens?.map((allergen) => (
          <Item sx={{ pl: 1, pr: 1 }} key={allergen}>
            <Typography sx={style}>{allergen}</Typography>
          </Item>
        ))}
      </>
    ) : (
      <Typography variant='h6' sx={{ pl: 1, pr: 1 }}>
        Brak
      </Typography>
    )}
  </Box>
);

export { TagsAllergens };
