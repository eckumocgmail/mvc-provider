import {Embedded,Nullable,SelectControl,ControlImage,DateFormat,Details,EntityIcon,EntityLabel,HelpMessage,Icon,Label,InputBinary,InputColor,InputDate,InputDateTime,InputEmail,InputHidden,InputMonth,InputMultilineText,InputPassword,InputPhone,InputType,InputUrl,InputWeek,InputYear,EngText,Match,RusText,TextLength,Editable,NotNullNotEmpty,NotMapped,Key,ForeignKey} from 'src/app/app-ui/ui-forms/input-form/annotations/asp-types.const';


export class Indicator{


	@Key('')
	@Label('Идентификатор')
	ID :number=0;


	@InputHidden("True")
	type: string = 'NetCoreConstructorAngular.Data.DataModels.Statistics.Indicator';


}