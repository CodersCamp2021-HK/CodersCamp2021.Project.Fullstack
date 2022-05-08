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
import { max } from 'lodash';

const OrderPayment = () => {
  return (
    <Container fixed>
      <Box sx={{ bgcolor: '#FAFAFA' }}>
        <Grid item container spacing={5}>
          <Grid item xs={6} xl={6}>
            <Box marginLeft={8}>
              <Typography variant='h5' color='primary.main' sx={{ my: 4 }}>
                Podsumowanie
              </Typography>
              <Typography variant='h6' color='primary.main' sx={{ mb: 2 }}>
                Dane do wysyłki
              </Typography>
              <Typography variant='body1'>Jan Kowalski</Typography>
              <Typography variant='body1'>Warszawska 15/5</Typography>
              <Typography variant='body1'>01-100 Wrocław</Typography>
              <Typography variant='h6' color='primary.main' sx={{ mt: 3, mb: 2 }}>
                Dane kontakowe
              </Typography>
              <Typography variant='body1'>jankowalski@gmail.com</Typography>
              <Typography variant='body1'>600 700 800</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} xl={6}>
            <Box>
              <Typography variant='h5' color='primary.main' sx={{ my: 4 }}>
                Uwagi do zamówienia
              </Typography>
              <TextField id='outlined-multiline-static' multiline rows={4} sx={{ mb: 4, width: '70%' }} />
              <Divider orientation='vertical' flexItem />
              <Grid container direction='row' alignItems='center'>
                <Typography variant='h5' color='primary.main' sx={{ mr: 1 }}>
                  Metoda płatności
                </Typography>
                <AddCircleIcon color='primary' />
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
            <Button variant='contained' color='secondary' sx={{ m: 10, width: '20%' }}>
              ZAPŁAĆ I ZAMÓW
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export { OrderPayment };
