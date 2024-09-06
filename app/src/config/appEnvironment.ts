export class AppEnvironment {
  static serverPort: number = parseInt(process.env.SERVER_PORT || '3332');
  static baseRoute: string = String(process.env.BASE_ROUTE || '');
  static auth = {
    secret: String(process.env.JWT_SECRET || 'TWVubyBhbiBDb2RpZmljYcOnw6NvIHJlYWxpemVkIGluIDY0IGZvcm1hdG8='),
    maxAge: '1h',
  };
}