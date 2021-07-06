import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
    (theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.background.paper,
            borderRadius: 5,
            boxShadow: theme.shadows[5],
            padding: '40px 70px',
            fontFamily: 'Poppins',
            '& > span': {
                fontSize: 20,
                marginBottom: 24,
                alignSelf: 'center'
            },
            '& > div': {
                marginBottom: 30,
            },
            '& > button': {
                alignSelf: 'center',
                width: 'fit-content',
                padding: '10px 35px',
                backgroundColor: 'white',
                fontFamily: 'Poppins',
                fontWeight: 600,
                border: '2px solid midnightBlue',
                color: 'midnightBlue',
                borderRadius: 5,
                cursor: 'pointer',
                '&:hover': {
                    color: 'white',
                    backgroundColor: 'midnightBlue'
                },
               '&:disabled': {
                    background: 'lightgrey',
                    color: 'white',
                    cursor: 'wait',
                    border: '2px solid lightgrey',
                  },
                  '&:focus': {
                    color: 'white',
                    backgroundColor: 'midnightBlue'
                  }
            }
        }
    })
);

export default useStyles;