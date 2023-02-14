import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {courseTitleValidator} from "../../validators/course-title.validators";
import {CoursesService} from "../../services/courses.service";
import {Observable} from "rxjs";
import {filter} from "rxjs/operators";


interface CourseCategory {
  code: string;
  description: string
}

@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss']
})
export class CreateCourseStep1Component implements OnInit {

  form = this.fb.group({
    title: ['', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ],
      asyncValidators: [courseTitleValidator(this.coursesService)],
      updateOn: 'blur'
    }],
    releasedAt: [new Date(), Validators.required],
    category: ['BEGINNER', Validators.required],
    downloadsAllowed: [false, Validators.required],
    longDescription: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]]
  });

  courseCategories$: Observable<CourseCategory[]>;


  constructor(private fb: FormBuilder, private coursesService: CoursesService) {
  }

  get courseTitle() {
    return this.form.controls['title'];
  }

  ngOnInit() {
    this.courseCategories$ = this.coursesService.findCourseCategories();

    const savedValues = localStorage.getItem('STEP_1');

    if (savedValues) {
      this.form.setValue(JSON.parse(savedValues));
    }

    this.form.valueChanges
      .pipe(filter(() => this.form.valid))
      .subscribe(value => localStorage.setItem('STEP_1', JSON.stringify(value)));
  }
}
