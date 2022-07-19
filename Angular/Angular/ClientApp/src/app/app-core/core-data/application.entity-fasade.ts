import {ClientConnection} from 'src/app/app-core/core-data/data-model/client-connection.model';
import {FileCatalog} from 'src/app/app-core/core-data/data-model/file-catalog.model';
import {FileResource} from 'src/app/app-core/core-data/data-model/file-resource.model';
import {CLRLibrary} from 'src/app/app-core/core-data/data-model/c-l-r-library.model';
import {Account} from 'src/app/app-core/core-data/data-model/account.model';
import {Calendar} from 'src/app/app-core/core-data/data-model/calendar.model';
import {Group} from 'src/app/app-core/core-data/data-model/group.model';
import {LoginFact} from 'src/app/app-core/core-data/data-model/login-fact.model';
import {Message} from 'src/app/app-core/core-data/data-model/message.model';
import {News} from 'src/app/app-core/core-data/data-model/news.model';
import {Person} from 'src/app/app-core/core-data/data-model/person.model';
import {Resource} from 'src/app/app-core/core-data/data-model/resource.model';
import {Role} from 'src/app/app-core/core-data/data-model/role.model';
import {Settings} from 'src/app/app-core/core-data/data-model/settings.model';
import {User} from 'src/app/app-core/core-data/data-model/user.model';
import {UserGroups} from 'src/app/app-core/core-data/data-model/user-groups.model';
import {WebApp} from 'src/app/app-core/core-data/data-model/web-app.model';
import {BusinessDatasource} from 'src/app/app-core/core-data/data-model/business-datasource.model';
import {BusinessFunction} from 'src/app/app-core/core-data/data-model/business-function.model';
import {BusinessIndicator} from 'src/app/app-core/core-data/data-model/business-indicator.model';
import {BusinessLogic} from 'src/app/app-core/core-data/data-model/business-logic.model';
import {BusinessProcess} from 'src/app/app-core/core-data/data-model/business-process.model';
import {BusinessReport} from 'src/app/app-core/core-data/data-model/business-report.model';
import {BusinessResource} from 'src/app/app-core/core-data/data-model/business-resource.model';
import {GroupMessage} from 'src/app/app-core/core-data/data-model/group-message.model';
import {MessageAttribute} from 'src/app/app-core/core-data/data-model/message-attribute.model';
import {MessageProperty} from 'src/app/app-core/core-data/data-model/message-property.model';
import {MessageProtocol} from 'src/app/app-core/core-data/data-model/message-protocol.model';
import {ValidationModel} from 'src/app/app-core/core-data/data-model/validation-model.model';
import {BusinessDataset} from 'src/app/app-core/core-data/data-model/business-dataset.model';
import {EntityRepository} from './entity-repository';
import {HttpClient} from '@angular/common/http';
import {EntityRepositoryFactory} from './entity-repository.factory';
import {Injectable} from '@angular/core';




@Injectable({ providedIn: 'root' }) 
export class ApplicationDbContext
{

	clientConnection: EntityRepository<ClientConnection>;
	fileCatalog: EntityRepository<FileCatalog>;
	fileResource: EntityRepository<FileResource>;
	cLRLibrary: EntityRepository<CLRLibrary>;
	account: EntityRepository<Account>;
	calendar: EntityRepository<Calendar>;
	group: EntityRepository<Group>;
	loginFact: EntityRepository<LoginFact>;
	message: EntityRepository<Message>;
	news: EntityRepository<News>;
	person: EntityRepository<Person>;
	resource: EntityRepository<Resource>;
	role: EntityRepository<Role>;
	settings: EntityRepository<Settings>;
	user: EntityRepository<User>;
	userGroups: EntityRepository<UserGroups>;
	webApp: EntityRepository<WebApp>;
	businessDatasource: EntityRepository<BusinessDatasource>;
	businessFunction: EntityRepository<BusinessFunction>;
	businessIndicator: EntityRepository<BusinessIndicator>;
	businessLogic: EntityRepository<BusinessLogic>;
	businessProcess: EntityRepository<BusinessProcess>;
	businessReport: EntityRepository<BusinessReport>;
	businessResource: EntityRepository<BusinessResource>;
	groupMessage: EntityRepository<GroupMessage>;
	messageAttribute: EntityRepository<MessageAttribute>;
	messageProperty: EntityRepository<MessageProperty>;
	messageProtocol: EntityRepository<MessageProtocol>;
	validationModel: EntityRepository<ValidationModel>;
	businessDataset: EntityRepository<BusinessDataset>;
 	$http: HttpClient; 

