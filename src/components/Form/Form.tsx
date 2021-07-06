import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputAdornment from '@material-ui/core/InputAdornment';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import postEmail from '../../services/api';
import useStyles from './Form.styles';
import Snackbar from '@material-ui/core/Snackbar';


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
  const [formData, setFormData] = useState<IFormValues>({
    fullName: '',
    email: '',
    confirmEmail: '',
  });
  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [matchingEmailsError, setMatchingEmailsError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)

  let {fullName, email, confirmEmail} = formData
  const {
      open,
      setOpen,
  } = props;

  const onChange = (e: any): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  };

  const handleErrors = (): void => {
    setNameError('');
    setEmailError('');
    setMatchingEmailsError('');
  }

  const handleValidation = (formData: IFormValues): boolean => {
    const {
      fullName,
      email,
      confirmEmail
    } = formData;
    let result: boolean = true;
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (fullName.length < 3) {
        setNameError('Must be 3 characters minimum')
        result = false;
      }
      if (!re.test(String(email).toLowerCase())) {
        setEmailError('Invalid email')
        result = false;
      } 
      if (email !== confirmEmail) {
        setMatchingEmailsError('Emails must be matching')
        result = false;
      }
      return result;
  };

  const handleClose = (): void => {
    setFormData({
      fullName: '',
      email: '',
      confirmEmail: ''
    })
    handleErrors()
    setOpen(false)
  }

  const handleSubmit = (formData: IFormValues): void => {
    handleErrors();
    if(!handleValidation(formData)) {
      return;
    };
    // Mocking a loading state to display loading text to user
    setLoading(true);
    setTimeout(async () => {
      // Error handling to let user know if their email wasn't sent
      try {
        await postEmail(formData);
        setOpen(false);
        setFormData({fullName: '', email: '', confirmEmail: ''});
      } catch {
        setSnackbarOpen(true);
      }
      setLoading(false)
    }, 3000);
  }

    return (
      <>
        <Modal
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
              disabled={loading}
              onClick={() => handleSubmit(formData)}>
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
