import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  input,
} from '@angular/core';
import { Link } from '../../../Models/link';
import { LinksService } from '../../../services/links/links.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-delete-link-modal',
  standalone: true,
  imports: [NgClass],
  templateUrl: './delete-link-modal.component.html',
  styleUrl: './delete-link-modal.component.scss',
})
export class DeleteLinkModalComponent implements OnInit, OnDestroy {
  constructor(private _linksService: LinksService) {}

  @Input() Link!: Link;

  @Output() closeModals: EventEmitter<boolean> = new EventEmitter<boolean>();

  deleteLinkModalTrigger: boolean = false;
  selectedLinkIdToDelete!: Link;
  ngOnInit(): void {
    this.deleteLinkModalTrigger = true;
  }
  ngOnDestroy(): void {
    this.closeAllModals();
  }

  deleteLinkById(linkId: number) {
    //CALL API TO DELETE LINK
    this._linksService.deleteLinkById(linkId).subscribe({
      next: (e) => {
        console.log(e);
      },
    });
  }

  closeAllModals() {
    this.deleteLinkModalTrigger = false;
    this.closeModals.emit(true);
  }
}
