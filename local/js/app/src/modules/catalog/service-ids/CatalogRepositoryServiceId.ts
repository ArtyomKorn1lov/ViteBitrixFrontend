import { ServiceIdentifier } from 'inversify';
import { CatalogRepositoryInterface } from '@/modules/catalog/interfaces';

const CatalogRepositoryServiceId: ServiceIdentifier<CatalogRepositoryInterface> = Symbol.for('CatalogRepositoryServiceId');

export default CatalogRepositoryServiceId;
