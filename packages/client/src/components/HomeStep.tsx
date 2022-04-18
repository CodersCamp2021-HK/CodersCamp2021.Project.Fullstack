import { Grid, Stack, styled, Typography } from '@mui/material';

interface HomeStepProps {
  number: number;
  title: string;
  img: string;
  flipped?: boolean;
  children: React.ReactNode;
}

const StepHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&::first-letter': {
    backgroundColor: theme.palette.secondary.main,
    padding: '0.4em 0.8em',
    margin: '-0.4em -0.8em',
    borderRadius: '4rem',
  },
}));

const HomeStep = ({ number, title, img, flipped, children }: HomeStepProps) => (
  <Grid container>
    <Grid item xs={12} lg={6} order={{ xs: 0, lg: flipped ? 1 : 0 }}>
      <Stack direction='column' gap={4} justifyContent='center' height={1} p={4}>
        <StepHeader variant='h2' typography={{ xs: 'h5', sm: 'h4', xl: 'h2' }}>
          {number}. {title}
        </StepHeader>
        <Typography>{children}</Typography>
      </Stack>
    </Grid>
    <Grid item xs={12} lg={6}>
      <img src={img} alt={`Ilustracja obrazująca krok ${number}.`} style={{ width: '100%' }} />
    </Grid>
  </Grid>
);

HomeStep.defaultProps = {
  flipped: false,
};

export { HomeStep };
