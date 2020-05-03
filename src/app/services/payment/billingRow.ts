interface BillingRow {
    identifier: string,
    accountId: number,
    operationDate: string,
    valueDate: string,
    occurence: number,
    label: String,
    amount: number,
    billingDate: String,
    category: (String | undefined)
}