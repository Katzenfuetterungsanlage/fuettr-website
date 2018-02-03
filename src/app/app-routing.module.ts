import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { WhatComponent } from './what/what.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { title: 'Füttr - Homepage' } },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'what', component: WhatComponent, data: { title: 'Füttr - Was ist das?' } },
  { path: 'contact', component: ContactComponent, data: { title: 'Füttr - Kontakt' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
