import { createContext } from "react";
interface QuestionData {
  department: string;
  departmentName: string;
  questions: {
    questionGroup: number;
    questionGroupName: string;
    allQuestions: string[];
  }[];
}
interface AuthContextProps {
  password: string | undefined;
  Questions: QuestionData | undefined;
  setData: React.Dispatch<React.SetStateAction<QuestionData | undefined>>;
  setPassword: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Context = createContext<AuthContextProps>({
  password: undefined,
  Questions : undefined,
  setData: () => {},
  setPassword: () => {},
});

export default Context;
