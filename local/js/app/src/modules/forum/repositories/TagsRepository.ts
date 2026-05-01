import { inject, injectable } from 'inversify';
import { ApiClientInterface, ApiClientServiceId, Tag } from '@/core';
import { TagsRepositoryInterface } from '@/modules/forum/interfaces';
import { TagsMapper } from '@/modules/forum/mappers';

@injectable()
export default class TagsRepository implements TagsRepositoryInterface {
  public constructor(
    @inject(ApiClientServiceId)
    private readonly apiClient: ApiClientInterface,
  ) {}

  public async getAll(): Promise<Tag[]> {
    const response: Tag[] | null | undefined = await this.apiClient.get<void, Tag[]>('api/tags/items');
    return TagsMapper.fromResponseToList(response);
  }
}
