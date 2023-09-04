import { Transaction, getTransactionListIndex, loadTransactions, storeTransactions } from '../data/transaction';
import { iconCash, iconTax } from '../icons';
import { STRINGS } from '../language/default';
import { makeid } from '../utils/makeid';
import { WebFS } from '../webfs/client/webfs';
import { Button, FormCheckbox, FormInput, FormLabel, FormRadioButtonGroup } from '../webui/form';
import { KWARGS, Module } from '../webui/module';
import { PageManager } from '../webui/pagemanager';
import './edit.css'

export class TransactionEdit extends Module<HTMLDivElement> {
    private md5: string = ""
    private transactions: Transaction[] = []
    private uuid: string = ""
    private dateInput: FormInput
    private categoryInput: FormInput
    private shopInput: FormInput
    private amountInput: FormInput
    private cashCheckbox: FormCheckbox
    private taxCheckbox: FormCheckbox
    private draftCheckbox: FormCheckbox
    private costCenterRadioButtonGroup: FormRadioButtonGroup
    private costCenterOtherLabel: FormLabel
    private costCenterOtherInput: FormInput
    private noteInput: FormInput
    private saveButton: Button
    public constructor() {
        super("div", "", "editTransaction")

        // Date
        let dateCaption = new FormLabel(STRINGS.EDIT_CAPTION_DATE, "editCaption")
        this.dateInput = new FormInput("inputDate", STRINGS.EDIT_PLACEHOLDER_DATE, "date")
        this.add(dateCaption)
        this.add(this.dateInput)

        // Category
        let categoryCaption = new FormLabel(STRINGS.EDIT_CAPTION_CATEGORY, "editCaption")
        this.categoryInput = new FormInput("inputCategory", STRINGS.EDIT_PLACEHOLDER_CATEGORY, "text")
        this.categoryInput.onChange = (value: string) => {
            this.categoryInput.value(value.replaceAll(";", ","))
        }
        this.categoryInput.onChangeDone = (value: string) => {
            if (value.endsWith(" ")) {
                this.categoryInput.value(value.slice(0, -1))
            }
        }
        this.add(categoryCaption)
        this.add(this.categoryInput)

        // Shop
        let shopCaption = new FormLabel(STRINGS.EDIT_CAPTION_SHOP, "editCaption")
        this.shopInput = new FormInput("inputShop", STRINGS.EDIT_PLACEHOLDER_SHOP, "text")
        this.shopInput.onChange = (value: string) => {
            this.shopInput.value(value.replaceAll(";", ","))
        }
        this.shopInput.onChangeDone = (value: string) => {
            if (value.endsWith(" ")) {
                this.shopInput.value(value.slice(0, -1))
            }
        }
        this.add(shopCaption)
        this.add(this.shopInput)

        // Amount
        let amountCaption = new FormLabel(STRINGS.EDIT_CAPTION_AMOUNT, "editCaption")
        let radioButtonGroupAmount = new FormRadioButtonGroup("radioAmount", [STRINGS.EDIT_RADIO_IN, STRINGS.EDIT_RADIO_OUT], "editRadioGroup")
        this.amountInput = new FormInput("inputAmount", STRINGS.EDIT_PLACEHOLDER_AMOUNT, "number")
        let amountCurrencyLabel = new FormLabel(" €")
        this.amountInput.onChange = (value: string) => {
            let amount = Number(value)
            if (amount < 0) {
                radioButtonGroupAmount.value(1)
            } else {
                radioButtonGroupAmount.value(0)
            }
        }
        this.amountInput.onChangeDone = (value: string) => {
            let reducedValue = Number(value).toFixed(2)
            if (value != reducedValue) {
                this.amountInput.value(reducedValue)
            }
            console.log("Wrote amount: " + this.amountInput.value())
        }
        radioButtonGroupAmount.onChange = (_selectedIndex: number) => {
            let amount = Number(this.amountInput.htmlElement.value)
            this.amountInput.value((amount * -1).toFixed(2))
        }
        radioButtonGroupAmount.value(0)
        this.add(amountCaption)
        this.add(radioButtonGroupAmount)
        this.add(this.amountInput)
        this.add(amountCurrencyLabel)
        
        // Tags
        let tagDiv = new Module<HTMLDivElement>("div", "", "editTag")
        this.cashCheckbox = new FormCheckbox("checkboxCash", iconCash + " " + STRINGS.EDIT_CHECKBOX_CASH, "editIcon", false)
        this.taxCheckbox = new FormCheckbox("checkboxTax", iconTax + " " + STRINGS.EDIT_CHECKBOX_TAX, "editIcon", false)
        this.draftCheckbox = new FormCheckbox("checkboxDraft", STRINGS.EDIT_CHECKBOX_DRAFT, "", true)
        this.add(tagDiv)
        tagDiv.add(this.cashCheckbox)
        tagDiv.add(this.taxCheckbox)
        tagDiv.add(this.draftCheckbox)
        
        // Receipt
        let receiptCaption = new FormLabel(STRINGS.EDIT_CAPTION_RECEIPT, "editCaption")
        let receiptInput = new FormInput("inputReceipt", STRINGS.EDIT_PLACEHOLDER_RECEIPT, "text")
        receiptInput.onChange = (value: string) => {
            receiptInput.value(value.replaceAll(";", ","))
        }
        this.add(receiptCaption)
        this.add(receiptInput)

        // Cost center
        let costCenterCaption = new FormLabel(STRINGS.EDIT_CAPTION_COST_CENTER, "editCaption")
        this.costCenterRadioButtonGroup = new FormRadioButtonGroup("radioCostCenter", STRINGS.EDIT_LIST_COST_CENTER, "editRadioGroup")
        this.costCenterOtherLabel = new FormLabel(STRINGS.EDIT_LIST_COST_CENTER[STRINGS.EDIT_LIST_COST_CENTER.length - 1] + ": ")
        this.costCenterOtherInput = new FormInput("inputCostCenterOther", STRINGS.EDIT_LIST_COST_CENTER[STRINGS.EDIT_LIST_COST_CENTER.length - 1], "text")
        this.costCenterOtherLabel.hide()
        this.costCenterOtherInput.hide()
        this.costCenterOtherInput.onChange = (value: string) => {
            this.costCenterOtherInput.value(value.replaceAll(";", ","))
        }
        this.costCenterOtherInput.onChangeDone = (value: string) => {
            if (value.endsWith(" ")) {
                this.costCenterOtherInput.value(value.slice(0, -1))
            }
        }
        this.costCenterRadioButtonGroup.onChange = (selectedIndex: number) => {
            if (selectedIndex == STRINGS.EDIT_LIST_COST_CENTER.length - 1) {
                this.costCenterOtherLabel.show()
                this.costCenterOtherInput.show()
            } else {
                this.costCenterOtherLabel.hide()
                this.costCenterOtherInput.hide()
            }
        }
        this.costCenterRadioButtonGroup.value(0)
        this.add(costCenterCaption)
        this.add(this.costCenterRadioButtonGroup)
        this.add(this.costCenterOtherLabel)
        this.add(this.costCenterOtherInput)
        
        // Notes
        let noteCaption = new FormLabel(STRINGS.EDIT_CAPTION_NOTE, "editCaption")
        this.noteInput = new FormInput("inputNote", STRINGS.EDIT_PLACEHOLDER_NOTE, "text")
        this.noteInput.onChange = (value: string) => {
            this.noteInput.value(value.replaceAll(";", ","))
        }
        this.noteInput.onChangeDone = (value: string) => {
            if (value.endsWith(" ")) {
                this.noteInput.value(value.slice(0, -1))
            }
        }
        this.add(noteCaption)
        this.add(this.noteInput)

        // Save button
        this.saveButton = new Button(STRINGS.EDIT_BUTTON_SAVE, "buttonWide")
        this.saveButton.onClick = this.saveTransaction.bind(this)
        this.add(this.saveButton)
    }

