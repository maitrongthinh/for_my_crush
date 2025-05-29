// src/sections/MessageSection.jsx
import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MessageSection.css';

const MessageSection = ({ isLocomotiveScrollReady }) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    console.log("MessageSection useLayoutEffect: isLocomotiveScrollReady:", isLocomotiveScrollReady);
    console.log("MessageSection Refs Current State:", {
      section: sectionRef.current,
      heading: headingRef.current,
      paragraph: paragraphRef.current,
      image: imageRef.current,
      button: buttonRef.current
    });

    if (!sectionRef.current || !headingRef.current || !paragraphRef.current || !imageRef.current || !buttonRef.current) {
      console.warn("MessageSection: Một số refs chưa sẵn sàng. Tạm dừng useLayoutEffect.");
      return;
    }

    if (!isLocomotiveScrollReady) {
      console.warn("MessageSection: Locomotive Scroll chưa sẵn sàng. Đợi để thiết lập animation.");
      return;
    }

    console.log("MessageSection: Tất cả refs và Locomotive Scroll đã sẵn sàng. Bắt đầu thiết lập GSAP.");

    let triggers = ScrollTrigger.getAll();
    triggers.forEach(trigger => {
        if (trigger.trigger === sectionRef.current || trigger.trigger === headingRef.current ||
            trigger.trigger === paragraphRef.current || trigger.trigger === imageRef.current ||
            trigger.trigger === buttonRef.current) {
            trigger.kill();
        }
    });
    console.log("MessageSection: Đã hủy các ScrollTrigger cũ.");


    // --- Animation cho Tiêu đề (h2) ---
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 100, rotateX: 90 },
      {
        opacity: 1, y: 0, rotateX: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          scroller: ".main-scroll-container",
          start: "top 80%",
          end: "top 30%",
          // markers: true,
          toggleActions: "play none none reverse",
        }
      }
    );
    console.log("MessageSection: Animation tiêu đề đã được thiết lập.");


    // --- Animation cho Đoạn văn (p) ---
    gsap.fromTo(paragraphRef.current,
      { opacity: 0, y: 50, scale: 0.8 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: paragraphRef.current,
          scroller: ".main-scroll-container",
          start: "top 85%",
          end: "top 35%",
          // markers: true,
          toggleActions: "play none none reverse",
        }
      }
    );
    console.log("MessageSection: Animation đoạn văn đã được thiết lập.");

    // --- Animation cho Hình ảnh ---
    gsap.fromTo(imageRef.current,
      { opacity: 0, scale: 0.7, x: -100, rotate: -30 },
      {
        opacity: 1, scale: 1, x: 0, rotate: 0,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          scroller: ".main-scroll-container",
          start: "top 90%",
          end: "top 40%",
          // markers: true,
          toggleActions: "play none none reverse",
        }
      }
    );
    console.log("MessageSection: Animation hình ảnh đã được thiết lập.");

    // --- Animation cho Nút "Next" ---
    gsap.fromTo(buttonRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: buttonRef.current,
          scroller: ".main-scroll-container",
          start: "top 95%",
          end: "top 50%",
          // markers: true,
          toggleActions: "play none none reverse",
        }
      }
    );
    console.log("MessageSection: Animation nút Next đã được thiết lập.");

    // Parallax tổng thể cho cả section
    gsap.to(sectionRef.current, {
      y: () => (window.innerHeight * 0.1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        scroller: ".main-scroll-container",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        // markers: true,
      }
    });
    console.log("MessageSection: Parallax tổng thể cho section đã được thiết lập.");

    return () => {
      console.log("MessageSection useLayoutEffect cleanup đang chạy.");
      let killedTriggers = ScrollTrigger.getAll();
      killedTriggers.forEach(trigger => {
        if (trigger.trigger === sectionRef.current || trigger.trigger === headingRef.current ||
            trigger.trigger === paragraphRef.current || trigger.trigger === imageRef.current ||
            trigger.trigger === buttonRef.current) {
            trigger.kill();
        }
      });
      console.log("MessageSection: Đã hủy các ScrollTrigger trong cleanup.");
    };
  }, [isLocomotiveScrollReady]);

  const handleNextClick = () => {
    // THAY THẾ BẰNG URL THỰC TẾ CỦA BẠN
    window.open('https://maitrongthinh.github.io/for_her/', '_blank');
  };

  return (
    <section id="message-section" className="section message-section" data-scroll-section ref={sectionRef}>
      <h2 ref={headingRef} className="message-heading">Những đêm đèn sách mệt mỏi...</h2>
      <p ref={paragraphRef} className="message-paragraph">
        Mỗi trang sách lật giở, mỗi bài tập khó khăn
        <br />
        đều là những bước chân chị vững vàng
        trong kì thi lần này
        em cũng chẳng biết nói gì nhiều
        nhưng em muốn nói với chị rằng hãy cố gắng thật nhiều lên nhé 
        Chị là người em ngưỡng mộ nhất và cũng là người em thương nhất,hãy cứ cố gắng hết sức mình nhé,em biết năm nay cũng là năm cuối em đc nhìn thấy chị rồi em mong chị sẽ có một tương lai tươi sáng và thành công.Tên chị đẹp lắm nhất định phải có trong danh sách trúng tuyển nhé chị !!!
      </p>
      <div ref={imageRef} className="message-image">
        <img src="https://via.placeholder.com/800x500?text=Universe+Scene" alt="Universe illustration" />
      </div>
      <button ref={buttonRef} className="next-button" onClick={handleNextClick}>
        Next
      </button>
    </section>
  );
};

export default MessageSection;