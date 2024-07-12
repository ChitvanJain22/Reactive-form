import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validation-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation-page.component.html',
  styleUrls: ['./validation-page.component.css'],
})
export class ValidationPageComponent {
  formData: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.formData = navigation?.extras.state?.['data'];
  }

  confirm() {
    alert('Info saved successfully');
    this.router.navigate(['/']);
  }

  edit() {
    this.router.navigate(['/edit'], { state: { data: this.formData } });
  }
}

