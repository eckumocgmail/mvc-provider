import { DescriptionModel } from './description.model';

export class DescriptorModel
{
  name: string;
  properties: { [property: string]: DescriptionModel } = {};
}
