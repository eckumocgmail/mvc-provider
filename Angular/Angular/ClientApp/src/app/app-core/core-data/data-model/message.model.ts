import {User} from 'src/app/app-core/core-data/data-model/user.model';
import {CollectionType,type,DataType,Navigation,IsCollection,ForeignProperty,SelectControl,ControlImage,DateFormat,Details,EntityIcon,EntityLabel,HelpMessage,Icon,Label,InputColor,InputCreditCard,InputCurrency,InputCustom,InputDate,InputDateTime,InputDuration,InputEmail,InputHidden,InputImage,InputMonth,InputMultilineText,InputPassword,InputPhone,InputPostalCode,InputType,InputUrl,InputWeek,InputXml,InputYear,NotInput,EngText,Match,RusText,TextLength,Editable,NotNullNotEmpty,UniqValidation,RemoteValidation,ValidationFunction,TextSearch,InputFile,InputIcon,InputPercentValue,SearchTerms,SelectDataDictionary,ForRole,NotMapped,Key,ForeignKey} from 'src/app/app-ui/ui-forms/input-form/annotations/asp-types.const';


@EntityLabel('Сообщение пользователю')
export class Message{


	FromUserID :number=0;


	@NotMapped('')
	@NotInput('')
	FromUser :User=null;


	@SelectControl('System.Collections.ObjectModel.ReadOnlyCollection`1[System.Reflection.CustomAttributeTypedArgument]')
	ToUserID :number=0;


	@NotMapped('')
	ToUser :User=null;


	@Label('Создано')
	Created :Date=new Date();


	@NotNullNotEmpty('Необходимо указать тему сообщения')
	Subject :any=null;


	@InputMultilineText('')
	@NotNullNotEmpty('Необходимо ввести текст сообщения')
	Text :any=null;


	@Key('')
	@Label('Идентификатор')
	ID :number=0;


	@InputHidden("True")
	type: string = 'ApplicationDb.Entities.Message';


}