    public async update(kwargs: KWARGS, _changedPage: boolean) {
        if (WebFS.instance == null) {
            PageManager.open("login", {})
        }
        let loadReturn = await loadTransactions()
        if (loadReturn == null) {
            return
        }
        this.transactions = loadReturn.transactions
        this.md5 = loadReturn.md5
        
        let transaction: Transaction
        let index = getTransactionListIndex(this.transactions, kwargs.uuid)
        if (index != -1) {
            transaction = this.transactions[index]
            this.uuid = kwargs.uuid
        } else {
            transaction = new Transaction()
            this.uuid = makeid(32)
        }

        // Set values into form
        if ((transaction.isDraft == false) && (transaction.date == "")) {
            let currentDate = new Date()
            transaction.date = currentDate.toISOString().split("T")[0]
        }
        this.dateInput.value(transaction.date)
        this.categoryInput.value(transaction.category)
        this.shopInput.value(transaction.shop)
        this.amountInput.value(transaction.amount.toFixed(2))
        this.cashCheckbox.value(transaction.isCash)
        this.taxCheckbox.value(transaction.isTax)
        this.draftCheckbox.value(transaction.isDraft)
        let costCenterIndex = STRINGS.EDIT_LIST_COST_CENTER.indexOf(transaction.costCenter)
        if (transaction.costCenter == "") {
            costCenterIndex = 0
        }
        if (costCenterIndex == -1) {
            this.costCenterRadioButtonGroup.value(STRINGS.EDIT_LIST_COST_CENTER.length - 1)
            this.costCenterOtherLabel.show()
            this.costCenterOtherInput.show()
            this.costCenterOtherInput.value(transaction.costCenter)
            
        } else {
            this.costCenterOtherLabel.hide()
            this.costCenterOtherInput.hide()
            this.costCenterRadioButtonGroup.value(costCenterIndex)
        }
        this.noteInput.value(transaction.note)
    }

