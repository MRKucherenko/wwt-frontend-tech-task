import data from "../../../temp/filterData.json"
import { FiltersResponse } from "./FilterResponse"
import { FilterType } from "./FilterType"

export const filterdata: FiltersResponse = {
  filterItems: data.filterItems.map((item) => ({
    ...item,
    type: item.type as FilterType,
  })),
}