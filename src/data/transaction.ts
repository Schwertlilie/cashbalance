import { STRINGS } from "../language/default"
import { WebFS } from "../webfs/client/webfs"

let HEADER = "Date;Category;Shop;Amount/€;isCash;isTax;isFix;isDraft;Cost center;Note;uuid"
let FILEPATH = "cashbalance.csv"

export class Transaction {
    constructor(
        public date: string = "",
        public category: string = "",
        public shop: string = "",
        public amount: number = 0,
        public isCash: boolean = false,
        public isTax: boolean = false,
        public isFix: boolean = false,
        public isDraft: boolean = false,
        public costCenter: string = "",
        public note: string = "",
        public uuid: string = "",
    ) {}
}

export async function storeTransactions(transactions: Transaction[], md5: string): Promise<boolean> {
    let csvFileContent = ""
    csvFileContent = HEADER + "\n"
    for (let i = 0; i < transactions.length; i++) {
        let csvTransaction = [
            transactions[i].date,
            transactions[i].category,
            transactions[i].shop,
            (transactions[i].amount).toFixed(2).replace(".", ","),
            transactions[i].isCash?"1":"0",
            transactions[i].isTax?"1":"0",
            transactions[i].isFix?"1":"0",
            transactions[i].isDraft?"1":"0",
            transactions[i].costCenter,
            transactions[i].note,
            transactions[i].uuid,
        ].join(";")
        csvFileContent = csvFileContent + csvTransaction + "\n"
    }
    if (WebFS.instance == null) {
        alert(STRINGS.ERROR_INVALID_SESSION)
        return false
    } else {
        let isSaved = await WebFS.instance!.putTxt(FILEPATH, csvFileContent, md5)
        if (!isSaved) {
            alert(STRINGS.ERROR_SAVE_FILE)
            return false
        }
    }
    return true
}

export async function loadTransactions(): Promise<TransactionsWithMd5 | null> {
    let transactions: Transaction[] = []
    let md5: string = ""
    if (WebFS.instance == null) {
        alert(STRINGS.ERROR_INVALID_SESSION)
        return null
    }

    let fileTree = await WebFS.instance.list(".")
    if (fileTree == null) {
        alert(STRINGS.ERROR_READ_FILE)
        return null
    }
    if (fileTree[FILEPATH]) {
    } else {
        let isPut = await WebFS.instance.putTxt(FILEPATH, HEADER + "\n", "")
        if (!isPut) {
            alert(STRINGS.ERROR_CREATE_FILE)
            return null
        }
    }

    let csvFileContent = await WebFS.instance.readTxt(FILEPATH)
    if (csvFileContent == null) {
        alert(STRINGS.ERROR_READ_FILE)
        return null      
    }
    let csvLines = csvFileContent.replaceAll("\r\n", "\n").split("\n")
    if (csvLines[0] != HEADER) {
        alert(STRINGS.ERROR_UNKNOWN_DATASTRUCTURE)
        return null
    }
    for (let i = 1; i < csvLines.length; i++) {
        let csvLine = csvLines[i]
        if (csvLine == "") {
            continue
        }
        let csvTokens = csvLine.split(";")
        let transaction = new Transaction(
            csvTokens[0],
            csvTokens[1],
            csvTokens[2],
            Number(csvTokens[3].replace(",", ".")),
            csvTokens[4]=="1"?true:false,
            csvTokens[5]=="1"?true:false,
            csvTokens[6]=="1"?true:false,
            csvTokens[7]=="1"?true:false,
            csvTokens[8],
            csvTokens[9],
            csvTokens[10],
        )
        transactions.push(transaction)
    }
    let newMd5 = await WebFS.instance.md5(FILEPATH)
    if (newMd5 == null) {
        alert(STRINGS.ERROR_READ_MD5)
        return null
    } else {
        md5 = newMd5
    }
    transactions = sortTransactions(transactions)
    return {"transactions": transactions, "md5": md5}
}

export interface TransactionsWithMd5 {
    transactions: Transaction[]
    md5: string
}

export function getTransactionListIndex(transactions: Transaction[], uuid: string): number {
    /**
     * Gets the index of the transaction with specified uuid, or -1 if it is not present.
     * @param transactions The list of transactions.
     * @param uuid The uuid to locate in the transactions list.
     * @returns The index, or -1 if not present.
     */

    if (uuid == "") {
        return -1
    }
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].uuid == uuid) {
            return i
        }
    }
    return -1
}

export function sortTransactions(transactions: Transaction[]): Transaction[] {
    /**
     * Sorts transactions by descending date. Puts drafts always at top.
     * @param transactions The list of transactions to sort.
     * @returns The sorted list.
     */
    transactions = transactions.sort((x, y) => y.date.localeCompare(x.date))
    transactions = transactions.sort((x, y) => Number(y.isDraft) - Number(x.isDraft))
    return transactions
}
