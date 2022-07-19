import { DataTableComponent } from '../../../app-ui/ui-data/data-table/data-table.component';
import { Label, EntityLabel } from 'src/app/app-ui/ui-forms/input-form/annotations/asp-types.const';
import { CollectionListComponent } from '../../../app-ui/ui-collection/collection-list/collection-list.component';
import { FormInputComponent } from '../../../app-ui/ui-forms/form-input/form-input.component';
import { HttpClient } from '@angular/common/http';

import { Controlable } from '../../../app-ui/ui-control/control-api/controlable';
import { EntityRepository } from '../../../app-core/core-data/entity-repository';
import { ListItem } from '../../../app-ui/ui-collection/collection-list/collection-list.component';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationDbContext } from '../../../app-core/core-data/application.entity-fasade';
import { specification } from 'src/app/app-ui/ui-forms/input-form/annotations/specification.function';
import { AppService } from '../../../app.service';
import { input,spec} from 'src/app/app-ui/ui-forms/form-input/input-context';
import { FormInputService } from 'src/app/app-ui/ui-forms/form-input/form-input.service';
import { table } from 'console';
import { SearchService } from 'src/app/app-search.service';

@specification({
  icon:   'home',
  label:  'модель'
})
@Component({
  selector: 'developer',
  template: `
    <layout-column style="height: 100%;">
      <div class="top" style="width: 100%;">

      </div>

      <layout-line style="width: 100%; height: 100%;">

        <div class="left" style="height: 100%; overflow-y: auto; padding: 20px; padding-right: 40px;">
          <collection-list #controllable title="Навигация"
              [template]="listitem" [checkable]="false" [selectable]="true" (selected)="onEntitySelected(entity=$event)" [listitems]="entities" [multiselect]="false">
            <ng-template #listitem let-ctrl="ctrl">
              <div>{{ctrl.label}}</div>
            </ng-template>
          </collection-list>

        </div>
        <div style="width: 100%; height: 100%; overflow-y: auto; padding: 20px; padding-right: 40px;">
          <layout-column>
            <data-table  #dataTable [title]="title" [dataset]="dataset" [attributes]="attributes" [multiselect]="true">
              <div *ngIf="repository" class="top">
                <div style="paddin: 20px;">
                  <control-search (input)="onInput($event)" (search)="onSearch($event)" [options]="keywords"></control-search>

                </div>
                <div style="paddin: 20px;">
                  <button mat-raised-button (click)="Create()"> добавить </button>
                  <button mat-raised-button (click)="Delete(dataTable.selection.selected)" [disabled]="!dataTable.selection.selected ||(dataTable.selection.selected)['length']==0"> удалить </button>
                  <button mat-raised-button (click)="Update(dataTable.selection.selected[0].ID)" [disabled]="!dataTable.selection.selected || (dataTable.selection.selected)['length']!==1"> редактировать </button>
                </div>

              </div>
            </data-table>
            <control-pages *ngIf="repository" class="bottom" [page]="page" [size]="size" [len]="len" (pageChanged)="onPageChanged($event)"></control-pages>

          </layout-column>
        </div>
        <div class="right" *ngIf="view=='Create'||view=='Update'" style="height: 100%; overflow-y: auto; padding: 20px; padding-right: 40px; width: 480px;">
          <form-input form-input #formInputComponent  [title]="title" [action]="view" [target]="options" (completed)="Page(page,size)" ></form-input>
        </div>

      </layout-line>
      <button class="bottom" style="width: 100%;">

      </button>
    </layout-column>

  `
})
export class DeveloperComponent
implements OnInit {


  title = '';
  enabled = true;
  error = '';
  entities: any[] = [
    'settings',
    'businessDataset',
    'businessDatasource',
    'businessFunction',
    'businessIndicator',
    'businessLogic',
    'businessProcess',
    'businessReport',
    'businessResource',
    'messageAttribute',
    'messageProtocol'
  ];
  options = [];

  page = 1;
  size = 10;
  len = 5;
  keywords = ["a","бб"];

  entity: string = null;
  repository: EntityRepository<any> = null;
  view: 'List'|'Create'|'Update' = null;
  version = '';
  onKeyPress(evt){

  }

  //for List
  attributes = [];
  dataset = [];

  //for form
  @ViewChild('formInputComponent',{static: false})
  form: FormInputComponent;
  @ViewChild('dataTable',{static: false})
  table: DataTableComponent;

  spec: any;


  constructor(
    public inputService: FormInputService,
    public search: SearchService,
    public data: ApplicationDbContext)
  {
    this.view = 'List';
    window['page']=this;
    this.spec = spec;
  }
  onSearch(evt){
    console.log(evt);
    const ctrl = this;
    this.repository.Search(evt,this.page=1,this.size).then((resp)=>{
      ctrl.len = resp.TotalResults;
      ctrl.dataset = resp.Results;
    });
  }
  onInput(evt){
    const ctrl = this;
    this.repository.Keywords(evt.target.value).then((resp)=>{
      ctrl.keywords = resp.Results;
    });
  }
  names(p){
    if( !p)
      throw new Error('Ссылка на Null');
    return Object.getOwnPropertyNames(p);
  }
  ngOnInit(): void {
    const ctrl = this;
    this.entities = this.entities.map(tableName=>{
      const result = {
        label: tableName,
        fasade: tableName,
        entity: tableName.substr(0,1).toUpperCase()+tableName.substr(1),
        attributes: ctrl.inputService.parseEntityType(tableName.substr(0,1).toUpperCase()+tableName.substr(1))
      }
      result.label = result.attributes['EntityLabel'];
      return result;
    });
    //this.input.parseEntityType()
    this.entities = this.entities.map(e=>Object.assign(new ListItem(e.label,'home'),{data: e}));

    console.log(spec);
    console.log(this.entities);
  }

  onEntitySelected(evt){

    try{
      console.log(evt,this.data);
      const ctrl = this;
      this.entity = evt.data.fasade;
      this.title = this.inputService.getLabelFor(this.entity);
      this.repository = this.data[this.entity];
      if( !this.repository ){
        throw new Error('Не найден репозиторий');
      }
      ctrl.attributes = ctrl.inputService.parseFields(this.repository.create());
      console.log(ctrl.attributes);
      this.Page(this.page=1, this.size);
    }catch(e){
      console.error(e);
      alert(e);
    }

  }

  Create(){

    try{
      console.log(this);
      this.view = 'Create';
      this.options = this.repository.create();
    }catch(e){
      console.error(e);
      alert(e);
    }

  }

  Update( id: number ){
    console.log(id);

    this.repository.Find( id ).then((options)=>{
      console.log(options);

      this.options = Object.assign(this.repository.create(),options);
      this.view = 'Update';
    });
  }

  List(){
    try{
      const ctrl = this;
      this.repository.List().then((resultset)=>{
        console.log(resultset);
        ctrl.attributes = ctrl.inputService.parseFields(this.repository.create());
        ctrl.view = 'List';
        ctrl.dataset = resultset;

      });

    }catch(e){
      console.error(e);
      alert('Метод List ошибка: '+e);
    }
  }

  Page(page,size){
    try{
      const ctrl = this;
      this.repository.Page( page,size).then((resultset: any)=>{
        console.log(resultset);
        ctrl.attributes = ctrl.inputService.parseFields(this.repository.create());
        ctrl.view = 'List';
        ctrl.page = page,
        ctrl.size = size;
        ctrl.len = resultset.TotalResults;
        ctrl.dataset = resultset.Results;

      });

    }catch(e){
      console.error(e);
      alert('Метод List ошибка: '+e);
    }
  }

  onPageChanged(page){
    this.Page(this.page=page, this.size);
  }

  Delete(ids: any){
    console.log(ids);
    const ctrl = this;
    if( ids instanceof Array ){
      ids.forEach(id=>{
        ctrl.Delete(id);
      });
    }else{

      ctrl.repository.Delete(ids.ID).then((response: any)=>{
        //ctrl.table.selection.selected = (<Array<any>>ctrl.table.selection.selected).splice((<Array<any>>ctrl.table.selection.selected).indexOf(ctrl.table.dataset.find(r=>r.ID==ids.ID)),1);
        //ctrl.table.dataset.splice(ctrl.table.dataset.indexOf(ctrl.table.dataset.find(r=>r.ID==ids.ID)),1);
        if(((ctrl.len-1)%ctrl.size)===0){
          ctrl.onPageChanged(this.page-1);
        }else{
          ctrl.onPageChanged(this.page);
        }

      });
    }

  }

  onDataSelected(evt){
    console.log(evt);
    const ctrl = this;
    ctrl.Update(evt.ID);
  }



}
