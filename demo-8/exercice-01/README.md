# Exercice 1 : Sortir la logique d'un composant 

À la fin de cette exercice, vous saurez rendre un composant plus maintenable et réutilisable.

## Contexte : Bus en vue

L'application « Bus en vue » affiche les lignes de bus d'un réseau. Le composant ci-dessous fonctionne, mais il fait tout lui-même : il va chercher les données, gère les états de chargement et d'erreur, tient l'état du filtre, et affiche la liste. Tout est mélangé dans un seul fichier.
Cela rend le composant difficile à réutiliser et à tester.

## Travail à réaliser

Fais le réusinage (*refactoring*) du composant pour améliorer sa maintenabilité, sans changer ce que voit l'utilisateur. 

Le découpage cible est : un service, un hook, une Page, et un composant d'affichage.

<details>
  <summary>Indice pour service</summary>
  Dans <code>src/api/bus.js</code>, écrire une fonction <code>fetchLignes()</code> qui encapsule l'URL et la gestion de l'erreur HTTP, et renvoie les lignes. Aucun composant ne doit plus appeler <code>fetch</code> directement.
</details>

<details>
  <summary>Indice pour hook</summary>
  Dans <code>src/hooks/useLignes.js</code>, écrire un hook <code>useLignes()</code> qui appelle le service, gère les états <code>loading</code>, <code>error</code> et le nettoyage, et renvoie 
  <code>{ lignes, loading, error }</code>.
</details>

<details>
  <summary>Indice pour composant</summary>
  Réécrire <code>LignesList</code> pour qu'il reçoive <code>lignes</code> en props et se contente d'afficher. Il ne doit plus contenir ni <code>fetch</code>, ni <code>useEffect</code>, ni état de chargement.
</details>

<details>
  <summary>Indice pour Page</summary>
  Créer <code>src/pages/LignesPage.jsx</code> qui appelle <code>useLignes()</code>, gère l'état d'interface (le filtre), et passe les lignes filtrées à <code>LignesList</code>
  <code>{ lignes, loading, error }</code>.
</details>
