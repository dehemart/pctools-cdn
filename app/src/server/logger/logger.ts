import { createLogger, transports, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import expressWinston from 'express-winston';
import { number } from 'zod';

const rotateFileTransport = new DailyRotateFile({
  filename: './logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '5m',
  maxFiles: '14d',
});

const consoleTransport = new transports.Console({
  level: 'info', // Change this to desired console logging level
  format: format.combine(
    format.colorize({ all: true }), // Optionally add color to console logs
    format.simple(), // Use a simpler format for console logs
    format.align(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss ZZ' }),
    format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),

});

export const logger = createLogger({
  level: 'info', // Minimum logging level for both transports
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss ZZ' }),
    format.json() // Keep JSON format for file output
  ),
  transports: [rotateFileTransport, consoleTransport],
  exceptionHandlers: [
    new transports.File({ filename: './logs/exception.log' }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: './logs/rejections.log' }),
  ],
});


export const expressWinstonLogger = expressWinston.logger({
  transports: [
    new transports.Console()
  ],
  format: format.combine(
    format.colorize({ all: true }), // Optionally add color to console logs
    format.simple(), // Use a simpler format for console logs
    format.align(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss ZZ' }),
    format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  requestWhitelist: ['headers', 'query'],  //these are not included in the standard StackDriver httpRequest
  responseWhitelist: ['body'],
  dynamicMeta:  (req, res) => {
    const httpRequest = {
      requestMethod: {},
      body: String,
      requestSize: number,
    };
    const meta = {
      httpRequest: {},
    };
    if (req) {
      meta.httpRequest = httpRequest;
      httpRequest.requestMethod = req.method;
    }

    if (res){
      meta.httpRequest = httpRequest;
      httpRequest.body = req.body.file != undefined ? req.body.file : req.body.toString;
    }
    return meta;

  },
});