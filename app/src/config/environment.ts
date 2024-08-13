export const auth = {
  secret: String(process.env.JWT_SECRET || 'TWVubyBhbiBDb2RpZmljYcOnw6NvIHJlYWxpemVkIGluIDY0IGZvcm1hdG8='),
  expiresIn: '1h',
};