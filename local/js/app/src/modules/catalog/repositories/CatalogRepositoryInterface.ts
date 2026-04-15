import { CatalogItem } from '@/modules/catalog/models';

interface CatalogRepositoryInterface {
  getRelated: () => Promise<CatalogItem[] | null | undefined>;
}

export default CatalogRepositoryInterface;
