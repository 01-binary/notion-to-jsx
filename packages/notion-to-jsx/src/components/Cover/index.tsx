import { cover } from './styles.css';

interface CoverProps {
  src: string;
  alt: string;
}

const Cover = ({ src, alt }: CoverProps) => {
  return <img src={src} alt={alt} className={cover} />;
};

export default Cover;
