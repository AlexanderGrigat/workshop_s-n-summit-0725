import { TestBed } from '@angular/core/testing';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DatePipe, UpperCasePipe } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        RouterOutlet,
        RouterLink,
        DatePipe,
        UpperCasePipe,
        AppComponent,
        RouterModule.forRoot([]),
      ],
    }).compileComponents();
  });

    it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });
});
