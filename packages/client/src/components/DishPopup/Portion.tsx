import { Box, BoxProps, Typography } from '@mui/material';

const Item = (props: BoxProps) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        m: 2,
        width: 180,
        textAlign: 'center',
        p: 0.2,
        ...sx,
      }}
      {...other}
    />
  );
};
const Portion = () => (
  <Box sx={{ flexDirection: 'column' }}>
    <Item>
      <Typography variant='h5'>W porcji 300g</Typography>
    </Item>
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
);

export { Portion };
