export interface IEventOptionalParams {
  [key: string]: string | number | boolean;
}

export abstract class Analytics {
  isActive = false;

  init(): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sendEvent(message: string, params?: IEventOptionalParams): void {}

  trackScreen(nameScreen: string): void {
      this.sendEvent(nameScreen);
  }

}
