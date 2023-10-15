import './transaction_list.css'
import { KWARGS, Module } from "../webui/module";
import { iconCash, iconRepeat, iconTax } from '../icons';
import { Button } from '../webui/form';
import { PageManager } from '../webui/pagemanager';
import { WebFS } from '../webfs/client/webfs';
import { Transaction, loadTransactions } from '../data/transaction';
import { STRINGS } from '../language/default';
import { formatDateAsGermanString } from '../webui/utils/humanFriendlyDates';

let lastClickedTransactionUuid = ""

export class TransactionList extends Module<HTMLDivElement> {
    private transactions: Transaction[] = []
    private transactionsContainer: Module<HTMLDivElement>
    public constructor() {
        super("div")
        let transactionsTitleBar = new Module<HTMLDivElement>("div", STRINGS.APPNAME, "transactionsTitleBar")
        this.add(transactionsTitleBar)

        this.transactionsContainer = new Module<HTMLDivElement>("div", "", "transactionsContainer")
        this.add(this.transactionsContainer)

        let button = new Button("+", "transactionAddButton")
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

        if (this.transactions.length > 1) {
            let validTransactions = this.transactions.filter((x) => !x.isDraft)
            let dates = validTransactions.map((x: Transaction) => new Date(x.date))
            let startDate = dates.reduce((x, y) => x<y?x:y)
            let startDateString = formatDateAsGermanString(startDate)

            let endDate = dates.reduce((x, y) => x>y?x:y)
            let endDateString = formatDateAsGermanString(endDate)
            
            let summary = STRINGS.TRANSACTION_LIST_SUMMARY
            summary = summary.replace("{count}", this.transactions.length.toString())
            summary = summary.replace("{startDate}", startDateString)
            summary = summary.replace("{endDate}", endDateString)
            let transactionSummary = new Module<HTMLDivElement>("div", summary, "transactionSummary")
            this.transactionsContainer.add(transactionSummary)
        }

        for (let i = 0; i < this.transactions.length; i++) {
            let transactionListEntry = new TransactionListEntry(
                this.transactions[i].shop,
                this.transactions[i].category,
                this.transactions[i].amount,
                this.transactions[i].isCash,
                this.transactions[i].isTax,
                this.transactions[i].isFix,
                this.transactions[i].isDraft,
                this.transactions[i].date,
                this.transactions[i].costCenter,
                this.transactions[i].uuid
            )
            if (this.transactions[i].uuid == lastClickedTransactionUuid) {
                transactionListEntry.highlightEntry()
            }
            this.transactionsContainer.add(transactionListEntry)
        }
    }
}

class TransactionListEntry extends Module<HTMLLinkElement> {
    private uuid: string = ""
    public constructor(shop: string, category:string, amount: number, isCash: boolean, isTax: boolean, isFix: boolean, isDraft: boolean, date: string, costCenter: string, uuid: string) {
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

        let dateString = ""
        if (date != "") {
            dateString = formatDateAsGermanString(new Date(date))
        } else {
            dateString = STRINGS.TIME_EMPTY
        }
        let dateDiv = new Module<HTMLDivElement>("div", dateString, "transactionDate")
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

        let fixIcon = new Module<HTMLDivElement>("div", iconRepeat, "transactionIcon")
        if (isDraft) {
            fixIcon.setClass("transactionDraft")
        } else if (isFix) {
            fixIcon.setClass("transactionIconActive")
        }
        firstRow.add(fixIcon)

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

    public highlightEntry() {
        this.setClass("transactionEntry-highlight")
    }

    public onClick() {
        lastClickedTransactionUuid = this.uuid
        PageManager.open("edit", {uuid: this.uuid})
    }
}