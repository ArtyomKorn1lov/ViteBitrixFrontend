import { ServiceIdentifier } from 'inversify';
import { FileRepositoryInterface } from '@/core/interfaces';

const FileRepositoryServiceId: ServiceIdentifier<FileRepositoryInterface> = Symbol.for('FileRepositoryServiceId');

export default FileRepositoryServiceId;
