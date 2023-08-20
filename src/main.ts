import './main.css'
import { PageManager } from './webui/pagemanager'
import { STRINGS, setupLanguage } from './language/default'
import { Login, tryReconnectToLastSession } from './views/login'

import { Overview } from './views/overview'
import { TransactionList } from './views/transaction_list'
import { Entry } from './views/entry'

async function main() {
  setupLanguage()
  document.getElementsByTagName("title")[0].innerHTML = STRINGS.APPNAME
  await tryReconnectToLastSession()
  new PageManager(
    "transactionList",
    {
      login: new Login(),
      overview: new Overview(),
      transactionList: new TransactionList(),
      entry: new Entry(),
    }
  )
}

main()