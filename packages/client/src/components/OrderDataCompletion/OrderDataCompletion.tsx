import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
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
              <Typography variant='h5' color='primary.main' marginBottom={3}>
                Godzina dostawy
              </Typography>
              <FormControl sx={{ width: '60%' }}>
                <InputLabel id='demo-simple-select-label'>Godzina dostawy</InputLabel>
                <Select labelId='demo-simple-select-label' id='demo-simple-select' label='hours' size='small'>
                  <MenuItem value={1}>4:00 - 6:00</MenuItem>
                  <MenuItem value={2}>6:00 - 8:00</MenuItem>
                  <MenuItem value={3}>8:00 - 10:00</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6} xl={6}>
            <Box>
              <Typography variant='h5' color='primary.main' marginBottom={3}>
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
              <Typography variant='h5' color='primary.main' marginBottom={3}>
                Informacje podstawowe
              </Typography>
              <TextField sx={{ pr: 0.5, mb: 0.5 }} size='small' id='name' label='Imię' />
              <TextField id='surname' size='small' sx={{ pr: 0.5, mb: 0.5 }} label='Nazwisko' />
              <TextField sx={{ pr: 0.5, mb: 0.5 }} size='small' id='email' label='Adres email' />
              <TextField id='phone-number' size='small' label='Numer telefonu' sx={{ pr: 0.5, mb: 0.5 }} />
            </Box>
          </Grid>
          <Grid item xs={6} xl={6}>
            <Box>
              <TextField sx={{ width: '90%', pr: 0.5, mb: 1 }} size='small' id='street' label='Ulica' />
              <TextField sx={{ width: '30%', pr: 0.5, mb: 1 }} size='small' id='street-number' label='Numer domu' />
              <TextField
                sx={{ width: '30%', pr: 0.5, mb: 1 }}
                size='small'
                id='apartment-number'
                label='Numer mieszkania'
              />
              <TextField sx={{ width: '30%', pr: 0.5, mb: 1 }} size='small' id='floor' label='Piętro' />
              <TextField sx={{ width: '30%', pr: 0.5, mb: 1 }} size='small' id='post-code' label='Kod pocztowy' />
              <TextField sx={{ width: '60%', pr: 0.5, mb: 1 }} size='small' id='city' label='Miasto' />
            </Box>
          </Grid>
          <Grid container justifyContent='center' alignItems='center'>
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
