import React, { useState } from 'react'
import { IFormValues } from '../components/Form/Form';
import postEmail from '../services/api';

interface IProps {
    setOpen: (value: boolean) => void;
}

const useForm = ({setOpen}: IProps) => {
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
    return {
        handleClose,
        onChange,
        handleSubmit,
        setSnackbarOpen,
        snackbarOpen,
        nameError,
        emailError,
        matchingEmailsError,
        formData,
        loading,
    }
}

export default useForm
