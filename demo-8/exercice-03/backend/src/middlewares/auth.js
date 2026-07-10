// Middleware : exige un jeton valide dans l'en-tête Authorization.
export function requireAuth(req, res, next) {
  const [type, token] = (req.header("authorization") || "").split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ error: { code: "NO_TOKEN", message: "Jeton manquant." } });
  }

  try {
    req.auth = jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(401).json({ error: { code: "INVALID_TOKEN", message: "Jeton invalide ou expiré." } });
  }
}
