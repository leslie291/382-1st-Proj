export interface Professor {
  id: string;
  name: string;
  school: string;
  subject: string;
  department: string;
  rating: number;
  ratingCount: number;
  difficulty?: number;
  wouldTakeAgain?: number;
  rateMyProfessorUrl?: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  rating: number;
  text: string;
  date: string;
}

export interface RankingScore {
  professorId: string;
  score: number;
  components: {
    ratingScore: number;
    confidenceAdjustment: number;
    difficultyPenalty: number;
    wouldTakeAgainBonus: number;
  };
}
