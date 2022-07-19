import {Calendar} from 'src/app/app-core/core-data/data-model/calendar.model';
import {User} from 'src/app/app-core/core-data/data-model/user.model';
import {CollectionType,type,DataType,Navigation,IsCollection,ForeignProperty,SelectControl,ControlImage,DateFormat,Details,EntityIcon,EntityLabel,HelpMessage,Icon,Label,InputColor,InputCreditCard,InputCurrency,InputCustom,InputDate,InputDateTime,InputDuration,InputEmail,InputHidden,InputImage,InputMonth,InputMultilineText,InputPassword,InputPhone,InputPostalCode,InputType,InputUrl,InputWeek,InputXml,InputYear,NotInput,EngText,Match,RusText,TextLength,Editable,NotNullNotEmpty,UniqValidation,RemoteValidation,ValidationFunction,TextSearch,InputFile,InputIcon,InputPercentValue,SearchTerms,SelectDataDictionary,ForRole,NotMapped,Key,ForeignKey} from 'src/app/app-ui/ui-forms/input-form/annotations/asp-types.const';


@EntityLabel('Факт авторизации пользователя')
export class LoginFact{


	UserID :number=0;


	@ForeignProperty('UserID')
	@IsCollection('False')
	@type('NetCoreConstructorAngular.Data.DataConverter.Models.MyNavigationOptions')
	@Navigation('UserID')
	User :User=null;


	@NotNullNotEmpty('Необходимо указать дату')
	@InputDateTime('')
	Created :Date=new Date();


	@Label('Календарь')
	CalendarID :number=0;


	@ForeignProperty('CalendarID')
	@IsCollection('False')
	@type('NetCoreConstructorAngular.Data.DataConverter.Models.MyNavigationOptions')
	@Navigation('CalendarID')
	Calendar :Calendar=null;


	@Key('')
	@Label('Идентификатор')
	ID :number=0;


	@InputHidden("True")
	type: string = 'ApplicationDb.Entities.LoginFact';


}