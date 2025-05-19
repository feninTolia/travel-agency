import {
  ChipDirective,
  ChipListComponent,
  ChipsDirective,
} from '@syncfusion/ej2-react-buttons';
import { Header, InfoPill, TripCard } from 'components';
import { cn, getFirstWord, parseTripData } from 'lib/utils';
import { useEffect, useState } from 'react';
import type { LoaderFunctionArgs } from 'react-router';
import { getAllTrips, getTripById } from '~/appwrite/trips';
import type { Route } from './+types/trip-details';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { tripId } = params;
  if (!tripId) {
    throw new Error('Trip ID is required.');
  }

  const [allTrips, trip] = await Promise.all([
    getAllTrips({ limit: 4 }),
    getTripById(tripId),
  ]);

  return {
    allTrips: allTrips.allTrips.map(({ $id, tripDetail, imageUrls }) => ({
      id: $id,
      ...parseTripData(tripDetail),
      imageUrls: imageUrls ?? [],
    })),
    trip,
  };
};

const TripDetails = ({ loaderData }: Route.ComponentProps) => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setIsReady(true);
  }, []);

  const tripData = parseTripData(loaderData?.trip?.tripDetail);
  const imageUrls: string[] = loaderData?.trip?.imageUrls ?? [];
  const allTrips = loaderData?.allTrips ?? [];
  console.log('allTrips', allTrips[0]);

  if (!tripData?.name) {
    return <div>Trip not found</div>;
  }

  const {
    name,
    travelStyle,
    duration,
    itinerary,
    interests,
    budget,
    country,
    groupType,
    estimatedPrice,
    description,
    bestTimeToVisit,
    weatherInfo,
  } = tripData;

  const pillItems = [
    { text: travelStyle, bg: 'bg-pink-50! text-pink-500!' },
    { text: groupType, bg: 'bg-primary-50! text-primary-500!' },
    { text: budget, bg: 'bg-success-50! text-success-700!' },
    { text: interests, bg: 'bg-navy-50! text-navy-500!' },
  ];
  const visitTimeAndWeatherInfo = [
    { title: 'Best Time to Visit', items: bestTimeToVisit },
    { title: 'Weather', items: weatherInfo },
  ];
  return (
    <main className="travel-detail wrapper">
      <Header
        title="Trip Details"
        description="View and edit AI-generated travel plans"
      />
      <section className="container wrapper-md">
        <header>
          <h1 className="p-40-semibold text-dark-100">{name}</h1>
          <div className="flex items-center gap-5">
            <InfoPill
              text={`${duration} day plan`}
              imageSrc="/assets/icons/calendar.svg"
            />
            <InfoPill
              text={
                itinerary
                  .slice(0, 3)
                  .map((item) => item.location)
                  .join(', ') ?? ''
              }
              imageSrc="/assets/icons/location-mark.svg"
            />
          </div>
        </header>

        <section className="gallery">
          {imageUrls.map((image: string, idx) => (
            <img
              src={image}
              key={image}
              alt={'Country image' + idx}
              className={cn(
                'w-full rounded-xl object-cover',
                idx === 0
                  ? 'md:col-span-2 md:row-span-2 h-[330px]'
                  : 'md:row-span-1 h-[150px]'
              )}
            />
          ))}
        </section>

        <section className="flex gap-3 md:gap-5 items-center flex-wrap">
          {isReady && (
            <ChipListComponent id="travel-chip">
              <ChipsDirective>
                {pillItems.map((item) => (
                  <ChipDirective
                    key={item.text}
                    text={getFirstWord(item.text)}
                    cssClass={`${item.bg} !text-base !font-medium !px-4`}
                  />
                ))}
              </ChipsDirective>
            </ChipListComponent>
          )}
          <ul className="flex gap-1 items-center">
            {Array(5)
              .fill(null)
              .map((_, idx) => (
                <li key={idx}>
                  <img
                    src="/public/assets/icons/star.svg"
                    alt="star"
                    className="size-[18px]"
                  />
                </li>
              ))}

            <li className="ml-1">
              {isReady && (
                <ChipListComponent>
                  <ChipsDirective>
                    <ChipDirective
                      text="4.9/5"
                      cssClass="!bg-yellow-50 !text-yellow-700"
                    />
                  </ChipsDirective>
                </ChipListComponent>
              )}
            </li>
          </ul>
        </section>

        <section className="title">
          <article>
            <h3>
              {duration}-Day {country} {travelStyle} Trip
            </h3>
            <p>
              {budget}, {groupType} and {interests}
            </p>
          </article>

          <h2>{estimatedPrice}</h2>
        </section>

        <p className="text-sm md:text-lg font-normal text-dark-400">
          {description}
        </p>

        <ul className="itinerary">
          {itinerary?.map(({ location, day, activities }: DayPlan) => (
            <li key={day}>
              <h3>
                Day {day}: {location}
              </h3>

              <ul>
                {activities.map((activity, idx) => (
                  <li key={idx}>
                    <span className="flex-shrink-0 p-18-semibold">
                      {activity.time}
                    </span>
                    <p className="flex-grow">{activity.description}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {visitTimeAndWeatherInfo.map((section) => (
          <section key={section.title} className="visit">
            <div>
              <h3>{section.title}</h3>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>
                    <p className="flex-grow">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </section>

      {allTrips.length > 0 && (
        <section className="flex flex-col gap-6">
          <h2 className="p-24-semibold text-dark-100">Popular Trips</h2>
          <div className="trip-grid">
            {allTrips.map(
              ({
                id,
                name,
                itinerary,
                imageUrls,
                estimatedPrice,
                interests,
                travelStyle,
              }) => (
                <TripCard
                  key={id}
                  id={id}
                  name={name ?? ''}
                  location={itinerary?.at(0)?.location ?? ''}
                  imageUrl={imageUrls[0]}
                  tags={[interests!, travelStyle!]}
                  price={estimatedPrice ?? ''}
                />
              )
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default TripDetails;
