import { DishDto } from '@fullstack/sdk';
import AddIcon from '@mui/icons-material/Add';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { DaysList } from './DaysList';
import { Ingredients } from './Ingredients';
import { Portion } from './Portion';
import { TagsAllergens } from './TagsAllergens';

interface DishPopupHandlers {
  dish: Omit<DishDto, 'id'>;
  open: boolean;
  onClose: () => void;
}
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80rem',
  height: '43rem',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const DishPopup = ({ dish, open, onClose }: DishPopupHandlers) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={4} lg={4}>
              <img src={dish.photo} alt='Dish' style={{ width: '90%', height: '100%', borderRadius: '10%' }} />
            </Grid>
            <Grid item xs={8} lg={8} justifyContent='center' textAlign='center' justifySelf='center' alignSelf='center'>
              <Typography variant='h4' sx={{ p: 2 }}>
                {dish.name}
              </Typography>
              <Typography sx={{ pb: 2 }}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                Restauracja: <Link href='#'>{dish.restaurant}</Link>
              </Typography>
              <Typography variant='body1' sx={{ pb: 2 }} textAlign='left'>
                {dish.description}
              </Typography>
              <TagsAllergens />
            </Grid>
            <Grid item xs={4} lg={4} justifyContent='center' textAlign='center' justifySelf='center' alignSelf='center'>
              <Portion dish={dish} />
            </Grid>
            <Grid item xs={5} lg={5}>
              <Ingredients />
            </Grid>
            <Grid item xs={3} lg={3}>
              <Typography variant='h6'>Wybierz liczbę dań</Typography>
              <DaysList />
              <Typography variant='h5' color='primary.main'>
                {dish.price}
              </Typography>
              <Button
                variant='contained'
                color='secondary'
                sx={{
                  width: '100%',
                  mt: '2rem',
                }}
                startIcon={<AddIcon />}
              >
                Dodaj do koszyka
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export { DishPopup };
