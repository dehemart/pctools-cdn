export class AppEnvironment {
  static serverPort = parseInt(process.env.SERVER_PORT || '3331');
  static baseRoute = String(process.env.BASE_ROUTE || '');
  static auth = {
    secret: String(process.env.JWT_SECRET || 'TWVubyBhbiBDb2RpZmljYcOnw6NvIHJlYWxpemVkIGluIDY0IGZvcm1hdG8='),
    expiresIn: '1h',
  };
}