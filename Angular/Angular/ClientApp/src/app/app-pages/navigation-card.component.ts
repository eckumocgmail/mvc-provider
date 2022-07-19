
import { User } from 'src/app/app-core/core-data/data-model/user.model';
import { Person } from 'src/app/app-core/core-data/data-model/person.model';
import { Component } from "@angular/core";

@Component({
  selector: 'navigation-card',
  template: `

    <!-- Карточка с навигацией (в заголовке) -->
    <div class="card">
        <!-- Шапка с навигацией -->
        <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#item1">Item 1</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#item2">Item 2</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" data-toggle="tab" href="#item3">Item 3</a>
                </li>
            </ul>
        </div>
        <!-- Текстовый контент -->
        <div class="card-body tab-content">
            <div class="tab-pane fade show active" id="item1">
                Некоторое содержимое для Item 1...
            </div>
            <div class="tab-pane fade" id="item2">
                Некоторое содержимое для Item 2...
            </div>
            <div class="tab-pane fade" id="item3">
                Некоторое содержимое для Item 3...
            </div>
        </div>
    </div>

  `
})
export class NavigationCardComponent
{
  user: User;




}
