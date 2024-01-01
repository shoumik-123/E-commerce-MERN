import {createTheme, makeStyles, withStyles} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const theme = createTheme({
    palette: {
        primary: {
            main: '#FDD138', // Default color (yellow)
        },
        hover: {
            purple: '#662D91', // Hover color (purple)
        },
        common: {
            white: 'rgba(255,255,255,0.7)',
        },
    },
});
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        padding: theme.spacing(1),
    },
    slider: {
        width: '100%',
        margin: '20px 0',
    },
    formControl: {
        width: '150px',
        marginTop: theme.spacing(2),

    },
}));


// Custom styles for Select and MenuItem
const StyledSelect = withStyles((theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: theme.palette.hover.purple, // Border color on hover
            },
        },
    },
}))(Select);

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:hover': {
            backgroundColor: theme.palette.hover.purple,
            color: theme.palette.common.white,
        },
        '&.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            color: '#000000',
        },

    },
}))(MenuItem);
export { theme, useStyles ,StyledSelect ,StyledMenuItem};
