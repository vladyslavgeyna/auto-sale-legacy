import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useActions } from '../../../../hooks/useActions'
import { useGetCarModelsQuery } from '../../../../store/api/car.api'
import { ICarSimpleResponse } from '../../../../types/car/car-simple-response'
import { getCurrentYear } from '../../../../utils/utils'
import Modal from '../../../ui/modal/Modal'
import PrimaryButton from '../../../ui/primary-button/PrimaryButton'
import PrimaryInput from '../../../ui/primary-input/PrimaryInput'
import PrimarySelect from '../../../ui/primary-select/PrimarySelect'
import styles from './FilterSortingModal.module.scss'

export const FilterSortingModal: FC<{
	isModalActive: boolean
	setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>
	regions: ICarSimpleResponse[]
	carBrands: ICarSimpleResponse[]
	orderByOptions: ICarSimpleResponse[]
}> = ({
	isModalActive,
	setIsModalActive,
	regions,
	carBrands,
	orderByOptions
}) => {
	const getYearArray = (min: number = 1900, max: number = getCurrentYear) => {
		const array = []
		for (let i = max; i >= min; i--) {
			array.push(i)
		}
		return array
	}

	const [searchParams, setSearchParams] = useSearchParams()

	const [selectedCarBrand, setSelectedCarBrand] = useState(
		searchParams.get('carBrandId') || ''
	)

	const [selectedCarModel, setSelectedCarModel] = useState(
		searchParams.get('carModelId') || ''
	)

	const [selectedRegion, setSelectedRegion] = useState(
		searchParams.get('region') || ''
	)

	const [selectedOrderBy, setSelectedOrderBy] = useState(
		searchParams.get('orderBy') || ''
	)

	const [selectedYearTo, setSelectedYearTo] = useState(
		searchParams.get('yearTo') || ''
	)

	const [selectedYearFrom, setSelectedYearFrom] = useState(
		searchParams.get('yearFrom') || ''
	)

	const [selectedPriceTo, setSelectedPriceTo] = useState(
		searchParams.get('priceTo') || ''
	)

	const [selectedPriceFrom, setSelectedPriceFrom] = useState(
		searchParams.get('priceFrom') || ''
	)

	const [yearFromArray, setYearFromArray] = useState(getYearArray())

	const [yearToArray, setYearToArray] = useState(getYearArray())

	const [carModels, setCarModels] = useState<ICarSimpleResponse[]>([])

	const { data } = useGetCarModelsQuery(Number(selectedCarBrand), {
		skip: !selectedCarBrand
	})

	useEffect(() => {
		if (data) {
			setCarModels(data)
		}
	}, [data])

	interface IFilterSortForm {
		carBrandId?: number
		carModelId?: number
		region?: number
		yearFrom?: number
		yearTo?: number
		priceFrom?: number
		priceTo?: number
		orderBy?: number
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			setIsModalActive(false)
			updateQueryParam({
				carBrandId: selectedCarBrand
					? Number(selectedCarBrand)
					: undefined,
				carModelId: selectedCarModel
					? Number(selectedCarModel)
					: undefined,
				priceFrom: selectedPriceFrom
					? Number(selectedPriceFrom)
					: undefined,
				priceTo: selectedPriceTo ? Number(selectedPriceTo) : undefined,
				region: selectedRegion ? Number(selectedRegion) : undefined,
				orderBy: selectedOrderBy ? Number(selectedOrderBy) : undefined,
				yearFrom: selectedYearFrom
					? Number(selectedYearFrom)
					: undefined,
				yearTo: selectedYearTo ? Number(selectedYearTo) : undefined
			})
		} catch (error) {
			console.log(error)
		}
	}

	const handleReset = () => {
		setCarModels([])
		setSelectedCarBrand('')
		setSelectedCarModel('')
		setSelectedRegion('')
		setSelectedOrderBy('')
		setSelectedPriceFrom('')
		setSelectedPriceTo('')
		setSelectedYearFrom('')
		setSelectedYearTo('')
		setCurrentPage(1)
		setIsModalActive(false)
		navigate('/')
	}

	const updateQueryParam = (data: IFilterSortForm) => {
		const existingSearchParams = Object.fromEntries(searchParams.entries())
		for (const key in data) {
			if (key in data) {
				if (data[key as keyof IFilterSortForm]) {
					existingSearchParams[key] = String(
						data[key as keyof IFilterSortForm]
					)
					setSearchParams(existingSearchParams)
				}
			}
		}
	}

	const navigate = useNavigate()

	const handleYearToSelect = (value: string) => {
		setSelectedYearTo(value)
		setYearFromArray(getYearArray(1900, Number(value)))
	}

	const handleYearFromSelect = (value: string) => {
		setSelectedYearFrom(value)
		setYearToArray(getYearArray(Number(value)))
	}

	const handleCarBrandIdSelect = (value: string) => {
		setSelectedCarModel('')
		setSelectedCarBrand(value)
	}

	const { setCurrentPage } = useActions()

	return (
		<Modal isActive={isModalActive} setIsActive={setIsModalActive}>
			<form
				method='post'
				onSubmit={e => onSubmit(e)}
				className={styles.modalWrapper}>
				<div className={styles.modalHeader}>Filtration and sorting</div>
				<div className={styles.modalBody}>
					<div>
						<PrimarySelect
							defaultValue=''
							name={'carBrandId'}
							value={selectedCarBrand}
							onChange={handleCarBrandIdSelect}>
							<option value={''} disabled>
								Brand
							</option>
							{carBrands?.map(item => (
								<option key={item.id} value={item.id}>
									{item.value}
								</option>
							))}
						</PrimarySelect>
					</div>
					<div className={styles.complexFormItem}>
						Year:
						<PrimarySelect
							defaultValue=''
							value={selectedYearFrom}
							name={'yearFrom'}
							onChange={handleYearFromSelect}>
							<option value={''} disabled>
								From
							</option>
							{yearFromArray?.map(item => (
								<option key={item} value={item}>
									{item}
								</option>
							))}
						</PrimarySelect>
						<PrimarySelect
							defaultValue=''
							value={selectedYearTo}
							name={'yearTo'}
							onChange={handleYearToSelect}>
							<option value={''} disabled>
								To
							</option>
							{yearToArray?.map(item => (
								<option key={item} value={item}>
									{item}
								</option>
							))}
						</PrimarySelect>
					</div>
					<div>
						<PrimarySelect
							defaultValue=''
							name={'carModelId'}
							value={selectedCarModel}
							onChange={setSelectedCarModel}>
							<option value={''} disabled>
								Model
							</option>
							{carModels?.map(item => (
								<option key={item.id} value={item.id}>
									{item.value}
								</option>
							))}
						</PrimarySelect>
					</div>
					<div className={styles.complexFormItem}>
						Price&nbsp;($):
						<PrimaryInput
							value={selectedPriceFrom}
							name={'priceFrom'}
							placeholder='From'
							onBlur={e => {
								if (
									selectedPriceTo &&
									selectedPriceFrom &&
									Number(selectedPriceFrom) >
										Number(selectedPriceTo)
								) {
									setSelectedPriceTo('')
								}
							}}
							onChange={e => {
								const value = e.target.value.replace(/\D/g, '')

								setSelectedPriceFrom(value)
							}}
						/>
						<PrimaryInput
							value={selectedPriceTo}
							name={'priceTo'}
							placeholder='To'
							onBlur={e => {
								if (
									selectedPriceFrom &&
									selectedPriceTo &&
									Number(selectedPriceTo) <
										Number(selectedPriceFrom)
								) {
									setSelectedPriceFrom('')
								}
							}}
							onChange={e => {
								const value = e.target.value.replace(/\D/g, '')

								setSelectedPriceTo(value)
							}}
						/>
					</div>
					<div>
						<PrimarySelect
							defaultValue=''
							name={'region'}
							value={selectedRegion}
							onChange={setSelectedRegion}>
							<option value={''} disabled>
								Region
							</option>
							{regions?.map(item => (
								<option key={item.id} value={item.id}>
									{item.value}
								</option>
							))}
						</PrimarySelect>
					</div>
					<div className={styles.complexFormItem}>
						Order&nbsp;by:&nbsp;
						<PrimarySelect
							defaultValue=''
							name={'orderBy'}
							value={selectedOrderBy}
							onChange={setSelectedOrderBy}>
							{orderByOptions?.map(item => (
								<option key={item.id} value={item.id}>
									{item.value}
								</option>
							))}
						</PrimarySelect>
					</div>
				</div>
				<div className={styles.modalFooter}>
					<PrimaryButton
						type='button'
						onClick={() => setIsModalActive(false)}>
						Cancel
					</PrimaryButton>
					<PrimaryButton onClick={handleReset} type='button'>
						Reset
					</PrimaryButton>
					<PrimaryButton type='submit'>Apply</PrimaryButton>
				</div>
			</form>
		</Modal>
	)
}
