// import React, { useState, useEffect } from "react";
// import "../../Navigation/HomeCarosel/Carosel.css"; // Assuming you have a CSS file for styling
// // import img1 from "../../../../img/11-fotor-20250726111648.jpg"
// // import img2 from "../../../../img/14_bdfd04e7-9a29-4db9-ac47-52ae2c59f92f.jpg"
// // import img3 from "../../../../img/16_83edfb09-067b-449d-9743-a51557b91cf9.jpg"
// // import img4 from "../../../../img/17_fe84456a-5721-4190-9c3e-29cc79dd6e99.jpg"

// // const images = [
// //   img1,
// //   img2,
// //   img3,
// //   img4,
// // ];

// const Carousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 4000); // Change slide every 4 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="carousel-container">
//       <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="carousel-image" />
//       <div className="carousel-dots">
//         {images.map((_, index) => (
//           <span
//             key={index}
//             className={`dot${index === currentIndex ? " active" : ""}`}
//             onClick={() => setCurrentIndex(index)}
//           ></span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;