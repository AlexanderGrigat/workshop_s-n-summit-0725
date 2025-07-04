import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, CommonModule, FormsModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Angular Signals Demonstration' title signal`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title()).toEqual('Angular Signals Demonstration');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Angular Signals Demonstration');
  });

  it('should increment input1 when addInput1 is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const initialValue = app.input1();
    app.addInput1();
    expect(app.input1()).toEqual(initialValue + 1);
  });

  it('should update computed output when inputs change', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const initialInput1 = app.input1();
    const initialInput2 = app.input2();
    const initialOutput = app.output();

    app.addInput1();
    expect(app.output()).toEqual(initialInput1 + initialInput2 + 1);

    app.addInput2();
    expect(app.output()).toEqual(initialInput1 + initialInput2 + 2);
  });

  it('should only update untrackedOutput when input1 changes', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const initialInput1 = app.input1();
    const initialUntrackedOutput = app.untrackedOutput();

    app.addInput2();
    expect(app.untrackedOutput()).toEqual(initialUntrackedOutput);

    app.addInput1();
    expect(app.untrackedOutput()).toEqual(initialInput1 + 1 + app.input2());
  });
});
