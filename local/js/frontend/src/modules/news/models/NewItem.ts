import { Picture } from "@/core/models";

export default interface NewItem {
    id: number;
    name: string;
    section?: string;
    picture?: Picture;
    tag?: string;
    date?: string;
}