import { CatalogItem } from "@/modules/catalog/models";

export default interface CatalogRepositoryInterface {
    getRelated: () => Promise<CatalogItem[] | null | undefined>;
}