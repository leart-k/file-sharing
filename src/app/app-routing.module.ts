import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { DownloadComponent } from './download/download.component';

export const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: 'download', component: DownloadComponent },
  { path: '', redirectTo: '/upload', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
