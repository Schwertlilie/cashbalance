import './webui/colors.css'
import './main.css'
import { PageManager } from './webui/pagemanager'
import { STRINGS, setupLanguage } from './language/default'
import { Login, reconnectToLastSession, setPrefix } from './webfs/client/login/login'

import { TransactionList } from './views/transaction_list'
import { TransactionEdit } from './views/edit'

async function main() {
  setPrefix("cb")
  setupLanguage()
  document.getElementsByTagName("title")[0].innerHTML = STRINGS.APPNAME
  reconnectToLastSession()
  new PageManager(
    "transactionList",
    {
      login: new Login(),
      transactionList: new TransactionList(),
      edit: new TransactionEdit(),
    }
  )
}

main()