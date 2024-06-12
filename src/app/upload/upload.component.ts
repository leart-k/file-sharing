import { Component } from '@angular/core';
import { FileService } from '../file.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  file: File | null = null;
  fileLink: string | null = null;

  constructor(private fileService: FileService) {}

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }

  onUpload(): void {
    if (this.file) {
      this.fileService.uploadFile(this.file).subscribe(response => {
        this.fileLink = response.fileLink;
      });
    }
  }
}
