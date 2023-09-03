import { English } from "./english";

export class German extends English {
    public static TIME_LOCALE = "de"

    //public static APPNAME = "Kassenbuch"

    public static EDIT_CAPTION_DATE = "Datum"
    public static EDIT_CAPTION_CATEGORY = "Kategorie"
    public static EDIT_CAPTION_SHOP = "Handelspartner"
    public static EDIT_CAPTION_AMOUNT = "Betrag"
    public static EDIT_CAPTION_RECEIPT = "Beleg"
    public static EDIT_CAPTION_COST_CENTER = "Kostenstelle"
    public static EDIT_CAPTION_NOTE = "Notiz"
    public static EDIT_RADIO_IN = "Ein"
    public static EDIT_RADIO_OUT = "Aus"
    public static EDIT_CHECKBOX_CASH = "Bar"
    public static EDIT_CHECKBOX_TAX = "Steuerrelevant"
    public static EDIT_CHECKBOX_DRAFT = "Entwurf"
    public static EDIT_BUTTON_SAVE = "Speichern"
    public static EDIT_PLACEHOLDER_CATEGORY = "Lebensmittel & Haushalt"
    public static EDIT_PLACEHOLDER_SHOP = "Rewe"
    public static EDIT_PLACEHOLDER_RECEIPT = "/path/to/receipt.png"
    public static EDIT_LIST_COST_CENTER = ["XF", "MF", "IF", "Andere"]
}