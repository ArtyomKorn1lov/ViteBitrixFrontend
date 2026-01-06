import { Picture } from "@/core/models";

export default interface CatalogItem {
    id: number;
    name: string;
    description?: string;
    picture?: Picture;
    tag?: string;
    date?: string;
}