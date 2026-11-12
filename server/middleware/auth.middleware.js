import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization;
  const [scheme, token] = authorization?.split(' ') ?? [];

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id ?? payload.sub };

    if (!req.user.id) {
      return res.status(401).json({ message: 'Invalid authentication token' });
    }

    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired authentication token' });
  }
}
