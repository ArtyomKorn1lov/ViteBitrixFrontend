import { BaseUseCase } from "@/core";
import { CatalogItem } from "@/modules/catalog/models";
import { CatalogRepositoryInterface } from "@/modules/catalog/repositories";

export default class GetRelated extends BaseUseCase {
    private repository: CatalogRepositoryInterface;

    public constructor(repository: CatalogRepositoryInterface) {
        super();
        this.repository = repository;
    }

    public async execute(): Promise<CatalogItem[]> {
        try {
            const response = await this.repository.getRelated();
            return response ?? [];
        } catch (exception) {
            throw exception;
        }
    }

}