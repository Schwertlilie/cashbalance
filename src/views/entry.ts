import { iconCash, iconTax } from '../icons';
import { STRINGS } from '../language/default';
import { Button, FormCheckbox, FormInput, FormLabel, FormRadioButtonGroup } from '../webui/form';
import { Module } from '../webui/module';
import { PageManager } from '../webui/pagemanager';
import './entry.css'

export class Entry extends Module<HTMLDivElement> {
    public constructor() {
        super("div", "", "entry")
        
        // Category
        let categoryCaption = new FormLabel(STRINGS.ENTRY_CAPTION_CATEGORY, "entryCaption")
        let categoryInput = new FormInput("inputCategory", STRINGS.ENTRY_PLACEHOLDER_CATEGORY, "text")
        categoryInput.onChange = (value: string) => {
            categoryInput.value(value.replaceAll(";", ","))
        }
        this.add(categoryCaption)
        this.add(categoryInput)

        // Shop
        let shopCaption = new FormLabel(STRINGS.ENTRY_CAPTION_SHOP, "entryCaption")
        let shopInput = new FormInput("inputShop", STRINGS.ENTRY_PLACEHOLDER_SHOP, "text")
        shopInput.onChange = (value: string) => {
            shopInput.value(value.replaceAll(";", ","))
        }
        this.add(shopCaption)
        this.add(shopInput)

        // Amount
        let amountCaption = new FormLabel(STRINGS.ENTRY_CAPTION_AMOUNT, "entryCaption")
        let radioButtonGroupAmount = new FormRadioButtonGroup("radioAmount", [STRINGS.ENTRY_RADIO_IN, STRINGS.ENTRY_RADIO_OUT], "entryRadioGroup")
        let amountInput = new FormInput("inputAmount", STRINGS.ENTRY_PLACEHOLDER_AMOUNT, "number")
        let amountCurrencyLabel = new FormLabel(" €")
        amountInput.onChange = (value: string) => {
            let amount = Number(value)
            if (amount < 0) {
                radioButtonGroupAmount.value(1)
            } else {
                radioButtonGroupAmount.value(0)
            }
        }
        amountInput.onChangeDone = (value: string) => {
            let reducedValue = Number(value).toFixed(2)
            if (value != reducedValue) {
                amountInput.value(reducedValue)
            }
        }
        radioButtonGroupAmount.onChange = (_selectedIndex: number) => {
            let amount = Number(amountInput.htmlElement.value)
            amountInput.value((amount * -1).toFixed(2))
        }
        this.add(amountCaption)
        this.add(radioButtonGroupAmount)
        this.add(amountInput)
        this.add(amountCurrencyLabel)
        
        // Tags
        let tagDiv = new Module<HTMLDivElement>("div", "", "entryTag")
        let cashCheckbox = new FormCheckbox("checkboxCash", iconCash + " " + STRINGS.ENTRY_CHECKBOX_CASH, "entryIcon", false)
        let taxCheckbox = new FormCheckbox("checkboxTax", iconTax + " " + STRINGS.ENTRY_CHECKBOX_TAX, "entryIcon", false)
        let draftCheckbox = new FormCheckbox("checkboxDraft", STRINGS.ENTRY_CHECKBOX_DRAFT, "", true)
        this.add(tagDiv)
        tagDiv.add(cashCheckbox)
        tagDiv.add(taxCheckbox)
        tagDiv.add(draftCheckbox)
        
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
        let radioButtonGroupCostCenter = new FormRadioButtonGroup("radioCostCenter", STRINGS.ENTRY_LIST_COST_CENTER, "entryRadioGroup")
        let costCenterOtherLabel = new FormLabel(STRINGS.ENTRY_LIST_COST_CENTER[3] + ": ")
        let costCenterOtherInput = new FormInput("inputCostCenterOther", STRINGS.ENTRY_LIST_COST_CENTER[3], "text")
        costCenterOtherLabel.hide()
        costCenterOtherInput.hide()
        costCenterOtherInput.onChange = (value: string) => {
            costCenterOtherInput.value(value.replaceAll(";", ","))
        }
        radioButtonGroupCostCenter.onChange = (selectedIndex: number) => {
            if (selectedIndex == 3) {
                costCenterOtherLabel.show()
                costCenterOtherInput.show()
            } else {
                costCenterOtherLabel.hide()
                costCenterOtherInput.hide()
            }
        }
        this.add(costCenterCaption)
        this.add(radioButtonGroupCostCenter)
        this.add(costCenterOtherLabel)
        this.add(costCenterOtherInput)
        
        // Notes
        let noteCaption = new FormLabel(STRINGS.ENTRY_CAPTION_NOTE, "entryCaption")
        let noteInput = new FormInput("inputNote", STRINGS.ENTRY_PLACEHOLDER_NOTE, "text")
        noteInput.onChange = (value: string) => {
            noteInput.value(value.replaceAll(";", ","))
        }
        this.add(noteCaption)
        this.add(noteInput)

        // Save button
        let saveButton = new Button(STRINGS.ENTRY_BUTTON_SAVE, "buttonWide")
        saveButton.onClick = () => {
            PageManager.open("transactionList", {})
        }
        this.add(saveButton)
    }
}
