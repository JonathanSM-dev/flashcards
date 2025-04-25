import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

const flashcards = [
  { question: "O que são dados?", answer: "Representações brutas de fatos, como números, nomes ou imagens, que sozinhos não têm significado." },
  { question: "O que é informação?", answer: "Resultado da análise ou processamento dos dados, fornecendo contexto e significado." },
  { question: "O que é um banco de dados?", answer: "Coleção organizada de dados persistentes, usados para armazenar e recuperar informações." },
  { question: "O que é um SGBD?", answer: "Sistema de Gerenciamento de Banco de Dados, software que manipula e controla o acesso aos dados." },
  { question: "Quais os níveis de abstração de um BD?", answer: "Conceitual (significado dos dados), Lógico (estrutura relacional) e Físico (armazenamento)." },
  { question: "O que é uma transação?", answer: "Conjunto de operações que realizam uma função lógica completa no banco de dados." },
  { question: "O que significa ACID?", answer: "Conjunto de propriedades das transações: Atomicidade, Consistência, Isolamento e Durabilidade." },
  { question: "Defina Atomicidade", answer: "Transações são indivisíveis: ou ocorrem completamente ou não ocorrem." },
  { question: "Defina Consistência", answer: "Transações mantêm o banco de dados em um estado válido." },
  { question: "Defina Isolamento", answer: "Transações simultâneas não interferem entre si." },
  { question: "Defina Durabilidade", answer: "Transações concluídas permanecem no banco mesmo após falhas." },
  { question: "O que é uma entidade?", answer: "Objeto do mundo real representado no banco, como Pessoa ou Produto." },
  { question: "O que é uma entidade forte?", answer: "Entidade que existe independentemente de outras." },
  { question: "O que é uma entidade fraca?", answer: "Entidade que depende de outra para existir." },
  { question: "O que é um relacionamento?", answer: "Associação entre duas ou mais entidades." },
  { question: "O que é um relacionamento identificador?", answer: "Relacionamento entre entidade forte e entidade fraca." },
  { question: "O que é cardinalidade?", answer: "Define o número de ocorrências entre entidades (1:1, 1:N, N:N)." },
  { question: "O que é um atributo?", answer: "Característica de uma entidade ou relacionamento." },
  { question: "O que é um atributo identificador?", answer: "Atributo que diferencia cada ocorrência (ex: id, RA)." },
  { question: "O que é um atributo composto?", answer: "Atributo formado por subatributos (ex: endereço → rua, cidade)." },
  { question: "O que é um atributo multivalorado?", answer: "Atributo que pode ter vários valores (ex: telefone)." },
  { question: "O que é generalização e especialização?", answer: "Relação entre entidade genérica e suas versões específicas (Pessoa → Aluno, Professor)." },
];

export default function FlashcardsApp() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const next = () => {
    setShowAnswer(false);
    setIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prev = () => {
    setShowAnswer(false);
    setIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <Card className="w-full max-w-xl text-center shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">{flashcards[index].question}</h2>
          {showAnswer && <p className="text-base text-gray-700">{flashcards[index].answer}</p>}
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <Button variant="outline" onClick={prev}>Anterior</Button>
        <Button onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? "Ocultar Resposta" : "Mostrar Resposta"}
        </Button>
        <Button variant="outline" onClick={next}>Próximo</Button>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Flashcard {index + 1} de {flashcards.length}
      </p>
    </div>
  );
}
