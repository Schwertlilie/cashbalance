export class English {
    protected constructor() {}

    public static APPLY_COUNTED(num: number, format: string): string {
        return format.replace("{count}", num.toString())
    }

    public static TIME_LOCALE = "en"
    public static TIME_YESTERDAY = "yesterday"
    public static TIME_HOURS_AGO = "{count} hour(s) ago"
    public static TIME_MINUTES_AGO = "{count} minute(s) ago"
    public static TIME_SECONDS_AGO = "{count} second(s) ago"
    public static TIME_TODAY_AT = "today at"
    public static TIME_JUST_NOW = "just now"

    public static APPNAME = "Cashbalance"

    public static LOGIN_KNOWN_CONNECTIONS = "Reuse Connection"
    public static LOGIN_SESSION_NAME = "Session Name"
    public static LOGIN_API_ENDPOINT_LABEL = "API Endpoint URL"
    public static LOGIN_API_TOKEN_LABEL = "API Token"
    public static LOGIN_SUBMIT = "Add Connection"
    public static LOGIN_ERROR_MISSING_INPUTS = "You must provide all fields (session name, api endpoint and api token)."
    public static LOGIN_ERROR_LOGIN_FAILED = "The provided login information is wrong. Is the URL and API token correct?"

    public static ENTRY_CAPTION_CATEGORY = "Category"
    public static ENTRY_CAPTION_SHOP = "Shop"
    public static ENTRY_CAPTION_AMOUNT = "Amount"
    public static ENTRY_CAPTION_RECEIPT = "Receipt"
    public static ENTRY_CAPTION_COST_CENTER = "Cost center"
    public static ENTRY_CAPTION_NOTE = "Note"
    public static ENTRY_RADIO_IN = "In"
    public static ENTRY_RADIO_OUT = "Out"
    public static ENTRY_CHECKBOX_CASH = "Cash"
    public static ENTRY_CHECKBOX_TAX = "Tax"
    public static ENTRY_CHECKBOX_DRAFT = "Draft"
    public static ENTRY_BUTTON_SAVE = "Save"
    public static ENTRY_PLACEHOLDER_CATEGORY = "Alimentary"
    public static ENTRY_PLACEHOLDER_SHOP = "Rewe"
    public static ENTRY_PLACEHOLDER_AMOUNT = "0.00"
    public static ENTRY_PLACEHOLDER_RECEIPT = "/path/to/receipt.png"
    public static ENTRY_PLACEHOLDER_NOTE = ""
    public static ENTRY_LIST_COST_CENTER = ["XF", "MF", "IF", "Other"]
}