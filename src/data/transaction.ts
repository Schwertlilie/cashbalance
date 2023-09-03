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