    private async saveTransaction() {
        this.saveButton.htmlElement.disabled = true
        let transaction = this.getTransactionFromInput()
        if (transaction == null) {
            return
        }
        
        // Replace old transaction or append new
        let index = getTransactionListIndex(this.transactions, this.uuid)
        if (index != -1) {
            this.transactions[index] = transaction
        } else {
            this.transactions.push(transaction) 
        }
        
        // Save transactions
        let isSaved = await storeTransactions(this.transactions, this.md5)
        this.saveButton.htmlElement.disabled = false
        if (isSaved) {
            PageManager.open("transactionList", {})
        }
    }
    
    private getTransactionFromInput(): Transaction | null {
        let transaction: Transaction = new Transaction()
        
        let costCenter: string
        if (this.costCenterRadioButtonGroup.value() == STRINGS.EDIT_LIST_COST_CENTER.length - 1) {
            costCenter = this.costCenterOtherInput.value()
        } else {
            costCenter = STRINGS.EDIT_LIST_COST_CENTER[this.costCenterRadioButtonGroup.value()]
        }

        
        if (!this.draftCheckbox.value()){
            if (this.dateInput.value() == "") {
                alert(STRINGS.ERROR_EDIT_EMPTY_INPUT + "date.")
                return null
            }
            if (this.categoryInput.value() == "") {
                alert(STRINGS.ERROR_EDIT_EMPTY_INPUT + "category.")
                return null
            }
            if (this.shopInput.value() == "") {
                alert(STRINGS.ERROR_EDIT_EMPTY_INPUT + "shop.")
                return null
            }
            if (this.amountInput.value() == "") {
                alert(STRINGS.ERROR_EDIT_EMPTY_INPUT + "amount.")
                return null
            }
            if (costCenter == "") {
                alert(STRINGS.ERROR_EDIT_EMPTY_INPUT + "cost center.")
                return null
            }
        }

        transaction.date = this.dateInput.value()
        transaction.category = this.categoryInput.value()
        transaction.shop = this.shopInput.value()
        transaction.amount = Number(this.amountInput.value())
        transaction.isCash = this.cashCheckbox.value()?true:false
        transaction.isTax = this.taxCheckbox.value()?true:false
        transaction.isDraft = this.draftCheckbox.value()?true:false
        transaction.costCenter = costCenter
        transaction.note = this.noteInput.value()
        transaction.uuid = this.uuid

        return transaction
    }
}
