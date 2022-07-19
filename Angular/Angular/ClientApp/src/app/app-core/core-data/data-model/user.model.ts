import {Message} from 'src/app/app-core/core-data/data-model/message.model';
import {UserGroups} from 'src/app/app-core/core-data/data-model/user-groups.model';
import {Group} from 'src/app/app-core/core-data/data-model/group.model';
import {Person} from 'src/app/app-core/core-data/data-model/person.model';
import {Settings} from 'src/app/app-core/core-data/data-model/settings.model';
import {Role} from 'src/app/app-core/core-data/data-model/role.model';
import {Account} from 'src/app/app-core/core-data/data-model/account.model';
import {Resource} from 'src/app/app-core/core-data/data-model/resource.model';
import {CollectionType,type,DataType,Navigation,IsCollection,ForeignProperty,SelectControl,ControlImage,DateFormat,Details,EntityIcon,EntityLabel,HelpMessage,Icon,Label,InputColor,InputCreditCard,InputCurrency,InputCustom,InputDate,InputDateTime,InputDuration,InputEmail,InputHidden,InputImage,InputMonth,InputMultilineText,InputPassword,InputPhone,InputPostalCode,InputType,InputUrl,InputWeek,InputXml,InputYear,NotInput,EngText,Match,RusText,TextLength,Editable,NotNullNotEmpty,UniqValidation,RemoteValidation,ValidationFunction,TextSearch,InputFile,InputIcon,InputPercentValue,SearchTerms,SelectDataDictionary,ForRole,NotMapped,Key,ForeignKey} from 'src/app/app-ui/ui-forms/input-form/annotations/asp-types.const';


@EntityLabel('Пользователь')
export class User{


	@Label('Фотография')
	PhotoID :any=null;


	@Label('Фотография')
	@ForeignProperty('PhotoID')
	@IsCollection('False')
	@type('NetCoreConstructorAngular.Data.DataConverter.Models.MyNavigationOptions')
	@Navigation('PhotoID')
	Photo :Resource=null;


	@Label('Учетная запись')
	AccountID :number=0;


	@InputHidden('True')
	@Label('Учетная запись')
	@ForeignProperty('AccountID')
	@IsCollection('False')
	@type('NetCoreConstructorAngular.Data.DataConverter.Models.MyNavigationOptions')
	@Navigation('AccountID')
	Account :Account=null;


	@Label('Роль')
	RoleID :number=0;


	@InputHidden('True')
	@Label('Роль')
	@ForeignProperty('RoleID')
	@IsCollection('False')
	@type('NetCoreConstructorAngular.Data.DataConverter.Models.MyNavigationOptions')
	@Navigation('RoleID')
	Role :Role=null;


	@Label('Настроки')
	SettingsID :number=0;


	@Label('Настроки')
	@ForeignProperty('SettingsID')
	@IsCollection('False')
	@type('NetCoreConstructorAngular.Data.DataConverter.Models.MyNavigationOptions')
	@Navigation('SettingsID')
	Settings :Settings=null;


	@Label('Личная инф.')
	PersonID :number=0;


	@Label('Личная инф.')
	@ForeignProperty('PersonID')
	@IsCollection('False')
	@type('NetCoreConstructorAngular.Data.DataConverter.Models.MyNavigationOptions')
	@Navigation('PersonID')
	Person :Person=null;


	@NotMapped('')
	@Label('Группы')
	@CollectionType('Group')
	Groups :Group[]=[];


	@Label('Группы')
	@NotMapped('')
	UserGroupsID :number=0;


	@Label('Группы')
	@InputHidden('True')
	@ForeignProperty('UserGroupsID')
	@IsCollection('True')
	@type('NetCoreConstructorAngular.Data.DataConverter.Models.MyNavigationOptions')
	@Navigation('UserGroupsID')
	@CollectionType('UserGroups')
	UserGroups :UserGroups[]=[];


	@Label('Кол-во посещений')
	LoginCount :number=0;


	@Label('Сообщения')
	@NotMapped('')
	InboxID :number=0;


	@Label('Сообщения')
	@ForeignProperty('InboxID')
	@IsCollection('True')
	@type('NetCoreConstructorAngular.Data.DataConverter.Models.MyNavigationOptions')
	@Navigation('InboxID')
	@CollectionType('Message')
	Inbox :Message[]=[];


	@NotMapped('')
	@Label('Сообщения')
	@CollectionType('Message')
	Outbox :Message[]=[];


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
	type: string = 'ApplicationDb.Entities.User';


}