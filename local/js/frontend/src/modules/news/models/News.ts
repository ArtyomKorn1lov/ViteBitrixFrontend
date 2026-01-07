import { Picture } from "@/core";

export default interface News {
    id: number;
    name: string;
    description?: string;
    detailPageUrl?: string;
    section?: string;
    picture?: Picture;
    tag?: string;
    date?: string;
}