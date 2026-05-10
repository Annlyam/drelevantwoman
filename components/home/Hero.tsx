"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import isMobile from "is-mobile";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const heroSlides = [
  {
    id: 1,
    image: "/assets/images/hero/relevant-woman-hero-2.jpg",
    title: "Empowering the Next Generation",
    subtitle: "Building Tomorrow's Leaders",
    gradient: "from-[#3a225c] via-[#914177] to-[#fc98ac]",
  },
  {
    id: 2,
    image: "/assets/images/hero/relevant-woman-hero-1.jpg",
    title: "Mentorship That Transforms",
    subtitle: "Connect with Inspiring Women",
    gradient: "from-[#914177] via-[#fc98ac] to-[#f68565]",
  },
  {
    id: 3,
    image: "/assets/images/hero/relev.jpg",
    title: "Leadership Development",
    subtitle: "Unlock Your Potential",
    gradient: "from-[#fc98ac] via-[#f68565] to-[#ffbc5c]",
  },
  {
    id: 4,
    image: "/assets/images/hero/relev.jpg",
    title: "Community Building",
    subtitle: "Together We Rise",
    gradient: "from-[#f68565] via-[#ffbc5c] to-[#f9f871]",
  },
  {
    id: 5,
    image: "/assets/images/hero/relev.jpg",
    title: "Creating Impact",
    subtitle: "Influence Culture & Society",
    gradient: "from-[#ffbc5c] via-[#f9f871] to-[#3a225c]",
  },
];

export default function Hero() {
  // Use is-mobile package to detect mobile devices
  const [mobile, setMobile] = useState<boolean | null>(null);
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    // Detect mobile only on client side
    if (typeof window !== "undefined") {
      const isMobileDevice = isMobile();
      setMobile(isMobileDevice);

      if (isMobileDevice) {
        // Delay showing hero for 400ms on mobile
        const timer = setTimeout(() => {
          setShowHero(true);
        }, 400);

        return () => clearTimeout(timer);
      } else {
        // Show immediately on desktop
        setShowHero(true);
      }
    }
  }, []);

  // Don't render anything until we know if it's mobile or desktop
  if (mobile === null) {
    return (
      <section className="relative min-h-[50vh] overflow-hidden bg-[#3a225c]">
        <div className="absolute inset-0 z-0 bg-[#3a225c]" />
      </section>
    );
  }

  // Mobile Version
  if (mobile) {
    return (
      <section className="relative min-h-[50vh] overflow-hidden bg-[#3a225c]">
        {showHero ? (
          <>
            {/* Cinematic Carousel */}
            <div className="absolute inset-0 z-0">
              <Swiper
                effect={undefined}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={true}
                speed={300}
                modules={[Autoplay, Pagination]}
                className="hero-swiper"
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                spaceBetween={0}
              >
                {heroSlides.map((slide) => (
                  <SwiperSlide key={slide.id} className="!w-full">
                    <div className="relative min-h-[70vh] w-full overflow-hidden shadow-2xl">
                      {/* Image Container */}
                      <div className="absolute inset-0">
                        {/* Placeholder with Gradient */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
                        >
                          {/* Subtle texture pattern */}
                          <div className="absolute inset-0 opacity-5">
                            <div
                              className="w-full h-full"
                              style={{
                                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)`,
                              }}
                            />
                          </div>
                        </div>
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover"
                          priority={slide.id === 1}
                          sizes="100vw"
                        />
                      </div>

                      {/* Dark Overlay for Text Readability - Stronger on mobile */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 z-10" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Main Content Overlay - Positioned over the carousel */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6">
              <div className="pt-10 md:pt-0 max-w-7xl mx-auto text-center w-full">
                {/* Headline */}
                <motion.h1
                  className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight drop-shadow-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <span className="text-white">
                    Empowering the Next Generation of{" "}
                  </span>
                  <span className="text-[#f9f871]">Influential Women</span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                  className="text-sm sm:text-base text-white max-w-4xl mx-auto leading-relaxed drop-shadow-lg px-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  Comprehensive network empowering young women through
                  mentorship, leadership development, and community building.
                </motion.p>
              </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-30"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown size={20} className="text-[#f9f871]" />
              </motion.div>
            </motion.div>
          </>
        ) : (
          <div className="absolute inset-0 z-0 bg-[#3a225c]" />
        )}
      </section>
    );
  }

  // Desktop Version
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#3a225c]">
      {/* Cinematic Carousel */}
      <div className="absolute inset-0 z-0">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 25,
            stretch: 0,
            depth: 200,
            modifier: 2.5,
            slideShadows: true,
          }}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          speed={1000}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          className="hero-swiper"
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
        >
          {heroSlides.map((slide) => (
            <SwiperSlide
              key={slide.id}
              className="!w-[85vw] md:!w-[70vw] lg:!w-[60vw] xl:!w-[55vw] 2xl:!w-[50vw]"
            >
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
                {/* Image Container - 16:9 Aspect Ratio (1920x1080px) */}
                <div className="absolute inset-0">
                  {/* Placeholder with Gradient - Replace with actual Image component when images are ready */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
                  >
                    {/* Subtle texture pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)`,
                        }}
                      />
                    </div>
                  </div>
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={slide.id === 1}
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 70vw, (max-width: 1280px) 60vw, 55vw"
                  />
                </div>

                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 z-10" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Decorative Elements */}
          <motion.div
            className="absolute left-8 md:left-16 top-1/3 z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="w-5 h-5 border-2 border-[#f9f871] rotate-45" />
          </motion.div>

          <motion.div
            className="absolute right-8 md:right-16 top-16 md:top-20 z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#914177] via-[#3a225c] to-[#914177] shadow-2xl" />
              <div className="absolute inset-0 rounded-full border border-white/5" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 md:px-[8%] leading-tight drop-shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-white">
              Empowering the Next Generation of{" "}
            </span>
            <span className="text-[#f9f871]">Influential Women</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Comprehensive network empowering young women through mentorship,
            leadership development, and community building.
          </motion.p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-[90px] left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown size={32} className="text-[#f9f871]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
