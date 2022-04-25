import { Box, Stack } from '@mui/material';

const Footer = () => (
  <Box bgcolor='primary.main' color='common.white' height='18rem' p={4}>
    <Stack justifyContent='flex-end' alignItems='flex-start' height={1}>
      &copy; JeszCoChcesz 2022
    </Stack>
  </Box>
);

export { Footer };
