export class English {
    protected constructor() {}

    public static APPLY_COUNTED(num: number, format: string): string {
        return format.replace("{count}", num.toString())
    }

    public static ERROR_INVALID_SESSION = "No valid session opened, go back to login."
    public static ERROR_SAVE_FILE = "Cannot save file. It was either changed on the server or you have too weak internet."
    public static ERROR_READ_MD5 = "Cannot read md5 of file. Maye there was an error saving or your internet is weak."
    public static ERROR_READ_FILE = "Cannot read file. Probably due to weak internet connection."
    public static ERROR_CREATE_FILE = "Cannot create file. Probably due to weak internet connection or lack of permissions."
    public static ERROR_UNKNOWN_DATASTRUCTURE = "Cannot parse csv due to unknown header."
    public static ERROR_EDIT_EMPTY_INPUT = "Cannot save transaction due to empty input "
    public static ERROR_DATE_TOO_OLD = "Date is too far in the past. Data has already been exported for this month."
    public static WARNING_CATEGORY_GIFT = "Category = \"Geschenke\" and Amount > 0: is this intended or did you mean Category = \"Sonstige Einnahmen\"? After confirmation of this alert, you might have to reopen the entry to change it."

    public static TIME_LOCALE = "en"
    public static TIME_YESTERDAY = "yesterday"
    public static TIME_HOURS_AGO = "{count} hour(s) ago"
    public static TIME_MINUTES_AGO = "{count} minute(s) ago"
    public static TIME_SECONDS_AGO = "{count} second(s) ago"
    public static TIME_TODAY_AT = "today at"
    public static TIME_JUST_NOW = "just now"
    public static TIME_EMPTY = "unknown"

    public static APPNAME = "Cashbalance"
    
    public static LOGIN_KNOWN_CONNECTIONS = "Reuse Connection"
    public static LOGIN_SESSION_NAME = "Session Name"
    public static LOGIN_API_ENDPOINT_LABEL = "API Endpoint URL"
    public static LOGIN_API_TOKEN_LABEL = "API Token"
    public static LOGIN_SUBMIT = "Add Connection"
    public static LOGIN_ALL_CONNECTIONS = "All"
    public static LOGIN_ERROR_MISSING_INPUTS = "You must provide all fields (session name, api endpoint and api token)."
    public static LOGIN_ERROR_LOGIN_FAILED = "The provided login information is wrong. Is the URL and API token correct?"
    public static LOGIN_OFFLINE_MODAL_QUESTION = "Cannot connect to server. Do you want to continue in offline mode? Offline mode provides read-only view of transaction list."
    public static LOGIN_OFFLINE_MODAL_CONFIRM = "Continue offline"
    public static LOGIN_OFFLINE_MODAL_CANCEL = "Return to login"

    public static TRANSACTION_LIST_SUMMARY = "{count} transactions, {startDate} - {endDate}"
    
    public static EDIT_TITLE = "Edit transaction"
    public static EDIT_CAPTION_DATE = "Date"
    public static EDIT_CAPTION_CATEGORY = "Category"
    public static EDIT_CAPTION_SHOP = "Shop"
    public static EDIT_CAPTION_AMOUNT = "Amount"
    public static EDIT_CAPTION_RECEIPT = "Receipt"
    public static EDIT_CAPTION_COST_CENTER = "Cost center"
    public static EDIT_CAPTION_NOTE = "Note"
    public static EDIT_RADIO_IN = "In"
    public static EDIT_RADIO_OUT = "Out"
    public static EDIT_CHECKBOX_CASH = "Cash"
    public static EDIT_CHECKBOX_TAX = "Tax"
    public static EDIT_CHECKBOX_FIX = "Fix"
    public static EDIT_CHECKBOX_DRAFT = "Draft"
    public static EDIT_BUTTON_SAVE = "Save"
    public static EDIT_PLACEHOLDER_DATE = "2023-09-01"
    public static EDIT_PLACEHOLDER_CATEGORY = "Alimentary"
    public static EDIT_PLACEHOLDER_SHOP = "Rewe"
    public static EDIT_PLACEHOLDER_AMOUNT = "0.00"
    public static EDIT_PLACEHOLDER_RECEIPT = "/path/to/receipt.png"
    public static EDIT_PLACEHOLDER_NOTE = ""
    public static EDIT_PLACEHOLDER_COST_CENTER = "XF"
    public static EDIT_LIST_COST_CENTER = [
        "XF",
        "MF",
        "IF",
        "Other"
    ]
    public static EDIT_LIST_CATEGORY = [
        "Other"
    ]
}