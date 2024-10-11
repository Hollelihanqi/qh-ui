import { ensureLang } from '../utils/lang'
import navLocale from '../i18n/pages/sidebar.json'

// Mapping the first sub link to the nav link to avoid 404 error.

function getNav() {
  return [
    {
      activeMatch: "/guide",
      link: "/guide/fast",
      text: "指南"
    },
    {
      activeMatch: "/components",
      link: "/components/table",
      text: "组件"
    }
  ]
}

export const nav = getNav()
