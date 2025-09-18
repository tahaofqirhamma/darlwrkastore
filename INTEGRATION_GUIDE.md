# Guide d'Intégration - Connexion Landing Page au Dashboard

## Routes API Disponibles

### 1. Créer une Commande
**POST** `/api/orders`

**Corps de la requête:**
\`\`\`json
{
  "clientName": "Nom du client",
  "phone": "+212 6 XX XX XX XX",
  "address": "Adresse complète",
  "zone": "Rabat" | "Hors Rabat",
  "quantity": 1,
  "size": "petit" | "grand",
  "deliveryDate": "2024-01-15", // optionnel
  "deliveryTime": "14:00", // optionnel
  "price": 350 // optionnel
}
\`\`\`

### 2. Récupérer les Commandes
**GET** `/api/orders`

### 3. Mettre à Jour une Commande
**PUT** `/api/orders/[id]`

### 4. Supprimer une Commande
**DELETE** `/api/orders/[id]`

## Sécurité Recommandée

### 1. Authentification API
\`\`\`javascript
// Ajouter un token d'API dans les headers
const response = await fetch('/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_TOKEN'
  },
  body: JSON.stringify(orderData)
});
\`\`\`

### 2. Validation Côté Client
- Valider tous les champs avant envoi
- Utiliser des regex pour le format téléphone
- Limiter la longueur des champs texte

### 3. Protection CSRF
- Utiliser des tokens CSRF pour les formulaires
- Vérifier l'origine des requêtes

### 4. Rate Limiting
- Limiter le nombre de commandes par IP
- Implémenter un délai entre les soumissions

## Exemple d'Intégration JavaScript

\`\`\`javascript
// Fonction pour créer une commande depuis votre landing page
async function createOrder(orderData) {
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Ajouter authentification si nécessaire
        // 'Authorization': 'Bearer ' + apiToken
      },
      body: JSON.stringify(orderData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Succès - rediriger ou afficher message
      alert('Commande créée avec succès! ID: ' + result.orderId);
    } else {
      // Erreur - afficher message d'erreur
      alert('Erreur: ' + result.error);
    }
  } catch (error) {
    console.error('Erreur de connexion:', error);
    alert('Erreur de connexion au serveur');
  }
}
\`\`\`

## Prochaines Étapes

1. **Base de Données**: Connecter les routes API à une vraie base de données (Supabase, MongoDB, etc.)
2. **Authentification**: Implémenter un système d'authentification pour sécuriser l'accès
3. **Webhooks**: Ajouter des notifications en temps réel
4. **Validation**: Renforcer la validation des données
5. **Logs**: Ajouter un système de logs pour le suivi
