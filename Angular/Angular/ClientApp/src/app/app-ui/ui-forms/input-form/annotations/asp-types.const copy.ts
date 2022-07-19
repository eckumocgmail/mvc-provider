import { controlTypes } from './control-types.const';
import { inputTypes } from './input-types.const';
import { validators } from './validators.const';
import { description } from './description.function';


//Embedded,Nullable,SelectControl,ControlImage,DateFormat,Details,HelpMessage,Icon,Label,InputColor


/**
 * @param text Сообщение в случае отрицательной првоверки
 */
export function NotNullNotEmpty(text) {
  return validators.required(true, text);
}

export function NotMapped(text) {
  return function (target, prop) {
    description(target, prop).label = text;
  };
}

/**
 * Идентификатор не вводится пользователем, поэтому устанавливается метка для скрытия элемента отображения и ввода
 * @param text
 */
export function Key(text) {
  return function (target, prop) {
    description(target, prop).hidden = true;
  };
}

export function RusTextAttribute(text) {
  return validators.rus(text);
}

export function InputDateTimeAttribute(text) {
  return function (target, prop) {
    description(target, prop).label = text;
  };
}

export function InputDateAttribute(text) {
  return function (target, prop) {
    description(target, prop).label = text;
  };
}

export function RequiredAttribute(text) {
  return function (target, prop) {
    description(target, prop).label = text;
  };
}
export function NotMappedAttribute(text) {
  return function (target, prop) {
    description(target, prop).label = text;
  };
}
export function BindPropertyAttribute(text) {
  return function (target, prop) {
    description(target, prop).label = text;
  };
}
export function TextLengthAttribute(text) {
  return function (target, prop) {
    description(target, prop).label = text;
  };
}
export function InputMultilineTextAttribute(text) {
  return function (target, prop) {
    description(target, prop).label = text;
  };
}




export function LabelAttribute(text) {
  return function (target, prop) {
    description(target, prop).label = text;
  };
}


export function NotNullNotEmptyAttribute(text) {
  return function (target, prop) {
    description(target, prop).label = text;
  };
}

export function KeyAttribute(text) {
  return function (target, prop) {
    description(target, prop).label = text;
  };
}









export function Label(text) {
  return function (target, prop) {
    description(target, prop).label = text;
  };
}


export function Icon(text) {
  return function (target, prop) {
    description(target, prop).icon = text;
  };
}


export function InputHiddenAttribute(text) {
  return function (target, prop) {
    description(target, prop).hidden = text;
  };
}


export function Help(text) {
  return function (target, prop) {
    description(target, prop).help = text;
  };
}


export function Format(text) {
  return function (target, prop) {
    description(target, prop).format = text;
  };
}


export function Editable(text) {
  return function (target, prop) {
    description(target, prop).editable = text;
  };
}

export function InputEmailAttribute(text) {
  return validators.email(text);
}



export function Len(text) {
  return validators.length(0, parseInt(text));
}



export function InputType(text: string) {
  if (text.toLowerCase() == 'datetime') text = 'date';
  return inputTypes[text.toLowerCase()]();

}

export function Match(expr, text?) {
  return validators.regexp(expr, text);
}


export function UrlValidation(text) {
  return validators.url(text);
}

export function InputImageAttribute(text) {
  return function (target, prop) {
    description(target, prop).editable = text;
  };
}

export function Select(text: string) {
  return controlTypes.selectbox(text.split(','));
}

export function Day(text) {
  return inputTypes.date;
}

//TODO
export function InputBinaryAttribute(text) {
  return function (target, prop) {
    description(target, prop).editable = text;
  };
}

export function InputMonthAttribute(text) {
  return inputTypes.month();
}

export function InputPasswordAttribute(text) {
  return inputTypes.password();
}

export function InputPhoneAttribute(text) {
  return inputTypes.phone(text);
}


export function Rus(text) {
  return validators.rus(text);
}

export function Eng(text) {
  return validators.eng(text);
}

export function InputUrlAttribute(text) {
  return function (target, prop) {
    description(target, prop).editable = text;
  };
}



export function Week(text) {
  return function (target, prop) {
    description(target, prop).editable = text;
  };
}


export function Year(text) {
  return function (target, prop) {
    description(target, prop).editable = text;
  };
}



export function QR(text) {
  return function (target, prop) {
    description(target, prop).editable = text;
  };
}


export function RusText(text) {
  return function (target, prop) {
    description(target, prop).label = text;
  };
}

export function InputDateTime(text) {
  return function (target, prop) {
    description(target, prop).label = text;
  };
}

export function InputDate(text) {
  return function (target, prop) {
    description(target, prop).label = text;
  };
}

export function Required(text) {
  return function (target, prop) {
    description(target, prop).label = text;
  };
}

export function BindProperty(text) {
  return function (target, prop) {
    description(target, prop).label = text;
  };
}
export function TextLength(text) {
  return function (target, prop) {
    description(target, prop).label = text;
  };
}
export function InputMultilineText(text) {
  return function (target, prop) {
    controlTypes.textarea()(target,prop);
  };
}








export function InputHidden(text) {
  return function (target, prop) {
    description(target, prop).hidden = text==='True'? true: false;
  };
}


export function InputEmail(text) {
  return validators.email(text);
}





export function InputImage(text) {
  return function (target, prop) {
    description(target, prop).editable = text;
  };
}




//TODO
export function InputBinary(text) {
  return function (target, prop) {
    description(target, prop).editable = text;
  };
}

export function InputMonth(text) {
  return inputTypes.month();
}

export function InputPassword(text) {
  return inputTypes.password();
}

export function InputPhone(text) {
  return inputTypes.phone(text);
}




export function InputUrl(text) {
  return function (target, prop) {
    description(target, prop).editable = text;
  };
}



