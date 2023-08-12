'use client'

import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

import { SafeListing, SafeReservation, SafeUser } from '@/app/types'

import Heading from '../components/shared/Heading'
import Container from '../components/shared/Container'
import ListingCard from '../components/listings/ListingCard'

interface TripsClientProps {
	reservations: SafeReservation[]
	currentUser?: SafeUser | null
}

const TripsClient = ({ reservations, currentUser }: TripsClientProps) => {
	const router = useRouter()
	const [deletingId, setDeletingId] = useState('')

	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id)

			axios
				.delete(`/api/reservations/${id}`)
				.then(() => {
					toast.success('Reservation canceled successfully')
					router.refresh()
				})
				.catch((error) => {
					toast.error(error?.response?.data?.error)
				})
				.finally(() => {
					setDeletingId('')
				})
		},
		[router]
	)

	return (
		<Container>
			<Heading
				title='Trips'
				subtitle='Where you"ve been and where you"re going'
			/>
			<div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
				{reservations.map((reservation) => (
					<ListingCard
						key={reservation.id}
						data={reservation.Listing}
						reservation={reservation}
						actionId={reservation.id}
						onAction={onCancel}
						disabled={deletingId === reservation.id}
						actionLabel='Cancel guest Reservation'
						currentUser={currentUser}></ListingCard>
				))}
			</div>
		</Container>
	)
}

export default TripsClient
