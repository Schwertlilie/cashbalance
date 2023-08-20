import './transaction_list.css'
import { Module } from "../webui/module";
import { iconCash, iconTax } from '../icons';

export class TransactionList extends Module<HTMLDivElement> {
    public constructor() {
        super("div")
        let transaction1 = new Transaction("shop", "category", -12.34, true, true, true, "01.01.1900", "cost_center")
        this.add(transaction1)
        let transaction2 = new Transaction("shop", "category", 12.34, true, true, true, "01.01.1900", "cost_center")
        this.add(transaction2)
        let transaction3 = new Transaction("shop", "category", -12.34, true, true, false, "01.01.1900", "cost_center")
        this.add(transaction3)
        let transaction4 = new Transaction("shop", "category", -12.34, true, false, false, "01.01.1900", "cost_center")
        this.add(transaction4)
        let transaction5 = new Transaction("shop", "category", 12.34, false, true, false, "01.01.1900", "cost_center")
        this.add(transaction5)
    }
}

class Transaction extends Module<HTMLDivElement> {
    public constructor(shop: string, category:string, amount: number, isCash: boolean, isTax: boolean, isDraft: boolean, date: string, costCenter: string) {
        super("div", "", "transactionEntry")
        let firstRow = new Module<HTMLDivElement>("div", "", "transactionRow")
        this.add(firstRow)
        let secondRow = new Module<HTMLDivElement>("div", "", "transactionRow")
        this.add(secondRow)

        let shopDiv = new Module<HTMLDivElement>("div", shop)
        if (isDraft) {
            shopDiv.setClass("transactionDraft")
        }
        firstRow.add(shopDiv)

        let dateDiv = new Module<HTMLDivElement>("div", date, "transactionDate")
        if (isDraft) {
            dateDiv.setClass("transactionDraft")
        }
        firstRow.add(dateDiv)

        let cashIcon = new Module<HTMLDivElement>("div", iconCash, "transactionIcon")
        if (isDraft) {
            cashIcon.setClass("transactionDraft")
        } else if (isCash) {
            cashIcon.setClass("transactionIconActive")
        }
        firstRow.add(cashIcon)

        let taxIcon = new Module<HTMLDivElement>("div", iconTax, "transactionIcon")
        if (isDraft) {
            taxIcon.setClass("transactionDraft")
        } else if (isTax) {
            taxIcon.setClass("transactionIconActive")
        }
        firstRow.add(taxIcon)

        let categoryDiv = new Module<HTMLDivElement>("div", category)
        if (isDraft) {
            categoryDiv.setClass("transactionDraft")
        }
        secondRow.add(categoryDiv)

        
        let amountString = amount.toFixed(2).toString() + " €"
        let amountDiv = new Module<HTMLDivElement>("div", amountString, "transactionAmount")
        if (isDraft) {
            amountDiv.setClass("transactionDraft")
        } else if (amount < 0) {
            amountDiv.setClass("transactionAmountNegative")
        }
        secondRow.add(amountDiv)
        
        let costCenterDiv = new Module<HTMLDivElement>("div", costCenter, "transactionCostCenter")
        secondRow.add(costCenterDiv)

    }
}