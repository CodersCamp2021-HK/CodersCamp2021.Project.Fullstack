import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

import { themeForegroundColor } from '../../config';

const OrderPayment = () => {
  return (
    <Container fixed>
      <Box sx={{ bgcolor: ({ palette }) => palette.background.paper }}>
        <Grid item container spacing={5}>
          <Grid item xs={6} xl={6}>
            <Box justifyContent='center' textAlign='center' justifySelf='center' alignSelf='center'>
              <Typography variant='h5' color={themeForegroundColor} sx={{ my: 4 }}>
                Podsumowanie
              </Typography>
              <Typography variant='h6' color={themeForegroundColor} sx={{ mb: 2 }}>
                Dane do wysyłki
              </Typography>
              <Typography variant='body1'>Jan Kowalski</Typography>
              <Typography variant='body1'>Warszawska 15/5</Typography>
              <Typography variant='body1'>01-100 Wrocław</Typography>
              <Typography variant='h6' color={themeForegroundColor} sx={{ mt: 3, mb: 2 }}>
                Dane kontakowe
              </Typography>
              <Typography variant='body1'>jankowalski@gmail.com</Typography>
              <Typography variant='body1'>600 700 800</Typography>
            </Box>
          </Grid>
          <Divider orientation='vertical' flexItem sx={{ borderRightWidth: 4, mt: 4 }} variant='fullWidth' />
          <Grid item xs={5} xl={5}>
            <Box sx={{ ml: 4 }}>
              <Typography variant='h5' color={themeForegroundColor} sx={{ my: 4 }}>
                Uwagi do zamówienia
              </Typography>
              <TextField id='outlined-multiline-static' multiline rows={4} sx={{ mb: 4, width: '80%' }} />

              <Grid container direction='row' alignItems='center'>
                <Typography variant='h5' color={themeForegroundColor} sx={{ mr: 1 }}>
                  Metoda płatności
                </Typography>
                <AddCircleIcon sx={{ color: themeForegroundColor }} />
              </Grid>
              <FormControl>
                <RadioGroup aria-labelledby='demo-radio-buttons-group-label' name='radio-buttons-group'>
                  <FormControlLabel value='1' control={<Radio />} label='Zapłać kartą (***030)' />
                  <FormControlLabel value='2' control={<Radio />} label='Zapłać kartą (***123)' />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>

          <Grid container justifyContent='center' alignItems='center'>
            <Button variant='contained' color='secondary' sx={{ m: 8, width: '20%' }}>
              ZAPŁAĆ I ZAMÓW
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export { OrderPayment };
