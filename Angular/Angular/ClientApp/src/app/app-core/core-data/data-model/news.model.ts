import {Resource} from 'src/app/app-core/core-data/data-model/resource.model';
import {CollectionType,type,DataType,Navigation,IsCollection,ForeignProperty,SelectControl,ControlImage,DateFormat,Details,EntityIcon,EntityLabel,HelpMessage,Icon,Label,InputColor,InputCreditCard,InputCurrency,InputCustom,InputDate,InputDateTime,InputDuration,InputEmail,InputHidden,InputImage,InputMonth,InputMultilineText,InputPassword,InputPhone,InputPostalCode,InputType,InputUrl,InputWeek,InputXml,InputYear,NotInput,EngText,Match,RusText,TextLength,Editable,NotNullNotEmpty,UniqValidation,RemoteValidation,ValidationFunction,TextSearch,InputFile,InputIcon,InputPercentValue,SearchTerms,SelectDataDictionary,ForRole,NotMapped,Key,ForeignKey} from 'src/app/app-ui/ui-forms/input-form/annotations/asp-types.const';


@EntityLabel('Сооьщение об изменениях')
export class News{


	@Label('Заголовок')
	@NotNullNotEmpty('Необходимо указать заголовок сообщения')
	Title :any=null;


	@Label('Время')
	@InputDateTime('')
	Time :Date=new Date();


	@Label('Изображение')
	ImageID :any=null;


	@ForeignProperty('ImageID')
	@IsCollection('False')
	@type('NetCoreConstructorAngular.Data.DataConverter.Models.MyNavigationOptions')
	@Navigation('ImageID')
	Image :Resource=null;


	@Label('URL')
	@InputUrl('Значение не является URL адресом ресурса')
	Href :any=null;


	@Label('Описание')
	@NotNullNotEmpty('Необходимо ввести описание')
	@InputMultilineText('')
	Description :any=null;


	@Key('')
	@Label('Идентификатор')
	ID :number=0;


	@InputHidden("True")
	type: string = 'ApplicationDb.Entities.News';


}