import { AxiosInstance } from "axios";
import { FindInventory, InventoryFindResponse } from "../domain";

export class Inventory {
    constructor(private readonly http: AxiosInstance) { }

    async find(query: FindInventory): Promise<InventoryFindResponse> {
        const resp = await this.http.get<InventoryFindResponse>(`inventories/find`, {
            params: query
        })

        return resp.data
    }
}