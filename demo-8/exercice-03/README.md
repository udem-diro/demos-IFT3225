# Exercice 3 : implémenter un flux d'authentification (JWT)

## Objectifs

1. Consommer un backend d'authentification qui délivre un jeton (JWT) ;
2. Transformer le `UserProvider` de l'exercice 2 pour qu'il tienne un vrai utilisateur et expose `login` et `logout` ;
3. Persister la session (rester connecté après un rechargement) et gérer la déconnexion.

> Un backend Express est **fourni** ; vous n'avez pas à l'écrire, seulement à le lancer et à le consommer.


## Contexte : Bus en vue

À l'exercice 2, l'utilisateur connecté était codé en dur dans le provider. On remplace maintenant cette valeur figée par un vrai flux : l'utilisateur saisit ses identifiants, le backend vérifie et renvoie un **jeton**, et l'application s'en sert pour se souvenir de qui est connecté.

La forme du contexte reste celle qu'on a préparée, un objet, mais elle s'enrichit : de `{ user }`, on passe à `{ user, login, logout, loading }`. 
Les composants consommateurs de l'exercice 2 (`UserBadge`, `AdminLink`) ne changent pas.


## Le backend fourni

Un petit serveur Express expose trois routes. Deux comptes de démonstration sont codés en dur.

- `backend/src/data/users.js`: Comptes de démonstration.
- `backend/src/data/lignes.js`: Lignes de démonstration.
- `backend/src/middlewares/auth.js`: Middleware `requireAuth` utilisé pour valider le jeton d'authentification
- `backend/src/server.js`: Code principal de l'API
- `backend/.env`: Variables environnementales
  ```env
  JWT_SECRET=dev-secret-a-changer
  PORT=4000
  ```

> Notez que la **déconnexion n'a pas de route** : un JWT est sans état côté serveur, donc se déconnecter revient à jeter le jeton côté client. 

Le client (projet Vite) est configuré pour rediriger `/api` vers ce serveur, via un proxy dans `vite.config.js` :

```js
server: {
  proxy: {
    "/api": {
      target: "http://localhost:4000",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, "")
    }
  }
}
```

> Ainsi le client appelle `/api/auth/login` et `/api/lignes`, sans se soucier du port ni de CORS en développement.


## Travail à réaliser (côté client)

1. **Écrire le service d'auth.** Dans `src/api/auth.js`, implémenter `login(username, password)` (POST `/api/auth/login`, renvoie `{ token, user }`) et `fetchMe(token)` (GET `/api/auth/me` avec l'en-tête `Authorization: Bearer <token>`, renvoie `{ user }`).

2. **Enrichir le provider.** Dans `src/context/UserProvider.jsx` : 
   1. maintenir `user` (initialement `null`)
   2. implémenter `login` (appeler le service, stocker le jeton, mettre à jour `user`) 
   3. implémenter `logout` (effacer le jeton et l'utilisateur). 
   4. Exposer `{ user, login, logout, loading }`.

3. **Restaurer la session.** Au montage du provider, si un jeton est présent dans `localStorage`, appeler `fetchMe` pour rétablir l'utilisateur. Gérer un état `loading` pour ne pas afficher le formulaire de connexion avant d'avoir vérifié.

4. **Boucler l'interface.** Le formulaire de connexion appelle `login`. Ajouter un bouton de déconnexion dans `UserMenu`. L'application montre le formulaire si personne n'est pas connecté, l'interface sinon.
