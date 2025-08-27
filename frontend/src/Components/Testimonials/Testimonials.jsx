import React from "react";
import Title from "../Title/Title";
import "./Testimonials.css";
import { testimonials } from "../../assets/assets";
import StarRating from "../StarRating/StarRating";
const Testimonials = () => {
  return (
    <div className="testimonial-container">
      <Title
        title="What Our Guests Say"
        subTitle="Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world."
      />
      <div className="testimonial-wrapper">
        {testimonials.map((testimonial) => (
          <div className="testimonial-card" key={testimonial.id}>
            <div className="testimonial-header">
              <img src={testimonial.image} alt={testimonial.name} />
              <div>
                <p className="testimonial-name">{testimonial.name}</p>
                <p className="testimonial-address">{testimonial.address}</p>
              </div>
            </div>
            <div className="testimonial-stars">
              <StarRating />
            </div>
            <p className="testimonial-review">"{testimonial.review}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
