import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Testing Angular Tutorial';

  updateTitle(title: string): void {
    this.title = title;
  }
}
