import { iconCash, iconTax } from '../icons';
import { STRINGS } from '../language/default';
import { makeid } from '../utils/makeid';
import { Button, FormCheckbox, FormInput, FormLabel, FormRadioButtonGroup } from '../webui/form';
import { Module } from '../webui/module';
import { PageManager } from '../webui/pagemanager';
import './entry.css'

export class Entry extends Module<HTMLDivElement> {
    private categoryInput: FormInput
    private shopInput: FormInput
    private amountInput: FormInput
    private cashCheckbox: FormCheckbox
    private taxCheckbox: FormCheckbox
    private draftCheckbox: FormCheckbox
    private costCenterRadioButtonGroup: FormRadioButtonGroup
    private costCenterOtherInput: FormInput
    private noteInput: FormInput
    public constructor() {
        super("div", "", "entry")
        
        // Category
        let categoryCaption = new FormLabel(STRINGS.ENTRY_CAPTION_CATEGORY, "entryCaption")
        this.categoryInput = new FormInput("inputCategory", STRINGS.ENTRY_PLACEHOLDER_CATEGORY, "text")
        this.categoryInput.onChange = (value: string) => {
            this.categoryInput.value(value.replaceAll(";", ","))
        }
        this.add(categoryCaption)
        this.add(this.categoryInput)

        // Shop
        let shopCaption = new FormLabel(STRINGS.ENTRY_CAPTION_SHOP, "entryCaption")
        this.shopInput = new FormInput("inputShop", STRINGS.ENTRY_PLACEHOLDER_SHOP, "text")
        this.shopInput.onChange = (value: string) => {
            this.shopInput.value(value.replaceAll(";", ","))
        }
        this.add(shopCaption)
        this.add(this.shopInput)

        // Amount
        let amountCaption = new FormLabel(STRINGS.ENTRY_CAPTION_AMOUNT, "entryCaption")
        let radioButtonGroupAmount = new FormRadioButtonGroup("radioAmount", [STRINGS.ENTRY_RADIO_IN, STRINGS.ENTRY_RADIO_OUT], "entryRadioGroup")
        this.amountInput = new FormInput("inputAmount", STRINGS.ENTRY_PLACEHOLDER_AMOUNT, "number")
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
        this.add(amountCaption)
        this.add(radioButtonGroupAmount)
        this.add(this.amountInput)
        this.add(amountCurrencyLabel)
        
        // Tags
        let tagDiv = new Module<HTMLDivElement>("div", "", "entryTag")
        this.cashCheckbox = new FormCheckbox("checkboxCash", iconCash + " " + STRINGS.ENTRY_CHECKBOX_CASH, "entryIcon", false)
        this.taxCheckbox = new FormCheckbox("checkboxTax", iconTax + " " + STRINGS.ENTRY_CHECKBOX_TAX, "entryIcon", false)
        this.draftCheckbox = new FormCheckbox("checkboxDraft", STRINGS.ENTRY_CHECKBOX_DRAFT, "", true)
        this.add(tagDiv)
        tagDiv.add(this.cashCheckbox)
        tagDiv.add(this.taxCheckbox)
        tagDiv.add(this.draftCheckbox)
        
        // Receipt
        let receiptCaption = new FormLabel(STRINGS.ENTRY_CAPTION_RECEIPT, "entryCaption")
        let receiptInput = new FormInput("inputReceipt", STRINGS.ENTRY_PLACEHOLDER_RECEIPT, "text")
        receiptInput.onChange = (value: string) => {
            receiptInput.value(value.replaceAll(";", ","))
        }
        this.add(receiptCaption)
        this.add(receiptInput)

        // Cost center
        let costCenterCaption = new FormLabel(STRINGS.ENTRY_CAPTION_COST_CENTER, "entryCaption")
        this.costCenterRadioButtonGroup = new FormRadioButtonGroup("radioCostCenter", STRINGS.ENTRY_LIST_COST_CENTER, "entryRadioGroup")
        let costCenterOtherLabel = new FormLabel(STRINGS.ENTRY_LIST_COST_CENTER[3] + ": ")
        this.costCenterOtherInput = new FormInput("inputCostCenterOther", STRINGS.ENTRY_LIST_COST_CENTER[3], "text")
        costCenterOtherLabel.hide()
        this.costCenterOtherInput.hide()
        this.costCenterOtherInput.onChange = (value: string) => {
            this.costCenterOtherInput.value(value.replaceAll(";", ","))
        }
        this.costCenterRadioButtonGroup.onChange = (selectedIndex: number) => {
            if (selectedIndex == STRINGS.ENTRY_LIST_COST_CENTER.length - 1) {
                costCenterOtherLabel.show()
                this.costCenterOtherInput.show()
            } else {
                costCenterOtherLabel.hide()
                this.costCenterOtherInput.hide()
            }
        }
        this.add(costCenterCaption)
        this.add(this.costCenterRadioButtonGroup)
        this.add(costCenterOtherLabel)
        this.add(this.costCenterOtherInput)
        
        // Notes
        let noteCaption = new FormLabel(STRINGS.ENTRY_CAPTION_NOTE, "entryCaption")
        this.noteInput = new FormInput("inputNote", STRINGS.ENTRY_PLACEHOLDER_NOTE, "text")
        this.noteInput.onChange = (value: string) => {
            this.noteInput.value(value.replaceAll(";", ","))
        }
        this.add(noteCaption)
        this.add(this.noteInput)

        // Save button
        let saveButton = new Button(STRINGS.ENTRY_BUTTON_SAVE, "buttonWide")
        saveButton.onClick = () => {
            this.saveEntry()
            PageManager.open("transactionList", {})
        }
        this.add(saveButton)
    }

    private saveEntry(): string {
        let csvString: string
        let costCenter: string

        if (this.costCenterRadioButtonGroup.value() == STRINGS.ENTRY_LIST_COST_CENTER.length - 1) {
            costCenter = this.costCenterOtherInput.value()
        } else {
            costCenter = STRINGS.ENTRY_LIST_COST_CENTER[this.costCenterRadioButtonGroup.value()]
        }

        let uuid = makeid(32)

        csvString = [
            this.categoryInput.value(),
            this.shopInput.value(),
            (Number(this.amountInput.value()) * 100).toFixed(0),
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
