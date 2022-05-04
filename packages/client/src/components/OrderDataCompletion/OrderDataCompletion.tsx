import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  styled,
  TextField,
  Typography,
} from '@mui/material';

const OrderDataCompletion = () => {
  return (
    <Container fixed>
      <Box sx={{ bgcolor: '#FAFAFA' }}>
        <Grid item container spacing={5}>
          <Grid item xs={6} xl={6}>
            <Box marginLeft={5}>
              <Typography variant='h5' color='primary.main'>
                Godzina dostawy
              </Typography>
              <FormControl sx={{ minWidth: 300 }}>
                <InputLabel id='demo-simple-select-label'>Godzina dostawy</InputLabel>
                <Select labelId='demo-simple-select-label' id='demo-simple-select' label='Age'>
                  <MenuItem value={1}>4:00 - 6:00</MenuItem>
                  <MenuItem value={2}>6:00 - 8:00</MenuItem>
                  <MenuItem value={3}>8:00 - 10:00</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6} xl={6}>
            <Box>
              <Typography variant='h5' color='primary.main'>
                Adres dostawy
              </Typography>
              <FormControl>
                <RadioGroup aria-labelledby='demo-radio-buttons-group-label' name='radio-buttons-group'>
                  <FormControlLabel value='2' control={<Radio />} label='Mickiewicza 20A /1, 00-000 Warszawa' />
                  <FormControlLabel value='2' control={<Radio />} label='Mickiewicza 20A /1, 00-000 Warszawa' />
                  <FormControlLabel value='3' control={<Radio />} label='Mickiewicza 20A /1, 00-000 Warszawa' />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6} xl={6}>
            <Box marginLeft={5}>
              <Typography variant='h5' color='primary.main'>
                Informacje podstawowe
              </Typography>
              <TextField sx={{ mr: 0.5, mb: 0.5 }} id='name' label='Imię' />
              <TextField id='surname' label='Nazwisko' />
              <TextField sx={{ mr: 0.5, mb: 0.5 }} id='email' label='Adres email' />
              <TextField id='phone-number' label='Numer telefonu' />
            </Box>
          </Grid>
          <Grid item xs={6} xl={6}>
            <Box>
              <TextField sx={{ width: '90%', pr: 0.5, mb: 1 }} id='street' label='Ulica' />
              <TextField sx={{ width: '30%', pr: 0.5, mb: 1 }} id='street-number' label='Numer domu' />
              <TextField sx={{ width: '30%', pr: 0.5, mb: 1 }} id='apartment-number' label='Numer mieszkania' />
              <TextField sx={{ width: '30%', pr: 0.5, mb: 1 }} id='floor' label='Piętro' />
              <TextField sx={{ width: '30%', pr: 0.5, mb: 1 }} id='post-code' label='Kod pocztowy' />
              <TextField sx={{ width: '60%', pr: 0.5, mb: 1 }} id='city' label='Miasto' />
            </Box>
          </Grid>
          <Grid container xs={12} xl={12} justifyContent='center' alignItems='center'>
            <Button variant='contained' color='secondary' sx={{ m: 10, width: '20%' }}>
              PRZEJDŹ DO PŁATNOŚCI
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export { OrderDataCompletion };
