// src/sections/EndSection.jsx
import React, { useRef, useLayoutEffect, useState } from 'react'; // THÊM useLayoutEffect vào đây
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './EndSection.css';

const EndSection = ({ isLocomotiveScrollReady }) => {
  const sectionRef = useRef(null);
  const flowersContainerRef = useRef(null); // Ref cho container .flowers
  const [isFlowerAnimationReady, setIsFlowerAnimationReady] = useState(false);

  useLayoutEffect(() => {
    console.log("EndSection useLayoutEffect đang chạy. isLocomotiveScrollReady:", isLocomotiveScrollReady);
    console.log("Refs current values:", {
      section: sectionRef.current,
      flowersContainer: flowersContainerRef.current
    });

    if (!isLocomotiveScrollReady || !sectionRef.current || !flowersContainerRef.current) {
      console.warn("EndSection: Chưa sẵn sàng thiết lập animation hoa (LS chưa sẵn sàng hoặc refs null).");
      return;
    }

    console.log("EndSection: Đã sẵn sàng thiết lập animation hoa. Refs và LS đã sẵn sàng.");

    // Khi section hiển thị trong viewport, kích hoạt animation hoa
    // Sử dụng ScrollTrigger để kích hoạt khi cuộn đến section này
    const tlFlower = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        scroller: ".main-scroll-container", // Quan trọng: Đảm bảo khớp với data-scroll-container
        start: "top center", // Khi phần đầu section vào giữa màn hình
        toggleActions: "play none none none", // Chỉ chạy khi vào, không reverse hay reset
        // markers: true // Bật marker để debug
      }
    });

    tlFlower.add(() => {
      // Logic tương tự như onload trong 2010.js để kích hoạt animation CSS
      console.log("EndSection: Kích hoạt animation hoa bằng cách thêm class 'loaded-flower-animation'.");
      setIsFlowerAnimationReady(true);
    });

    // Cleanup ScrollTrigger
    return () => {
      console.log("EndSection Cleanup: Dọn dẹp ScrollTrigger cho hoa.");
      if (tlFlower) {
        tlFlower.kill();
      }
      setIsFlowerAnimationReady(false); // Reset trạng thái khi unmount
    };
  }, [isLocomotiveScrollReady]); // Dependency array bao gồm isLocomotiveScrollReady

  return (
    <section
      ref={sectionRef}
      className={`section end-section ${isFlowerAnimationReady ? 'loaded-flower-animation' : ''}`}
      data-scroll-section
    >
      <h2 className="happy-woman-day">Chúc chị một khởi đầu mới đầy rực rỡ!</h2>

      <div ref={flowersContainerRef} className="flowers">
        {/* Nội dung bông hoa từ 2010.html, đảm bảo không có lỗi cú pháp JSX */}
        <div className="flower flower--1">
          <div className="flower__leafs flower__leafs--1">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>

            <div className="flower__light flower__light--1"></div>
            <div className="flower__light flower__light--2"></div>
            <div className="flower__light flower__light--3"></div>
            <div className="flower__light flower__light--4"></div>
            <div className="flower__light flower__light--5"></div>
            <div className="flower__light flower__light--6"></div>
            <div className="flower__light flower__light--7"></div>
            <div className="flower__light flower__light--8"></div>
          </div>
          <div className="flower__line">
            <div className="flower__line__leaf flower__line__leaf--1"></div>
            <div className="flower__line__leaf flower__line__leaf--2"></div>
            <div className="flower__line__leaf flower__line__leaf--3"></div>
            <div className="flower__line__leaf flower__line__leaf--4"></div>
            <div className="flower__line__leaf flower__line__leaf--5"></div>
            <div className="flower__line__leaf flower__line__leaf--6"></div>
          </div>
        </div>

        <div className="flower flower--2">
          <div className="flower__leafs flower__leafs--2">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>

            <div className="flower__light flower__light--1"></div>
            <div className="flower__light flower__light--2"></div>
            <div className="flower__light flower__light--3"></div>
            <div className="flower__light flower__light--4"></div>
            <div className="flower__light flower__light--5"></div>
            <div className="flower__light flower__light--6"></div>
            <div className="flower__light flower__light--7"></div>
            <div className="flower__light flower__light--8"></div>
          </div>
          <div className="flower__line">
            <div className="flower__line__leaf flower__line__leaf--1"></div>
            <div className="flower__line__leaf flower__line__leaf--2"></div>
            <div className="flower__line__leaf flower__line__leaf--3"></div>
            <div className="flower__line__leaf flower__line__leaf--4"></div>
          </div>
        </div>

        <div className="flower flower--3">
          <div className="flower__leafs flower__leafs--3">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>

            <div className="flower__light flower__light--1"></div>
            <div className="flower__light flower__light--2"></div>
            <div className="flower__light flower__light--3"></div>
            <div className="flower__light flower__light--4"></div>
            <div className="flower__light flower__light--5"></div>
            <div className="flower__light flower__light--6"></div>
            <div className="flower__light flower__light--7"></div>
            <div className="flower__light flower__light--8"></div>
          </div>
          <div className="flower__line">
            <div className="flower__line__leaf flower__line__leaf--1"></div>
            <div className="flower__line__leaf flower__line__leaf--2"></div>
            <div className="flower__line__leaf flower__line__leaf--3"></div>
            <div className="flower__line__leaf flower__line__leaf--4"></div>
          </div>
        </div>

        <div className="grow-ans" style={{'--d': '1.2s'}}>
          <div className="flower__g-long">
            <div className="flower__g-long__top"></div>
            <div className="flower__g-long__bottom"></div>
          </div>
        </div>

        <div className="growing-grass">
          <div className="flower__grass flower__grass--1">
            <div className="flower__grass--top"></div>
            <div className="flower__grass--bottom"></div>
            <div className="flower__grass__leaf flower__grass__leaf--1"></div>
            <div className="flower__grass__leaf flower__grass__leaf--2"></div>
            <div className="flower__grass__leaf flower__grass__leaf--3"></div>
            <div className="flower__grass__leaf flower__grass__leaf--4"></div>
            <div className="flower__grass__leaf flower__grass__leaf--5"></div>
            <div className="flower__grass__leaf flower__grass__leaf--6"></div>
            <div className="flower__grass__leaf flower__grass__leaf--7"></div>
            <div className="flower__grass__leaf flower__grass__leaf--8"></div>
            <div className="flower__grass__overlay"></div>
          </div>
        </div>

        <div className="growing-grass">
          <div className="flower__grass flower__grass--2">
            <div className="flower__grass--top"></div>
            <div className="flower__grass--bottom"></div>
            <div className="flower__grass__leaf flower__grass__leaf--1"></div>
            <div className="flower__grass__leaf flower__grass__leaf--2"></div>
            <div className="flower__grass__leaf flower__grass__leaf--3"></div>
            <div className="flower__grass__leaf flower__grass__leaf--4"></div>
            <div className="flower__grass__leaf flower__grass__leaf--5"></div>
            <div className="flower__grass__leaf flower__grass__leaf--6"></div>
            <div className="flower__grass__leaf flower__grass__leaf--7"></div>
            <div className="flower__grass__leaf flower__grass__leaf--8"></div>
            <div className="flower__grass__overlay"></div>
          </div>
        </div>

        <div className="grow-ans" style={{'--d': '2.4s'}}>
          <div className="flower__g-right flower__g-right--1">
            <div className="leaf"></div>
          </div>
        </div>

        <div className="grow-ans" style={{'--d': '2.8s'}}>
          <div className="flower__g-right flower__g-right--2">
            <div className="leaf"></div>
          </div>
        </div>

        <div className="grow-ans" style={{'--d': '2.8s'}}>
          <div className="flower__g-front">
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--1">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--2">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--3">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--4">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--5">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--6">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--7">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--8">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__line"></div>
          </div>
        </div>

        <div className="grow-ans" style={{'--d': '3.2s'}}>
          <div className="flower__g-fr">
            <div className="leaf"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--1"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--2"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--3"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--4"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--5"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--6"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--7"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--8"></div>
          </div>
        </div>

        {/* Các phần long-g từ 2010.html, thêm nếu cần */}
        <div className="long-g long-g--0">
          <div className="grow-ans" style={{'--d':'3s'}}>
            <div className="leaf leaf--0"></div>
          </div>
          <div className="grow-ans" style={{'--d':'2.2s'}}>
            <div className="leaf leaf--1"></div>
          </div>
          <div className="grow-ans" style={{'--d':'3.4s'}}>
            <div className="leaf leaf--2"></div>
          </div>
          <div className="grow-ans" style={{'--d':'3.6s'}}>
            <div className="leaf leaf--3"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EndSection;