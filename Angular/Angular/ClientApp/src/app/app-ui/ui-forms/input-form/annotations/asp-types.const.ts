
import { controlTypes } from './control-types.const';
import { inputTypes } from './input-types.const';
import { validators } from './validators.const';
import { description } from './description.function';
import { input,markProperty,markModel } from '../../form-input/input-context';



export function ForRole(fields) {
  const description = arguments;
  return function (constructor: Function) {
    markModel(
      'Role',
      description,
      constructor.name);
  }
}

export function NullableContext(fields) {
  const description = arguments;
  return function (constructor: Function) {
    markModel(
      'NullableContext',
      description,
      constructor.name);
  }
}
export function InputPercentValue(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputPercentValue',
      description,
      target.constructor.name,
      property);
  }
}
export function RemoteValidation(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputCustom',
      description,
      target.constructor.name,
      property);
  }
}

export function InputCustom(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputCustom',
      description,
      target.constructor.name,
      property);
  }
}


export function UniqValidation(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'UniqValidation',
      description,
      target.constructor.name,
      property);
  }
}

export function InputDuration(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputDuration',
      description,
      target.constructor.name,
      property);
  }
}

export function InputPostalCode(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputPostalCode',
      description,
      target.constructor.name,
      property);
  }
}

export function InputXml(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputXml',
      description,
      target.constructor.name,
      property);
  }
}


export function InputCreditCard(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputCreditCard',
      description,
      target.constructor.name,
      property);
  }
}

export function InputCurrency(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputCurrency',
      description,
      target.constructor.name,
      property);
  }
}


export function type(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'type',
      description,
      target.constructor.name,
      property);
  }
}

export function DataType(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'DataType',
      description,
      target.constructor.name,
      property);
  }
}

export function SelectDataDictionary(expr, text?) {
  const description = arguments;
  return function (target, property) {
    markProperty(
      'SelectDataDictionary',
      description,
      target.constructor.name,
      property);
  }
}

export function Navigation(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'Navigation',
      description,
      target.constructor.name,
      property);
  }
}

export function ForeignProperty(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'propertyName',
      description,
      target.constructor.name,
      property);
  }
}
export function IsCollection(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'isCollection',
      description,
      target.constructor.name,
      property);
  }
}



export function SearchTerms(fields) {
  const description = arguments;
  return function (constructor: Function) {
    markModel(
      'TextSearch',
      description,
      constructor.name);
  }
}





export function TextSearch(fields) {
  const description = arguments;
  return function (constructor: Function) {
    markModel(
      'TextSearch',
      description,
      constructor.name);
  }
}

export function EntityLabel(expr, text?) {
  const description = arguments;
  return function(constructor: Function){
    markModel(
      'EntityLabel',
      description,
      constructor.name);
  }
}


export function EntityIcon(expr, text?) {
  const description = arguments;
  return function(constructor: Function){
    markModel(
      'EntityIcon',
      description,
      constructor.name);
  }
}


export function InputFile(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputFile',
      description,
      target.constructor.name,
      property);
  }
}

export function InputIcon(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputIcon',
      description,
      target.constructor.name,
      property);
  }
}



export function ForeignKey(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'ForeignKey',
      description,
      target.constructor.name,
      property);
  }
}


export function InputColor(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputColor',
      description,
      target.constructor.name,
      property);
  }
}

export function EngText(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'EngText',
      description,
      target.constructor.name,
      property);
  }
}


export function Embedded(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'Embedded',
      description,
      target.constructor.name,
      property);
  }
}

export function Nullable(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'Nullable',
      description,
      target.constructor.name,
      property);
  }
}

export function SelectControl(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'SelectControl',
      description,
      target.constructor.name,
      property);
  }
}

export function ControlImage(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'ControlImage',
      description,
      target.constructor.name,
      property);
  }
}

export function DateFormat(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'DateFormat',
      description,
      target.constructor.name,
      property);
  }
}

export function Details(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'Details',
      description,
      target.constructor.name,
      property);
  }
}



export function HelpMessage(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'HelpMessage',
      description,
      target.constructor.name,
      property);
  }
}











export function Match(expr, text?) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'Match',
      description,
      target.constructor.name,
      property);
  }
}


export function UrlValidation(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'UrlValidation',
      description,
      target.constructor.name,
      property);
  }
}

export function InputImageAttribute(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'UrlValidation',
      description,
      target.constructor.name,
      property);
  }
}

export function Select(text: string) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'Select',
      description,
      target.constructor.name,
      property);
  }
}

export function Day(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'Day',
      description,
      target.constructor.name,
      property);
  }
}

//TODO
export function InputBinaryAttribute(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputBinaryAttribute',
      description,
      target.constructor.name,
      property);
  }
}

export function InputMonthAttribute(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputMonthAttribute',
      description,
      target.constructor.name,
      property);
  }
}

export function InputPasswordAttribute(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputPasswordAttribute',
      description,
      target.constructor.name,
      property);
  }
}

export function InputPhoneAttribute(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputPhoneAttribute',
      description,
      target.constructor.name,
      property);
  }
}


export function Rus(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'Rus',
      description,
      target.constructor.name,
      property);
  }
}

