import {CollectionType,type,DataType,Navigation,IsCollection,ForeignProperty,SelectControl,ControlImage,DateFormat,Details,EntityIcon,EntityLabel,HelpMessage,Icon,Label,InputColor,InputCreditCard,InputCurrency,InputCustom,InputDate,InputDateTime,InputDuration,InputEmail,InputHidden,InputImage,InputMonth,InputMultilineText,InputPassword,InputPhone,InputPostalCode,InputType,InputUrl,InputWeek,InputXml,InputYear,NotInput,EngText,Match,RusText,TextLength,Editable,NotNullNotEmpty,UniqValidation,RemoteValidation,ValidationFunction,TextSearch,InputFile,InputIcon,InputPercentValue,SearchTerms,SelectDataDictionary,ForRole,NotMapped,Key,ForeignKey} from 'src/app/app-ui/ui-forms/input-form/annotations/asp-types.const';


@EntityLabel('Учетная запись')
export class Account{


	@InputEmail('Электронный адрес задан некорректно')
	@Label('Электронный адрес')
	@NotNullNotEmpty('Не указан электронный адрес')
	Email :any=null;


	@InputDate('')
	@InputHidden('True')
	@NotInput('')
	Activated :any=null;


	@InputHidden('True')
	@NotInput('')
	ActivationKey :any=null;


	@InputHidden('True')
	@NotInput('')
	Hash :any=null;


	@InputHidden('True')
	@NotInput('')
	RFID :any=null;


	@Key('')
	@Label('Идентификатор')
	ID :number=0;


	@InputHidden("True")
	type: string = 'ApplicationDb.Entities.Account';


}