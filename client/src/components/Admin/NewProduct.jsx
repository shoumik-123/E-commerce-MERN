import React, { Fragment, useState } from 'react';
import MetaData from "../Layout/MetaData.jsx";
import "./newProduct.css";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { newProductCreateAdmin } from "../../APIRequest/AdminApi.js";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const NewProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [stock, setStock] = useState('');
    const [imagesPreview, setImagesPreview] = useState([]);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);


    const categories = [
        { label: 'None', value: '' },
        { label: 'Electronics', value: 'Electronics', subcategories: ['Laptop', 'Mobile', 'Guitar', 'HeadPhone'] },
        { label: 'Dress', value: 'Dress', subcategories: ['Pant', 'T-Shirt', 'Shoe'] },
        { label: 'Vehicles', value: 'Vehicles', subcategories: ['Bike'] },
        { label: 'Others', value: 'Others', subcategories: ['Lighter', 'Glass'] },
    ];

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        setSubcategory(''); // Reset subcategory when category changes
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const productData = {
            name,
            price,
            description,
            category,
            subcategory,
            stock,
            images
        };

        try {
            const newProduct = await newProductCreateAdmin(productData);
            console.log("New Product:", newProduct);
            navigate('admin/dashboard');
            toast.success("Product Create Successfully");
        } catch (error) {
            console.error("Error creating product:", error);
        } finally {
            setLoading(false);
        }
    };

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form className="createProductForm" encType="multipart/form-data" onSubmit={handleSubmit}>
                        <h1>Create Product</h1>

                        <div>
                            <SpellcheckIcon/>
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <AttachMoneyIcon/>
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <DescriptionIcon/>
                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AccountTreeIcon/>
                            <select value={category} onChange={handleCategoryChange}>
                                {categories.map((cate) => (
                                    <option key={cate.value} value={cate.value}>
                                        {cate.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {category && (
                            <div>
                                <AccountTreeIcon/>
                                <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                                    <option value="">Choose Subcategory</option>
                                    {categories.find((cate) => cate.value === category)?.subcategories.map((sub) => (
                                        <option key={sub} value={sub}>
                                            {sub}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div>
                            <StorageIcon/>
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview"/>
                            ))}
                        </div>


                        <Button id="createProductBtn" type="submit" disabled={loading}>
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NewProduct;
