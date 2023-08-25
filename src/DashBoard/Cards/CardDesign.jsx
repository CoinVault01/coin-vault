import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper";
import "./Cards.css";
import firstCard from "../Cards/CardImage/CoinVault-card-1.png";
import secondCard from "../Cards/CardImage/CoinVault-card-2.png";
import thirdCard from "../Cards/CardImage/CoinVault-card-3.png";
import fourthCard from "../Cards/CardImage/CoinVault-card-4.png";
import fifthCard from "../Cards/CardImage/CoinVault-card-5.png";
import CardModal from "./CardModal";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";

const CardDesign = ({ userId }) => {
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    async function fetchSelectedCard() {
      try {
        const response = await axios.get(
          `https://coinvault.onrender.com/get-selected-card/${userId}`
        );

        if (response.status === 200) {
          setSelectedCard(response.data.selectedCard);
        } if (response.data.selectedCard === null) {
          setSelectedCard(firstCard);
        } else {
          console.error("Failed to fetch selected card");
        }
      } catch (error) {
        console.error("Error fetching selected card:", error);
      }
    }

    fetchSelectedCard();
  }, [userId]);

  const handleImageClick = async (imageSrc) => {
    try {
      setSelectedCard(imageSrc);

      const response = await axios.put(
        `https://coinvault.onrender.com/update-selected-card/${userId}`,
        {
          selectedCard: imageSrc,
        }
      );

      if (response.status === 200) {
        console.log("Selected card updated successfully");
      } else {
        console.error("Failed to update selected card");
      }
    } catch (error) {
      console.error("Error updating selected card:", error);
    }

    setShowCardDetails(false);
  };


  return (
    <section className="flex flex-col justify-center">
      <div
        className={`${
          showCardDetails ? "hidden" : "block"
        } border-[1px] bg-[rgb(32,37,43)] border-[rgb(50,56,63)] w-[90%] max-w-[1050px] mx-auto  my-[20px] rounded-[8px]`}
      >
        <div className="mt-[20px] mb-[40px] w-[80%] max-w-[350px] mx-auto cursor-pointer">
          {selectedCard ? (
            <img
              src={selectedCard}
              alt=""
              className="w-full rounded-[8px]"
            />
          ) : (
            // Only display the loading spinner if selectedCard is not null
            userId && (
              <div className="flex items-center justify-center max-w-[500px] mx-auto">
                <ThreeCircles
                  height={50}
                  width={50}
                  color="rgb(160,210,254)"
                  visible={true}
                  ariaLabel="three-circles-rotating"
                />
              </div>
            )
          )}
        </div>

        <div className="mb-[20px] text-center">
          <p
            className="bg-[rgb(182,220,235)] rounded-full mx-auto w-[120px] py-[5px] text-[black] cursor-pointer"
            onClick={() => {
              setShowCardDetails(true);
            }}
          >
            Show Details
          </p>
        </div>

        <div className="smallDevice:w-[65%] smallerDevice:w-[63%] mx-auto max-w-[350px]  mb-[40px]">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="" onClick={() => handleImageClick(firstCard)}>
                <img
                  src={firstCard}
                  alt=""
                  className="cards-transform w-[330px] rounded-[8px]"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="" onClick={() => handleImageClick(secondCard)}>
                <img
                  src={secondCard}
                  alt=""
                  className="cards-transform w-[330px] rounded-[8px]"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="" onClick={() => handleImageClick(thirdCard)}>
                <img
                  src={thirdCard}
                  alt=""
                  className="cards-transform w-[330px] rounded-[8px]"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="" onClick={() => handleImageClick(fourthCard)}>
                <img
                  src={fourthCard}
                  alt=""
                  className="cards-transform w-[330px] rounded-[8px]"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="" onClick={() => handleImageClick(fifthCard)}>
                <img
                  src={fifthCard}
                  alt=""
                  className="cards-transform w-[330px] rounded-[8px]"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <CardModal
        showCardDetails={showCardDetails}
        setShowCardDetails={setShowCardDetails}
        selectedCard={selectedCard}
      />
    </section>
  );
};

export default CardDesign;
