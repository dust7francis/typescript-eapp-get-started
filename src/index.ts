import { format } from 'date-fns'
import debounce = require('debounce')
import { existsSync, readFile, writeFile } from 'fs'
import { promisify } from 'util'

const shortFormat = 'YYYY-MM-DD HH:mm'

const saveStateFreq = 60000
const writeFilePromise = promisify(writeFile)
const readFilePromise = promisify(readFile)
const stateFile = `/dust-eapp/appState.json`

const getStateFromFile = async () =>
existsSync(stateFile)
  ? JSON.parse(await readFilePromise(stateFile, 'utf8'))
  : {}


export const saveState = debounce(() => {
  try {
    writeFilePromise(stateFile, JSON.stringify({ lastUpdated: Date.now() }))
  } catch (err) {
    console.error('saveStateFile.err: ', err)
  }
}, saveStateFreq)

const setup = async () => {
  const stateFromFile =  await getStateFromFile()
  const { lastUpdated } = stateFromFile
  if (lastUpdated) {
    console.log('lastUpdated', format(lastUpdated, shortFormat))
  } else {
    console.error('state file not yet created!')
  }
  const h2 = document.getElementById('lastUpdated')
  let msg = `The time is now ${format(Date.now(), shortFormat)}. `
  if (lastUpdated) {
    msg += `Your last use of this application is on ${format(lastUpdated, shortFormat)}.`
  }
  if (h2) {
    h2.innerText = msg
  } 
  saveState()
  
}

setup()