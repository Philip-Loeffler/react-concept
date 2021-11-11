/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'components/Button';
import {
  FormControlLabel,
  Checkbox,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { SignUpModal } from 'components/SignUpModal';
import { ContactUsModal } from 'components/ContactUsModal';

import SignInLogo from '../../assets/images/SignInLogo.png';

import { useStyles, SignInDialog } from './style';

interface SignInModalProps {
  open: boolean;
  handleClose: () => void;
}

const emailRequiredErrorMessage = 'Email is required.';
const passwordRequiredErrorMessage = 'Password is required.';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required(emailRequiredErrorMessage)
    .email('Must be a valid email address.'),
  password: yup.string().required(passwordRequiredErrorMessage),
});

export const SignInModal = ({ open, handleClose }: SignInModalProps) => {
  const classes = useStyles();
  const history = useHistory();
  const [openContactUs, setOpenContactUs] = React.useState(false);
  const [openSignUp, setopenSignUp] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const openContactUsModal = () => {
    setOpenContactUs(true);
    handleClose();
  };

  const closenContactUsModal = () => {
    setOpenContactUs(false);
  };

  const openSignUpModal = () => {
    setopenSignUp(true);
    handleClose();
  };

  const closeSignUpModal = () => {
    setopenSignUp(false);
    setOpenSnackBar(false);
  };

  const closeSnackBar = () => {
    setOpenSnackBar(false);
  };

  const {
    values,
    errors,
    isValid,
    touched,
    handleSubmit,
    handleChange,
  } = useFormik({
    validationSchema,
    initialErrors: {
      email: emailRequiredErrorMessage,
      password: passwordRequiredErrorMessage,
    },
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ email, password }) => {
      if (
        import.meta.env.VITE_EMAIL === email &&
        import.meta.env.VITE_PASSWORD === password
      ) {
        localStorage.setItem('isLoggedIn', email);
        setOpenSnackBar(false);
        handleClose();
        location.reload();
        history.replace('/');
      } else {
        setOpenSnackBar(true);
      }
    },
  });

  return (
    <div>
      <Snackbar
        style={{ height: '56%' }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openSnackBar}
        onClose={closeSnackBar}
      >
        <SnackbarContent
          style={{
            backgroundColor: '#BF4051',
          }}
          message={
            <span id="client-snackbar">
              Email or password is incorrect, please try again
            </span>
          }
        />
      </Snackbar>

      <SignInDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={false}
      >
        <form onSubmit={handleSubmit}>
          <div className={classes.Modal}>
            <img src={SignInLogo} alt="signInLogo" />
            <div className={classes.ModalContainer}>
              <CancelIcon className={classes.closeIcon} onClick={handleClose} />
              <div className={classes.ModalContent}>
                <DialogTitle>
                  <div className={classes.titleSize}>Sign In</div>
                </DialogTitle>
                <DialogContent>
                  <TextField
                    id="email"
                    label="Email Address"
                    name="email"
                    value={values.email}
                    error={touched.email}
                    helperText={touched.email && errors.email}
                    variant="outlined"
                    onChange={handleChange}
                    InputProps={{
                      className: classes.textField,
                    }}
                  />
                </DialogContent>
                <DialogContent>
                  <TextField
                    id="password"
                    type="password"
                    label="Password"
                    name="password"
                    error={touched.password}
                    helperText={touched.password && errors.password}
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    InputProps={{
                      className: classes.textField,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button onClick={openContactUsModal} color="primary">
                            Forgot?
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                </DialogContent>
                <DialogContent>
                  <div className={classes.signInRow}>
                    <FormControlLabel
                      className={classes.label}
                      control={<Checkbox name="checkedB" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      className={classes.signInModalButton}
                      variant="outlined"
                      color="primary"
                      disabled={!isValid}
                    >
                      Sign in
                    </Button>
                  </div>
                </DialogContent>
              </div>
              <DialogContent>
                <div className={classes.footer}>
                  <div className={classes.footerColor}>
                    Don&apos;t have an account yet?
                  </div>
                  <Button
                    className={classes.signUpModalButton}
                    onClick={openSignUpModal}
                    variant="outlined"
                    color="primary"
                    size="small"
                  >
                    Sign up
                  </Button>
                </div>
              </DialogContent>
            </div>
          </div>
        </form>
      </SignInDialog>

      <SignUpModal open={openSignUp} handleClose={closeSignUpModal} />
      <ContactUsModal open={openContactUs} handleClose={closenContactUsModal} />
    </div>
  );
};

{
  /* sign up modal has a prop called handleClose, which is a function, which is being attached to that onclose prop you see
// from another component, you can pass a boolean, to the handle close prop, which when invoked, will trigger inside this component, 
// causing that onClose prop to fire
*/
}
