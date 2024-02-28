import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "clients",
    pathMatch: "full",
  },
  {
    path: "",
    component: AdminLayoutComponent,
    loadChildren: () =>
      import("./pages/pages.module").then((x) => x.PagesModule),
  },
  {
    path: "**",
    redirectTo: "clients",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
