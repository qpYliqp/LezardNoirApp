import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MultiSelect} from 'primeng/multiselect';

@Component({
  selector: 'app-form-book-authors',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MultiSelect
  ],
  templateUrl: './form-book-authors.html',
  styleUrl: './form-book-authors.css'
})
export class FormBookAuthors {
  interests = [
    {name: "Nature"},
    {name: "Art"},
    {name: "Music"},
    {name: "Design"},
    {name: "Photography"},
    {name: "Movies"},
    {name: "Sports"},
    {name: "Gaming"},
    {name: "Traveling"},
    {name: "Dancing"},
    {name: "Photography"},
    {name: "Movies"},
    {name: "Sports"},
    {name: "Gaming"},
    {name: "Traveling"},
    {name: "Dancing"},
  ];

  selectedInterests: { name: string }[] = [];

  get isValid(): boolean {
    return this.selectedInterests.length > 0;
  }
}
