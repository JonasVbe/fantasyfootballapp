import { ISpeler } from "./ISpeler";

export interface ISpeeldag{
    timestampTransfer: number
    timestampChange: number
    spelers: ISpeler[]

}
