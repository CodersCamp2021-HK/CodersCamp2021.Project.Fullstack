import { Box, BoxProps, Typography } from '@mui/material';

const Item = (props: BoxProps) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        m: 1,
        width: '5rem',
        textAlign: 'center',
        p: 1,
        ...sx,
      }}
      {...other}
    />
  );
};
const TagsAllergens = () => (
  <Box sx={{ flexDirection: 'row', display: 'flex' }}>
    <Item>
      <Typography variant='h6'>Tagi: </Typography>
    </Item>
    <Item>
      <Typography variant='overline' border={1} borderRadius='16px' color='primary' padding={1} bgcolor='#FFFF'>
        WEGE
      </Typography>
    </Item>
    <Item>
      <Typography variant='overline' border={1} borderRadius='16px' color='primary' padding={1} bgcolor='#FFFF'>
        OSTRE
      </Typography>
    </Item>
    <Item>
      <Typography variant='h6'>Alergeny: </Typography>
    </Item>
    <Item>
      <Typography variant='overline' border={1} borderRadius='16px' color='primary' padding={1} bgcolor='#FFFF'>
        JAJKA
      </Typography>
    </Item>
    <Item>
      <Typography variant='overline' border={1} borderRadius='16px' color='primary' padding={1} bgcolor='#FFFF'>
        SKORUPIAKI
      </Typography>
    </Item>
  </Box>
);

export { TagsAllergens };
