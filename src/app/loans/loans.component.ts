import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, ValidationErrors, FormBuilder} from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { LoansDataService } from './services/loans-data.service';
import { LoansLogicService } from './services/loans-logic.service';
import { Loan } from './interfaces/loans';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  @ViewChild('investButton', {static: false}) investButton!: ElementRef;
  @ViewChild('modal', {static: false}) modal!: ElementRef;
  @ViewChild('loanA', {static: false}) loanA!: ElementRef;
  @ViewChild('loanB', {static: false}) loanB!: ElementRef;
  @ViewChild('loanC', {static: false}) loanC!: ElementRef;

  public userAmountFunds: any;
  public userAvaibleInv: any;
  public investForm!: FormGroup;

  private subscription!: Subscription;
  private formSubscription!: Subscription | undefined;

  formValue$!: Observable<any>;

  constructor(private fb: FormBuilder,
    private loansService: LoansDataService,
    private loanService: LoansLogicService) {}

  ngOnInit(): void { 
    this.initForm();

    this.subscription = this.loansService.getData().pipe(
      tap((data:any) => data.forEach((loan: Loan) => {
        this.userAmountFunds = parseFloat(loan.amount);
      }))
    ).subscribe((data: any) => {
      const loans = [];
      const trancheA = this.loanA.nativeElement.childNodes;
      const trancheB = this.loanB.nativeElement.childNodes;
      const trancheC = this.loanC.nativeElement.childNodes;

      loans.push(trancheA, trancheB, trancheC);

      for (let i = 0; i < data.length; i++) {
        this.loanService.renderLoansContent(loans[i], data[i]);
      }
    });    
   
    this.formSubscription = this.formСompare();
  }

  investToLoanA() {
    this.formValue$ = this.loansService.getData().pipe(
      map((loans: any) => {
        const modalRef = this.modal.nativeElement.childNodes;      
        this.userAvaibleInv = parseFloat(loans[0].available);
        this.loanService.renderModalContent(loans[0], modalRef);
      })
    )
  }

  investToLoanB() {
    
    this.formValue$ = this.loansService.getData().pipe(
      map((loans: any) => {
        const modalRef = this.modal.nativeElement.childNodes;
        this.userAvaibleInv = parseFloat(loans[1].available);
        this.loanService.renderModalContent(loans[1], modalRef);       
      })
    )
  }

  investToLoanC() {
    this.formValue$ = this.loansService.getData().pipe(
      map((loans: any) => {
        const modalRef = this.modal.nativeElement.childNodes;
        this.userAvaibleInv = parseFloat(loans[2].available);
        this.loanService.renderModalContent(loans[2], modalRef);
      })
    )
  }

  formСompare() {
    return this.investForm.get('investion')?.valueChanges.subscribe((data:any) => {
      if (Number(data) <= Number(this.userAmountFunds) && 
          Number(data) >= Number(this.userAvaibleInv) && 
          this.investForm.valid) {
        console.log(this.userAvaibleInv)
        this.investButton.nativeElement.removeAttribute('disabled');    
      } else {
        this.investButton.nativeElement.setAttribute('disabled', '');
      }
    });
  }

  updateInvestData() {  
    
  }

  private initForm() {
    this.investForm = this.fb.group({
      investion: ['', Validators.compose([
        Validators.pattern(`^[0-9]+$`),
        Validators.required
    ])]
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.formSubscription!.unsubscribe();
  }
}
