import React from 'react';
import ReactStars from "react-rating-stars-component";
import profilePng from "../../assets/images/profile.png"

const ReviewCard = ({review}) => {

    const option = {
        edit: false,
        color: "rgba(255,255,255,0.94)",
        activeColor: "yellow",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review?.ratings ?? 0,
        inHalf: true,
    };

    return (
        <div className="reviewCard">
            <img src={profilePng} alt="User"/>
            <p>{review?.name}</p>
            <ReactStars {...option} />
            <span className="reviewCardComment">{review?.comment}</span>
        </div>
    );
};

export default ReviewCard;