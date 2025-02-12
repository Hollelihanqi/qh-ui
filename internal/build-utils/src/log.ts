import { exit } from 'node:process'
import { consola } from 'consola'

export function errorAndExit(err: Error): never {
  consola.error(err)
  exit(1)
}
