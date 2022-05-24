import { Box, Link, Typography } from '@mui/material';

import { themeForegroundColor } from '../../config';

type QuestionParams = {
  question: string;
  link: string;
  linkText: string;
};

const Question = ({ question, link, linkText }: QuestionParams) => (
  <Box sx={{ marginTop: '7rem', display: 'flex' }}>
    <Typography variant='body1'>
      {question}
      <Link sx={{ marginLeft: '10px', color: themeForegroundColor }} href={link}>
        {linkText}
      </Link>
      .
    </Typography>
  </Box>
);

export { Question };
