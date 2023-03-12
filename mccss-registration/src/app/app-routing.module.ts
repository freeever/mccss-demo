import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CookieModule } from 'ngx-cookie';
import { RegistrationComponent } from './registration/registration.component';

type PathMatch = "full" | "prefix" | undefined;

const routes: Routes = [
  { path: '', redirectTo: 'registration', pathMatch: 'full' as PathMatch },
  { path: 'registration', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CookieModule.withOptions()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
