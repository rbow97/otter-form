import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputAdornment from '@material-ui/core/InputAdornment';
import Modal from '@material-ui/core/Modal';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import useForm from '../../hooks/useForm';
import useStyles from './Form.styles';


interface IProps {
    open: boolean;
    setOpen: (val: boolean) => void;
}

export interface IFormValues {
  fullName: string;
  email: string;
  confirmEmail: string;
}

const Form: React.FC<IProps> = (props: IProps) => {
  const classes = useStyles();
  const {
    open,
    setOpen,
} = props;

  const {
    handleClose,
    onChange,
    handleSubmit,
    setSnackbarOpen,
    snackbarOpen,
    nameError,
    emailError,
    matchingEmailsError,
    formData,
    loading
  } = useForm({
    setOpen
  })

  let {fullName, email, confirmEmail} = formData

    return (
      <>
      {/* Modal which includes ability to click outside/escape key to escape, and clear focus on each element for accessibility */}
        <Modal
          data-testid='modal'
          open={open}
          className={classes.modal}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.form}>
              <span>Request an invite</span>
              <TextField
                onChange={(e) => onChange(e)}
                id='fullName'
                name='fullName'
                type='text'
                value={fullName}
                error={nameError.length > 0}
                helperText={nameError}
                placeholder='Full Name'
                  InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faUser} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                onChange={(e) => onChange(e)}
                id='email'
                name='email'
                type='email'
                error={emailError.length > 0}
                helperText={emailError}
                value={email}
                placeholder='Email'
                  InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faUser} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                onChange={(e) => onChange(e)}
                id='confirmEmail'
                name='confirmEmail'
                type='email'
                error={matchingEmailsError.length > 0}
                helperText={matchingEmailsError}
                value={confirmEmail}
                placeholder='Confirm Email'
                  InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faUser} />
                    </InputAdornment>
                  ),
                }}
              />
              <button
              type='submit'
              // Button is disabled during loading
              disabled={loading}
              onClick={() => handleSubmit(formData)}>
                {/* Loading message added for asynchronous event signalling to the user that they should wait */}
                {loading ? 'Sending Email...' : 'Send'}
              </button>
            </div>
          </Fade>
        </Modal>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          message='There was an error sending your email'
        />
      </>
    )
}

export default Form
