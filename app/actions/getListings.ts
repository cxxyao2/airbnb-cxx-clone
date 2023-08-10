import prisma from '@/app/libs/prismadb'
import { start } from 'repl'
import { SafeListing } from '@/app/types'

export interface IListingsParams {
	userId?: string
	guestCount?: number
	roomCount?: number
	bathroomCount?: number
	startDate?: string
	endDate?: string
	locationValue?: string
	category?: string
}

export default async function getListings(params: IListingsParams) {
	try {
		const {
			userId,
			guestCount,
			roomCount,
			bathroomCount,
			startDate,
			endDate,
			locationValue,
			category
		} = params

		let query: any = {}

		if (userId) query.userId = userId
		if (category) query.category = category
		if (guestCount) query.guestCount = { gte: +guestCount }
		if (bathroomCount) query.bathroomCount = { gte: +bathroomCount }

		if (locationValue) query.locationValue = locationValue

		if (startDate && endDate) {
			query.NOT = {
				reservations: {
					some: {
						OR: [
							{
								startDate: {
									lte: new Date(startDate)
								},
								endDate: {
									gte: new Date(startDate)
								}
							},
							{
								startDate: {
									lte: new Date(endDate)
								},
								endDate: {
									gte: new Date(endDate)
								}
							}
						]
					}
				}
			}
		}

		const listings = await prisma.listing.findMany({
			where: query,
			orderBy: {
				createdAt: 'desc'
			}
		})

		const SafeListings = listings.map((listing: any) => ({
			...listing,
			createdAt: listing.createdAt.toISOString()
		}))

		return SafeListings
	} catch (err: any) {
		throw new Error(err)
	}
}