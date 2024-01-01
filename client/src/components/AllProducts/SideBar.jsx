import React, {Fragment, useState} from 'react';
import {
    FormControl,
    InputLabel,
    Slider,
    ThemeProvider,
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {StyledMenuItem, StyledSelect, theme, useStyles} from "./themeAndStyle.js"




const SideBar = ({ onPriceChange, onCategoryChange, onSubcategoryChange ,onRatingChange}) => {

    const [price, setPrice] = useState([0,100000])
    function priceHandler(e , newPrice) {
        setPrice(newPrice)
        onPriceChange(newPrice)
    }

    const [category, setCategory] = useState('');
    const categoryHandler = (e) => {
        setCategory(e.target.value);
        onCategoryChange(e.target.value)
        setSubcategory(''); // Reset subcategory when the main category changes
    };

    const [subcategory, setSubcategory] = useState('');
    const subcategoryHandler = (e) => {
        setSubcategory(e.target.value);
        onSubcategoryChange(e.target.value)
    };

    const categories = [
        { label: 'None', value: '' },
        { label: 'Electronics', value: 'Electronics', subcategories: ['Laptop', 'Mobile', 'Guitar', 'HeadPhone'] },
        { label: 'Dress', value: 'Dress', subcategories: ['Pant', 'T-Shirt', 'Bra'] },
        { label: 'Vehicles', value: 'Vehicles', subcategories: ['Bike'] },
        { label: 'Others', value: 'Others', subcategories: ['Lighter', 'Glass'] },
    ];
    const classes = useStyles()

    const [ratings, setRatings] = useState(0)


    const ratingsHandler = (e,newRating) => {
        setRatings(newRating)
        onRatingChange(newRating)
    };
    return (
        <Fragment>
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <Typography color="primary"><h4>Price</h4></Typography>
                    <Slider
                        className={classes.slider}
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={100000}
                    />

                    <FormControl className={classes.formControl}>
                        <InputLabel color="primary"><h3>Category</h3></InputLabel>
                        <StyledSelect
                            value={category}
                            onChange={categoryHandler}
                            label="Category"
                        >
                            {categories.map((cat) => (
                                <StyledMenuItem key={cat.value} value={cat.value}>
                                    {cat.label}
                                </StyledMenuItem>
                            ))}
                        </StyledSelect>
                    </FormControl>

                    {category ? (
                        <FormControl className={classes.formControl}>
                            <InputLabel color="primary"><h3>Sub Category</h3></InputLabel>
                            <StyledSelect
                                value={subcategory}
                                onChange={subcategoryHandler}
                                label="Subcategory"
                            >
                                {categories
                                    .find((cat) => cat.value === category)
                                    ?.subcategories.map((subcat) => (
                                        <StyledMenuItem key={subcat} value={subcat}>
                                            {subcat}
                                        </StyledMenuItem>
                                    ))}
                            </StyledSelect>
                        </FormControl>
                    ) : (
                        <FormControl className={classes.formControl} style={{marginTop:'25px'}}>
                            <InputLabel color="primary"><h3>Sub Category</h3></InputLabel>
                            <StyledSelect
                                value="None"
                                label="None"
                            >
                            </StyledSelect>
                        </FormControl>
                    )}
                    <div>
                        <Typography color="primary" style={{marginTop:'25px'}}><h4>Ratings</h4></Typography>
                        <Slider
                            className={classes.slider}
                            value={ratings}
                            onChange={ratingsHandler}
                            aria-labelledby="range-slider"
                            valueLabelDisplay="auto"
                            min={0}
                            max={5}
                        />
                    </div>
                </div>
            </ThemeProvider>
        </Fragment>
    );
};

export default SideBar;