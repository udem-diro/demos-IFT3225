# Exercice 2 : Partager une donnée avec React Context

À la fin de cette exercice, vous saurez :

1. définir un contexte simple pour une donnée transverse (l'utilisateur connecté) ;
2. migrer une chaîne de props qui traverse plusieurs composants vers ce contexte ;
3. séparer proprement la création du contexte, le provider, et le hook consommateur.

## Contexte : Bus en vue

L'application affiche, en haut à droite, l'utilisateur connecté et, s'il est administrateur, un lien vers l'administration. L'information vient de la racine et doit atteindre deux petits composants profonds (enfants) : `UserBadge` et `AdminLink`.

Le problème actuellement est que `user` traverse `Layout`, `Header` et `UserMenu`, qui ne s'en servent pas, mais doivent le transmettre. C'est le « prop drilling ». Chaque niveau intermédiaire est couplé à une donnée qui ne le concerne pas, et changer la forme de `user` oblige à toucher toute la chaîne.

## Travail à réaliser

1. **Créer le contexte.** Dans `src/context/UserContext.js`, créer le contexte avec `createContext()`.

2. **Créer le provider.** Dans `src/context/UserProvider.jsx`, tenir l'utilisateur (simulé pour l'instant) et exposer une valeur. 

3. **Créer le hook consommateur.** Dans `src/hooks/useUser.js`, écrire `useUser()` qui lit le contexte et lève une erreur claire s'il est utilisé hors d'un `UserProvider`.

4. **Migrer la chaîne.** Retirer la prop `user` de `Layout`, `Header` et `UserMenu` et fdaire consommer `useUser()` directement dans `UserBadge` et `AdminLink`.
