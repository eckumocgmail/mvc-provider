import {CollectionType,type,DataType,Navigation,IsCollection,ForeignProperty,SelectControl,ControlImage,DateFormat,Details,EntityIcon,EntityLabel,HelpMessage,Icon,Label,InputColor,InputCreditCard,InputCurrency,InputCustom,InputDate,InputDateTime,InputDuration,InputEmail,InputHidden,InputImage,InputMonth,InputMultilineText,InputPassword,InputPhone,InputPostalCode,InputType,InputUrl,InputWeek,InputXml,InputYear,NotInput,EngText,Match,RusText,TextLength,Editable,NotNullNotEmpty,UniqValidation,RemoteValidation,ValidationFunction,TextSearch,InputFile,InputIcon,InputPercentValue,SearchTerms,SelectDataDictionary,ForRole,NotMapped,Key,ForeignKey} from 'src/app/app-ui/ui-forms/input-form/annotations/asp-types.const';


@EntityLabel('Бинарные данные')
export class Resource{


	@NotNullNotEmpty('Необходимо указать наименование ресурса')
	Name :any=null;


	@NotNullNotEmpty('Необходимо ввести задать тип ресурса (MimeType)')
	Mime :any=null;


	@NotNullNotEmpty('Необходимо ввести бинарные данные ресурса')
	@InputFile('')
	Data :any=null;


	@InputDateTime('')
	@NotNullNotEmpty('Необходимо указать время создания ресурса')
	Created :Date=new Date();


	@Key('')
	@Label('Идентификатор')
	ID :number=0;


	@InputHidden("True")
	type: string = 'ApplicationDb.Entities.Resource';


}