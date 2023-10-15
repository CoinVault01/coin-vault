import React, { useEffect, useState } from "react";
import axios from "axios";
import "../DashBoardHome/HomeComponent.css";
import { LongCard } from "../../Skeleton/Skeleton";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { Autoplay, FreeMode } from "swiper";

const HomeComponent = () => {
  const [userData, setUserData] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [newsData2, setNewsData2] = useState([]);
  const [browserLoading, setBrowserLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from the backend using the JWT token
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          // Redirect to login if token not found
          return;
        }
        // Make the API request to fetch user data
        const response = await axios.get(
          "https://coinvault-backend.vercel.app/v1/auth/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
        console.log(response.data);
        setBrowserLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setBrowserLoading(false);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    // Get the current hour
    const currentHour = new Date().getHours();

    // Set the appropriate greeting based on the time of day
    if (currentHour >= 0 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
        );

        // Shuffle the data array randomly
        const shuffledData = response.data.Data.sort(() => Math.random() - 0.5);

        // Get only the first 5 news items
        const firstFiveNews = shuffledData.slice(0, 5);
        setNewsData(firstFiveNews);
        setBrowserLoading(true);
      } catch (error) {
        console.error("Error fetching news:", error);
        setBrowserLoading(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
        );

        // Shuffle the data array randomly
        const shuffledData = response.data.Data.sort(() => Math.random() - 0.5);

        // Get only the first 5 news items
        const firstFiveNews = shuffledData.slice(10, 15);
        setNewsData2(firstFiveNews);
      } catch (error) {
        console.error("Error fetching news:", error);
        setBrowserLoading(true);
      }
    };

    fetchData();
  }, []);

  // If the browser is still loading, show only the SmallCard component
  if (browserLoading) {
    return (
      <section className="w-[90%] mx-auto">
        <LongCard />
      </section>
    );
  }

  return (
    <section className="w-[90%] mx-auto">
      <div>
        {userData && (
          <div>
            <h1 className="roboto capitalize text-[20px] largeDevice:text-[25px] mb-[5px] smallerDevice:text-[15px]">
              {greeting}, {userData.firstName} {userData.lastName} !
            </h1>

            <p className="text-[rgb(167,177,188)] font-[poppins] generalDevice:mb-[40px] mb-[80px]">
              Checkout out what's trending on the NEWS
            </p>
          </div>
        )}

        <div className="pb-[40px]">
          <div className="mb-[100px]">
            <h1 className="capitalize roboto text-[20px] largeDevice:text-[23px]">
              On the NEWS today
            </h1>
            <div className="border-[rgb(42,48,55)] border-[1px] py-[20px]  rounded-[8px] bg-[rgb(32,37,43)] mt-[20px] mb-[20px] max-w-[1000px]">
              <Swiper
                breakpoints={{
                  576: {
                    width: 576,
                    slidesPerView: 1,
                  },
                  768: {
                    width: 768,
                    slidesPerView: 2,
                  },
                  1001: {
                    width: 1001,
                    slidesPerView: 3,
                  },
                }}
                spaceBetween={0}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, FreeMode]}
                className="mySwiper"
              >
                {newsData.map((newsItem) => (
                  <SwiperSlide key={newsItem.id}>
                    <a
                      href={newsItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-[90%] mx-auto max-h-[500px] bg-[rgb(39,44,50)] rounded-[8px]"
                    >
                      <img
                        src={newsItem.imageurl}
                        alt={newsItem.title}
                        className="w-[100%] block h-[300px] rounded-t-[8px]"
                      />
                      <h2 className="mt-[20px] mb-[20px] ellipsis-title px-[20px] font-[600]">
                        {newsItem.title}
                      </h2>
                      <p className="ellipsis-text mb-[20px] text-[rgb(167,177,188)] px-[20px]">
                        {newsItem.body}
                      </p>
                      {newsItem.body.length > 3 * 120 && ( // Assuming 120 characters per line
                        <span
                          className="read-more"
                          onClick={() => handleReadMore(index)}
                        ></span>
                      )}
                      <a
                        href={newsItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-[20px] pb-[20px] block text-[rgb(0,180,224)]"
                      >
                        Read full article
                      </a>
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div>
            <h1 className="capitalize roboto text-[20px] largeDevice:text-[23px]">
              Also In The News
            </h1>
            <div className="border-[rgb(42,48,55)] border-[1px] py-[20px]  rounded-[8px] bg-[rgb(32,37,43)] mt-[20px] mb-[20px] max-w-[1000px]">
              <Swiper
                breakpoints={{
                  576: {
                    width: 576,
                    slidesPerView: 1,
                  },
                  768: {
                    width: 768,
                    slidesPerView: 2,
                  },
                  1001: {
                    width: 1001,
                    slidesPerView: 3,
                  },
                }}
                spaceBetween={0}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, FreeMode]}
                className="mySwiper"
              >
                {newsData2.map((newsItem) => (
                  <SwiperSlide key={newsItem.id}>
                    <a
                      href={newsItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-[90%] mx-auto max-h-[500px] bg-[rgb(39,44,50)] rounded-[8px]"
                    >
                      <img
                        src={newsItem.imageurl}
                        alt={newsItem.title}
                        className="w-[100%] block h-[300px] rounded-t-[8px]"
                      />
                      <h2 className="mt-[20px] mb-[20px] ellipsis-title px-[20px] font-[600]">
                        {newsItem.title}
                      </h2>
                      <p className="ellipsis-text mb-[20px] text-[rgb(167,177,188)] px-[20px]">
                        {newsItem.body}
                      </p>
                      {newsItem.body.length > 3 * 120 && ( // Assuming 120 characters per line
                        <span
                          className="read-more"
                          onClick={() => handleReadMore(index)}
                        ></span>
                      )}
                      <a
                        href={newsItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-[20px] pb-[20px] block text-[rgb(0,180,224)]"
                      >
                        Read full article
                      </a>
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeComponent;
