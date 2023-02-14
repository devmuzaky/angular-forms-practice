import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {courseTitleValidator} from "../../validators/course-title.validators";
import {CoursesService} from "../../services/courses.service";

@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss']
})
export class CreateCourseStep1Component implements OnInit {

  form = this.fb.group({
    title: ['', {
      Validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60),
      ],
      asyncValidators: [courseTitleValidator(this.coursesService)],
      updateOn: 'blur'
    }],
    releasedAt: [new Date(), Validators.required],
    downloadsAllowed: [false, Validators.required],
    longDescription: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(200)]]
  });


  constructor(private fb: FormBuilder, private coursesService: CoursesService) {
  }

  get courseTitle() {
    return this.form.controls['title'];
  }

  ngOnInit() {

  }

}
