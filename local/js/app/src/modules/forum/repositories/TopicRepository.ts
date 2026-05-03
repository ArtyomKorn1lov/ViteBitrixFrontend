import { inject, injectable } from 'inversify';
import { SimpleObject, ApiClientInterface, ApiClientServiceId, CommonResponse } from '@/core';
import { TopicRepositoryInterface } from '@/modules/forum/interfaces';
import { Group, ShortGroup, Topic, TopicCreate, TopicDetail, TopicUpdate } from '@/modules/forum/models';
import { TopicMapper } from '@/modules/forum/mappers';

@injectable()
export default class TopicRepository implements TopicRepositoryInterface {
  public constructor(
    @inject(ApiClientServiceId)
    private readonly apiClient: ApiClientInterface,
  ) {}

  public async getGroups(page?: number): Promise<Group[]> {
    const object: SimpleObject = {
      page,
    };
    const response: Group[] | null | undefined = await this.apiClient.post<SimpleObject, Group[]>('api/topic/groups', {
      data: object,
    });
    return TopicMapper.fromGroupResponseToList(response);
  }

  public async getAllGroups(): Promise<ShortGroup[]> {
    const response: Group[] | null | undefined = await this.apiClient.get<void, Group[]>('api/topic/groups/all');
    return TopicMapper.fromShortGroupResponseToList(response);
  }

  public async getTopics(groupId?: number, page?: number): Promise<Topic[]> {
    const object: SimpleObject = {
      groupId,
      page,
    };
    const response: Topic[] | null | undefined = await this.apiClient.post<SimpleObject, Topic[]>('api/topic/items', {
      data: object,
    });
    return TopicMapper.fromResponseToList(response);
  }

  public async getTopicById(id: number): Promise<TopicDetail> {
    const response: TopicDetail | null | undefined = await this.apiClient.get<void, TopicDetail>(`api/topic/${id}`);
    return TopicMapper.fromResponseToDetail(response);
  }

  public async create(object: TopicCreate): Promise<CommonResponse> {
    const response: CommonResponse | null | undefined = await this.apiClient.post<TopicCreate, CommonResponse>('api/topic/create', {
      data: object,
    });
    return response as CommonResponse;
  }

  public async update(object: TopicUpdate): Promise<CommonResponse> {
    const response: CommonResponse | null | undefined = await this.apiClient.put<TopicUpdate, CommonResponse>('api/topic/update', {
      data: object,
    });
    return response as CommonResponse;
  }
}
