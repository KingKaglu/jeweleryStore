import React from 'react';

const JewelryCard = ({
  id,
  image,
  name,
  price,
  description,
  onBuy = () => {},
  onReview = () => {},
  className = '',
  imageClassName = '',
  contentClassName = '',
  nameClassName = '',
  priceClassName = '',
  buyButtonClassName = '',
  reviewButtonClassName = "ml-4 mt-4 inline-block bg-[#b48b6c] text-white font-semibold rounded-3xl py-2 px-6 hover:bg-[#a17552] transition-colors duration-300",
}) => {
  return (
    <div className={className}>
      <img src={image} alt={name} className={imageClassName} />
      <div className={contentClassName}>
        <h2 className={nameClassName}>{name}</h2>
        <p className={priceClassName}>${price.toFixed(2)}</p>

        <button
          onClick={onBuy}
          className={buyButtonClassName}
          aria-label={`Buy ${name}`}
        >
          Buy Now
        </button>

        {/* Review Button */}
        <button
          onClick={onReview}
          className={reviewButtonClassName}
          aria-label={`Review ${name}`}
        >
          Review
        </button>
      </div>
    </div>
  );
};

export default JewelryCard;
