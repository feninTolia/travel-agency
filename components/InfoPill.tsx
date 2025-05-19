type Props = { text: string; imageSrc: string };

const InfoPill = ({ text, imageSrc }: Props) => {
  return (
    <figure className="info-pill">
      <img src={imageSrc} alt={text} />
      <figcaption>{text}</figcaption>
    </figure>
  );
};

export default InfoPill;
