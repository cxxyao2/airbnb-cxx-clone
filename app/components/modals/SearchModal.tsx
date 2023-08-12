'use client'

import qs from 'query-string'
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import { formatISO } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'

import useSearchModal from '@/app/hooks/useSearchModal'

import Modal from './Modal'
import Calendar from '../inputs/Calendar'
import Counter from '../inputs/Counter'
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect'
import Heading from '../shared/Heading'
import { de } from 'date-fns/locale'

enum STEPS {
	LOCATION,
	DATE = 1,
	INFO = 2
}

const SearchModal = () => {
	const router = useRouter()
	const searchModal = useSearchModal()
	const params = useSearchParams()

	const [step, setStep] = useState(STEPS.LOCATION)

	const [location, setLocation] = useState<CountrySelectValue>()
	const [guestCount, setGuestCount] = useState(1)
	const [roomCount, setRoomCount] = useState(1)
	const [bathroomCount, setBathroomCount] = useState(1)
	const [dateRange, setDateRange] = useState<Range>({
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection'
	})

	const Map = useMemo(
		() => dynamic(() => import('../shared/Map'), { ssr: true }),
		[location]
	)

	const onBack = useCallback(() => {
		setStep((value) => value - 1)
	}, [])

	const onNext = useCallback(() => {
		setStep((value) => value + 1)
	}, [])

	const onSubmit = useCallback(async () => {
		if (step !== STEPS.INFO) return onNext()

		let currentQuery = {}

		if (params) {
			currentQuery = qs.parse(params.toString())
		}

		const updatedQuery: any = {
			...currentQuery,
			locationValue: location?.value,
			guestCount,
			roomCount,
			bathroomCount
		}

		if (dateRange.startDate) {
			updatedQuery.startDate = formatISO(dateRange.startDate)
		}

		if (dateRange.endDate) {
			updatedQuery.endDate = formatISO(dateRange.endDate)
		}

		const url = qs.stringifyUrl(
			{
				url: '/',
				query: updatedQuery
			},
			{ skipNull: true }
		)

		setStep(STEPS.LOCATION)
		searchModal.onClose()
		router.push(url)
	}, [
		step,
		searchModal,
		location,
		router,
		guestCount,
		roomCount,
		dateRange,
		onNext,
		bathroomCount,
		params
	])

	const actionLabel = useMemo(() => {
		if (step === STEPS.INFO) return 'Search'
		return 'Next'
	}, [step])

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.LOCATION) return undefined

		return 'Back'
	}, [step])

	let bodyContent = (
		<div className='flex flex-col gap-8'>
			<Heading
				title='Where are you going?'
				subtitle='Find the perfect location'
			/>
			<CountrySelect
				value={location}
				onChange={(value) => setLocation(value as CountrySelectValue)}
			/>
			<hr />
			<Map center={location?.latlng} />
		</div>
	)

	if (step === STEPS.DATE) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading
					title='When do you plan to go?'
					subtitle='Make sure everyone is free!'
				/>
				<Calendar
					value={dateRange}
					onChange={(value) => setDateRange(value.selection)}
				/>
			</div>
		)
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading title='More information' subtitle='Find your perfect plan' />
				<Counter
					title='Guests'
					subtitle='How many people are coming?'
					value={guestCount}
					onChange={(value) => setGuestCount(value)}
				/>
				<hr />
				<Counter
					title='Rooms'
					subtitle='How many rooms do you need?'
					value={roomCount}
					onChange={(value) => setRoomCount(value)}
				/>
				<hr />
				<Counter
					title='Bathrooms'
					subtitle='How many bathrooms do you need?'
					value={bathroomCount}
					onChange={(value) => setBathroomCount(value)}
				/>
			</div>
		)
	}

	return (
		<Modal
			isOpen={searchModal.isOpen}
			title='Filters'
			actionLabel={actionLabel}
			onSubmit={onSubmit}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
			onClose={searchModal.onClose}
			body={bodyContent}
		/>
	)
}

export default SearchModal
