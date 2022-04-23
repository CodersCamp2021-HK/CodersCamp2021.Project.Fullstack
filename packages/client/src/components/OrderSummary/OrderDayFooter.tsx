import { Chip, styled, Table, TableBody, TableCell, TableFooter, TableRow, Typography } from '@mui/material';

const NutrientsTableBody = styled(TableBody)(() => ({
  '& .MuiTableCell-root': {
    border: 'none',
    padding: '0.125rem 0.25rem',
    fontSize: '1.25rem',
  },
}));

const OrderDayFooter = () => (
  <TableFooter sx={({ palette }) => ({ color: palette.common.white, background: palette.primary.light })}>
    <TableRow>
      <TableCell colSpan={2} sx={{ pl: 8, py: 4 }}>
        <Typography variant='h5' fontWeight='bold' pb={2}>
          Podsumowanie dnia
        </Typography>
        <Table>
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
      </TableCell>
      <TableCell colSpan={3} />
      <TableCell align='center'>
        <Chip
          label='256 zł'
          sx={({ palette }) => ({
            backgroundColor: palette.secondary.dark,
            color: palette.primary.contrastText,
            typography: { xs: 'h5', xl: 'h4' },
            py: 3,
            borderRadius: 16,
          })}
        />
      </TableCell>
      <TableCell />
    </TableRow>
  </TableFooter>
);

export { OrderDayFooter };
