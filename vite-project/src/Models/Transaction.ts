export interface Transaction{
    id? : number,
    header : string,
    transactionDate : string,
    transactionType : string,
    amount: number,
    isEditable? : boolean
} 