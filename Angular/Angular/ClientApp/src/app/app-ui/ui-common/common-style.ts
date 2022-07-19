import { SelectControl } from "../ui-forms/input-form/annotations/asp-types.const";


export class CommonCssStyle
{
  @SelectControl('align-baseline,align-top,align-middle,align-bottom,align-text-bottom, и align-text-top')
  verticalAlign: string = 'align-top';
}
