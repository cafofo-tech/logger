export default class Logger {
  static _instance = null

  static DEBUG = 0
  static INFO = 1
  static WARN = 2

  constructor(contextName) {
    this.contextName = contextName;
  }

  static getInstance(contextName) {
    return new Logger(contextName)
  }

  get level() {
    switch (process.env.VUE_APP_LOG_LEVEL) {
      case 'debug':
        return Logger.DEBUG
        break;
    
      case 'info':
        return Logger.INFO
        break;

      case 'warn':
        return Logger.WARN
        break;
    
      default:
        return Logger.DEBUG
        break;
    }
  }

  debug(...args) {
    if(this.level > Logger.DEBUG){ return }
    this._doLog('debug', ...args)
  }

  info(...args) {
    if(this.level > Logger.INFO){ return }
    this._doLog('info', ...args)
  }

  warn(...args) {
    if(this.level > Logger.WARN){ return }
    this._doLog('warn', ...args)
  }

  // private
  _doLog(level, ...args) {
    console[level](`[${level.toUpperCase()}] ${new Date().toISOString()} - (${this.contextName}):`, ...args)
  }
}