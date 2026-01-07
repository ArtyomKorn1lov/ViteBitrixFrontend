import { News } from "@/modules/news/models";

export default interface NewsRepositoryInterface {
    getList: (page: number) => Promise<News[] | null | undefined>;
}