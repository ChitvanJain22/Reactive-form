import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  registrationForm: FormGroup;
  id: number | null = null;

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const data = navigation?.extras.state?.['data'];

    this.registrationForm = this.fb.group({
      id: [data?.id || null],
      firstName: [data?.firstName || null, Validators.required],
      lastName: [data?.lastName || null, Validators.required],
      mobileNumber: [data?.mobileNumber || null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: [data?.email || null, [Validators.required, Validators.email]],
      address: this.fb.group({
        addressLine1: [data?.address?.addressLine1 || '', Validators.required],
        addressLine2: [data?.address?.addressLine2 || ''],
        pincode: [data?.address?.pincode || '', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
        state: [data?.address?.state || '', Validators.required],
        country: [data?.address?.country || '', Validators.required]
      })
    });
  } 

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      if (formData.id) {
        this.dataService.updateEntry(formData.id, formData).subscribe({
          next: (response) => {
            console.log('Data updated successfully', response);
            this.router.navigate(['/confirm'], { state: { data: formData } });
          },
          error: (error) => {
            console.error('Error updating data', error);
          }
        });
      } else {
        this.dataService.onSubmit(formData).subscribe({
          next: (response) => {
            console.log('Data added successfully', response);
            this.router.navigate(['/confirm'], { state: { data: response } });
          },
          error: (error) => {
            console.error('Error adding data', error);
          }
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
