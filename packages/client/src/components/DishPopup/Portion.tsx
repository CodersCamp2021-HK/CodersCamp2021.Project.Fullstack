import { Box, BoxProps, Typography } from '@mui/material';

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
const Portion = () => (
  <>
    <Typography variant='h6'>W porcji 300g</Typography>
    <Box sx={{ flexDirection: 'column' }}>
      <Item />
      <Item>
        <Typography sx={style}>KALORIE: 500</Typography>
      </Item>
      <Item>
        <Typography sx={style}>TŁUSZCZE: 100</Typography>
      </Item>
      <Item>
        <Typography sx={style}>BIAŁKA: 50</Typography>
      </Item>
      <Item>
        <Typography sx={style}>WĘGLOWODANY: 200</Typography>
      </Item>
    </Box>
  </>
);

export { Portion };
