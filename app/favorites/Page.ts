import EmptyState from '@/app/components/shared/EmptyState'
import ClientOnly from '@/app/components/shared/ClientOnly'

import getCurrentUser from '@/app/actions/getCurrentUser'
import getFavoriteListings from '@/app/actions/getFavoriteListings'

import FavoritesClient from './FavoritesClient'

const ListingPage = async () => {
	const listings = await getFavoriteListings()
	const currentUser = await getCurrentUser()

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title='No Favorites found'
					subtitle='looks like you have no favorite listings'></EmptyState>
			</ClientOnly>
		)
	}

return (
  <ClientOnly>
  <FavoritesClient listings={listings} currentUser={currentUser} />
  </ClientOnly>
  )
}

export default ListingPage
