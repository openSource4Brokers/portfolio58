export interface AppRestoredResult {
  pluginId: string; // The pluginId this result corresponds to. For example, `Camera`.
  methodName: string; // The methodName this result corresponds to. For example, `getPhoto`
  data: string; // The result data passed from the plugin. For example, `CameraPhoto`
}
