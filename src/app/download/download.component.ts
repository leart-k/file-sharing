import { Component } from '@angular/core';
import { FileService } from '../file.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent {
  link: string = '';

  constructor(private fileService: FileService) {}

  onDownload(): void {
    const filename = this.extractFilenameFromLink(this.link);
    if (filename) {
      this.fileService.downloadFile(filename).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      });
    }
  }

  private extractFilenameFromLink(link: string): string | null {
    const parts = link.split('/');
    return parts.length > 0 ? parts[parts.length - 1] : null;
  }
}
