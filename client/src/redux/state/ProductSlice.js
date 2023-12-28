// // productSlice.js
// import { createSlice } from '@reduxjs/toolkit';
//
// const initialState = {
//     products: [],
//     productsCount: 0,
//     resultPerPage: 0,
//     filteredProductsCount: 0,
//     loading: false,
//     error: null,
//     success: false,
//     isDeleted: false,
//     isUpdated: false,
//     product: {},
//     reviews: [],
// };
//
// const productSlice = createSlice({
//     name: 'product',
//     initialState,
//     reducers: {
//         allProductRequest: (state) => {
//             state.loading = true;
//             state.products = [];
//         },
//         allProductSuccess: (state, action) => {
//             state.loading = false;
//             state.products = action.payload.products;
//             state.productsCount = action.payload.productsCount;
//             state.resultPerPage = action.payload.resultPerPage;
//             state.filteredProductsCount = action.payload.filteredProductsCount;
//         },
//         adminProductSuccess: (state, action) => {
//             state.loading = false;
//             state.products = action.payload;
//         },
//         allProductFail: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         clearErrors: (state) => {
//             state.error = null;
//         },
//         newProductRequest: (state) => {
//             state.loading = true;
//         },
//         newProductSuccess: (state, action) => {
//             state.loading = false;
//             state.success = action.payload.success;
//             state.product = action.payload.product;
//         },
//         newProductFail: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         newProductReset: (state) => {
//             state.success = false;
//         },
//         productRequest: (state) => {
//             state.loading = true;
//         },
//         productSuccess: (state, action) => {
//             state.loading = false;
//             state.isDeleted = action.payload;
//         },
//         updateProductSuccess: (state, action) => {
//             state.loading = false;
//             state.isUpdated = action.payload;
//         },
//         productFail: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         deleteProductReset: (state) => {
//             state.isDeleted = false;
//         },
//         updateProductReset: (state) => {
//             state.isUpdated = false;
//         },
//         productDetailsRequest: (state) => {
//             state.loading = true;
//         },
//         productDetailsSuccess: (state, action) => {
//             state.loading = false;
//             state.product = action.payload;
//         },
//         productDetailsFail: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         newReviewRequest: (state) => {
//             state.loading = true;
//         },
//         newReviewSuccess: (state, action) => {
//             state.loading = false;
//             state.success = action.payload;
//         },
//         newReviewFail: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         newReviewReset: (state) => {
//             state.success = false;
//         },
//         productReviewsRequest: (state) => {
//             state.loading = true;
//         },
//         productReviewsSuccess: (state, action) => {
//             state.loading = false;
//             state.reviews = action.payload;
//         },
//         productReviewsFail: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         reviewRequest: (state) => {
//             state.loading = true;
//         },
//         reviewSuccess: (state, action) => {
//             state.loading = false;
//             state.isDeleted = action.payload;
//         },
//         reviewFail: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         reviewReset: (state) => {
//             state.isDeleted = false;
//         },
//     },
// });
//
// export const {
//     allProductRequest,
//     allProductSuccess,
//     adminProductSuccess,
//     allProductFail,
//     clearErrors,
//     newProductRequest,
//     newProductSuccess,
//     newProductFail,
//     newProductReset,
//     productRequest,
//     productSuccess,
//     updateProductSuccess,
//     productFail,
//     deleteProductReset,
//     updateProductReset,
//     productDetailsRequest,
//     productDetailsSuccess,
//     productDetailsFail,
//     newReviewRequest,
//     newReviewSuccess,
//     newReviewFail,
//     newReviewReset,
//     productReviewsRequest,
//     productReviewsSuccess,
//     productReviewsFail,
//     reviewRequest,
//     reviewSuccess,
//     reviewFail,
//     reviewReset,
// } = productSlice.actions;
//
// export default productSlice.reducer;