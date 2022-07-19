import {Person} from 'src/app/app-core/core-data/data-model/person.model';
import {CollectionType,type,DataType,Navigation,IsCollection,ForeignProperty,SelectControl,ControlImage,DateFormat,Details,EntityIcon,EntityLabel,HelpMessage,Icon,Label,InputColor,InputCreditCard,InputCurrency,InputCustom,InputDate,InputDateTime,InputDuration,InputEmail,InputHidden,InputImage,InputMonth,InputMultilineText,InputPassword,InputPhone,InputPostalCode,InputType,InputUrl,InputWeek,InputXml,InputYear,NotInput,EngText,Match,RusText,TextLength,Editable,NotNullNotEmpty,UniqValidation,RemoteValidation,ValidationFunction,TextSearch,InputFile,InputIcon,InputPercentValue,SearchTerms,SelectDataDictionary,ForRole,NotMapped,Key,ForeignKey} from 'src/app/app-ui/ui-forms/input-form/annotations/asp-types.const';


@EntityLabel('Группа пользователей')
export class Group{


	@Label('Наименование')
	@NotNullNotEmpty('Необходимо указать наименование')
	Name :any=null;


	@Label('Подробнее')
	@NotNullNotEmpty('Необходимо ввести подробное описание')
	@InputMultilineText('')
	@TextLength('Длина описания должна составлять меньше чем 512 символов')
	Description :any=null;


	@NotMapped('')
	@CollectionType('Person')
	People :Person=null;


	@Key('')
	@Label('Идентификатор')
	ID :number=0;


	@InputHidden("True")
	type: string = 'ApplicationDb.Entities.Group';


}