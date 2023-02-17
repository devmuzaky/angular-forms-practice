import {Component, Input} from '@angular/core';
import {HttpClient, HttpEventType} from "@angular/common/http";
import {catchError, finalize} from "rxjs/operators";
import {of} from "rxjs";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators
} from "@angular/forms";


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FileUploadComponent
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor, Validators {

  @Input() requiredFileType: string;

  fileName: string = '';
  fileUploadError = false;
  uploadProgress: number;
  disabled: boolean = false;
  fileUploadSuccess = false;

  constructor(private http: HttpClient) {
  }

  onChange = (fileName: string) => {
  };

  onTouched = () => {
  };

  onFileSelected(event) {
    const file: File = event.target.files[0];


    if (file) {

      this.fileName = file.name;

      const formDate = new FormData();

      formDate.append('thumbnail', file);
      this.fileUploadError = false;

      this.http.post("/api/thumbnail-upload", formDate, {
        reportProgress: true,
        observe: 'events'
      })
        .pipe(
          catchError(error => {
            this.fileUploadError = true;
            return of(error);
          }), finalize(() => {
            this.uploadProgress = null;
          })
        ).subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        } else if (event.type == HttpEventType.Response) {
          this.onChange(this.fileName);
          this.fileUploadSuccess = true;
          this.onValidatorChange();
        }
      })

    }

  }

  writeValue(value: any): void {
    this.fileName = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onClick(fileUpload: HTMLInputElement) {
    this.onTouched();
    fileUpload.click();
  }

  onValidatorChange = () => {

  }

  registerOnValidatorChange(onValidatorChange: () => void) {
    this.onValidatorChange = onValidatorChange;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.fileUploadSuccess) {
      return null;
    }

    let errors: any = {
      requiredFileType: this.requiredFileType,
    };

    if (this.fileUploadError) {
      errors.uploadFaild = true;
    }

    return errors;

  }

}
