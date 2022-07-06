import { BaseModel } from "./BaseModel";
import { getFromStorage, addToStorage } from "../utils";

export class ProgressTaskAdds extends BaseModel {
    constructor(login, textTask) {
      super();
      this.login = login;
      this.textTask = textTask;
      this.storageKey = "tasks";
      this.status = "progressTask";
    }
   
      static save(task) {
        try {
          addToStorage(task, task.storageKey, task.status);
          return true;
        } catch (e) {
          throw new Error(e);
        }
      }
}