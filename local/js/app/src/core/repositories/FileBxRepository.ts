import { injectable, inject } from 'inversify';
import { FileUpload } from '@/core/models';
import { BodyTypes } from '@/core/enums';
import { FileRepositoryInterface, ApiClientInterface } from '@/core/interfaces';
import { ApiClientServiceId } from '@/core/service-ids';
import { FileMapper } from '@/core/mappers';

@injectable()
export default class FileBxRepository implements FileRepositoryInterface {
  public constructor(
    @inject(ApiClientServiceId)
    private apiClient: ApiClientInterface,
  ) {}

  public async upload(file: FileUpload): Promise<number> {
    const response: number | null | undefined = await this.apiClient.post<File, number>('api/file/upload', {
      data: file.file,
      dataType: BodyTypes.upload,
      headers: FileMapper.buildAddsHeading(file),
    });
    return response as number;
  }
}
