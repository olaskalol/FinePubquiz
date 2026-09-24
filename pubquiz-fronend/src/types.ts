export interface Team {
  name: string;
  members: string[];
  answers: string[];
  points: number;
}

export interface Question{
    id: number;
    category:string;
    question: string;
    answers: string[];
    correctAnswer: string;
    photoSource: string;

}
// jest szansa ze trzea bedzie obciac pola teams i questiotns zeby szybciej to skonczyc ale po bożemu powinno sie je podpinać
export interface GameSession{
    id:number;
    teams: Team[];
    questions: Question[];
    currentQuestionIndex: number;
    isActive: boolean;
}
