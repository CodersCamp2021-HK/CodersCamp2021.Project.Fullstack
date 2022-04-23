import { Box, BoxProps, Typography } from '@mui/material';

const Item = (props: BoxProps) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        m: 1,
        width: '20rem',
        textAlign: 'center',
        pb: 0.3,
        pl: 2,
        ...sx,
      }}
      {...other}
    />
  );
};
const Portion = () => (
  <>
    <Typography variant='h5'>W porcji 300g</Typography>
    <Box sx={{ flexDirection: 'column' }}>
      <Item />
      <Item>
        <Typography borderRadius='16px' bgcolor='primary.background'>
          Kalorie: 500
        </Typography>
      </Item>
      <Item>
        <Typography borderRadius='16px' bgcolor='primary.background'>
          Tłuszcze: 100
        </Typography>
      </Item>
      <Item>
        <Typography borderRadius='16px' bgcolor='primary.background'>
          Białka: 50
        </Typography>
      </Item>
      <Item>
        <Typography borderRadius='16px' bgcolor='primary.background'>
          Węglowodany: 200
        </Typography>
      </Item>
    </Box>
  </>
);

export { Portion };
