import { Button, FormInput } from "../webui/form";
import { Module } from "../webui/module";
import { PageManager } from "../webui/pagemanager";

export class Overview extends Module<HTMLDivElement> {
    private summary: Module<HTMLDivElement>
    public constructor () {
        super("div")

        this.summary = new Module("div", "")
        this.add(this.summary)

        let button = new Button("+", "buttonWide")
        button.onClick = () => {PageManager.open("login", {})}
        this.add(button)

        let textField = new FormInput("category", "hint", "text")
        textField.onChange = this.selectCategory.bind(this)
        this.add(textField)
    }

    private selectCategory(text: string) {
        this.summary.htmlElement.innerText = text
    }
}