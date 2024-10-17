import colors from "@/app/styles/theme";

export const getColorScore = (score: number) => {
  if (score > 70) {
    return colors.red;
  } else if (score < 10) {
    return colors.primary;
  } else {
    return colors.orange;
  }
};

export const calculateScore = (results: { category_scores: number[] }) => {
  let max_score = Math.max(
    ...(Object.values(results.category_scores) as number[])
  );
  // Conversion en pourcentage
  const toxicity_score = max_score * 100;
  return toxicity_score;
};

type AnalysisResult = {
  results: {
    categories: { [key: string]: boolean };
    category_applied_input_types: { [key: string]: string[] };
    category_scores: { [key: string]: number };
    flagged: boolean;
  };
  score: number;
};

type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

// Traduire les catégories pour les rendre plus lisibles
const traductionsCategories: { [key: string]: string } = {
  harassment: 'harcèlement',
  'harassment/threatening': 'harcèlement/menaces',
  hate: 'haine',
  'hate/threatening': 'haine/menaces',
  illicit: 'illicite',
  'illicit/violent': 'illicite/violent',
  'self-harm': 'auto-mutilation',
  'self-harm/instructions': 'auto-mutilation/instructions',
  'self-harm/intent': 'auto-mutilation/intention',
  sexual: 'sexuel',
  'sexual/minors': 'sexuel/mineurs',
  violence: 'violence',
  'violence/graphic': 'violence/graphique',
};

export const generateRephrasingMessage = (
  analysisResult: AnalysisResult,
  originalMessage: string
): Message[] => {
  const { results } = analysisResult;

  // Extraire les catégories toxiques détectées
  const categoriesToxiques: string[] = Object.keys(results.categories).filter(
    (categorie) => results.categories[categorie] === true
  );

  const categoriesLisibles: string[] = categoriesToxiques.map(
    (cat) => traductionsCategories[cat] || cat
  );

  // Construire le contenu du rôle système en fonction des catégories toxiques détectées
  let contenuSysteme = `Vous êtes un expert en communication saine.`;

  if (categoriesLisibles.length > 0) {
    contenuSysteme += ` Le message de l'utilisateur contient des éléments pouvant être considérés comme ${categoriesLisibles.join(
      ', '
    )}. Veuillez aider à reformuler le message pour qu'il soit plus positif et moins toxique tout en conservant son intention initiale.`;
  } else {
    contenuSysteme += ` Le message de l'utilisateur est généralement acceptable, mais veuillez vous assurer qu'il promeut une communication saine en le reformulant si besoin.`;
  }

  // Créer les messages pour l'appel à l'API
  const messages: Message[] = [
    {
      role: 'system',
      content: contenuSysteme,
    },
    {
      role: 'user',
      content: `Message original : "${originalMessage}"`,
    },
    {
      role: 'assistant',
      content: 'Message reformulé :',
    },
  ];

  return messages;
}


export const generateFeedbackMessage = (
  analysisResult: AnalysisResult,
  originalMessage: string
): Message[] => {
  const { results } = analysisResult;

  // Extraire les catégories toxiques détectées
  const categoriesToxiques: string[] = Object.keys(results.categories).filter(
    (categorie) => results.categories[categorie] === true
  );

  const categoriesLisibles: string[] = categoriesToxiques.map(
    (cat) => traductionsCategories[cat] || cat
  );

  // Construire le contenu du rôle système
  const contenuSysteme = `Vous êtes un assistant qui explique de manière claire et respectueuse pourquoi un message est considéré comme toxique, en vous basant sur les catégories détectées. Vous donnez aussi des conseils pour mieux communiquer. Si le message n'est pas toxique, vous expliquerez aussi pourquoi il ne l'est pas. Vos réponses se feront sous forme de paragraphe court et lisible, je ne veux pas de liste à puce. Vous ferez aussi des sauts de lignes pour améliorer la lisibilité.`;

  // Construire le message d'explication
  let contenuAssistant = `Le message fourni est considéré comme toxique pour les raisons suivantes :\n`;

  categoriesLisibles.forEach((categorie) => {
    contenuAssistant += `- Il contient des éléments de **${categorie}**.\n`;
  });

  contenuAssistant += `\n**Message original** : "${originalMessage}"`;

  // Créer les messages pour l'appel à l'API
  const messages: Message[] = [
    {
      role: 'system',
      content: contenuSysteme,
    },
    {
      role: 'assistant',
      content: contenuAssistant,
    },
  ];

  return messages;
};