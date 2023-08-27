import { useEffect, useRef, useState } from "react";

interface ImageProps {
  lazy?: boolean;
  threshold?: number;
  src: string;
  block?: boolean;
  placeholder?: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
  mode?: "cover" | "fill" | "contain";
  styleprop?: React.CSSProperties;
}

let observer = null;
const LOAD_IMG_EVENT_TYPE = "loadImage";

const onIntersection = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // 이미지가 교차되었으면 해당 요소를 감시 대상에서 제거, 즉 한 번만 로드한다.
      io.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_TYPE));
    }
  });
};

const Image = ({
  lazy,
  threshold = 0.5,
  placeholder,
  src,
  block,
  width,
  height,
  alt,
  mode,
  ...props
}: ImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const imageStyle = {
    display: block ? "block" : undefined,
    width,
    height,
    objectFit: mode,
  };

  useEffect(() => {
    if (!lazy) {
      setLoaded(true);
      return;
    }

    const handleLoadImage = () => setLoaded(true);

    const imgElement = imgRef.current;
    imgElement && imgElement.addEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);
    return () => {
      imgElement && imgElement.removeEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);
    };
  }, [lazy]);

  useEffect(() => {
    if (!lazy) return;

    observer = new IntersectionObserver(onIntersection, { threshold }); //  Intersection Observer 초기화
    imgRef.current && observer.observe(imgRef.current); // Intersection Observer를 이미지 요소에 연결, 해당 이미지가 화면에 나타날 때 onIntersection 함수가 실행되어 이미지가 로딩된다.
  }, [lazy, threshold]);

  return (
    <img
      ref={imgRef}
      src={loaded ? src : placeholder}
      alt={alt}
      style={{ ...props.styleprop, ...imageStyle }}
      {...props}
    />
  );
};

export default Image;