 	constructor( $http: HttpClient, $entityRepositoryFactory: EntityRepositoryFactory ){ 
 		this.$http = $http; 
		this.clientConnection = $entityRepositoryFactory.create<ClientConnection>('ClientConnection',$http,function(){ return new ClientConnection(); });
		this.fileCatalog = $entityRepositoryFactory.create<FileCatalog>('FileCatalog',$http,function(){ return new FileCatalog(); });
		this.fileResource = $entityRepositoryFactory.create<FileResource>('FileResource',$http,function(){ return new FileResource(); });
		this.cLRLibrary = $entityRepositoryFactory.create<CLRLibrary>('CLRLibrary',$http,function(){ return new CLRLibrary(); });
		this.account = $entityRepositoryFactory.create<Account>('Account',$http,function(){ return new Account(); });
		this.calendar = $entityRepositoryFactory.create<Calendar>('Calendar',$http,function(){ return new Calendar(); });
		this.group = $entityRepositoryFactory.create<Group>('Group',$http,function(){ return new Group(); });
		this.loginFact = $entityRepositoryFactory.create<LoginFact>('LoginFact',$http,function(){ return new LoginFact(); });
		this.message = $entityRepositoryFactory.create<Message>('Message',$http,function(){ return new Message(); });
		this.news = $entityRepositoryFactory.create<News>('News',$http,function(){ return new News(); });
		this.person = $entityRepositoryFactory.create<Person>('Person',$http,function(){ return new Person(); });
		this.resource = $entityRepositoryFactory.create<Resource>('Resource',$http,function(){ return new Resource(); });
		this.role = $entityRepositoryFactory.create<Role>('Role',$http,function(){ return new Role(); });
		this.settings = $entityRepositoryFactory.create<Settings>('Settings',$http,function(){ return new Settings(); });
		this.user = $entityRepositoryFactory.create<User>('User',$http,function(){ return new User(); });
		this.userGroups = $entityRepositoryFactory.create<UserGroups>('UserGroups',$http,function(){ return new UserGroups(); });
		this.webApp = $entityRepositoryFactory.create<WebApp>('WebApp',$http,function(){ return new WebApp(); });
		this.businessDatasource = $entityRepositoryFactory.create<BusinessDatasource>('BusinessDatasource',$http,function(){ return new BusinessDatasource(); });
		this.businessFunction = $entityRepositoryFactory.create<BusinessFunction>('BusinessFunction',$http,function(){ return new BusinessFunction(); });
		this.businessIndicator = $entityRepositoryFactory.create<BusinessIndicator>('BusinessIndicator',$http,function(){ return new BusinessIndicator(); });
		this.businessLogic = $entityRepositoryFactory.create<BusinessLogic>('BusinessLogic',$http,function(){ return new BusinessLogic(); });
		this.businessProcess = $entityRepositoryFactory.create<BusinessProcess>('BusinessProcess',$http,function(){ return new BusinessProcess(); });
		this.businessReport = $entityRepositoryFactory.create<BusinessReport>('BusinessReport',$http,function(){ return new BusinessReport(); });
		this.businessResource = $entityRepositoryFactory.create<BusinessResource>('BusinessResource',$http,function(){ return new BusinessResource(); });
		this.groupMessage = $entityRepositoryFactory.create<GroupMessage>('GroupMessage',$http,function(){ return new GroupMessage(); });
		this.messageAttribute = $entityRepositoryFactory.create<MessageAttribute>('MessageAttribute',$http,function(){ return new MessageAttribute(); });
		this.messageProperty = $entityRepositoryFactory.create<MessageProperty>('MessageProperty',$http,function(){ return new MessageProperty(); });
		this.messageProtocol = $entityRepositoryFactory.create<MessageProtocol>('MessageProtocol',$http,function(){ return new MessageProtocol(); });
		this.validationModel = $entityRepositoryFactory.create<ValidationModel>('ValidationModel',$http,function(){ return new ValidationModel(); });
		this.businessDataset = $entityRepositoryFactory.create<BusinessDataset>('BusinessDataset',$http,function(){ return new BusinessDataset(); });
 	} 

}