import { iconCash, iconTax } from '../icons';
import { STRINGS } from '../language/default';
import { makeid } from '../utils/makeid';
import { Button, FormCheckbox, FormInput, FormLabel, FormRadioButtonGroup } from '../webui/form';
import { Module } from '../webui/module';
import { PageManager } from '../webui/pagemanager';
import './edit.css'

export class TransactionEdit extends Module<HTMLDivElement> {
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
        this.add(categoryCaption)
        this.add(this.categoryInput)

        // Shop
        let shopCaption = new FormLabel(STRINGS.EDIT_CAPTION_SHOP, "editCaption")
        this.shopInput = new FormInput("inputShop", STRINGS.EDIT_PLACEHOLDER_SHOP, "text")
        this.shopInput.onChange = (value: string) => {
            this.shopInput.value(value.replaceAll(";", ","))
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
        this.add(noteCaption)
        this.add(this.noteInput)

        // Save button
        let saveButton = new Button(STRINGS.EDIT_BUTTON_SAVE, "buttonWide")
        saveButton.onClick = () => {
            this.saveTransaction()
            PageManager.open("transactionList", {})
        }
        this.add(saveButton)
    }

    private saveTransaction(): string {
        let csvString: string
        let costCenter: string

        if (this.costCenterRadioButtonGroup.value() == STRINGS.EDIT_LIST_COST_CENTER.length - 1) {
            costCenter = this.costCenterOtherInput.value()
        } else {
            costCenter = STRINGS.EDIT_LIST_COST_CENTER[this.costCenterRadioButtonGroup.value()]
        }

        let uuid = makeid(32)

        // TODO convert TransactionEdit values to Transaction, use general save method (data/transaction.ts)
        csvString = [
            this.categoryInput.value(),
            this.shopInput.value(),
            (Number(this.amountInput.value()) * 100).toFixed(0), // TODO handle internally as number
            this.cashCheckbox.value()?"1":"0",
            this.taxCheckbox.value()?"1":"0",
            this.draftCheckbox.value()?"1":"0",
            costCenter,
            this.noteInput.value(),
            uuid,
        ].join(";")
        console.log(csvString)
        return csvString
    }
}
