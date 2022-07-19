import { dataTypes } from 'src/app/app-ui/ui-forms/input-form/annotations/data-types.const';
import { annotations } from 'src/app/app-ui/ui-forms/input-form/annotations/annotations';
import { inputTypes } from 'src/app/app-ui/ui-forms/input-form/annotations/input-types.const';
import { controlTypes } from 'src/app/app-ui/ui-forms/input-form/annotations/control-types.const';
import { validators } from 'src/app/app-ui/ui-forms/input-form/annotations/validators.const';

export class ColumnModel
{

  @validators.required(true)
  name: string = '';

  @controlTypes.selectbox( Object.getOwnPropertyNames(dataTypes) )
  type: string = 'string';

  @inputTypes.text()
  description: any;

  primary= false;
  incremental= false;
  unique= false;
  nullable= false;

  @annotations.hint("Имя свойства")
  defaults: any = '';

}
