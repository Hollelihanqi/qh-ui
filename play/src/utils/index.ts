export const getToken = () => {
  let token = sessionStorage.getItem('authorization') as string
  if (token) {
    if (token.indexOf('"') !== -1) {
      const regex = /^"(.*)"$/
      const matches: any = token.match(regex)
      token = matches[1]
    }
  }
  return token
}
