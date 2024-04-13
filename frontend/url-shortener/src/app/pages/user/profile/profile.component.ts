import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProfileCardComponent } from '../../../components/user/profile-card/profile-card.component';
import { LinksService } from '../../../services/links/links.service';
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
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
import { AuthService } from '../../../services/auth/auth.service';
import { map } from 'rxjs';

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
    DecimalPipe,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  constructor(
    private _linksService: LinksService,
    private _route: ActivatedRoute,
    private _authService: AuthService
  ) {}
  isModalOpen: boolean = false;

  newLinkModalTrigger: boolean = false;
  deleteLinkModalTrigger: boolean = false;
  selectedLinkIdToDelete!: Link | null;
  userLinks!: Link[];

  newLinkDto!: CreateLinkDto;
  newLinkForm!: FormGroup;
  username!: string;
  isOwner!: boolean;

  ngOnInit(): void {
    this.username = this._route.snapshot.params['username'];

    //When profile is OnInit,
    //check if the logged user is the owner of the profile trying to access
    this._authService.checkSession(this.username).subscribe({
      next: (isProfileOwner) => {
        //If user is the owner of the profile, call function API to get the links
        if (isProfileOwner) {
          this.getUserLinks();
        }
      },
    }).closed;
  }

  //Function to redirect the user to the original Url
  goToUrl(url: string) {
    this._linksService.visitLink(url);
  }
  
  //Function to logout and remove the session
  logout() {
    this._authService.logout();
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
      .getUserLinks(this.username)
      .subscribe({ next: (res) => (this.userLinks = res) });
  }
}
