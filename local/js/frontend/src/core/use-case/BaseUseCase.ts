/**
 * @description Абстрактный класс для реализации use-case'ов
 */
export default abstract class BaseUseCase {
  public abstract execute(...args: any[]): any;
}
