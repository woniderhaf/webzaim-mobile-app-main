import { NativeModules } from 'react-native';

const { AppMetrica: AppMetricaCore } = NativeModules;

interface IReportEventParams {
  [key: string]: string | number | boolean | undefined;
}

interface AppMetricaInterface {
  /**
   * @description Инициализация библиотеки
   * @param {string} API_Key
   */
  activate(API_Key: string): void;

  /**
   * @description Отправка события в консоль AppMetrica
   * @param {string} message
   * @param {IReportEventParams | null} params
   */
  reportEvent(message: string, params: IReportEventParams | null): void;
}

export default AppMetricaCore as AppMetricaInterface;
