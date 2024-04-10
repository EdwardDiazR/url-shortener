import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileCardComponent } from '../../../components/user/profile-card/profile-card.component';
import { LinksService } from '../../../services/links/links.service';
import { DatePipe, NgClass } from '@angular/common';
import { CreateLinkDto, Link } from '../../../Models/link';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DividerComponent } from '../../../components/divider/divider.component';
import { DeleteLinkModalComponent } from '../../../components/modals/delete-link-modal/delete-link-modal.component';
import { NewLinkModalComponent } from '../../../components/modals/new-link-modal/new-link-modal.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterLink,
    ProfileCardComponent,
    NgClass,
    DatePipe,
    ReactiveFormsModule,
    DividerComponent,
    DeleteLinkModalComponent,
    NewLinkModalComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  constructor(private _linksService: LinksService) {}
  isModalOpen: boolean = false;

  newLinkModalTrigger: boolean = false;
  deleteLinkModalTrigger: boolean = false;
  selectedLinkIdToDelete!: Link | null;
  userLinks!: Link[];

  newLinkDto!: CreateLinkDto;
  newLinkForm!: FormGroup;

  ngOnInit(): void {
    this.getUserLinks();
  }

  openNewLinkModal() {
    this.newLinkModalTrigger = !this.newLinkModalTrigger;
    this.isModalOpen = !this.isModalOpen;
    this.selectedLinkIdToDelete = null;
  }

  openDeleteModal(link: Link) {
    this.selectedLinkIdToDelete = link;
    if (this.selectedLinkIdToDelete) {
      this.isModalOpen = true;
      this.deleteLinkModalTrigger = true;
    }
  }

  closeAllModals() {
    (this.isModalOpen = false),
      (this.newLinkModalTrigger = false),
      (this.deleteLinkModalTrigger = false);
  }

  getUserLinks() {
    this._linksService
      .getUserLinks(1)
      .subscribe({ next: (res) => (this.userLinks = res) });
  }
}
