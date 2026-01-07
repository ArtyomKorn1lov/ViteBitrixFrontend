import { DependencyInjection } from "@/core";
import { NewsRepository } from "@/modules/news/repositories";
import { GetNews } from "@/modules/news/use-case";

DependencyInjection.register('NewsRepositoryInterface', NewsRepository, ["ApiClient"]);
DependencyInjection.register('GetNews', GetNews, ['NewsRepositoryInterface', 'ValidationProvider']);