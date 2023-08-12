'use client'

import { Range } from 'react-date-range'

import Button from '../shared/Button'
import Calendar from '../inputs/Calendar'

interface ListingReservationProps {
	price: number
	dateRange: Range
	totalPrice: number
	onChangeDate: (value: Range) => void
	onSubmit: () => void
	disabled?: boolean
	disabledDates?: Date[]
}

const ListingReservation = ({
	price,
	dateRange,
	totalPrice,
	onChangeDate,
	onSubmit,
	disabled,
	disabledDates
}: ListingReservationProps) => {
	return (
		<div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
			<div className='flex flex-row items-center gap-1 p-4'>
				<div className='font-semibold text-2xl'>${price}</div>
				<div className='font-light text-neutral-400'>per night</div>
			</div>
			<hr />
			<Calendar
				value={dateRange}
				onChange={(value) => onChangeDate(value.selection)}
				disabledDates={disabledDates}
			/>
			<hr />
			<div className='p-4'>
				<Button disabled={disabled} label='Reserve' onClick={onSubmit} />
			</div>
			<hr />
			<div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
				<div>Total</div>
				<div>${totalPrice}</div>
			</div>
		</div>
	)
}

export default ListingReservation
