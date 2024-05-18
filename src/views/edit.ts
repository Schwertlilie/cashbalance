import { Transaction, getTransactionListIndex, loadTransactions, sortTransactions, storeTransactions } from '../data/transaction';
import { iconCash, iconRepeat, iconTax } from '../icons';
import { STRINGS } from '../language/default';
import { makeid } from '../utils/makeid';
import { WebFS } from '../webfs/client/webfs';
import { Button, FormCheckbox, FormDropdown, FormInput, FormLabel, FormRadioButtonGroup, FormTextArea } from '../webui/form';
import { iconArrowLeft } from '../webui/icons/icons';
import { KWARGS, Module } from '../webui/module';
import { PageManager } from '../webui/pagemanager';
import './edit.css'

export class TransactionEdit extends Module<HTMLDivElement> {
    private md5: string = ""
    private transactions: Transaction[] = []
    private uuid: string = ""
    private dateInput: FormInput
    private categoryDropdown: FormDropdown
    private categoryInput: FormInput
    private shopInput: FormInput
    private amountInput: FormInput
    private cashCheckbox: FormCheckbox
    private taxCheckbox: FormCheckbox
    private fixCheckbox: FormCheckbox
    private draftCheckbox: FormCheckbox
    private costCenterRadioButtonGroup: FormRadioButtonGroup
    private costCenterOtherInput: FormInput
    private noteInput: FormTextArea
    private saveButton: Button
    public constructor() {
        super("div", "")
        let editTitleBar = new Module<HTMLDivElement>("div", "", "editTitleBar")
        let backButton = new Button(iconArrowLeft, "backButton")
        backButton.onClick = () => {
            history.back()
        }
        let editTitleBarText = new Module<HTMLDivElement>("div", STRINGS.EDIT_TITLE, "editTitleBarText")
        editTitleBar.add(backButton)
        editTitleBar.add(editTitleBarText)
        this.add(editTitleBar)

        let editContent = new Module<HTMLDivElement>("div", "", "editTransaction")

        // Date
        let dateCaption = new FormLabel(STRINGS.EDIT_CAPTION_DATE, "editCaption")
        this.dateInput = new FormInput("inputDate", STRINGS.EDIT_PLACEHOLDER_DATE, "date", "editInput")
        editContent.add(dateCaption)
        editContent.add(this.dateInput)

        // Category
        let categoryCaption = new FormLabel(STRINGS.EDIT_CAPTION_CATEGORY, "editCaption")
        this.categoryDropdown = new FormDropdown("dropdownCategory", STRINGS.EDIT_LIST_CATEGORY, "editDropdown", "")
        this.categoryInput = new FormInput("inputCategory", STRINGS.EDIT_LIST_CATEGORY[STRINGS.EDIT_LIST_CATEGORY.length - 1], "text", "editInput")
        this.categoryInput.hide()
        this.categoryInput.onChange = (value: string) => {
            this.categoryInput.value(value.replaceAll(";", ","))
        }
        this.categoryInput.onChangeDone = (value: string) => {
            if (value.endsWith(" ")) {
                this.categoryInput.value(value.slice(0, -1))
            }
        }
        this.categoryDropdown.onChange = (value: string) => {
            if (value == STRINGS.EDIT_LIST_CATEGORY[STRINGS.EDIT_LIST_CATEGORY.length - 1]) {
                this.categoryInput.show()
            } else {
                this.categoryInput.hide()
            }
        }
        this.categoryDropdown.value(STRINGS.EDIT_LIST_CATEGORY[0])
        editContent.add(categoryCaption)
        editContent.add(this.categoryDropdown)
        editContent.add(this.categoryInput)

        // Shop
        let shopCaption = new FormLabel(STRINGS.EDIT_CAPTION_SHOP, "editCaption")
        this.shopInput = new FormInput("inputShop", STRINGS.EDIT_PLACEHOLDER_SHOP, "text", "editInput")
        this.shopInput.onChange = (value: string) => {
            this.shopInput.value(value.replaceAll(";", ","))
        }
        this.shopInput.onChangeDone = (value: string) => {
            if (value.endsWith(" ")) {
                this.shopInput.value(value.slice(0, -1))
            }
        }
        editContent.add(shopCaption)
        editContent.add(this.shopInput)

        // Amount
        let amountCaption = new FormLabel(STRINGS.EDIT_CAPTION_AMOUNT, "editCaption")
        let amountContainer = new Module<HTMLDivElement> ("div", "", "editAmountContainer")
        let radioButtonGroupAmount = new FormRadioButtonGroup("radioAmount", [STRINGS.EDIT_RADIO_IN, STRINGS.EDIT_RADIO_OUT], "editRadioGroup")
        this.amountInput = new FormInput("inputAmount", STRINGS.EDIT_PLACEHOLDER_AMOUNT, "number", "editAmount")
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
        editContent.add(amountCaption)
        amountContainer.add(radioButtonGroupAmount)
        amountContainer.add(this.amountInput)
        amountContainer.add(amountCurrencyLabel)
        editContent.add(amountContainer)
        
        // Tags
        let tagDiv = new Module<HTMLDivElement>("div", "", "editTag")
        this.cashCheckbox = new FormCheckbox("checkboxCash", iconCash + " " + STRINGS.EDIT_CHECKBOX_CASH, "editIcon", false)
        this.taxCheckbox = new FormCheckbox("checkboxTax", iconTax + " " + STRINGS.EDIT_CHECKBOX_TAX, "editIcon", false)
        this.fixCheckbox = new FormCheckbox("checkboxFix", iconRepeat + " " + STRINGS.EDIT_CHECKBOX_FIX, "editIcon", false)
        this.draftCheckbox = new FormCheckbox("checkboxDraft", STRINGS.EDIT_CHECKBOX_DRAFT, "", false)
        editContent.add(tagDiv)
        tagDiv.add(this.cashCheckbox)
        tagDiv.add(this.taxCheckbox)
        tagDiv.add(this.fixCheckbox)
        tagDiv.add(this.draftCheckbox)
        
        // Receipt
        let receiptCaption = new FormLabel(STRINGS.EDIT_CAPTION_RECEIPT, "editCaption")
        let receiptInput = new FormInput("inputReceipt", STRINGS.EDIT_PLACEHOLDER_RECEIPT, "text", "editInput")
        receiptInput.onChange = (value: string) => {
            receiptInput.value(value.replaceAll(";", ","))
        }
        editContent.add(receiptCaption)
        editContent.add(receiptInput)

        // Cost center
        let costCenterCaption = new FormLabel(STRINGS.EDIT_CAPTION_COST_CENTER, "editCaption")
        this.costCenterRadioButtonGroup = new FormRadioButtonGroup("radioCostCenter", STRINGS.EDIT_LIST_COST_CENTER, "editRadioGroup")
        this.costCenterOtherInput = new FormInput("inputCostCenterOther", STRINGS.EDIT_LIST_COST_CENTER[STRINGS.EDIT_LIST_COST_CENTER.length - 1], "text", "editInput")
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
                this.costCenterOtherInput.show()
            } else {
                this.costCenterOtherInput.hide()
            }
        }
        this.costCenterRadioButtonGroup.value(0)
        editContent.add(costCenterCaption)
        editContent.add(this.costCenterRadioButtonGroup)
        editContent.add(this.costCenterOtherInput)
        
        // Notes
        let noteCaption = new FormLabel(STRINGS.EDIT_CAPTION_NOTE, "editCaption")
        this.noteInput = new FormTextArea("inputNote", STRINGS.EDIT_PLACEHOLDER_NOTE, "editTextArea")
        this.noteInput.onChange = (value: string) => {
            this.noteInput.value(value.replaceAll(";", ","))
        }
        this.noteInput.onChangeDone = (value: string) => {
            if (value.endsWith(" ")) {
                this.noteInput.value(value.slice(0, -1))
            }
        }
        editContent.add(noteCaption)
        editContent.add(this.noteInput)

        // Save button
        this.saveButton = new Button(STRINGS.EDIT_BUTTON_SAVE, "buttonWide")
        this.saveButton.onClick = this.saveTransaction.bind(this)
        editContent.add(this.saveButton)

        this.add(editContent)
    }

    public async update(kwargs: KWARGS, _changedPage: boolean) {
        if (WebFS.connections.size < 1) {
            PageManager.open("login", {})
            return null
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
        let categoryIndex = STRINGS.EDIT_LIST_CATEGORY.indexOf(transaction.category)
        if (transaction.category == "") {
            categoryIndex = 0
        } else if (categoryIndex == STRINGS.EDIT_LIST_CATEGORY.length - 1) {
            categoryIndex = -1
        }
        if (categoryIndex == -1) {
            this.categoryDropdown.value(STRINGS.EDIT_LIST_CATEGORY[STRINGS.EDIT_LIST_CATEGORY.length - 1])
            this.categoryInput.show()
            this.categoryInput.value(transaction.category)
        } else {
            this.categoryDropdown.value(STRINGS.EDIT_LIST_CATEGORY[categoryIndex])
            this.categoryInput.hide()
        }
        this.categoryInput.value(transaction.category)
        this.shopInput.value(transaction.shop)
        if (transaction.amount != 0) {
            this.amountInput.value(transaction.amount.toFixed(2))
        } else {
            this.amountInput.value("")
        }
        this.amountInput.onChange(this.amountInput.value())
        this.cashCheckbox.value(transaction.isCash)
        this.taxCheckbox.value(transaction.isTax)
        this.fixCheckbox.value(transaction.isFix)
        this.draftCheckbox.value(transaction.isDraft)
        let costCenterIndex = STRINGS.EDIT_LIST_COST_CENTER.indexOf(transaction.costCenter)
        if (transaction.costCenter == "") {
            costCenterIndex = 0
        }
        if (costCenterIndex == -1) {
            this.costCenterRadioButtonGroup.value(STRINGS.EDIT_LIST_COST_CENTER.length - 1)
            this.costCenterOtherInput.show()
            this.costCenterOtherInput.value(transaction.costCenter)
            
        } else {
            this.costCenterOtherInput.value("")
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
        } else {
            this.appendTransaction(transaction)
        }

        let isSaved = await storeTransactions(this.transactions, this.md5)
        this.saveButton.htmlElement.disabled = false
        if (isSaved) {
            PageManager.open("transactionList", {})
        }
    }
    
    private getTransactionFromInput(): Transaction | null {
        let transaction: Transaction = new Transaction()

        let category: string
        if (this.categoryDropdown.value() == STRINGS.EDIT_LIST_CATEGORY[STRINGS.EDIT_LIST_CATEGORY.length -1]) {
            category = this.categoryInput.value()
        } else {
            category = this.categoryDropdown.value()
        }
        
        let costCenter: string
        if (this.costCenterRadioButtonGroup.value() == STRINGS.EDIT_LIST_COST_CENTER.length - 1) {
            costCenter = this.costCenterOtherInput.value()
        } else {
            costCenter = STRINGS.EDIT_LIST_COST_CENTER[this.costCenterRadioButtonGroup.value()]
        }
        
        if (this.checkInputs(category, costCenter) == false) {
            return null
        }
        
        transaction.date = this.dateInput.value()
        transaction.category = category
        transaction.shop = this.shopInput.value()
        transaction.amount = Number(this.amountInput.value())
        transaction.isCash = this.cashCheckbox.value()?true:false
        transaction.isTax = this.taxCheckbox.value()?true:false
        transaction.isFix = this.fixCheckbox.value()?true:false
        transaction.isDraft = this.draftCheckbox.value()?true:false
        transaction.costCenter = costCenter
        transaction.note = this.noteInput.value()
        transaction.uuid = this.uuid
        
        return transaction
    }
    
    private checkInputs(category: string, costCenter: string): boolean {
        if (!this.draftCheckbox.value()){
            if (this.dateInput.value() == "") {
                alert(STRINGS.ERROR_EDIT_EMPTY_INPUT + "date.")
                return false
            } else {
                // Entries can be added for last month until 15th of current month (export on 16th):
                // date.month >= (now - 15d).month
                let date_read: Date = new Date(this.dateInput.value())
                let date_now: Date = new Date()
                let date_delta = new Date(date_now.getTime() - 15*24*60*60*1000)  // now - 15 days
                if (date_read.getMonth() < date_delta.getMonth()) {
                    alert(STRINGS.ERROR_DATE_TOO_OLD)
                    return false
                }
            } 
            if (category == "") {
                alert(STRINGS.ERROR_EDIT_EMPTY_INPUT + "category.")
                return false
            } else if (category == "Geschenke") {
                let amount = Number(this.amountInput.value())
                if (amount > 0) {
                    alert(STRINGS.WARNING_CATEGORY_GIFT)
                }
            }
            if (this.shopInput.value() == "") {
                alert(STRINGS.ERROR_EDIT_EMPTY_INPUT + "shop.")
                return false
            }
            if (this.amountInput.value() == "") {
                alert(STRINGS.ERROR_EDIT_EMPTY_INPUT + "amount.")
                return false
            }
            if (costCenter == "") {
                alert(STRINGS.ERROR_EDIT_EMPTY_INPUT + "cost center.")
                return false
            }
        }
        return true
    }

    private appendTransaction(transaction: Transaction) {
        let index = getTransactionListIndex(this.transactions, this.uuid)
        if (index != -1) {
            this.transactions[index] = transaction
        } else {
            this.transactions.unshift(transaction)
        }
        this.transactions = sortTransactions(this.transactions)
    }
}
