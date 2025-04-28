import { useState, useEffect, useCallback } from "react";
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
  const [randomizedIndices, setRandomizedIndices] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  
  // Estatísticas de Estudo
  const [statistics, setStatistics] = useState({
    totalStudied: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    studyTime: 0,
    lastStudyDate: null,
    streak: 0
  });
  
  // Para timer de estudo
  const [studyTime, setStudyTime] = useState(0);
  const [studyStartTime, setStudyStartTime] = useState(null);
  const [showStats, setShowStats] = useState(false);
  
  // Formatar tempo (segundos -> MM:SS)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Função para embaralhar um array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Envolver funções com useCallback
  const generateOptions = useCallback((cardIndex) => {
    const correctAnswer = flashcards[cardIndex].answer;
    
    // Coletar todas as respostas incorretas possíveis
    const incorrectAnswers = flashcards
      .filter((_, i) => i !== cardIndex)
      .map((card) => card.answer);
    
    // Selecionar 3 respostas incorretas aleatoriamente
    const randomIncorrectAnswers = shuffleArray(incorrectAnswers).slice(0, 3);
    
    // Combinar resposta correta com as incorretas e embaralhar
    const allOptions = shuffleArray([correctAnswer, ...randomIncorrectAnswers]);
    
    setOptions(allOptions);
    setSelectedOption(null);
    setIsCorrect(null);
  }, []);  // Como flashcards é constante, não precisa ser dependência

  // Iniciar o modo de quiz
  const startQuizMode = useCallback(() => {
    setIsQuizMode(true);
    setQuizResults({ correct: 0, incorrect: 0 });
    setQuizCompleted(false);
    
    // Criar array de índices e embaralhá-lo
    const indices = Array.from({ length: flashcards.length }, (_, i) => i);
    const shuffledIndices = shuffleArray([...indices]);
    setRandomizedIndices(shuffledIndices);
    setQuizIndex(0);
    
    // Usar o primeiro índice aleatório para a primeira questão
    generateOptions(shuffledIndices[0]);
    
    // Limpar qualquer informação de conclusão anterior
    localStorage.setItem('quiz-completed', 'false');
  }, [generateOptions]);  // Adicione generateOptions como dependência

  // Lidar com a resposta selecionada
  const handleAnswer = useCallback((selectedOption) => {
    setSelectedOption(selectedOption);
    
    const currentCardIndex = randomizedIndices[quizIndex];
    const correctAnswer = flashcards[currentCardIndex].answer;
    const isAnswerCorrect = selectedOption === correctAnswer;
    
    setIsCorrect(isAnswerCorrect);
    
    // Atualizar resultados do quiz
    if (isAnswerCorrect) {
      setQuizResults(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setQuizResults(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
    
    // Aguardar um tempo para mostrar se a resposta está correta ou não
    setTimeout(() => {
      // Avançar para a próxima questão ou finalizar o quiz
      if (quizIndex + 1 < randomizedIndices.length) {
        setQuizIndex(prev => prev + 1);
        const nextIndex = quizIndex + 1;
        generateOptions(randomizedIndices[nextIndex]);
      } else {
        setQuizCompleted(true);
      }
      
      setSelectedOption(null);
      setIsCorrect(null);
    }, 1000);
  }, [quizIndex, randomizedIndices, generateOptions]); // Adicione as dependências

  // Sair do modo de quiz
  const exitQuizMode = useCallback(() => {
    setIsQuizMode(false);
    setQuizCompleted(false);
    setQuizIndex(0);
    setRandomizedIndices([]);
    setSelectedOption(null);
    setIsCorrect(null);
  }, []);
  
  // ----- MELHORIAS DE INTERFACE -----
  
  // Timer para modo de estudo
  useEffect(() => {
    let timer;
    if (!isQuizMode && !quizCompleted) {
      // Iniciar timer quando não estiver em modo prova
      timer = setInterval(() => {
        setStudyTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isQuizMode, quizCompleted]);
  
  // ----- SUPORTE A ATALHOS DE TECLADO -----
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isQuizMode) {
        // Atalhos para modo normal
        if (e.key === ' ' || e.code === 'Space') {
          e.preventDefault(); // Prevenir scroll
          setShowAnswer(!showAnswer);
        } else if (e.key === 'ArrowLeft' && index > 0) {
          setIndex(prev => prev - 1);
          setShowAnswer(false);
        } else if (e.key === 'ArrowRight' && index < flashcards.length - 1) {
          setIndex(prev => prev + 1);
          setShowAnswer(false);
        } else if (e.key === 'q' || e.key === 'Q') {
          startQuizMode();
        }
      } else if (isQuizMode && !quizCompleted && selectedOption === null) {
        // Atalhos para modo quiz
        const optionKeys = ['1', '2', '3', '4'];
        const optionIndex = optionKeys.indexOf(e.key);
        
        if (optionIndex >= 0 && optionIndex < options.length) {
          handleAnswer(options[optionIndex]);
        } else if (e.key === 'Escape') {
          exitQuizMode();
        }
      } else if (quizCompleted) {
        // Atalhos para tela de resultados
        if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
          exitQuizMode();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAnswer, index, isQuizMode, quizCompleted, options, selectedOption, handleAnswer, startQuizMode, exitQuizMode]);
  
  // ----- ESTATÍSTICAS DE ESTUDO -----
  
  // Carregar estatísticas do localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('study-statistics');
    if (savedStats) {
      setStatistics(JSON.parse(savedStats));
    }
    
    // Iniciar timer de estudo
    setStudyStartTime(new Date());
  }, []);
  
  // Salvar estatísticas no localStorage
  useEffect(() => {
    localStorage.setItem('study-statistics', JSON.stringify(statistics));
  }, [statistics]);
  
  // Atualizar streak diário e estatísticas ao sair
  useEffect(() => {
    const updateStatisticsOnExit = () => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const lastDate = statistics.lastStudyDate ? new Date(statistics.lastStudyDate) : null;
      
      // Calcular tempo de estudo desta sessão
      const sessionTime = Math.floor((now - studyStartTime) / 1000);
      
      // Verificar streak (dias consecutivos)
      let newStreak = statistics.streak;
      if (lastDate) {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastDate.getTime() === yesterday.getTime()) {
          newStreak++; // Estudou ontem, aumenta streak
        } else if (lastDate.getTime() !== today.getTime()) {
          newStreak = 1; // Não estudou ontem nem hoje ainda, reinicia streak
        }
      } else {
        newStreak = 1; // Primeira vez estudando
      }
      
      setStatistics(prev => ({
        ...prev,
        studyTime: prev.studyTime + sessionTime,
        lastStudyDate: today.toISOString(),
        streak: newStreak
      }));
    };
    
    // Atualizar estatísticas quando o componente for desmontado
    window.addEventListener('beforeunload', updateStatisticsOnExit);
    return () => {
      window.removeEventListener('beforeunload', updateStatisticsOnExit);
      updateStatisticsOnExit(); // Também atualizar ao desmontar o componente
    };
  }, [statistics.lastStudyDate, statistics.streak, studyStartTime]);
  
  // Atualizar estatísticas quando completar um quiz
  useEffect(() => {
    if (quizCompleted) {
      setStatistics(prev => ({
        ...prev,
        totalStudied: prev.totalStudied + quizResults.correct + quizResults.incorrect,
        correctAnswers: prev.correctAnswers + quizResults.correct,
        incorrectAnswers: prev.incorrectAnswers + quizResults.incorrect
      }));
    }
  }, [quizCompleted, quizResults]);
  
  // ----- PERSISTÊNCIA DE DADOS -----
  
  // Carregar dados do localStorage ao iniciar o aplicativo
  useEffect(() => {
    // Carregar último índice visualizado
    const savedIndex = localStorage.getItem('flashcard-index');
    if (savedIndex) setIndex(parseInt(savedIndex));
    
    // Carregar resultados de quiz anteriores
    const savedResults = localStorage.getItem('quiz-results');
    if (savedResults) setQuizResults(JSON.parse(savedResults));
    
    // Carregar preferência de mostrar resposta
    const savedShowAnswer = localStorage.getItem('show-answer');
    if (savedShowAnswer) setShowAnswer(savedShowAnswer === 'true');
    
    // Carregar progresso do quiz se houver um em andamento
    const inQuizMode = localStorage.getItem('quiz-mode') === 'true';
    if (inQuizMode) {
      const savedRandomIndices = localStorage.getItem('random-indices');
      const savedQuizIndex = localStorage.getItem('quiz-index');
      const quizCompleted = localStorage.getItem('quiz-completed') === 'true';
      
      if (savedRandomIndices && savedQuizIndex && !quizCompleted) {
        setIsQuizMode(true);
        setRandomizedIndices(JSON.parse(savedRandomIndices));
        setQuizIndex(parseInt(savedQuizIndex));
        generateOptions(JSON.parse(savedRandomIndices)[parseInt(savedQuizIndex)]);
      }
    }
  }, [generateOptions]);
  
  // Salvar índice atual quando mudar
  useEffect(() => {
    localStorage.setItem('flashcard-index', index);
  }, [index]);
  
  // Salvar preferência de mostrar resposta
  useEffect(() => {
    localStorage.setItem('show-answer', showAnswer);
  }, [showAnswer]);
  
  // Salvar resultados do quiz
  useEffect(() => {
    localStorage.setItem('quiz-results', JSON.stringify(quizResults));
  }, [quizResults]);
  
  // Salvar estado do modo quiz
  useEffect(() => {
    localStorage.setItem('quiz-mode', isQuizMode);
    // Se sair do modo quiz, limpa dados relacionados
    if (!isQuizMode) {
      localStorage.removeItem('random-indices');
      localStorage.removeItem('quiz-index');
      localStorage.removeItem('quiz-completed');
    }
  }, [isQuizMode]);
  
  // Salvar índices aleatórios e índice atual do quiz
  useEffect(() => {
    if (isQuizMode && randomizedIndices.length > 0) {
      localStorage.setItem('random-indices', JSON.stringify(randomizedIndices));
    }
  }, [isQuizMode, randomizedIndices]);
  
  useEffect(() => {
    if (isQuizMode) {
      localStorage.setItem('quiz-index', quizIndex);
    }
  }, [isQuizMode, quizIndex]);
  
  // Salvar estado de conclusão do quiz
  useEffect(() => {
    localStorage.setItem('quiz-completed', quizCompleted);
  }, [quizCompleted]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-background text-foreground dark:bg-dark-background dark:text-dark-text-primary transition-colors duration-200">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowStats(!showStats)}
          className="text-xs"
        >
          Estatísticas
        </Button>
        <ThemeToggle />
      </div>

      {/* Barra de progresso */}
      {!isQuizMode && (
        <div className="w-full max-w-xl bg-gray-200 rounded-full h-2 dark:bg-gray-700 mb-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((index + 1) / flashcards.length) * 100}%` }}
          />
        </div>
      )}
      
      {isQuizMode && !quizCompleted && (
        <div className="w-full max-w-xl bg-gray-200 rounded-full h-2 dark:bg-gray-700 mb-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((quizIndex + 1) / randomizedIndices.length) * 100}%` }}
          />
        </div>
      )}

      {!isQuizMode && !showStats && (
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
              {showAnswer ? "Esconder Resposta" : "Mostrar Resposta"} (ESPAÇO)
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setIndex(Math.max(0, index - 1));
                setShowAnswer(false);
              }}
              disabled={index === 0}
            >
              Anterior (←)
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setIndex(Math.min(flashcards.length - 1, index + 1));
                setShowAnswer(false);
              }}
              disabled={index === flashcards.length - 1}
            >
              Próximo (→)
            </Button>

            <Button variant="default" onClick={startQuizMode}>
              Modo Prova (Q)
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Card {index + 1} de {flashcards.length} | Tempo de estudo: {formatTime(studyTime)}
          </p>
        </>
      )}

      {showStats && !isQuizMode && (
        <Card className="w-full max-w-xl shadow-xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Estatísticas de Estudo</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Dias consecutivos</h3>
                <p className="text-2xl font-bold">{statistics.streak}</p>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Total estudado</h3>
                <p className="text-2xl font-bold">{statistics.totalStudied}</p>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Acertos</h3>
                <p className="text-2xl font-bold text-green-600">{statistics.correctAnswers}</p>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Erros</h3>
                <p className="text-2xl font-bold text-red-600">{statistics.incorrectAnswers}</p>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Tempo de estudo</h3>
                <p className="text-2xl font-bold">{formatTime(statistics.studyTime)}</p>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Último estudo</h3>
                <p className="text-xl font-bold">
                  {statistics.lastStudyDate 
                    ? new Date(statistics.lastStudyDate).toLocaleDateString() 
                    : 'Hoje'}
                </p>
              </div>
            </div>
            
            <Button 
              variant="default" 
              className="w-full mt-4"
              onClick={() => setShowStats(false)}
            >
              Voltar ao Estudo
            </Button>
          </CardContent>
        </Card>
      )}

      {isQuizMode && !quizCompleted && (
        <>
          <Card className="w-full max-w-xl text-center shadow-xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {flashcards[randomizedIndices[quizIndex]].question}
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
                    disabled={selectedOption !== null}
                  >
                    <span className="mr-2 inline-block px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">
                      {i + 1}
                    </span>{" "}
                    {option}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Questão {quizIndex + 1} de {randomizedIndices.length} | ESC para sair
          </p>
        </>
      )}

      {quizCompleted && (
        <Card className="w-full max-w-xl text-center shadow-xl">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Resultados do Quiz</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-md">
                <h3 className="font-medium text-green-800 dark:text-green-100">Acertos</h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-200">
                  {quizResults.correct}
                </p>
              </div>
              
              <div className="bg-red-100 dark:bg-red-900 p-4 rounded-md">
                <h3 className="font-medium text-red-800 dark:text-red-100">Erros</h3>
                <p className="text-3xl font-bold text-red-600 dark:text-red-200">
                  {quizResults.incorrect}
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Aproveitamento</h3>
              <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                <div 
                  className="bg-green-600 h-4 rounded-full transition-all duration-500" 
                  style={{ 
                    width: `${(quizResults.correct / (quizResults.correct + quizResults.incorrect)) * 100}%` 
                  }}
                />
              </div>
              <p className="mt-2 text-lg font-bold">
                {Math.round((quizResults.correct / (quizResults.correct + quizResults.incorrect)) * 100)}%
              </p>
            </div>
            
            <Button variant="default" onClick={exitQuizMode}>
              Sair do Modo Prova (ESC ou ENTER)
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
