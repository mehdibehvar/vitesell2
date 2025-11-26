import { cn } from "../../libs/utils";
import { FlameIcon } from "../../assets/icons/svg/icons";
import { useState } from "react";

type ProductType = {
  title: string;
  imgUrl: string;
  price: string;
  currency: string;
  discount?: string;
  finalPrice: string;
  rating?: number;
  in_stock: string;
};

const Rating = ({ rating }: { rating?: number }) => {
  return (
    <div className="flex gap-1 items-center">
      <span className="text-gray-dark text-sm  leading-0">
        {rating}
      </span>
      <i className="i-star text-orange text-xl"></i>
    </div>

  )
}

const Badge = ({ text, color }: { text: string; color: string }) => {
  return (
    <div className={`flex gap-2 justify-center items-center rounded-full px-3 py-2  ${color}`}>
      <span className="text-sm text-white font-bold leading-none">{text}</span>
    </div>
  )
}
const Product = ({ data, footerClassName, thumbClassName }: { data: ProductType, footerClassName?: string, thumbClassName?: string }) => {
  const { title, imgUrl, price, currency, discount, finalPrice, rating, in_stock } = data;
 const [isFavorite, setIsFavorite] = useState(false);
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  const handleShare = () => {
    console.log("share");
  };
  return (
    <div className="flex flex-col gap-4 rounded-lg overflow-hidden relative bg-gray-4">
      <div className="absolute top-0 left-0 right-0 flex justify-between  px-4 cursor-pointer">
        <div className="flex flex-col gap-2 pt-4">
          <i onClick={ handleFavorite } className={cn("i-heart text-xl text-gray hover:text-red cursor-pointer", isFavorite && "text-red")}></i>
          <i onClick={handleShare} className="i-share-fat-r text-xl text-gray hover:text-info cursor-pointer"></i>
        </div>
        <div className="flex gap-1">
          <div
            className="flex h-11 w-7 pt-2 items-start justify-center bg-primary  text-white"
            style={{ clipPath: "polygon(100% 99%, 50% 81%, 0 100%, 0 0, 51% 0, 100% 0)" }}
          >
            <FlameIcon color="white" w={12} h={20} />
          </div>
          <div className="flex flex-col gap-[5px] pt-4">
            <div className="bg-orange rounded-full w-2 h-2"></div>
            <div className="bg-info rounded-full w-2 h-2"></div>
            <div className="bg-success rounded-full w-2 h-2"></div>
          </div>
        </div>
      </div>
      <div className={cn(thumbClassName, "thumbnail px-12 py-3")}>
        <img className="object-cover w-full h-auto" src={imgUrl} alt="product" />
      </div>
      <div className={cn(footerClassName, "bg-white p-4 flex flex-col gap-4")}>
        {/* ///title section */}
        <h2 className="text-black font-semibold text-md text-lg">
          {title}
        </h2>
        {/* rating section */}
        <div className="flex gap-2 justify-between items-center">
          <span className="text-red text-xs">{in_stock}</span>
          {rating && <Rating rating={rating} />}
        </div>
        {/* ///pricing section */}
        <div className="flex flex-col gap-2 ">
          <div className="flex gap-2 justify-end">
            <span className="text-black font-semibold text-lg">
              {price}
            </span>
            <span className="text-gray text-sm">
              {currency}
            </span>
          </div>
          <div className="flex justify-between">
            {discount && <Badge text={discount} color="bg-primary" />}
            <span className="text-gray-4 text-sm font-medium line-through decoration-gray-4">
              {finalPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product;