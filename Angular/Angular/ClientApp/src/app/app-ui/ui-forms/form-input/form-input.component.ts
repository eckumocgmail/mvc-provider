import { EntityLabel } from 'src/app/app-ui/ui-forms/input-form/annotations/asp-types.const';
import { take } from 'rxjs/operators';
import { FormInputService } from './form-input.service';
import { FormFieldComponent } from './form-field.component';
import { Component, Input, Output, SimpleChanges } from "@angular/core";
import { OnChanges, EventEmitter } from '@angular/core';
import { ApplicationDbContext } from 'src/app/app-core/core-data/application.entity-fasade';

@Component({
  selector: 'form-input',
  template: `
    <form-view [title]="title" [fields]="fields" (uniqueValidation)="onUniqueValidation($event)" #form>
      <button type="button"
              (click)="onClickCreate(form.getValues())"
              class="btn btn-primary"
              [disabled]="form.state!=='valid'"> Сохранить </button>
    </form-view>
  `
})
export class FormInputComponent
implements OnChanges
{

  @Input()
  title:  string = 'Новый набор данных';
  entity: string = '';
  attributes = {};
  fields: FormFieldComponent[] = [];



  @Input()
  action: 'Create'|'Update' = 'Create';

  @Input()
  target: any;

  @Output()
  completed = new EventEmitter();

  constructor( private input: FormInputService, private fasade: ApplicationDbContext ){
  }

  onUniqueValidation(evt){
    //TODO:
    const repository = this.fasade[this.entity];
    console.log( repository, evt );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.target ){
      this.entity = this.target.constructor.name;
      this.attributes = this.input.parseEntityType(this.target.constructor.name);

      if( this.attributes && this.attributes['EntityLabel'] ){
        this.title = this.attributes['EntityLabel'];
      }
      this.fields = this.input.parseFields( this.target ).sort((f1,f2)=>{return f1.type==='hidden' && f2.type!=='hidden'? -1: 1});
      console.log(this.fields);
    }
  }

  onClickCreate(values){
    const entityFasade = this.fasade[this.toCamelCase(this.entity)];
    console.log(values);

    const ctrl = this;
    entityFasade[this.action](values).then((response)=>{
      ctrl.completed.emit(response);
    });

  }


  toCamelCase(entity: string){
    return entity.substr(0,1).toLowerCase()+entity.substr(1);
  }
}
