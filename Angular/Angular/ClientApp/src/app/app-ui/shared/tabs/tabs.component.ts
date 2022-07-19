import { TableComponent } from './../table/table.component';
import { PaginationComponent } from './../pagination/pagination.component';
import { Component, Input, OnInit } from "@angular/core";

@Component({
  templateUrl: './tabs.component.html',
  selector:     'app-tabs'
})
export class TabsComponent implements OnInit{
  ngOnInit(): void {
    this.component = this.tabs[0].component;
  }

  @Input()
  tabs: Array<{
    label: string,
    component: any
  }> = [
    {
      label:    'pagination',
      component: PaginationComponent
    },
    {
      label:    'table',
      component: TableComponent
    }

  ];

  component = PaginationComponent;

  set(tab){
    this.component = tab.component;
  }
}
