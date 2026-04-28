import { SearchRequestFilter} from "./SearchRequestFilter";
import { FilterType } from "../Filter";

export const buildSearchRequest = (filters: Record<string, string[]>): SearchRequestFilter[] => {
    return Object.entries(filters).map(([id, optionsIds]) => ({
        id,
        type: FilterType.OPTION,
        optionsIds
    }))
}