import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import ThemeToggle from "./components/ui/ThemeToggle";

const flashcards = [
  {
    question: "O que são dados?",
    answer: "Dados são representações brutas de fatos, como números, nomes, imagens ou medições, que sozinhos não transmitem significado. Eles são a matéria-prima para a geração de informações.",
  },
  {
    question: "O que é informação?",
    answer: "Informação é o resultado da análise, processamento ou combinação de dados, fornecendo significado, contexto e utilidade para tomada de decisões.",
  },
  {
    question: "O que é um banco de dados?",
    answer: "Um banco de dados é uma coleção organizada de dados persistentes, estruturados para permitir armazenamento, consulta, manipulação e recuperação eficientes de informações.",
  },
  {
    question: "O que é um SGBD?",
    answer: "Sistema de Gerenciamento de Banco de Dados (SGBD) é o software responsável por criar, gerenciar, armazenar, consultar e proteger os dados em um banco de dados de maneira eficiente e segura.",
  },
  {
    question: "Quais os níveis de abstração de um BD?",
    answer: "Os níveis de abstração são: Conceitual (foca no significado dos dados), Lógico (organiza dados e seus relacionamentos) e Físico (detalha como os dados são armazenados no sistema).",
  },
  {
    question: "O que é uma transação?",
    answer: "Transação é uma sequência de operações em um banco de dados que juntas formam uma tarefa lógica completa, como uma transferência bancária, respeitando propriedades de integridade.",
  },
  {
    question: "O que significa ACID?",
    answer: "ACID é um conjunto de propriedades fundamentais das transações: Atomicidade, Consistência, Isolamento e Durabilidade, que garantem a confiabilidade e integridade dos dados.",
  },
  {
    question: "Defina Atomicidade",
    answer: "Atomicidade garante que todas as operações de uma transação sejam realizadas completamente ou, em caso de falha, nenhuma operação tenha efeito.",
  },
  {
    question: "Defina Consistência",
    answer: "Consistência assegura que o banco de dados passe de um estado válido para outro também válido após a conclusão de uma transação.",
  },
  {
    question: "Defina Isolamento",
    answer: "Isolamento garante que a execução simultânea de múltiplas transações ocorra de forma independente, sem que uma interfira no resultado da outra.",
  },
  {
    question: "Defina Durabilidade",
    answer: "Durabilidade assegura que uma vez confirmada, a transação terá seus efeitos permanentemente gravados no banco, mesmo diante de falhas ou quedas de energia.",
  },
  {
    question: "O que é uma entidade?",
    answer: "Uma entidade é qualquer objeto ou conceito do mundo real que pode ser representado e armazenado no banco de dados, como uma Pessoa, Produto ou Evento.",
  },
  {
    question: "O que é uma entidade forte?",
    answer: "Entidade forte é aquela que existe independentemente de outras entidades e possui seu próprio atributo identificador único.",
  },
  {
    question: "O que é uma entidade fraca?",
    answer: "Entidade fraca é aquela que depende de uma entidade forte para existir e para ser identificada, geralmente possuindo uma chave parcial.",
  },
  {
    question: "O que é um relacionamento?",
    answer: "Relacionamento é a associação lógica entre duas ou mais entidades, representando como elas se interagem no contexto do banco de dados.",
  },
  {
    question: "O que é um relacionamento identificador?",
    answer: "Relacionamento identificador ocorre quando uma entidade fraca depende de uma entidade forte para sua identificação, reforçando seu vínculo de existência.",
  },
  {
    question: "O que é cardinalidade?",
    answer: "Cardinalidade define o número mínimo e máximo de associações entre entidades, podendo ser 1:1, 1:N ou N:N em um relacionamento.",
  },
  {
    question: "O que é um atributo?",
    answer: "Atributo é uma característica ou propriedade que descreve uma entidade ou um relacionamento, como 'nome', 'data de nascimento' ou 'preço'.",
  },
  {
    question: "O que é um atributo identificador?",
    answer: "Atributo identificador é aquele que distingue de forma única cada ocorrência de uma entidade, como um CPF, RA ou número de matrícula.",
  },
  {
    question: "O que é um atributo composto?",
    answer: "Atributo composto é aquele formado por vários subatributos que juntos detalham melhor uma informação, como um endereço dividido em rua, cidade e CEP.",
  },
  {
    question: "O que é um atributo multivalorado?",
    answer: "Atributo multivalorado é aquele que pode ter vários valores para uma mesma entidade, como vários telefones para uma única pessoa.",
  },
  {
    question: "O que é generalização e especialização?",
    answer: "Generalização agrupa entidades específicas em uma entidade genérica, enquanto especialização cria novas entidades mais específicas a partir de uma entidade genérica.",
  },
  {
    question: "O que são dados persistentes?",
    answer: "Dados persistentes são aqueles que continuam existindo e armazenados após o fim da aplicação ou sessão, até que sejam explicitamente removidos.",
  },
  {
    question: "O que é um esquema de banco de dados?",
    answer: "Esquema é a estrutura formal que define a organização dos dados, como tabelas, campos e relacionamentos, sendo o projeto lógico do banco de dados.",
  },
  {
    question: "O que é uma instância de banco de dados?",
    answer: "Instância é o conjunto atual de dados armazenados em um banco de dados em um determinado momento, podendo mudar conforme operações de inserção, atualização ou remoção.",
  },
  {
    question: "O que é um modelo de dados?",
    answer: "Modelo de dados é um conjunto de ferramentas conceituais utilizadas para descrever a estrutura dos dados, suas relações e restrições de integridade.",
  },
  {
    question: "Qual a diferença entre modelo conceitual, lógico e físico?",
    answer: "O modelo conceitual representa a visão de alto nível (significado dos dados), o modelo lógico organiza os dados para sistemas de SGBD, e o modelo físico descreve como os dados são armazenados fisicamente.",
  },
  {
    question: "O que é um relacionamento ternário?",
    answer: "Relacionamento ternário é uma associação que envolve simultaneamente três diferentes entidades, como a relação entre um aluno, uma disciplina e um professor.",
  },
  {
    question: "O que é um auto-relacionamento?",
    answer: "Auto-relacionamento é quando uma entidade se relaciona consigo mesma, como funcionários que chefiam outros funcionários na mesma tabela.",
  },
  {
    question: "Qual é a função do controle de concorrência em SGBDs?",
    answer: "O controle de concorrência assegura que múltiplas transações simultâneas no banco de dados sejam executadas corretamente, preservando a consistência e evitando conflitos.",
  },
  {
    question: "Qual a origem da palavra 'banco' no termo Banco de Dados?",
    answer: "A palavra 'banco' vem do germânico 'Banka' (mesa), usada na Itália para transações financeiras, e foi adaptada para significar o local de armazenamento de dados.",
  },
  {
    question: "O que são atributos simples?",
    answer: "Atributos simples são aqueles que armazenam apenas um valor atômico, indivisível, como CPF ou nome de uma pessoa.",
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
