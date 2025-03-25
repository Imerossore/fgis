import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  "/images/pic-1.jpg",
  "/images/pic-2.jpg",
  "/images/pic-3.jpg",
  "/images/pic-4.jpg",
  "/images/pic-5.jpg",
  "/images/pic-6.jpg",
  "/images/pic-7.jpg",
  "/images/pic-8.jpg",
  "/images/pic-9.jpg",
  "/images/pic-10.jpg",
  "/images/pic-11.jpg",
];

const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState<string>(images[0]);
  const [nextImage, setNextImage] = useState<string>(images[2]);
  useEffect(() => {
    const interval = setInterval(() => {
      setNextImage(images[(images.indexOf(currentImage) + 1) % images.length]);
      setCurrentImage(nextImage);
    }, 3500);

    return () => clearInterval(interval);
  }, [nextImage, currentImage]);

  return (
    <>
      <motion.div
        key={currentImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <Image
          src={currentImage}
          alt="background picture"
          fill
          style={{ objectFit: "fill", objectPosition: "top" }}
          className="rounded-none md:rounded-2xl"
          priority
        />
      </motion.div>

      <motion.div
        key={nextImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <Image
          src={nextImage}
          alt="background picture"
          fill
          style={{ objectFit: "fill", objectPosition: "top" }}
          className="rounded-none md:rounded-2xl"
          priority
        />
      </motion.div>
    </>
  );
};

export default ImageCarousel;
