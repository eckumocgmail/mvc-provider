import {CollectionType,type,DataType,Navigation,IsCollection,ForeignProperty,SelectControl,ControlImage,DateFormat,Details,EntityIcon,EntityLabel,HelpMessage,Icon,Label,InputColor,InputCreditCard,InputCurrency,InputCustom,InputDate,InputDateTime,InputDuration,InputEmail,InputHidden,InputImage,InputMonth,InputMultilineText,InputPassword,InputPhone,InputPostalCode,InputType,InputUrl,InputWeek,InputXml,InputYear,NotInput,EngText,Match,RusText,TextLength,Editable,NotNullNotEmpty,UniqValidation,RemoteValidation,ValidationFunction,TextSearch,InputFile,InputIcon,InputPercentValue,SearchTerms,SelectDataDictionary,ForRole,NotMapped,Key,ForeignKey} from 'src/app/app-ui/ui-forms/input-form/annotations/asp-types.const';


@EntityLabel('Приложение')
export class WebApp{


	@Label('Наименование')
	@NotNullNotEmpty('Не указано наименование сервиса')
	Name :any=null;


	@Label('URL-адрес')
	@NotNullNotEmpty('Не указан URL-адрес')
	URL :any=null;


	Hash :any=null;


	@Label('Последнее посещение')
	LastActive :number=0;


	@Label('Онлайн')
	IsActive :boolean=false;


	@Label('Секретный ключ')
	SecretKey :any=null;


	@Key('')
	@Label('Идентификатор')
	ID :number=0;


	@InputHidden("True")
	type: string = 'ApplicationDb.Entities.WebApp';


}