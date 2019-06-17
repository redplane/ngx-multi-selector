import {InputParameter} from "./input-parameter";

export class OutputParameter{

  // Parameter name.
  public name: string;

  // Parameter description.
  public description: string;

  // List of arguments.
  public arguments: Array<InputParameter>;

}
