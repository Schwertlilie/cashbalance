import { STRINGS } from "../language/default"
import { WebFS } from "../webfs/client/webfs"

let HEADER = "date;category;shop;amount;isCash;isTax;isDraft;costCenter;note;uuid"
let FILEPATH = "cashbalance.csv"

export class Transaction {
    constructor(
        public date: string = "",
        public category: string = "",
        public shop: string = "",
        public amount: number = 0,
        public isCash: boolean = false,
        public isTax: boolean = false,
        public isDraft: boolean = true,
        public costCenter: string = "",
        public note: string = "",
        public uuid: string = "",
    ) {}
}
export async function loadTransactions(): Promise<TransactionsWithMd5 | null> {
    let transactions: Transaction[] = []
    let md5: string = ""
    if (WebFS.instance == null) {
        alert(STRINGS.ERROR_INVALID_SESSION)
        return null
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
            Number(csvTokens[3]) / 100,
            csvTokens[4]=="1"?true:false,
            csvTokens[5]=="1"?true:false,
            csvTokens[6]=="1"?true:false,
            csvTokens[7],
            csvTokens[8],
            csvTokens[9],
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
    return {"transactions": transactions, "md5": md5}
}

export interface TransactionsWithMd5 {
    transactions: Transaction[]
    md5: string
}
