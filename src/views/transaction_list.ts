import './transaction_list.css'
import { KWARGS, Module } from "../webui/module";
import { iconCash, iconTax } from '../icons';
import { Button } from '../webui/form';
import { PageManager } from '../webui/pagemanager';
import { WebFS } from '../webfs/client/webfs';
import { Transaction, loadTransactions } from '../data/transaction';

export class TransactionList extends Module<HTMLDivElement> {
    private transactions: Transaction[] = []
    private transactionsContainer: Module<HTMLDivElement>
    public constructor() {
        super("div")
        this.transactionsContainer = new Module<HTMLDivElement>("div")
        this.add(this.transactionsContainer)

        let button = new Button("+", "buttonWide")
        button.onClick = () => {PageManager.open("edit", {uuid: ""})}
        this.add(button)
    }

    public async update(_kwargs: KWARGS, _changedPage: boolean) {
        if (WebFS.instance == null) {
            PageManager.open("login", {})
        }
        this.transactionsContainer.htmlElement.innerHTML = ""
        this.transactions = []
        let loadReturn = await loadTransactions()
        if (loadReturn == null) {
            return
        }
        this.transactions = loadReturn.transactions
        for (let i = 0; i < this.transactions.length; i++) {
            let transactionListEntry = new TransactionListEntry(
                this.transactions[i].shop,
                this.transactions[i].category,
                this.transactions[i].amount,
                this.transactions[i].isCash,
                this.transactions[i].isTax,
                this.transactions[i].isDraft,
                this.transactions[i].date,
                this.transactions[i].costCenter,
                this.transactions[i].uuid
            )
            this.transactionsContainer.add(transactionListEntry)
        }
    }
}

class TransactionListEntry extends Module<HTMLLinkElement> {
    private uuid: string = ""
    public constructor(shop: string, category:string, amount: number, isCash: boolean, isTax: boolean, isDraft: boolean, date: string, costCenter: string, uuid: string) {
        super("div", "", "transactionEntry")
        this.uuid = uuid

        this.htmlElement.onclick = (e: Event) => {
            e.stopPropagation()
            this.onClick()
        }

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

    public onClick() {
        PageManager.open("edit", {uuid: this.uuid})
    }
}