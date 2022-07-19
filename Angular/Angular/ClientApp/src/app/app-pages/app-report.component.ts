import { Editable } from 'src/app/app-ui/ui-forms/input-form/annotations/asp-types.const';
import { JitComponent } from './app-jit.component';
import { BusinessReport } from 'src/app/app-core/core-data/data-model/business-report.model';
import { SwitchCollectionComponent } from './../app-ui/ui-collection/switch-collection.component';
import { DataOdbcService } from './../app-core/core-data/data-odbc.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Component, ViewChild } from "@angular/core";
import { ReportsHubService } from '../app-core/reports-hub.service';
import { OnInit } from '@angular/core';
import { specification } from '../app-ui/ui-forms/input-form/annotations/specification.function';
import { ApplicationDbContext } from '../app-core/core-data/application.entity-fasade';

@specification({
  icon:   'home',
  label:  'отчёты'
})
@Component({
  selector: 'app-report',
  template: `
    <div style="padding: 20px;">
      <layout-line>
        <collection-list class="left" (selected)="onSelected($event)" [listitems]="selectReportList" [multiselect]="false" [checkable]="false" [selectable]="true" [hidden]="id"></collection-list>
        <div *ngIf="report">
          <h3>{{report.Name}}</h3>

          <jit [template]="xml"></jit>
        </div>
        <div class="right" style="height: 100%; overflow-y: auto: border: 0px solid white;" editable *ngIf="report">{{report.Xml}}</div>
      </layout-line>
    </div>
  `
})
export class AppReportComponent
{
  selectReportList: any = [];
  report: BusinessReport = null;
  id: number;
  xml = '<report xmlns="http://www.eclipse.org/birt/2005/design" version="3.2.2" id="1"><data-sources><odbc-data-source name="ClassicModels"></odbc-data-source></data-sources></report>'


  constructor( private route: ActivatedRoute, private context: ApplicationDbContext ){
    const ctrl = this;
    this.context['businessReport'].List().then((e)=>{
      ctrl.selectReportList=e.map(p=>{ return{ data: p, text: p.Name, selected: false }; });
      this.route.paramMap.subscribe(params => {

        ctrl.id = parseInt(params.get('id'));
        ctrl.setActive(ctrl.id);
      });
    })
  }

  onSelected(report){
    const ctrl = this;
    ctrl.setActive(report.data.ID);
  }

  setActive(id: number){
    const ctrl = this;
    this.context['businessReport'].Find(id).then((response: BusinessReport)=>{
      ctrl.selectReportList.find((p: any)=>p.data.ID==ctrl.id).selected=true;;
      ctrl.report = response;
    });
  }


}
