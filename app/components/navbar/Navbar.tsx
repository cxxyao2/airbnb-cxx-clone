import { SafeUser } from '@/app/types'

import Categories from './Categories'
import Container from '../shared/Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'

interface NavbarProps {
	currentUser?: SafeUser | null
}

const Navbar = ({ currentUser }: NavbarProps) => {
	{
		/* I changed the initial tutorial code. I dont like div tag. nav tag is more meaning and intuitive for menu. */
	}
	return (
		<nav className='fixed w-full bg-white z-10 shadow-sm'>
			<div className='py-4 border-b-[1px]'>
				<Container>
					<div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
						<Logo />
						<Search />
						<UserMenu currentUser={currentUser} />
					</div>
				</Container>
			</div>
			<Categories />
		</nav>
	)
}

export default Navbar
