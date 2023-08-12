import EmptyState from '../components/shared/EmptyState'
import ClientOnly from '../components/shared/ClientOnly'

import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations'

import TripsClient from './ReservationsClient'

const ReservationsPage = async () => {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState title='Unauthorized' subtitle='Please login' />
			</ClientOnly>
		)
	}

	const reservations = await getReservations({ userId: currentUser.id })
	if (reservations.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title='No Reservations found'
					subtitle='Looks like you have no reservations on your properties.'
				/>
			</ClientOnly>
		)
	}

	return (
		<ClientOnly>
			<TripsClient currentUser={currentUser} reservations={reservations} />
		</ClientOnly>
	)
}

export default ReservationsPage
