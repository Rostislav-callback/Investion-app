import { Injectable } from '@angular/core';

import { Loan } from '../interfaces/loans';
@Injectable({
  providedIn: 'root'
})
export class LoansLogicService {

  constructor() { }

  renderLoansContent(elements:any, details: Loan) {
    elements.forEach((elem: any) => {
      if (elem.classList.contains('loan_title')) {
        elem.innerHTML = details.title;
      } else {
        elem.childNodes[0].innerHTML = `
        Annualised return: ${details.annualised_return} <br>
        Available: ${details.available}
        `;
      }     
    })
  }

  renderModalContent(loan: Loan, template:any) {
    template.forEach((elem:any) => {
      if (elem.classList.contains('loan_invest-title')) {
        elem.innerHTML = loan.title;
      }
      if (elem.classList.contains('loan_invest-available')) {
        elem.innerHTML = `Amount available: ${loan.available}`;
      }
      if (elem.classList.contains('loan_invest-remain')) {
        elem.innerHTML = `Loan ends in: ${loan.term_remaining}`;
      }
    });
  }
}
