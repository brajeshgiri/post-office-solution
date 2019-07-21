export interface ShipmentTypeModel {
    id: number,
    name: string
}

export interface WeightTypeModel {
    id: number,
    desc: string
}


export interface ShipmentModel {
    id: string,
    type: ShipmentTypeModel,
    origin: boolean,
    destination: boolean,
    delivered: boolean,
    weight: WeightTypeModel,
    office: PostOffice

}

