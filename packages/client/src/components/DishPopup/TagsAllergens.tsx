import { Box, BoxProps, Typography } from '@mui/material';

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
const TagsAllergens = () => (
  <Box sx={{ flexDirection: 'row', display: 'flex' }}>
    <Item>
      <Typography variant='h6'>Tagi: </Typography>
    </Item>
    <Item sx={{ pl: 1 }}>
      <Typography sx={style}>WEGE</Typography>
    </Item>
    <Item sx={{ pl: 1, pr: 1 }}>
      <Typography sx={style}>OSTRE</Typography>
    </Item>
    <Item>
      <Typography variant='h6'>Alergeny: </Typography>
    </Item>
    <Item sx={{ pl: 1 }}>
      <Typography sx={style}>JAJKA</Typography>
    </Item>
    <Item sx={{ pl: 1 }}>
      <Typography sx={style}>SKORUPIAKI</Typography>
    </Item>
  </Box>
);

export { TagsAllergens };
