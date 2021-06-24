import Vue from 'vue'
import Promise from 'bluebird'
import { types, name as $nCookie } from '../store/cookie'


export default async function (context) {
  /**
   * Async Test
   */
  await new Promise(resolve => setTimeout(() => resolve(), 1))

  await context.store.dispatch($nCookie + '/' + types.LOAD)
}