export function Eng(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'Eng',
      description,
      target.constructor.name,
      property);
  }
}

export function InputUrlAttribute(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputUrlAttribute',
      description,
      target.constructor.name,
      property);
  }
}



export function Week(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'Week',
      description,
      target.constructor.name,
      property);
  }
}


export function Year(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'Year',
      description,
      target.constructor.name,
      property);
  }
}
export function Required(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'Required',
      description,
      target.constructor.name,
      property);
  }
}

export function BindProperty(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'BindProperty',
      description,
      target.constructor.name,
      property);
  }
}



/**
 * @param text Сообщение в случае отрицательной првоверки
 */
export function NotNullNotEmpty(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'NotNullNotEmpty',
      description,
      target.constructor.name,
      property);
  }
}

export function NotMapped(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'NotMapped',
      description,
      target.constructor.name,
      property);
  }
}



export function NotInput(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'NotInput',
      description,
      target.constructor.name,
      property);
  }
}

/**
 * Идентификатор не вводится пользователем, поэтому устанавливается метка для скрытия элемента отображения и ввода
 * @param text
 */
export function Key(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'Key',
      description,
      target.constructor.name,
      property);
  }
}

export function RusTextAttribute(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'RusTextAttribute',
      description,
      target.constructor.name,
      property);
  }
}

export function InputDateTimeAttribute(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputDateTimeAttribute',
      description,
      target.constructor.name,
      property);
  }
}

export function InputDateAttribute(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputDateAttribute',
      description,
      target.constructor.name,
      property);
  }
}

export function RequiredAttribute(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'RequiredAttribute',
      description,
      target.constructor.name,
      property);
  }
}
export function NotMappedAttribute(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'NotMappedAttribute',
      description,
      target.constructor.name,
      property);
  }
}
export function BindPropertyAttribute(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'BindPropertyAttribute',
      description,
      target.constructor.name,
      property);
  }
}
export function TextLengthAttribute(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'TextLengthAttribute',
      description,
      target.constructor.name,
      property);
  }
}
export function InputMultilineTextAttribute(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputMultilineTextAttribute',
      description,
      target.constructor.name,
      property);
  }
}




export function LabelAttribute(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'LabelAttribute',
      description,
      target.constructor.name,
      property);
  }
}


export function NotNullNotEmptyAttribute(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'NotNullNotEmptyAttribute',
      description,
      target.constructor.name,
      property);
  }
}

export function KeyAttribute(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'KeyAttribute',
      description,
      target.constructor.name,
      property);
  }
}





export function CollectionType(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'CollectionType',
      description,
      target.constructor.name,
      property);
  }
}

export function Label(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'Label',
      description,
      target.constructor.name,
      property);
  }
}


export function Icon(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'Icon',
      description,
      target.constructor.name,
      property);
  }
}


export function InputHiddenAttribute(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputHiddenAttribute',
      description,
      target.constructor.name,
      property);
  }
}


export function Help(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'Help',
      description,
      target.constructor.name,
      property);
  }
}


export function Format(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'Format',
      description,
      target.constructor.name,
      property);
  }
}




export function InputEmailAttribute(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputEmailAttribute',
      description,
      target.constructor.name,
      property);
  }
}



export function Len(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'Len',
      description,
      target.constructor.name,
      property);
  }

}


export function QR(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'QR',
      description,
      target.constructor.name,
      property);
  }
}

export function InputType(text: string) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputType',
      description,
      target.constructor.name,
      property);
  }
}


export function Editable(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'Editable',
      description,
      target.constructor.name,
      property);
  }
}


export function RusText(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'RusText',
      description,
      target.constructor.name,
      property);
  }
}






export function InputDate(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputDate',
      description,
      target.constructor.name,
      property);
  }
}

export function InputMonth(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputMonth',
      description,
      target.constructor.name,
      property);
  }
}

export function InputWeek(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputWeek',
      description,
      target.constructor.name,
      property);
  }
}


export function InputYear(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputYear',
      description,
      target.constructor.name,
      property);
  }
}

export function InputDateTime(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputDateTime',
      description,
      target.constructor.name,
      property);
  }
}





export function TextLength(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'TextLength',
      description,
      target.constructor.name,
      property);
  }
}
export function InputMultilineText(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputMultilineText',
      description,
      target.constructor.name,
      property);
  }
}








export function InputHidden(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputHidden',
      description,
      target.constructor.name,
      property);
  }
}


export function InputEmail(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputEmail',
      description,
      target.constructor.name,
      property);
  }
}





export function InputImage(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputImage',
      description,
      target.constructor.name,
      property);
  }
}




//TODO
export function InputBinary(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputBinary',
      description,
      target.constructor.name,
      property);
  }
}



export function InputPassword(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputPassword',
      description,
      target.constructor.name,
      property);
  }
}

export function InputPhone(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputPhone',
      description,
      target.constructor.name,
      property);
  }
}

export function ValidationFunction(text) {
  const description = arguments;
  return function (target, property) {
    markProperty(
      'ValidationFunction',
      description,
      target.constructor.name,
      property);
  }
}




export function InputUrl(text) {
  const description = arguments;
  return function(target,property){
    markProperty(
      'InputUrl',
      description,
      target.constructor.name,
      property);
  }
}



