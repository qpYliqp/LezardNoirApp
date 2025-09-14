import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})


export class Sidebar {

sidebarButtons : SidebarButton[] = [
  {label : "Tableau de bord", urlPath:"/board"},
  {label : "Calendrier", urlPath:"/calendar"},
]

}
