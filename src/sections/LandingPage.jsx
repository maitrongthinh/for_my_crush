// src/sections/LandingPage.jsx
import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti'; // Import thư viện pháo hoa
import './LandingPage.css';

const LandingPage = ({ isLocomotiveScrollReady }) => {
  const nameRef = useRef(null);
  const introRef = useRef(null);
  const buttonRef = useRef(null);
  const avatarRef = useRef(null);
  const [nameReady, setNameReady] = useState(false);
  const [introReady, setIntroReady] = useState(false);

  const tl = useRef(null);
  const breathTl = useRef(null);

  useLayoutEffect(() => {
    console.log("LandingPage useLayoutEffect: isLocomotiveScrollReady:", isLocomotiveScrollReady);
    console.log("LandingPage Refs Current State:", {
      name: nameRef.current,
      intro: introRef.current,
      button: buttonRef.current,
      avatar: avatarRef.current
    });

    if (!nameRef.current || !introRef.current || !buttonRef.current || !avatarRef.current) {
      console.warn("LandingPage: Một số refs chưa sẵn sàng. Tạm dừng useLayoutEffect.");
      return;
    }

    // --- Xử lý chữ "Chị Trang" thành từng span ---
    if (!nameReady) {
      const nameElement = nameRef.current;
      const nameText = "Chị Trang";
      nameElement.innerHTML = nameText.split('').map(char =>
        `<span class="hero-name-char">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');
      setNameReady(true);
      console.log(`LandingPage: Chữ 'Chị Trang' đã được chia thành span.`);
    }
    const nameChars = nameRef.current.querySelectorAll('.hero-name-char');
    if (nameChars.length === 0) {
        console.error("LandingPage: Không tìm thấy các ký tự (span) của 'Chị Trang'. Có thể có lỗi trong việc chia innerHTML.");
        return;
    }

    // --- Xử lý đoạn giới thiệu thành từng dòng ---
    if (!introReady) {
      const introElement = introRef.current;
      const introContent = `Em biết chị đã rất vất vả rồi,\nLuôn nỗ lực hết mình vì ước mơ tri thức.\nĐây là món quà nhỏ, như một khởi đầu mới cho chị,em hơi nhạt nên cx không biết nói gì nhiều ở đây e có đôi dòng muốn gửi đến chị mong sẽ làm chị có thêm đọng lực để đi thi nhé .`;
      const introLines = introContent.split('\n');
      introElement.innerHTML = introLines.map(line => `<p class="intro-line">${line}</p>`).join('');
      setIntroReady(true);
      console.log(`LandingPage: Đoạn giới thiệu đã được chia thành dòng.`);
    }
    const introParagraphs = introRef.current.querySelectorAll('.intro-line');
    if (introParagraphs.length === 0) {
        console.error("LandingPage: Không tìm thấy các dòng (p) của đoạn giới thiệu. Có thể có lỗi trong việc chia innerHTML.");
    }

    if (!isLocomotiveScrollReady) {
      console.warn("LandingPage: Locomotive Scroll chưa sẵn sàng. Đợi để thiết lập animation.");
      return;
    }

    console.log("LandingPage: Tất cả refs và Locomotive Scroll đã sẵn sàng. Bắt đầu thiết lập GSAP.");

    if (tl.current) {
      tl.current.kill();
    }
    if (breathTl.current) {
      breathTl.current.kill();
    }
    tl.current = null;
    breathTl.current = null;

    tl.current = gsap.timeline({ defaults: { ease: "power3.out" } });
    console.log("LandingPage: GSAP Timeline chính đã được tạo mới.");

    // --- Animation cho Avatar ---
    tl.current.fromTo(avatarRef.current,
      { opacity: 0, scale: 0.5, y: -50 },
      { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "elastic.out(1, 0.75)" },
      0
    );
    console.log("LandingPage: Animation Avatar added.");

    // Tạo hiệu ứng thở cho tên
    breathTl.current = gsap.timeline({ repeat: -1, yoyo: true, paused: true });
    nameChars.forEach(char => {
      breathTl.current.to(char, {
        scale: 1.05,
        duration: 2.5,
        ease: "power1.inOut"
      }, "random(0, 1)");
    });
    console.log("LandingPage: Breath Timeline cho tên đã được tạo.");

    // Animation xuất hiện của tên (áp dụng cho từng span con)
    tl.current.fromTo(nameChars,
      { opacity: 0, y: 50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 1.2,
        onComplete: () => {
          if (breathTl.current) {
            breathTl.current.play();
            console.log("LandingPage: Breath Timeline đã bắt đầu.");
          }
        }
      },
      "-=1"
    );
    console.log("LandingPage: Animation tên đã được thêm vào timeline.");

    // Animation cho đoạn giới thiệu
    tl.current.fromTo(introParagraphs,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.4, duration: 1.2 },
      "-=0.7"
    );
    console.log("LandingPage: Animation đoạn giới thiệu đã được thêm vào timeline.");

    // Animation cho nút "Bắt đầu"
    const buttonElement = buttonRef.current;
    tl.current.fromTo(buttonElement,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.5"
    );
    console.log("LandingPage: Animation nút đã được thêm vào timeline.");

    // Hiệu ứng hover cho nút
    const buttonHoverTween = gsap.to(buttonElement, {
      scale: 1.08,
      duration: 0.3,
      paused: true,
      ease: "power2.out"
    });

    const handleMouseEnter = () => buttonHoverTween.play();
    const handleMouseLeave = () => buttonHoverTween.reverse();

    if (buttonElement) {
      buttonElement.addEventListener('mouseenter', handleMouseEnter);
      buttonElement.addEventListener('mouseleave', handleMouseLeave);
    }
    console.log("LandingPage: Event listeners cho nút hover đã được thêm.");

    // Cleanup function
    return () => {
      console.log("LandingPage useLayoutEffect cleanup đang chạy.");
      if (tl.current) {
        tl.current.kill();
        tl.current = null;
        console.log("LandingPage: GSAP Timeline chính đã bị hủy.");
      }
      if (breathTl.current) {
        breathTl.current.kill();
        breathTl.current = null;
        console.log("LandingPage: Breath Timeline đã bị hủy.");
      }
      if (buttonElement) {
        buttonElement.removeEventListener('mouseenter', handleMouseEnter);
        buttonElement.removeEventListener('mouseleave', handleMouseLeave);
        console.log("LandingPage: Event listeners cho nút đã bị gỡ bỏ.");
      }
    };
  }, [isLocomotiveScrollReady, nameReady, introReady]);

  const handleStartClick = () => {
    // Bắn pháo hoa
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 9999,
    });

    const locomotiveScrollInstance = window.locomotiveScroll;
    const messageSection = document.getElementById('message-section');

    if (locomotiveScrollInstance && messageSection) {
      console.log("LandingPage: Đang cố gắng cuộn với Locomotive Scroll đến #message-section sau pháo hoa.");
      setTimeout(() => {
        locomotiveScrollInstance.scrollTo(messageSection, {
          duration: 1500,
          disableLerp: true
        });
      }, 300);
    } else {
      console.warn("LandingPage: Locomotive Scroll instance hoặc #message-section không tìm thấy. Quay lại cuộn mặc định của trình duyệt.");
      if (messageSection) {
        messageSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="section landing-page" data-scroll-section>
      <div className="landing-content">
        <div ref={avatarRef} className="avatar-container">
          <img src="src/assets/images/1.png" alt="Chị Trang Avatar" className="avatar-img" />
        </div>
        <h1 ref={nameRef} className="hero-name">Gửi Chị Trang</h1>
        <p ref={introRef} className="intro-text">
          Em biết chị đã rất vất vả rồi,
          <br />
          Luôn nỗ lực hết mình vì ước mơ tri thức.
          Đây là món quà nhỏ, như một khởi đầu mới cho chị,em thì chỉ là 1 thằng khô khan thôi không biết nói gì nhièu ở đây e có đôi dòng muốn gửi đến chịmong sẽ làm chị có thêm đọng lực để đi thi nhé 
        </p>
        <button ref={buttonRef} className="start-button" onClick={handleStartClick}>
          Bắt đầu
        </button>
      </div>
    </section>
  );
};

export default LandingPage;