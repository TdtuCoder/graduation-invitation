/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { useRef, useCallback, useState } from "react";
import { toJpeg } from "html-to-image";
import Typewriter from "./Typewriter";

interface NewInvitationLayoutProps {
  dearName?: string;
}

export default function NewInvitationLayout({
  dearName,
}: NewInvitationLayoutProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = useCallback(() => {
    if (cardRef.current === null) {
      return;
    }
    
    setIsDownloading(true);
    
    // Give React a moment to render static text and hide the download button
    setTimeout(() => {
      toJpeg(cardRef.current!, { quality: 0.95, cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "Thiep_Moi_Huyen_Dieu.jpg";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error("Oops, something went wrong!", err);
        })
        .finally(() => {
          setIsDownloading(false);
        });
    }, 150);
  }, [cardRef]);

  return (
    <div
      className="w-full min-h-[100dvh] flex flex-col justify-start items-center bg-neutral-950 bg-cover bg-center p-0 sm:p-4 overflow-y-auto overflow-x-hidden"
      style={{ backgroundImage: "url('/background_new_v2.jpg')" }}
    >
      {/* Outer blurred background wrapper on desktop for premium visual effect */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-lg hidden sm:block pointer-events-none z-0" />

      {/* Main card matching the mobile phone layout */}
      <div
        ref={cardRef}
        className="relative w-full max-w-[440px] flex-1 min-h-[640px] max-h-[920px] my-auto sm:rounded-[36px] shadow-[0_24px_50px_rgba(0,0,0,0.55)] overflow-hidden flex flex-col justify-between pt-6 sm:pt-8 pb-0 text-neutral-800 bg-cover bg-center z-10 shrink-0"
        style={{ backgroundImage: "url('/background_new_v2.jpg')" }}
      >
        {/* Top Overlay Gradient to darken top text slightly for legibility */}
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-0" />

        {/* 1. HEADER (INVITATION 2025) */}
        <div className="relative w-full flex justify-between items-center px-6 min-[390px]:max-sm:px-8 z-10">
          <span
            className="text-[#E2C799] text-xl min-[390px]:max-sm:text-2xl tracking-[0.25em] font-light uppercase select-none"
            style={{
              fontFamily: '"Times New Roman", Times, serif',
              fontWeight: 700,
            }}
          >
            Invitation
          </span>
          <span
            className="text-[#E2C799] text-xl min-[390px]:max-sm:text-2xl tracking-[0.25em] font-light select-none"
            style={{
              fontFamily: '"Times New Roman", Times, serif',
              fontWeight: 700,
            }}
          >
            2026
          </span>
        </div>

        {/* 2. TITLE (Graduation Ceremony Text with Cap and Effects) */}
        <div className="relative flex flex-col items-center mt-3 mb-1 sm:mt-6 sm:mb-2 z-10 select-none w-full px-2 text-center" style={{ fontFamily: "var(--font-great-vibes)" }}>
          <div className="relative inline-block">
            <span className="relative z-10 text-[65px] min-[390px]:max-sm:text-[85px] leading-none text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.45)]">
              Graduation
            </span>
            {/* Graduation Cap */}
            <img
              src="/graduation-cap.png"
              alt="Graduation Cap"
              className="absolute -top-[15px] min-[390px]:max-sm:-top-[25px] -left-[10px] w-[50px] min-[390px]:max-sm:w-[65px] h-auto -rotate-[10deg] drop-shadow-md pointer-events-none z-20 animate-[bounce_1s_ease-in-out_infinite]"
            />
          </div>
          <span className="inline-block pt-4 pb-2 px-2 text-[44px] min-[390px]:max-sm:text-[56px] leading-none bg-gradient-to-b from-white from-[25%] via-[#E2C799] via-[65%] to-[#a88648] bg-clip-text text-transparent drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] -mt-6">
            Ceremony
          </span>
        </div>

        {/* 3. MIDDLE AREA (Kept empty/spaced to show the face of the graduate in background_new_v2.jpg) */}
        <div className="flex-grow min-h-[40px]" />

        {/* 4. BOTTOM INVITATION SECTION WITH WHITE GRADIENT OVERLAY */}
        <div className="relative w-full pt-6 pb-1 sm:pt-10 sm:pb-1 px-5 flex flex-col items-center justify-end z-10 overflow-hidden mt-auto">
          {/* White Gradient Overlay (Fades from transparent at the top to white at the bottom) */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 via-white/65 to-transparent pointer-events-none z-0" />

          {/* Background TDT Logo (Ghostly/Faded/Blurred effect) */}
          <div className="absolute top-20 inset-0 flex justify-center items-center pointer-events-none opacity-[0.14] select-none z-0 overflow-hidden">
            <img
              src="/logo-tdt.webp"
              alt="TDTU Logo"
              className="w-[320px] h-auto object-contain filter grayscale brightness-[1.15] contrast-[0.7] scale-110"
            />
          </div>

          {/* Personal Greeting (Thân mời...) */}
          <div className="relative flex flex-col items-center text-center w-full mt-3 mb-3 sm:mt-5 sm:mb-5 z-10 select-none">
            <span
              className="text-[18px] min-[390px]:max-sm:text-[23px] tracking-widest font-bold bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              Thân mời
            </span>
            <div className="relative mb-2 mt-1">
              <span
                className={`text-[26px] min-[390px]:max-sm:text-[34px] px-4 font-normal inline-block border-b border-[#2E3D30]/40 pb-1 ${isDownloading ? 'text-[#2E3D30]' : 'bg-gradient-to-r from-[#1c261e] via-[#2E3D30] to-[#1c261e] bg-clip-text text-transparent'}`}
                style={{ fontFamily: "var(--font-great-vibes)" }}
              >
                {isDownloading ? (
                  dearName || "anh/chị/em/bạn bè"
                ) : (
                  <Typewriter
                    text={dearName || "anh/chị/em/bạn bè"}
                    delay={1400}
                    speed={70}
                  />
                )}
              </span>
            </div>
            {/* 3 Columns Section (Thời gian, Địa điểm, Liên hệ) */}
            <div className="w-full flex justify-between gap-1 items-stretch z-10">
              {/* Column 1: Thời gian */}
              <div className="flex flex-col items-center flex-1 py-1">
                <div
                  className="border border-[#856a47]/40 rounded-full px-3 min-[390px]:max-sm:px-5 py-1 text-[12px] min-[390px]:max-sm:text-[14px] sm:text-[13px] font-bold bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent tracking-wider"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  Thời gian
                </div>

                <div className="flex items-center gap-2.5 h-full justify-center mt-2">
                  {/* Date stack */}
                  <div className="flex flex-col items-center select-none">
                    <span
                      className="text-[30px] min-[390px]:max-sm:text-[38px] sm:text-[37px] font-medium leading-none bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent"
                      style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    >
                      29
                    </span>
                    <div className="w-8 min-[390px]:max-sm:w-9 h-[1px] bg-[#856a47]/60 my-1" />
                    <span
                      className="text-[30px] min-[390px]:max-sm:text-[38px] sm:text-[37px] font-medium leading-none bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent"
                      style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    >
                      05
                    </span>
                  </div>

                  {/* Vertical divider */}
                  <div className="w-[1px] h-10 bg-[#856a47]/80" />

                  {/* Time stack */}
                  <div className="flex flex-col items-center justify-center h-full gap-1 select-none">
                    <span
                      className="text-[14px] min-[390px]:max-sm:text-[18px] sm:text-[17px] leading-none font-medium bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent"
                      style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    >
                      10:30
                    </span>
                    <div className="w-[1.5px] h-2 min-[390px]:max-sm:h-3 bg-[#856a47] rounded-full" />
                    <span
                      className="text-[14px] min-[390px]:max-sm:text-[18px] sm:text-[17px] leading-none font-medium bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent"
                      style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    >
                      12:00
                    </span>
                  </div>
                </div>
              </div>

              {/* Column 2: Địa điểm */}
              <div className="flex flex-col items-center flex-[1.4] py-1 px-1">
                <div
                  className="border border-[#856a47]/40 rounded-full px-3 min-[390px]:max-sm:px-5 py-1 text-[12px] min-[390px]:max-sm:text-[14px] sm:text-[13px] font-bold bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent tracking-wider"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  Địa điểm
                </div>
                <div className="text-center flex flex-col justify-center items-center h-full select-none mt-2">
                  <a
                    href="https://discovery.tdtu.edu.vn/?fbclid=IwY2xjawR8E1ZleHRuA2FlbQIxMQBicmlkETE2dlZCVHdaQWxCV0NGeTJXc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHnEQ3xbn1GP7a5BAhB1rmk5OGGhK1_5nrLN6p9M3YcZA4DXX-sXjjSgS3Y5F_aem_9mRM0gGzCJTJ8UWwHKsAOA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] min-[390px]:max-sm:text-[12px] sm:text-[13px] font-bold leading-tight block bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent hover:scale-110 transition-transform"
                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                  >
                    Đại học Tôn Đức Thắng
                  </a>
                  <span
                    className="text-[10px] min-[390px]:max-sm:text-[12px] sm:text-[11px] font-medium leading-relaxed mt-1.5 block max-w-[130px] bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent"
                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                  >
                  Tòa A
                  </span>
                  <span
                    className="text-[10px] min-[390px]:max-sm:text-[12px] sm:text-[11px] font-medium leading-relaxed mt-1.5 block max-w-[130px] bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent"
                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                  >
                    19 Đ. Nguyễn Hữu Thọ
                  </span>
                  <span
                    className="text-[10px] min-[390px]:max-sm:text-[12px] sm:text-[11px] font-medium leading-relaxed block max-w-[130px] bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent"
                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                  >
                    P. Tân Hưng, TP. HCM
                  </span>
                </div>
              </div>

              {/* Column 3: Liên hệ */}
              <div className="flex flex-col items-center flex-1 py-1">
                <div
                  className="border border-[#856a47]/40 rounded-full px-3 min-[390px]:max-sm:px-5 py-1 text-[12px] min-[390px]:max-sm:text-[14px] sm:text-[13px] font-bold bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent tracking-wider"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  Liên hệ
                </div>
                <div
                  className="text-center flex flex-col justify-center items-center h-full gap-2 select-none mt-2"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  <a href="tel:0379036004" className="block text-[10px] min-[390px]:max-sm:text-[12px] sm:text-[11px] leading-tight font-semibold bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent hover:scale-110 transition-transform">
                    037 903 6004 - Diệu
                  </a>
                  <a href="tel:0334053171" className="block text-[10px] min-[390px]:max-sm:text-[12px] sm:text-[11px] leading-tight font-semibold bg-gradient-to-r from-[#1a120b] via-[#856a47] to-[#1a120b] bg-clip-text text-transparent hover:scale-110 transition-transform">
                    033 405 3171-Trường
                  </a>
                </div>
              </div>
            </div>

            {/* 5. THANK YOU PARAGRAPH */}
            <div className="w-full text-center px-3 border-t border-[#4a433a]/10 pt-2 sm:pt-3 select-none z-10">
              <p
                className="text-[10px] min-[390px]:max-sm:text-[12px] text-[#4a433a]/90 leading-relaxed font-medium"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                {isDownloading ? (
                  "Một cột mốc nhỏ nhưng đầy ý nghĩa của Huyền Dịu. Rất mong có bạn đến chung vui trong ngày đặc biệt này!."
                ) : (
                  <Typewriter
                    text="Một cột mốc nhỏ nhưng đầy ý nghĩa của Huyền Dịu. Rất mong có bạn đến chung vui trong ngày đặc biệt này!."
                    speed={30}
                    delay={1000}
                    loop={false}
                    showCursor={false}
                  />
                )}
                {!isDownloading && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.5, duration: 1 }}
                  >
                    {" "}
                    <span onClick={handleDownload} className="text-[#856a47] hover:text-[#5c4830] transition-colors cursor-pointer">
                      Tải thiệp <span className="underline underline-offset-2 decoration-[#856a47]">TẠI ĐÂY</span>
                    </span>
                  </motion.span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
