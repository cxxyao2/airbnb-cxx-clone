'use client'

import dynamic from 'next/dynamic'
import type { IconType } from 'react-icons'

import useCountries from '@/app/hooks/useCountries'
import type { SafeUser } from '@/app/types'

import Avatar from '../shared/Avatar'
import ListingCategory from './ListingCategory'

const Map = dynamic(() => import('../shared/Map'), { ssr: false })

interface ListingInfoProps {
	user: SafeUser
	description: string
	guestCount: number
	roomCount: number
	bathroomCount: number
	locationValue: string
	category:
		| {
				icon: IconType
				label: string
				description: string
		  }
		| undefined
}

const ListingInfo = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  locationValue,
  category
}: ListingInfoProps) =>
{
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng


  return (
		<div className='col-span-4 flex flex-col gap-8'>
			<div className='flex flex-col gap-2'>
				<div className='text-xl font-semibold flex flex-row items-center gap-2'>
					<div>Hosted by {user?.name}</div>
					<Avatar src={user?.image} />
				</div>
				<div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
          <div>{ guestCount} guests</div>
          <div>{ roomCount} rooms</div>
          <div>{ bathroomCount} bathrooms</div>
				</div>
      </div>
      <hr />
      {category && <ListingCategory {...category} />}
      <hr />
      <div className='text-lg font-light text-neutral-500'>xxx</div>
      <hr />
      <Map center={coordinates} />
		</div>
	)
};

export default ListingInfo;