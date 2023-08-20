import { English } from "./english";

export class German extends English {
    public static TIME_LOCALE = "de"

    //public static APPNAME = "Kassenbuch"

    public static ENTRY_CAPTION_CATEGORY = "Kategorie"
    public static ENTRY_CAPTION_SHOP = "Handelspartner"
    public static ENTRY_CAPTION_AMOUNT = "Betrag"
    public static ENTRY_CAPTION_RECEIPT = "Beleg"
    public static ENTRY_CAPTION_COST_CENTER = "Kostenstelle"
    public static ENTRY_CAPTION_NOTE = "Notiz"
    public static ENTRY_RADIO_IN = "Ein"
    public static ENTRY_RADIO_OUT = "Aus"
    public static ENTRY_CHECKBOX_CASH = "Bar"
    public static ENTRY_CHECKBOX_TAX = "Steuerrelevant"
    public static ENTRY_CHECKBOX_DRAFT = "Entwurf"
    public static ENTRY_BUTTON_SAVE = "Speichern"
    public static ENTRY_PLACEHOLDER_CATEGORY = "Lebensmittel & Haushalt"
    public static ENTRY_PLACEHOLDER_SHOP = "Rewe"
    public static ENTRY_PLACEHOLDER_AMOUNT = "0.00"
    public static ENTRY_PLACEHOLDER_RECEIPT = "/path/to/receipt.png"
    public static ENTRY_LIST_COST_CENTER = ["XF", "MF", "IF", "Andere"]
}