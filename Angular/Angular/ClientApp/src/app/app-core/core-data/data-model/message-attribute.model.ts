import {ValidationModel} from 'src/app/app-core/core-data/data-model/validation-model.model';
import {CollectionType,type,DataType,Navigation,IsCollection,ForeignProperty,SelectControl,ControlImage,DateFormat,Details,EntityIcon,EntityLabel,HelpMessage,Icon,Label,InputColor,InputCreditCard,InputCurrency,InputCustom,InputDate,InputDateTime,InputDuration,InputEmail,InputHidden,InputImage,InputMonth,InputMultilineText,InputPassword,InputPhone,InputPostalCode,InputType,InputUrl,InputWeek,InputXml,InputYear,NotInput,EngText,Match,RusText,TextLength,Editable,NotNullNotEmpty,UniqValidation,RemoteValidation,ValidationFunction,TextSearch,InputFile,InputIcon,InputPercentValue,SearchTerms,SelectDataDictionary,ForRole,NotMapped,Key,ForeignKey} from 'src/app/app-ui/ui-forms/input-form/annotations/asp-types.const';


@EntityLabel('Атрибут сообщения')
export class MessageAttribute{


	@Label('Иконка')
	@InputIcon('')
	Icon :any=null;


	@Label('Тип данных')
	@NotNullNotEmpty('Обязатльно укажите тип данных')
	DataType :any=null;


	@Label('Тип ввода')
	@NotNullNotEmpty('Обязатльно укажите тип ввода')
	InputType :any=null;


	@Label('Краткое описание')
	Description :any=null;


	@Label('Методы провероки')
	@ForeignProperty('ValidationsID')
	@IsCollection('True')
	@type('NetCoreConstructorAngular.Data.DataConverter.Models.MyNavigationOptions')
	@Navigation('ValidationsID')
	@CollectionType('ValidationModel')
	Validations :ValidationModel[]=[];


	@Label('Наименование')
	@NotNullNotEmpty('Необходимо указать наименование')
	@UniqValidation('Имя должно иметь уникальное значение')
	@RusText('Используйте русский имена')
	Name :any=null;


	@NotMapped('')
	@InputHidden('True')
	Item :any=null;


	@NotMapped('')
	@InputHidden('True')
	Value :any=null;


	@Key('')
	@Label('Идентификатор')
	ID :number=0;


	@InputHidden("True")
	type: string = 'MessageAttribute';


}