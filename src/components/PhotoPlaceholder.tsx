import Image from 'next/image';

type PhotoPlaceholderProps = {
  src: string;
  alt: string;
  label?: string;
  className?: string;
};

const PhotoPlaceholder = ({
  src,
  alt,
  label,
  className = '',
}: PhotoPlaceholderProps) => (
  <figure className={`photo-placeholder ${className}`.trim()}>
    <div className="photo-placeholder__media">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="photo-placeholder__image"
      />
      {label ? <span className="photo-placeholder__badge">{label}</span> : null}
    </div>
  </figure>
);

export default PhotoPlaceholder;
