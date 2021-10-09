import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { LoansDataService } from './services/loans-data.service';
import { Loans, Loan } from './interfaces/loans';
@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  closeResult = '';
  private cards!: Loans;
  private subscription!: Subscription;

  constructor(
    private loansService: LoansDataService) {}

  ngOnInit(): void {
    this.subscription = this.loansService.getData().subscribe((data: any) => {
      this.cards = data;
      console.log(this.cards);
    }); 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
