import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { CreateLinkDto } from '../../../Models/link';
import { LinksService } from '../../../services/links/links.service';
import { NgClass } from '@angular/common';
import { UserSession } from '../../../Models/user-session';

@Component({
  selector: 'app-new-link-modal',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass,InputTextModule],
  templateUrl: './new-link-modal.component.html',
  styleUrl: './new-link-modal.component.scss',
})
export class NewLinkModalComponent implements OnInit, OnDestroy {
  constructor(private _linksService: LinksService) {}

  newLinkModalTrigger: boolean = false;
  @Output() closeModals: EventEmitter<boolean> = new EventEmitter<boolean>();

  newLinkDto!: CreateLinkDto;
  newLinkForm!: FormGroup;
  UserSession!: UserSession;

  ngOnInit(): void {
    this.newLinkForm = new FormGroup({
      Url: new FormControl('', [Validators.required]),
      Title: new FormControl('', [Validators.required]),
      UserId: new FormControl(null),
    });
    const session = localStorage.getItem('session');

    if (session) {
      this.UserSession = JSON.parse(session) as UserSession;
    }

    console.log('Se monto');
  }

  ngOnDestroy(): void {
    console.log('se destruyo');
  }
  closeAllModals() {
    this.newLinkModalTrigger = false;
    this.closeModals.emit(true);

    this.newLinkForm.reset();
  }

  createNewLink() {
    console.log(this.newLinkForm.value);

    this.newLinkDto = <CreateLinkDto>{
      Title: this.newLinkForm.value.Title,
      Url: this.newLinkForm.value.Url,
      UserId: this.UserSession.userId,
    };

    if (this.newLinkForm.valid) {
      this._linksService.createNewLink(this.newLinkDto).subscribe({
        next: (res) => {
          console.log(res);
          this.closeAllModals();
        },
      });
    }
  }
}
