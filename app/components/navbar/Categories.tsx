'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import {
	GiBarn,
	GiBoatFishing,
	GiCactus,
	GiCastle,
	GiCaveEntrance,
	GiForestCamp,
	GiIsland,
	GiWindmill
} from 'react-icons/gi'
import { FaSkiing } from 'react-icons/fa'
import { BsSnow } from 'react-icons/bs'
import { IoDiamond } from 'react-icons/io5'
import { MdOutlineVilla } from 'react-icons/md'

import CategoryBox from '../shared/CategoryBox'
import Container from '../shared/Container'

export const categories = [
	{
		label: 'Beach',
		icon: TbBeach,
		description: 'This property is close to the beach!'
	},
	{
		label: 'Windmills',
		icon: GiWindmill,
		description: 'This property has windmills!'
	},
	{
		label: 'Modern',
		icon: MdOutlineVilla,
		description: 'This property is modern!'
	},
	{
		label: 'Countryside',
		icon: TbMountain,
		description: 'This property is in the countryside!'
	},
	{
		label: 'Pools',
		icon: TbPool,
		description: 'This property has pools!'
	},
	{
		label: 'Islands',
		icon: GiIsland,
		description: 'This property is on an island!'
	},
	{
		label: 'Lake',
		icon: GiBoatFishing,
		description: 'This property is close to a lake!'
	},
	{
		label: 'Skiing',
		icon: FaSkiing,
		description: 'This property is close to a ski resort!'
	},
	{
		label: 'Castles',
		icon: GiCastle,
		description: 'This property is an ancient castle!'
	},
	{
		label: 'Caves',
		icon: GiCaveEntrance,
		description: 'This property is close to a cave!'
	},
	{
		label: 'Camping',
		icon: GiForestCamp,
		description: 'This property offers camping activities!'
	},
	{
		label: 'Arctic',
		icon: BsSnow,
		description: 'This property is in the arctic environment!'
	},
	{
		label: 'Desert',
		icon: GiCactus,
		description: 'This property is in the desert!'
	},
	{
		label: 'Barns',
		icon: GiBarn,
		description: 'This property is in a barn!'
	},
	{
		label: 'Lux',
		icon: IoDiamond,
		description: 'This property is brand new and  luxurious!'
	}
]

const Categories = () => {
	const params = useSearchParams()
	const category = params?.get('category')
	const pathname = usePathname()
	const isHome = pathname === '/'

	if (!isHome) return null

	return (
		<Container>
			<div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
				{categories.map((item) => (
					<CategoryBox
						key={item.label}
						label={item.label}
						icon={item.icon}
						selected={item.label === category}
					/>
				))}
			</div>
		</Container>
	)
}

export default Categories
