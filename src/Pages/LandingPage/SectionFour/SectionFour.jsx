import React, { useRef, useState } from 'react'
import "../SectionFour/SectionFour.css";
import contactImage from "../SectionFour/SectionFour-Image/Contact-Image.png";
import emailjs from "@emailjs/browser";

const SectionFour = () => {
    const form = useRef();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleNameChange = (event) => {
      setName(event.target.value);
    };

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };

    const handleMessageChange = (event) => {
      setMessage(event.target.value);
    };

    const sendEmail = (e) => {
      e.preventDefault();
      emailjs
        .sendForm(
          "service_xs5fofa",
          "contact_form",
          form.current,
          "FwVsFfgc5riDXhuKj"
        )
        .then(
          (result) => {
            console.log(result.text);
            setName("");
            setEmail("");
            setMessage("");
          },
          (error) => {
            console.log(error.text);
          }
        );
    };


  return (
    <section className="pb-[40px]">
      <div className="flex justify-center">
        <div className="relative py-[15px] inline-block">
          <h1 className="SectionThree-header uppercase font-[600]">Contact</h1>
        </div>
      </div>

      <div className="pb-[40px]">
        <h1 className="text-center text-[40px] generalDevice:text-[30px] font-[600]">
          Contact <span className="text-[rgb(0,180,224)]">CoinVault</span>
        </h1>
      </div>

      <div className="pb-[40px] flex justify-center generalDevice:flex-col gap-[60px] largeDevice:gap-[100px]">
        <div className="flex flex-col items-center gap-[15px]">
          <div className="rounded-full border-[1px] border-[rgba(255,255,255,0.2)] inline-block px-[18px] py-[15px] hover:border-dashed hover:border-[rgb(0,180,224)] transition-all duration-500 ease-in-out">
            <div className="rounded-full border-[4px] border-[rgb(251,149,1)] px-[20px] py-[20px]">
              <i className="fa-solid fa-envelope text-[rgb(251,149,1)] text-[30px]"></i>
            </div>
          </div>

          <div>
            <p className="font-[600] text-[20px] text-center">
              coinvault0210@gmail.com
            </p>
            <p className="font-[600] text-[20px] text-center">
              coinvaultsupport@gmail.com
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-[15px]">
          <div className="rounded-full border-[1px] border-[rgba(255,255,255,0.2)] inline-block px-[18px] py-[15px] hover:border-dashed hover:border-[rgb(0,180,224)] transition-all duration-500 ease-in-out">
            <div className="rounded-full border-[4px] border-[rgb(255,69,129)] px-[20px] py-[20px]">
              <i className="fa-solid fa-phone-flip text-[rgb(255,69,129)] text-[30px]"></i>
            </div>
          </div>

          <div>
            <p className="font-[600] text-[20px] text-center">
              +234 81001 95707
            </p>
            <p className="font-[600] text-[20px] text-center">
              +234 81064 69237
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-[15px]">
          <div className="rounded-full border-[1px] border-[rgba(255,255,255,0.2)] inline-block px-[18px] py-[15px] hover:border-dashed hover:border-[rgb(0,180,224)] transition-all duration-500 ease-in-out">
            <div className="rounded-full border-[4px] border-[rgb(0,180,224)] px-[24px] py-[20px]">
              <i className="fa-solid fa-location-dot text-[rgb(0,180,224)] text-[30px]"></i>
            </div>
          </div>

          <div>
            <p className="font-[600] text-[18px] text-center">
              Central Buisness District, Abuja
            </p>
            <p className="font-[600] text-[20px] text-center">Nigeria</p>
          </div>
        </div>
      </div>

      <form
        action=""
        className="h-[650px] w-[90%] generalDevice:max-w-[500px] mx-auto"
        style={{
          background: `url(${contactImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        ref={form}
        onSubmit={sendEmail}
      >
        <div className="py-[40px] largeDevice:flex max-w-[800px] mx-auto">
          <div className="w-[90%] mx-auto my-[20px] largeDevice:w-[45%]">
            <input
              type="text"
              name="user_name"
              id=""
              placeholder="Enter Your Name"
              className="form-input bg-[rgb(11,29,51)] border-[rgba(255,255,255,0.2)] border-[1px] h-[50px] w-[100%] rounded-t-[5px] rounded-b-[5px] text-[18px] font-[600] text-[white] pl-[20px] capitalize"
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <div className="w-[90%] mx-auto my-[20px] largeDevice:w-[45%]">
            <input
              type="email"
              name="user_email"
              value={email}
              onChange={handleEmailChange}
              id=""
              placeholder="Enter Your EMAIL"
              className="form-input bg-[rgb(11,29,51)] border-[rgba(255,255,255,0.2)] border-[1px] h-[50px] w-[100%] rounded-t-[5px] rounded-b-[5px] text-[18px] font-[600] text-[white] pl-[20px]"
              required
            />
          </div>
        </div>

        <textarea
          name="message"
          id=""
          cols={30}
          rows={10}
          className="form-input w-[90%] max-w-[780px] mx-auto mb-[40px] block bg-[rgb(11,29,51)] border-[rgba(255,255,255,0.2)] border-[1px] rounded-t-[5px] rounded-b-[5px] text-[18px] font-[600] text-[white] pl-[20px] pt-[10px]"
          placeholder="Enter Your Message"
          value={message}
          onChange={handleMessageChange}
        ></textarea>

        <button
          className="hero-btn rounded-full border-[2px] border-[rgb(0,180,224)] py-[10px] px-[20px] mx-auto w-[200px] text-[20px] capitalize block bg-[rgb(11,29,51)]"
          type="submit"
          value="send"
        >
          send message
        </button>
      </form>
    </section>
  );
}

export default SectionFour