const COLORS = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",
  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",
  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m"
}

class Logger {
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
    this._doLog('debug', COLORS.Reset, ...args)
  }

  info(...args) {
    if(this.level > Logger.INFO){ return }
    this._doLog('info', COLORS.FgGreen, ...args)
  }

  warn(...args) {
    if(this.level > Logger.WARN){ return }
    this._doLog('warn', COLORS.FgYellow, ...args)
  }

  // private
  _doLog(level, color, ...args) {
    console[level](`${color}[${level.toUpperCase()}] ${new Date().toISOString()} - (${this.contextName}):`, ...args)
  }
}

module.exports = Logger