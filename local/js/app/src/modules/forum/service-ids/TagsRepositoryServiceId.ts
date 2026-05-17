import { ServiceIdentifier } from 'inversify';
import { TagsRepositoryInterface } from '@/modules/forum/interfaces';

const TagsRepositoryServiceId: ServiceIdentifier<TagsRepositoryInterface> = Symbol.for('TagsRepositoryInterface');

export default TagsRepositoryServiceId;
