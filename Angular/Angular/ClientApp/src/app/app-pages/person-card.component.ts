import { User } from 'src/app/app-core/core-data/data-model/user.model';
import { Person } from 'src/app/app-core/core-data/data-model/person.model';
import { Component } from "@angular/core";

@Component({
  selector: 'person-card',
  template: `

  <!-- Карточка с card-img-overlay -->
  <div class="card">
      <!-- Изображение (фон карточки) -->
      <img class="card-img" src="user.Person" alt="...">
      Hekki
      <div class="card-img-overlay">
          <!-- Текстовое содержимое карточки -->
      </div>
  </div><!-- Конец карточки -->

  `
})
export class PersonCardComponent
{
  user: User;




}
