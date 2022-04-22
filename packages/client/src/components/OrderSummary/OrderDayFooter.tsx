import { Box, Chip, Stack, styled, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';

const NutrientsTableBody = styled(TableBody)(() => ({
  '& .MuiTableCell-root': {
    border: 'none',
    color: 'inherit',
    padding: '0.125rem 0.25rem',
  },
}));

const OrderDayFooter = () => (
  <Box color='common.white' bgcolor='primary.light' px={7} py={4}>
    <Typography variant='h5' fontWeight='bold' px={0.5} pb={2}>
      Podsumowanie dnia
    </Typography>
    <Stack direction='row'>
      <Table sx={{ maxWidth: '27rem' }}>
        <NutrientsTableBody>
          <TableRow>
            <TableCell>Kalorie</TableCell>
            <TableCell>2000 kcal</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tłuszcze</TableCell>
            <TableCell>500 g</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Białko</TableCell>
            <TableCell>500 g</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Węglowodany</TableCell>
            <TableCell>500 g</TableCell>
          </TableRow>
        </NutrientsTableBody>
      </Table>
      <Chip
        label='256 zł'
        sx={({ palette }) => ({
          backgroundColor: palette.secondary.dark,
          color: palette.primary.contrastText,
          typography: { xs: 'h5', xl: 'h4' },
          mx: 'auto',
          py: 3,
          borderRadius: 16,
          alignSelf: 'start',
        })}
      />
    </Stack>
  </Box>
);

export { OrderDayFooter };
