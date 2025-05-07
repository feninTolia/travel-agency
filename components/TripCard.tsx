import { Link, useLocation } from 'react-router';
import {
  ChipDirective,
  ChipListComponent,
  ChipsDirective,
} from '@syncfusion/ej2-react-buttons';
import { cn, getFirstWord } from 'lib/utils';

const TripCard = ({
  id,
  imageUrl,
  name,
  price,
  tags,
  location,
}: TripCardProps) => {
  const { pathname } = useLocation();
  return (
    <Link
      to={
        pathname === '/' || pathname.startsWith('/travel')
          ? `/travel/${id}`
          : `/trips/${id}`
      }
      className="trip-card"
    >
      <img src={imageUrl} alt={name} />
      <article>
        <h2>{name}</h2>
        <figure>
          <img
            src="/assets/icons/location-mark.svg"
            alt="location"
            className="size-4"
          />
          <figcaption>{location}</figcaption>
        </figure>
      </article>

      <div className="mt-5 pl-[18px] pr-3.5 pb-5 ">
        <ChipListComponent id="travel-chip">
          <ChipsDirective>
            {tags.map((tag, idx) => (
              <ChipDirective
                key={tag}
                text={getFirstWord(tag)}
                cssClass={cn(
                  idx === 1
                    ? '!bg-pink-50 text-pink-500'
                    : '!bg-success-50 !text-success-700'
                )}
              />
            ))}
          </ChipsDirective>
        </ChipListComponent>
      </div>

      <article className="tripCard-pill">{price}</article>
    </Link>
  );
};

export default TripCard;
