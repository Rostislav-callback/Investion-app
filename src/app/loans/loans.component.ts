import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';

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

  public currentLoanID: any;
  public userAmountFunds: any;
  public userAvaibleInv: any;
  public currentLoan!: Loan;
  public investForm!: FormGroup;

  private subscription!: Subscription;
  private userSubscription!: Subscription;
  private formSubscription!: Subscription | undefined;

  formValue$!: Observable<any>;

  constructor(private fb: FormBuilder,
    private loansService: LoansDataService,
    private loanService: LoansLogicService) {}

  ngOnInit(): void { 
    this.initForm();
    this.userSubscription = this.loansService.getCash()
      .subscribe((cash:any) => {  
        this.userAmountFunds = cash.cash_acount;
    })
    this.subscription = this.loansService.getDataAll()
      .subscribe((data: any) => {
        const loans = [];
        const trancheA = this.loanA.nativeElement.childNodes;
        const trancheB = this.loanB.nativeElement.childNodes;
        const trancheC = this.loanC.nativeElement.childNodes;

        loans.push(trancheA, trancheB, trancheC);

        for (let i = 0; i < data.length; i++) {
          this.loanService.renderLoansContent(loans[i], data[i]);
        }
      }
    );    
   
    this.formSubscription = this.formСompare();
  }

  investToLoanA() {
    this.formValue$ = this.loansService.getData(1).pipe(
      map((loan: any) => {
        const modalRef = this.modal.nativeElement.childNodes;   

        this.currentLoanID = loan.id;
        this.currentLoan = loan;
        this.userAvaibleInv = parseFloat(loan.available);
        this.loanService.renderModalContent(loan, modalRef);
      })
    )
  }

  investToLoanB() {  
    this.formValue$ = this.loansService.getData(5).pipe(
      map((loan: any) => {
        const modalRef = this.modal.nativeElement.childNodes;

        this.currentLoanID = loan.id;
        this.currentLoan = loan;
        this.userAvaibleInv = parseFloat(loan.available);
        this.loanService.renderModalContent(loan, modalRef);       
      })
    )
  }

  investToLoanC() {
    this.formValue$ = this.loansService.getData(12).pipe(
      map((loan: any) => {
        const modalRef = this.modal.nativeElement.childNodes;

        this.currentLoanID = loan.id;
        this.currentLoan = loan;
        this.userAvaibleInv = parseFloat(loan.available);
        this.loanService.renderModalContent(loan, modalRef);
      })
    )
  }

  updateInvestData() {  
    const userInvestment = this.investForm.get('investion')?.value
    const remainingFinances = Number(this.userAmountFunds) - userInvestment;
    this.investForm.get('investion')?.setValue('');
    
    this.loansService.updateData({cash_acount: String(remainingFinances)})
     .subscribe((data:any) => {data});
  }

  formСompare() {
    return this.investForm.get('investion')?.valueChanges.subscribe((data:any) => {
      if (Number(data) <= Number(this.userAmountFunds) && 
          Number(data) >= Number(this.userAvaibleInv) &&
          Number(this.userAmountFunds) > 0 && 
          this.investForm.valid) {
        this.investButton.nativeElement.removeAttribute('disabled');    
      } else {
        this.investButton.nativeElement.setAttribute('disabled', '');
      }
    });
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
    this.userSubscription.unsubscribe();
    this.formSubscription!.unsubscribe();
  }
}
