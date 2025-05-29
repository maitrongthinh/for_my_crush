// src/components/Layout.jsx
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'locomotive-scroll/dist/locomotive-scroll.css';

gsap.registerPlugin(ScrollTrigger);

const Layout = ({ children }) => {
  const scrollRef = useRef(null);
  const lscrollInstance = useRef(null);
  const [isLocomotiveScrollReady, setIsLocomotiveScrollReady] = useState(false);

  // useLayoutEffect để đảm bảo DOM đã render trước khi khởi tạo LS và ST
  useLayoutEffect(() => {
    if (!scrollRef.current) {
      console.warn("Layout useLayoutEffect: scrollRef.current is null. Cannot initialize Locomotive Scroll yet.");
      return;
    }

    if (lscrollInstance.current === null) {
      console.log("Layout useLayoutEffect: Attempting to initialize Locomotive Scroll...");
      try {
        lscrollInstance.current = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          multiplier: 1.5,
          // debug: true, // Bật debug để xem log của Locomotive Scroll nếu cần
        });
        console.log("Locomotive Scroll initialized successfully:", lscrollInstance.current);

        window.locomotiveScroll = lscrollInstance.current;

        ScrollTrigger.scrollerProxy(scrollRef.current, {
          scrollTop(value) {
            if (lscrollInstance.current) {
              return arguments.length ? lscrollInstance.current.scrollTo(value, { duration: 0, disableLerp: true }) : lscrollInstance.current.scroll.instance.scroll.y;
            }
            return value;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
        });
        console.log(`Layout: ScrollTrigger scrollerProxy set.`);

        lscrollInstance.current.on('scroll', ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", () => {
          console.log("Layout: ScrollTrigger refresh event, updating Locomotive Scroll.");
          if (lscrollInstance.current) {
            lscrollInstance.current.update();
          }
        });

        setTimeout(() => {
          ScrollTrigger.refresh(true);
          console.log("Layout: ScrollTrigger refreshed (initial).");
          setIsLocomotiveScrollReady(true);
          console.log("Layout: isLocomotiveScrollReady set to TRUE.");
        }, 0);

      } catch (error) {
        console.error("Error initializing Locomotive Scroll:", error);
        setIsLocomotiveScrollReady(false);
      }
    } else {
      console.log("Layout: Locomotive Scroll instance already exists, just updating and refreshing ScrollTrigger.");
      lscrollInstance.current.update();
      ScrollTrigger.refresh(true);
      setIsLocomotiveScrollReady(true);
    }

    return () => {
      console.log("Layout Cleanup: Running...");
      setIsLocomotiveScrollReady(false);
      ScrollTrigger.removeEventListener("refresh", () => lscrollInstance.current && lscrollInstance.current.update());
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (lscrollInstance.current) {
        lscrollInstance.current.destroy();
        lscrollInstance.current = null;
        console.log("Locomotive Scroll destroyed.");
      }
      delete window.locomotiveScroll;
      console.log("Layout Cleanup: Completed.");
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (lscrollInstance.current) {
        console.log("Window resized, updating Locomotive Scroll and refreshing ScrollTrigger.");
        lscrollInstance.current.update();
        ScrollTrigger.refresh(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="main-scroll-container" data-scroll-container ref={scrollRef}>
      {React.Children.map(children, child =>
        React.isValidElement(child) ? React.cloneElement(child, { isLocomotiveScrollReady: isLocomotiveScrollReady }) : child
      )}
    </div>
  );
};

export default Layout;