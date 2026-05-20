'use client';
import { useEffect, useState } from 'react';

const slides = ['/test.jpg', '/background.jpg', '/flower.png', '/anh1.jpg'];

function Slideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % slides.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {slides.map((src, i) => (
        <img
          key={src + i}
          src={src}
          alt={`slide-${i}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${i === index ? 'opacity-100 z-20' : 'opacity-0 z-10'}`}
        />
      ))}
    </>
  );
}

interface CollageLayoutProps {
  framed?: boolean;
}

export default function CollageLayout({ framed = false }: CollageLayoutProps) {
  return (
    <div className={`${framed ? 'h-full' : 'min-h-[100dvh]'} w-full flex items-center justify-center sm:p-4 p-0 overflow-hidden`}>

      {/* ĐÃ SỬA: Xóa gap-2 và sm:gap-4 ở đây để các ô dính chặt vào nhau */}
      <div className="relative w-full max-w-full sm:max-w-2xl grid grid-cols-2">

        {/* Góc trên trái */}
        {/* ĐÃ SỬA: Chỉ bo góc ở phía ngoài cùng bên trái và trên cùng (rounded-tl-xl) */}
        <div className="relative w-full aspect-[9/16] sm:aspect-[3/4] overflow-hidden rounded-tl-xl">
          <img src="/anh1.jpg" alt="Top Left" className="w-full h-full object-cover" />
        </div>

        {/* Góc trên phải */}
        <div className="relative w-full aspect-[9/16] sm:aspect-[3/4] overflow-hidden rounded-tr-xl">
          <img src="/top-right.png" alt="Top Right" className="w-full h-full object-contain" />
        </div>

        {/* Góc dưới trái */}
        <div className="relative w-full aspect-[9/16] sm:aspect-[3/4] overflow-hidden rounded-bl-xl">
          <img src="/anh1.jpg" alt="Bottom Left" className="w-full h-full object-cover" />
        </div>

        {/* Góc dưới phải */}
        <div className="relative w-full aspect-[9/16] sm:aspect-[3/4] overflow-hidden rounded-br-xl">
          <video
            src="/video2.mp4"
            className="w-full h-full object-cover object-top"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
        <div className="absolute top-[57%] left-0 z-20 w-[300px] sm:w-[390px] -translate-y-1/2">

          <div className="relative aspect-[520/479] w-full drop-shadow-2xl">
            <img
              src="/camera.png"
              alt="Camera frame"
              className="relative z-20 h-[95%] w-[95%] object-contain"
            />

            {/* (moved) small paper was here — relocated to parent so it sits at right edge of frame */}

            <div className="absolute left-[35%] top-[25%] z-30 h-[33%] w-[54%] overflow-hidden rounded-[3px] bg-black">
              <Slideshow />
            </div>

            {/* `Iloveu.png` anchored to bottom-right of the video frame */}
            {/* <img
              src="/Iloveu.png"
              alt="Iloveu"
              className="absolute -bottom-3 -right-3 w-12 h-12 sm:w-14 sm:h-14 z-30 drop-shadow-md"
            /> */}
            {/* flower icon anchored to top-left of the video frame (moved here so it's not clipped) */}
            <img
              src="/flower.png"
              alt="flower"
              className="absolute top-4 left-[20%] z-40 h-12 w-12 rotate-[-15deg] sm:top-6 sm:h-18 sm:w-18"
            />
          </div>
        </div>

        <div className="absolute top-[40%] right-0 z-20 w-[230px] sm:w-[300px] -translate-y-1/2 flex justify-end">
          <img
            src="/piece1-cropped.png"
            alt="Paper"
            style={{ transform: 'scaleY(-1)' }}
            className="relative z-20 w-full object-contain object-right"
          />
          <div className="absolute left-[10%] top-[20%] z-30 w-[90%] overflow-hidden">
            <p className="paper-invite-typewriter w-max max-w-full whitespace-nowrap text-center text-[17px] font-black leading-none text-white sm:text-[24px]">
              Mời bạn đến tham dự lễ tốt nghiệp của mình nhé
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 z-20 w-full -translate-x-1/2 px-3 pb-3 sm:px-6 sm:pb-5">
          <div
            className="mx-auto flex w-full max-w-[350px] items-center justify-between gap-2 rounded-full border border-pink-100/70 bg-pink-200/35 px-3 py-2 text-white shadow-xl backdrop-blur-md sm:max-w-[560px] sm:gap-4 sm:px-5 sm:py-3"
            style={{
              fontFamily: '"Comic Sans MS", "Trebuchet MS", cursive',
              textShadow: '0 2px 0 rgba(236, 72, 153, 0.45), 0 4px 10px rgba(0, 0, 0, 0.22)',
            }}
          >
            <div className="shrink-0 text-left leading-none">
              <div className="text-[11px] font-black uppercase sm:text-[15px]">Friday</div>
              <div className="text-[15px] font-black sm:text-[22px]">29/5</div>
            </div>

            <div className="h-8 w-px shrink-0 bg-white/45 sm:h-10" />

            <div className="min-w-0 flex-1 text-center leading-none">
              <div className="truncate text-[18px] font-black sm:text-[28px]">
                Huyền Diệu
              </div>
              <div className="mt-1 truncate text-[10px] font-bold sm:text-[15px]">
                Đại học Tôn Đức Thắng - Tòa A
              </div>
            </div>

            <div className="h-8 w-px shrink-0 bg-white/45 sm:h-10" />

            <div className="shrink-0 text-right leading-none">
              <div className="text-[16px] font-black sm:text-[24px]">10:00</div>
              <div className="text-[11px] font-black uppercase sm:text-[15px]">AM</div>
            </div>
          </div>
        </div>
      


      </div>

    </div>
  );
}
