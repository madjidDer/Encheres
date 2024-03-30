## Application de Vente aux Enchères

Ce projet consiste en une application simple de vente aux enchères. Il permet à un commissaire-priseur de mettre aux enchères un objet avec un prix de départ, tandis que les enchérisseurs connectés peuvent participer aux enchères. L'application utilise Node.js pour le serveur et Webpack pour gérer le code client.

### Fonctionnalités
- Commissaire-Priseur : Il peut y avoir qu'un seul commissaire-priseur à la fois qui peut préciser un objet en vente et son prix de départ, puis lancer les enchères.
- Enchérisseurs : Les utilisateurs connectés en tant qu'enchérisseurs peuvent participer aux enchères en cours, recevoir des mises à jour sur les enchères, et savoir s'ils ont remporté l'enchère à la fin.

### Technologie
- Backend : Node.js
- Frontend : HTML, CSS, JavaScript
- Gestion des modules : Webpack pour le code client
- Communication en temps réel : Socket.io pour la gestion des enchères en temps réel

### Structure du Projet
- /encheres : Dossier principal du projet.
- /public : Contient les ressources statiques (HTML, CSS, images) et les bundles générés par Webpack.
- /client : Contient les sources du code client qui seront traitées par Webpack.
- webpack.config.js : Configuration de Webpack pour traiter le code client.

### Installation

**Configuration du Serveur et du Client**

- **Serveur :** Rendez-vous dans le dossier `server/` et exécutez `npm install` pour installer toutes les dépendances nécessaires.
- **Client :** Dirigez-vous ensuite vers le dossier `client/` et faites de même avec `npm install`.

### Préparation et Lancement
**Préparez votre environnement de travail en quelques étapes simples :**

#### 1. Construire l'Interface Client
- Dans le dossier `client/`, lancez la commande `npm run build` pour générer les fichiers publics nécessaires au serveur.

#### 2. Démarrer le Serveur
- Allez dans le dossier `server/` et utilisez `npm run start` pour mettre en marche le serveur.

### Routes de l'Application
- / : Page d'accueil qui présente les enchères en cours.
- /about : Informations sur le numéro de version et les auteurs de l'application.
- /auctioneer : Accès à la page du commissaire-priseur.
- /bidder : Accès à la page de l'enchérisseur.

### Et Voilà !

Votre projet d'enchère est maintenant prêt à être utilisé. Vous pouvez désormais accéder à l'interface client par le lien `http://localhost:8080/` et commencer à interagir avec le système d'enchères. Profitez de cette expérience avec ce projet réalisé par Madjid DERMEL
