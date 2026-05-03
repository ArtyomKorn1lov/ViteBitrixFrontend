import { injectable, inject } from 'inversify';
import { SimpleObject } from '@/core/types';
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

  public async upload(file: FileUpload): Promise<string> {
    const response: SimpleObject | null | undefined = await this.apiClient.post<File, SimpleObject>(
      'bitrix/services/main/ajax.php?controller=main.site:core.controllers.pictureFileUploader&controllerOptions=%7B%7D&token=&action=ui.fileuploader.upload',
      {
        data: file.file,
        dataType: BodyTypes.upload,
        headers: FileMapper.buildAddsHeading(file),
      },
    );
    return FileMapper.fromUploadResponseToUId(response as SimpleObject);
  }
}
