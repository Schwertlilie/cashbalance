import './main.css'
import { PageManager } from './webui/pagemanager'
import { STRINGS, setupLanguage } from './language/default'
import { Login, tryReconnectToLastSession } from './views/login'

import { TransactionList } from './views/transaction_list'
import { TransactionEdit } from './views/edit'

async function main() {
  setupLanguage()
  document.getElementsByTagName("title")[0].innerHTML = STRINGS.APPNAME
  await tryReconnectToLastSession()
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