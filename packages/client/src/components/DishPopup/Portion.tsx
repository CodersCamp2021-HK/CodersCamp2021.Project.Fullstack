import { Box, BoxProps, Typography } from '@mui/material';

const Item = (props: BoxProps) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        m: 1,
        width: '20rem',
        textAlign: 'center',
        p: 0.3,
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
        <Typography border={1} borderRadius='16px' color='primary'>
          Kalorie: 500
        </Typography>
      </Item>
      <Item>
        <Typography border={1} borderRadius='16px' color='primary'>
          Tłuszcze: 100
        </Typography>
      </Item>
      <Item>
        <Typography border={1} borderRadius='16px' color='primary'>
          Białka: 50
        </Typography>
      </Item>
      <Item>
        <Typography border={1} borderRadius='16px' color='primary'>
          Węglowodany: 200
        </Typography>
      </Item>
    </Box>
  </>
);

export { Portion };
