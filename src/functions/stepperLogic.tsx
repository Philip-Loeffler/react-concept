/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'components/Button';
import {
  Typography,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  TextField,
  InputLabel,
  Select,
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';
import { Cancel, AccountCircle, CheckCircle, Inbox } from '@material-ui/icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ContactUsModal } from 'components/ContactUsModal';

import signUpData from '../../assets/data/signUpData.json';

import { useStyles, SignUpDialog } from './style';

interface SignUpModalProps {
  open: boolean;
  handleClose: () => void;
}

const privacyPolicy =
  'https://docs.google.com/document/d/1Kde4R9e8PUlgGtt6RX4Tp4Ne_kkcL79pYByf-M5M3kU/edit';
const termsOfUse =
  'https://docs.google.com/document/d/19iQu4AWWy2XHTHmDSk_HiNhmu2EcpkCfefXGQAmfpRY/edit';
const validationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
});

export const SignUpModal = ({ open, handleClose }: SignUpModalProps) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [openContactUs, setOpenContactUs] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const openContactUsModal = () => {
    setOpenContactUs(true);
  };
  const closeSignUpModal = () => {
    setOpenContactUs(false);
  };

  const closeSnackBar = () => {
    setOpenSnackBar(false);
  };

  const steps = getSteps();
  const classes = useStyles();

  function getSteps() {
    return ['Details Step'];
  }
  const handleNext = () => {
    setActiveStep(() => activeStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const backHome = () => {
    handleClose();
    handleReset();
  };

  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    validationSchema,
    initialErrors: {
      firstName: '',
      lastName: '',
      email: '',
    },
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      region: '',
    },
    onSubmit: ({ email }) => {
      if (import.meta.env.VITE_EMAIL === email) {
        handleNext();
      } else {
        setOpenSnackBar(true);
      }
    },
  });

  return (
    <div>
      <Snackbar
        style={{ height: '44%', marginLeft: '5%' }}
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
              The email address entered is invalid
            </span>
          }
        />
      </Snackbar>

      <SignUpDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={false}
      >
        <form onSubmit={handleSubmit}>
          <div className={classes.modal}>
            <div className={classes.modalContainer}>
              <div className={classes.logo}>
                <div className={classes.detailContainer}>
                  <div className={classes.logoContainer}>
                    <div
                      className={
                        activeStep === steps.length - 1
                          ? classes.logoFocused
                          : classes.logoUnfocused
                      }
                    >
                      <AccountCircle
                        className={classes.detailsLogo}
                      ></AccountCircle>
                      Your Details
                    </div>
                    <div className={classes.divider}></div>
                    <div
                      className={
                        activeStep === steps.length - 1
                          ? classes.logoUnfocused
                          : classes.logoFocused
                      }
                    >
                      <CheckCircle
                        className={classes.detailsLogo}
                      ></CheckCircle>
                      Confirmation
                    </div>
                  </div>
                  <div className={classes.agreementMessage}>
                    By signing up you are agreeing to our
                    <a
                      className={classes.privacyLinks}
                      href={privacyPolicy}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      privacy policy
                    </a>
                    and
                    <a
                      className={classes.termsLinks}
                      href={termsOfUse}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      terms of use.
                    </a>
                  </div>
                </div>
              </div>

              <div className={classes.contentContainer}>
                <Cancel
                  className={classes.closeIcon}
                  onClick={handleClose}
                ></Cancel>
                {activeStep === steps.length - 1 && (
                  <div className={classes.modalContent}>
                    <DialogTitle>
                      <div className={classes.titleSize}>Your details</div>
                      <div>Tell us a little bit about yourself</div>
                    </DialogTitle>
                    <div className={classes.halfInputRow}>
                      <TextField
                        id="firstName"
                        label="FirstName"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        error={touched.firstName}
                        helperText={touched.firstName && errors.firstName}
                        variant="outlined"
                        className={classes.halfTextField}
                      />
                      <TextField
                        id="lastName"
                        label="LastName"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        error={touched.lastName}
                        helperText={touched.lastName && errors.lastName}
                        variant="outlined"
                        className={classes.halfTextField}
                      />
                    </div>

                    <TextField
                      margin="normal"
                      id="email"
                      label="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email}
                      helperText={touched.email && errors.email}
                      variant="outlined"
                      className={classes.fullTextField}
                    ></TextField>

                    <TextField
                      id="interest"
                      label="Area of Interest"
                      name="interest"
                      margin="normal"
                      variant="outlined"
                      className={classes.fullTextField}
                      select
                    >
                      {signUpData.aiType.map((aiType, i) => (
                        <MenuItem value={aiType} key={i}>
                          test test
                          {aiType}
                        </MenuItem>
                      ))}
                    </TextField>
                    <div className={classes.halfInputRow}>
                      <TextField
                        id="region"
                        label="Region"
                        onChange={handleChange}
                        value={values.region}
                        margin="normal"
                        variant="outlined"
                        className={classes.halfTextField}
                        select
                      >
                        {signUpData.region.map((regions, i) => (
                          <MenuItem value={regions} key={i}>
                            {regions}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        id="sector"
                        label="Sector"
                        name="sector"
                        margin="normal"
                        variant="outlined"
                        className={classes.halfTextField}
                        select
                      >
                        {signUpData.sector.map((sector, i) => (
                          <MenuItem value={sector} key={i}>
                            {sector}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className={classes.halfInputRow}>
                      <TextField
                        id="aiType"
                        label="AI Type"
                        name="aiType"
                        margin="normal"
                        variant="outlined"
                        className={classes.halfTextField}
                        select
                      >
                        {signUpData.aiType.map((aiType, i) => (
                          <MenuItem value={aiType} key={i}>
                            {aiType}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        id="aiUseCases"
                        label="AI Use Cases"
                        name="aiUseCases"
                        margin="normal"
                        variant="outlined"
                        className={classes.halfTextField}
                        select
                      >
                        {signUpData.aiUses.map((aiUses, i) => (
                          <MenuItem value={aiUses} key={i}>
                            {aiUses}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <TextField
                      id="responsibleAI"
                      label="Why are you interested in responsible AI?"
                      name="Interests"
                      margin="normal"
                      variant="outlined"
                      className={classes.fullTextField}
                    ></TextField>
                    <div className={classes.signInButton}>
                      <Button
                        type="submit"
                        className={classes.signUpModalButton}
                        variant="outlined"
                        color="primary"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
                {activeStep === steps.length && (
                  <div className={classes.confirmationContainer}>
                    <Inbox className={classes.signInFolder} />
                    <Typography variant="h4">
                      Thank you for signing up!
                    </Typography>
                    <Typography variant="h6">
                      Currently we are manually approving accounts you should.
                      You should recieve a confirmation via email within 24
                      hours.
                    </Typography>

                    <Button
                      onClick={backHome}
                      className={classes.signUpModalButton}
                      variant="outlined"
                      color="primary"
                    >
                      back to home
                    </Button>

                    <div className={classes.footer}>
                      <div className={classes.footerColor}>
                        Please if you don&apos;t receive an email after 24 hours
                        <Button
                          size="small"
                          className={classes.contactUsMargin}
                          onClick={openContactUsModal}
                        >
                          Contact Us
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
        <ContactUsModal open={openContactUs} handleClose={closeSignUpModal} />
      </SignUpDialog>
    </div>
  );
};
