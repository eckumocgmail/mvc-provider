import {CollectionType,type,DataType,Navigation,IsCollection,ForeignProperty,SelectControl,ControlImage,DateFormat,Details,EntityIcon,EntityLabel,HelpMessage,Icon,Label,InputColor,InputCreditCard,InputCurrency,InputCustom,InputDate,InputDateTime,InputDuration,InputEmail,InputHidden,InputImage,InputMonth,InputMultilineText,InputPassword,InputPhone,InputPostalCode,InputType,InputUrl,InputWeek,InputXml,InputYear,NotInput,EngText,Match,RusText,TextLength,Editable,NotNullNotEmpty,UniqValidation,RemoteValidation,ValidationFunction,TextSearch,InputFile,InputIcon,InputPercentValue,SearchTerms,SelectDataDictionary,ForRole,NotMapped,Key,ForeignKey} from 'src/app/app-ui/ui-forms/input-form/annotations/asp-types.const';


@EntityLabel('Личные данные')
export class Person{


	@Label('Фамилия')
	@NotNullNotEmpty('Не указана фамилия пользователя')
	@RusText('Записывайте фамилию кирилицей')
	@Icon('person')
	SurName :any=null;


	@Label('Имя')
	@NotNullNotEmpty('Не указано имя пользователя')
	@RusText('Записывайте имя кирилицей')
	@Icon('person')
	FirstName :any=null;


	@Label('Отчество')
	@NotNullNotEmpty('Не указано отчество пользователя')
	@RusText('Записывайте отчество кирилицей')
	@Icon('person')
	LastName :any=null;


	@Label('Дата рождения')
	@InputDateTime('')
	@NotNullNotEmpty('Не указана дата рождения пользователя')
	@Icon('person')
	Birthday :Date=new Date();


	@InputPhone('Номер телефона указан неверно')
	@Label('Номер телефона')
	@NotNullNotEmpty('Не указана номер телефона')
	@Icon('phone')
	Tel :any=null;


	@Key('')
	@Label('Идентификатор')
	ID :number=0;


	@InputHidden("True")
	type: string = 'ApplicationDb.Entities.Person';


}