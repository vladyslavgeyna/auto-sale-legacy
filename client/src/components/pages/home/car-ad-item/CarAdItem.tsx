import { FC } from 'react'
import { IGetCarAdsResponse } from '../../../../types/car-ad/get-car-ads-response.interface'

const CarAdItem: FC<{ carAd: IGetCarAdsResponse }> = ({ carAd }) => {
	return <div>CarAdItem</div>
}

export default CarAdItem
