export interface IUpdateMultiSelectorCommand {

  //#region Properties

  /*
  * Whether debounced time should be ignored.
  * */
  shouldIgnoreInterval: boolean;

  /*
  * Whether duplicate value should be ignored or not.
  * */
  shouldIgnoreDuplicate: boolean;

  //#endregion
}
