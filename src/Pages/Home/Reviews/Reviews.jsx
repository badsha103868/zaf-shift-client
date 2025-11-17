import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewsPromise }) => {
  const reviewsData = use(reviewsPromise);
  console.log(reviewsData);
  return (
    <div className="my-24 ">
      <div className=" max-w-3xl mx-auto mb-24">
        <h3 className="text-3xl text-center font-bold my-5">Reviews</h3>
        <p className="my-5 text-gray-500 text-center">
          “Our customers mean everything to us! Take a moment to see how they feel about our delivery speed, packaging, and overall service. Your honest reviews help us grow and serve you even better.”
        </p>
      </div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
         spaceBetween={30}
        coverflowEffect={{
          rotate: 30,
          stretch: '50%',
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {
          reviewsData.map(reviewData =><SwiperSlide key={reviewData.id}>
          <ReviewCard reviewData ={reviewData }></ReviewCard>
        </SwiperSlide>)
        }
      </Swiper>
    </div>
  );
};

export default Reviews;
