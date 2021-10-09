export interface Loans {
    loans: Loan[]
}

export interface Loan {
    amount: string,
    annualised_return: string,
    available: string,
    id: string,
    ltv: string,
    term_remaining: string,
    title: string,
    tranche: string
}
