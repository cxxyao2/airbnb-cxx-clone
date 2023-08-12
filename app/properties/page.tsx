import EmptyState from '../components/shared/EmptyState'
import ClientOnly from '../components/shared/ClientOnly'

import getCurrentUser from '../actions/getCurrentUser'
import getListings from '../actions/getListings'

import PropertiesClient from './PropertiesClient'

const PropertiesPage = async () => {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return <EmptyState title='Unauthorized' subtitle='Please login' />
	}

	const listings = await getListings({ userId: currentUser.id })

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title='No Properties found'
					subtitle='Looks like you have no properties.'
				/>
			</ClientOnly>
		)
	}

	return (
		<ClientOnly>
			<PropertiesClient currentUser={currentUser} listings={listings} />
		</ClientOnly>
	)
}

export default PropertiesPage
