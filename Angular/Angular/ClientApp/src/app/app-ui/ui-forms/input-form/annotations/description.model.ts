export class DescriptionModel
{
  name: string;
  type: string;
  validators: ((value)=>void)[] = [];

}
