import { useEffect, useState } from "react";

interface Props {
  images: { id: string; url: string }[];
  startIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, startIndex, onClose }: Props) {
  const [index, setIndex] = useState(startIndex);

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} className="relative">

        <img
          src={images[index].url}
          className="max-h-[80vh] max-w-[90vw] rounded"
        alt={`Photo ${index + 1}`}
        />

        <button
          onClick={prev}
          className="absolute left-[-60px] top-1/2 text-white text-3xl"
        >
          ‹
        </button>

        <button
          onClick={next}
          className="absolute right-[-60px] top-1/2 text-white text-3xl"
        >
          ›
        </button>

        <button
          onClick={onClose}
          className="absolute top-[-40px] right-0 text-white text-xl"
        >
          ✕
        </button>

        <div className="absolute bottom-[-30px] text-white text-sm text-center w-full">
          {index + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}