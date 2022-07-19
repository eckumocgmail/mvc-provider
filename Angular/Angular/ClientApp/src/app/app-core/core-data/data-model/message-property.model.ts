import {MessageProtocol} from 'src/app/app-core/core-data/data-model/message-protocol.model';
import {MessageAttribute} from 'src/app/app-core/core-data/data-model/message-attribute.model';
import {CollectionType,type,DataType,Navigation,IsCollection,ForeignProperty,SelectControl,ControlImage,DateFormat,Details,EntityIcon,EntityLabel,HelpMessage,Icon,Label,InputColor,InputCreditCard,InputCurrency,InputCustom,InputDate,InputDateTime,InputDuration,InputEmail,InputHidden,InputImage,InputMonth,InputMultilineText,InputPassword,InputPhone,InputPostalCode,InputType,InputUrl,InputWeek,InputXml,InputYear,NotInput,EngText,Match,RusText,TextLength,Editable,NotNullNotEmpty,UniqValidation,RemoteValidation,ValidationFunction,TextSearch,InputFile,InputIcon,InputPercentValue,SearchTerms,SelectDataDictionary,ForRole,NotMapped,Key,ForeignKey} from 'src/app/app-ui/ui-forms/input-form/annotations/asp-types.const';


@EntityLabel('Поле сообщения')
export class MessageProperty{


	@Label('Надпись поля ввода')
	@HelpMessage('На форме ввода надпись располагается рядом с элементом ввода')
	@NotNullNotEmpty('Введите текст для надписи поля')
	@RusText('Используйте русскую кирилицу для надписи поля ввода')
	Label :any=null;


	@Label('Имя свойства сообщения')
	@HelpMessage('Имя свойства сообщения является идентификатором в наборе данных')
	@NotNullNotEmpty('Введите имя свойства сообщения')
	@EngText('Используйте латиницу для имени свойства сообщения')
	Name :any=null;


	@Label('Порядковый номер')
	Order :number=0;


	@Label('Подсказка под полем ввода')
	@RusText('Используйте русскую кирилицу для текста подсказки')
	Help :any=null;


	@Label('Признак обязательного ввода')
	Required :boolean=false;


	@Label('Признак уникальности')
	Unique :boolean=false;


	@Label('Создание индекса')
	@HelpMessage('Индексируемые поля являются ключами для поиска')
	Index :boolean=false;


	@Label('Атрибут поля')
	AttributeID :number=0;


	@Label('Атрибут поля')
	@ForeignProperty('AttributeID')
	@IsCollection('False')
	@type('NetCoreConstructorAngular.Data.DataConverter.Models.MyNavigationOptions')
	@Navigation('AttributeID')
	Attribute :MessageAttribute=null;


	@Label('Атрибут поля')
	MessageProtocolID :number=0;


	@Label('Атрибут поля')
	@ForeignProperty('MessageProtocolID')
	@IsCollection('False')
	@type('NetCoreConstructorAngular.Data.DataConverter.Models.MyNavigationOptions')
	@Navigation('MessageProtocolID')
	MessageProtocol :MessageProtocol=null;


	@Key('')
	@Label('Идентификатор')
	ID :number=0;


	@InputHidden("True")
	type: string = 'MessageProperty';


}