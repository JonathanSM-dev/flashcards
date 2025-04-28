import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import ThemeToggle from "./components/ui/ThemeToggle";

const flashcards = [
  {
    question: "O que são dados?",
    answer:
      "Representações brutas de fatos, como números, nomes ou imagens, que sozinhos não têm significado.",
  },
  {
    question: "O que é informação?",
    answer:
      "Resultado da análise ou processamento dos dados, fornecendo contexto e significado.",
  },
  {
    question: "O que é um banco de dados?",
    answer:
      "Coleção organizada de dados persistentes, usados para armazenar e recuperar informações.",
  },
  {
    question: "O que é um SGBD?",
    answer:
      "Sistema de Gerenciamento de Banco de Dados, software que manipula e controla o acesso aos dados.",
  },
  {
    question: "Quais os níveis de abstração de um BD?",
    answer:
      "Conceitual (significado dos dados), Lógico (estrutura relacional) e Físico (armazenamento).",
  },
  {
    question: "O que é uma transação?",
    answer:
      "Conjunto de operações que realizam uma função lógica completa no banco de dados.",
  },
  {
    question: "O que significa ACID?",
    answer:
      "Conjunto de propriedades das transações: Atomicidade, Consistência, Isolamento e Durabilidade.",
  },
  {
    question: "Defina Atomicidade",
    answer:
      "Transações são indivisíveis: ou ocorrem completamente ou não ocorrem.",
  },
  {
    question: "Defina Consistência",
    answer: "Transações mantêm o banco de dados em um estado válido.",
  },
  {
    question: "Defina Isolamento",
    answer: "Transações simultâneas não interferem entre si.",
  },
  {
    question: "Defina Durabilidade",
    answer: "Transações concluídas permanecem no banco mesmo após falhas.",
  },
  {
    question: "O que é uma entidade?",
    answer:
      "Objeto do mundo real representado no banco, como Pessoa ou Produto.",
  },
  {
    question: "O que é uma entidade forte?",
    answer: "Entidade que existe independentemente de outras.",
  },
  {
    question: "O que é uma entidade fraca?",
    answer: "Entidade que depende de outra para existir.",
  },
  {
    question: "O que é um relacionamento?",
    answer: "Associação entre duas ou mais entidades.",
  },
  {
    question: "O que é um relacionamento identificador?",
    answer: "Relacionamento entre entidade forte e entidade fraca.",
  },
  {
    question: "O que é cardinalidade?",
    answer: "Define o número de ocorrências entre entidades (1:1, 1:N, N:N).",
  },
  {
    question: "O que é um atributo?",
    answer: "Característica de uma entidade ou relacionamento.",
  },
  {
    question: "O que é um atributo identificador?",
    answer: "Atributo que diferencia cada ocorrência (ex: id, RA).",
  },
  {
    question: "O que é um atributo composto?",
    answer: "Atributo formado por subatributos (ex: endereço → rua, cidade).",
  },
  {
    question: "O que é um atributo multivalorado?",
    answer: "Atributo que pode ter vários valores (ex: telefone).",
  },
  {
    question: "O que é generalização e especialização?",
    answer:
      "Relação entre entidade genérica e suas versões específicas (Pessoa → Aluno, Professor).",
  },
];

export default function FlashcardsApp() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizResults, setQuizResults] = useState({ correct: 0, incorrect: 0 });
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // Função para embaralhar um array
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  // Função para gerar opções de resposta para o modo prova
  const generateOptions = (currentIndex) => {
    const correctAnswer = flashcards[currentIndex].answer;
    const incorrectAnswers = flashcards
      .filter((_, i) => i !== currentIndex)
      .map((card) => card.answer);
    const randomIncorrectAnswers = shuffleArray(incorrectAnswers).slice(0, 3);
    const allOptions = shuffleArray([correctAnswer, ...randomIncorrectAnswers]);
    setOptions(allOptions);
  };

  // Alternar para o modo prova
  const startQuizMode = () => {
    setIsQuizMode(true);
    setQuizResults({ correct: 0, incorrect: 0 });
    setQuizCompleted(false);
    setIndex(0);
    generateOptions(0);
  };

  // Verificar a resposta do usuário
  const handleAnswer = (selectedOption) => {
    const correctAnswer = flashcards[index].answer;
    setSelectedOption(selectedOption);
    const isCorrectAnswer = selectedOption === correctAnswer;
    setIsCorrect(isCorrectAnswer);

    if (isCorrectAnswer) {
      setQuizResults((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setQuizResults((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }

    // Avançar para a próxima questão após 2 segundos
    setTimeout(() => {
      setSelectedOption(null);
      setIsCorrect(null);
      if (index + 1 < flashcards.length) {
        const nextIndex = index + 1;
        setIndex(nextIndex);
        generateOptions(nextIndex);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  // Função para sair do modo prova
  const exitQuizMode = () => {
    setIsQuizMode(false);
    setQuizCompleted(false);
    setIndex(0);
    setShowAnswer(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-background text-foreground dark:bg-dark-background dark:text-dark-text-primary transition-colors duration-200">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {!isQuizMode && (
        <>
          <Card className="w-full max-w-xl text-center shadow-xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {flashcards[index].question}
              </h2>
              {showAnswer && (
                <p className="mt-4 text-lg">{flashcards[index].answer}</p>
              )}
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant="outline"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              {showAnswer ? "Esconder Resposta" : "Mostrar Resposta"}
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setIndex(Math.max(0, index - 1));
                setShowAnswer(false);
              }}
              disabled={index === 0}
            >
              Anterior
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setIndex(Math.min(flashcards.length - 1, index + 1));
                setShowAnswer(false);
              }}
              disabled={index === flashcards.length - 1}
            >
              Próximo
            </Button>

            <Button variant="default" onClick={startQuizMode}>
              Modo Prova
            </Button>
          </div>
        </>
      )}

      {isQuizMode && !quizCompleted && (
        <>
          <Card className="w-full max-w-xl text-center shadow-xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {flashcards[index].question}
              </h2>
              <div className="flex flex-col gap-2">
                {options.map((option, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    onClick={() => handleAnswer(option)}
                    className={`text-left px-4 py-3 md:text-center ${
                      selectedOption === option
                        ? isCorrect
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                        : ""
                    }`}
                    disabled={selectedOption !== null} // Desabilitar botões após seleção
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {quizCompleted && (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Resultados do Quiz</h2>
          <p className="text-lg">Acertos: {quizResults.correct}</p>
          <p className="text-lg">Erros: {quizResults.incorrect}</p>
          <Button variant="default" onClick={exitQuizMode}>
            Sair do Modo Prova
          </Button>
        </div>
      )}
    </div>
  );
}
