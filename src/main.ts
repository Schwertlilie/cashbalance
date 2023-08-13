import './main.css'
import { PageManager } from './webui/pagemanager'
import { STRINGS, setupLanguage } from './languages/default'
import { Login, tryReconnectToLastSession } from './views/login'

import { Overview } from './views/overview'

async function main() {
  setupLanguage()
  document.getElementsByTagName("title")[0].innerHTML = STRINGS.APPNAME
  await tryReconnectToLastSession()
  new PageManager(
    "overview",
    {
      login: new Login(),
      overview: new Overview(),
    }
  )
}

main()