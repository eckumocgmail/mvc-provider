import {BusinessFunction} from 'src/app/app-core/core-data/data-model/business-function.model';
import {CollectionType,type,DataType,Navigation,IsCollection,ForeignProperty,SelectControl,ControlImage,DateFormat,Details,EntityIcon,EntityLabel,HelpMessage,Icon,Label,InputColor,InputCreditCard,InputCurrency,InputCustom,InputDate,InputDateTime,InputDuration,InputEmail,InputHidden,InputImage,InputMonth,InputMultilineText,InputPassword,InputPhone,InputPostalCode,InputType,InputUrl,InputWeek,InputXml,InputYear,NotInput,EngText,Match,RusText,TextLength,Editable,NotNullNotEmpty,UniqValidation,RemoteValidation,ValidationFunction,TextSearch,InputFile,InputIcon,InputPercentValue,SearchTerms,SelectDataDictionary,ForRole,NotMapped,Key,ForeignKey} from 'src/app/app-ui/ui-forms/input-form/annotations/asp-types.const';


@EntityLabel('Бизнес показатель')
@SearchTerms('Name')
export class BusinessIndicator{


	@Label('Корневой каталог')
	@InputHidden('True')
	ParentID :any=null;


	@InputHidden('True')
	@ForeignProperty('ParentID')
	@IsCollection('False')
	@type('NetCoreConstructorAngular.Data.DataConverter.Models.MyNavigationOptions')
	@Navigation('ParentID')
	Parent :BusinessFunction=null;


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
	type: string = 'DAL.Business.BusinessIndicator';


}