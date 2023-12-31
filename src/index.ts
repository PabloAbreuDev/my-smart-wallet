import { App } from './server'
import { logger } from './utils/logger'

enum ExitStatus {
  Failure = 1,
  Success = 0
}

process.on('unhandledRejection', (reason, promise) => {
  logger.error(
    `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`
  )
  // lets throw the error and let the uncaughtException handle below handle it
  throw reason
})

process.on('uncaughtException', error => {
  logger.error(`App exiting due to an uncaught exception: ${error}`)
  process.exit(ExitStatus.Failure)
})
;(async (): Promise<void> => {
  try {
    const myApp = new App()
    myApp.startServer()

    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT']
    for (const exitSignal of exitSignals) {
      process.on(exitSignal, async () => {
        try {
          await myApp.quit()
          logger.info(`App exited with success`)
          process.exit(ExitStatus.Success)
        } catch (error) {
          logger.error(`App exited with error: ${error}`)
          process.exit(ExitStatus.Failure)
        }
      })
    }
  } catch (error) {
    logger.error(`App exited with error: ${error}`)
    process.exit(ExitStatus.Failure)
  }
})()
