CREATE DATABASE biblioteca_db;
\c biblioteca_db;

-- Tabela de Administradores
CREATE TABLE administrador (
    id_adm SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- Tabela de Alunos
CREATE TABLE aluno (
    id_aluno SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    matricula VARCHAR(20) UNIQUE NOT NULL,
    curso VARCHAR(50) NOT NULL,
    id_adm INT REFERENCES administrador(id_adm) ON DELETE SET NULL
);

-- Tabela de Livros
CREATE TABLE livro (
    id_livro SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    genero VARCHAR(50),
    ano_publicacao INT,
    status VARCHAR(15) CHECK (status IN ('Disponível', 'Alugado')) DEFAULT 'Disponível',
    id_adm INT REFERENCES administrador(id_adm) ON DELETE SET NULL
);

-- Tabela de Aluguéis
CREATE TABLE aluguel (
    id_aluguel SERIAL PRIMARY KEY,
    id_aluno INT REFERENCES aluno(id_aluno) ON DELETE CASCADE,
    id_livro INT REFERENCES livro(id_livro) ON DELETE CASCADE,
    data_aluguel DATE NOT NULL DEFAULT CURRENT_DATE,
    data_devolucao DATE,
    status VARCHAR(15) CHECK (status IN ('Alugado', 'Devolvido')) DEFAULT 'Alugado'
);

-- Inserir livros
INSERT INTO livro (titulo, autor, genero, ano_publicacao, status, id_adm)
VALUES
('Matemática Essencial - Volume 1', 'Carlos Andrade', 'Didático', 2020, 'disponivel', 1),
('Matemática Essencial - Volume 2', 'Carlos Andrade', 'Didático', 2021, 'disponivel', 1),
('Física Fundamental - Volume 1', 'Ana Beatriz Lima', 'Didático', 2019, 'disponivel', 1),
('Física Fundamental - Volume 2', 'Ana Beatriz Lima', 'Didático', 2020, 'disponivel', 1),
('Química para o Ensino Médio', 'Roberto Silva', 'Didático', 2018, 'disponivel', 1),
('Biologia em Foco', 'Luciana Campos', 'Didático', 2021, 'disponivel', 1),
('História do Brasil - Volume 1', 'Marcos Paulo', 'Didático', 2017, 'disponivel', 1),
('História do Brasil - Volume 2', 'Marcos Paulo', 'Didático', 2018, 'disponivel', 1),
('Geografia Geral', 'Carolina Dias', 'Didático', 2020, 'disponivel', 1),
('Inglês Básico para Estudantes', 'John Smith', 'Didático', 2021, 'disponivel', 1),
('Português: Gramática Aplicada', 'Marta Borges', 'Didático', 2019, 'disponivel', 1),
('Literatura Brasileira', 'Fernando Rocha', 'Didático', 2016, 'disponivel', 1),
('Redação Nota 1000', 'Patrícia Souza', 'Didático', 2022, 'disponivel', 1),
('Química Orgânica Básica', 'Igor Teixeira', 'Didático', 2020, 'disponivel', 1),
('Física Mecânica', 'Douglas Ferreira', 'Didático', 2021, 'disponivel', 1),
('Matemática Financeira', 'Cláudia Fernandes', 'Didático', 2018, 'disponivel', 1),
('Programação em Python', 'Juliana Nunes', 'Didático', 2021, 'disponivel', 1),
('Lógica de Programação', 'Bruno Araújo', 'Didático', 2020, 'disponivel', 1),
('Banco de Dados - SQL', 'Renato Dias', 'Didático', 2022, 'disponivel', 1),
('Desenvolvimento Web', 'Carla Mota', 'Didático', 2023, 'disponivel', 1),
('Algoritmos e Estruturas de Dados', 'Eduardo Ramos', 'Didático', 2021, 'disponivel', 1),
('Engenharia de Software', 'Vinícius Souza', 'Didático', 2019, 'disponivel', 1),
('Arquitetura de Computadores', 'Tatiane Lima', 'Didático', 2018, 'disponivel', 1),
('Segurança da Informação', 'Alberto Monteiro', 'Didático', 2020, 'disponivel', 1),
('Redes de Computadores', 'Simone Marques', 'Didático', 2019, 'disponivel', 1),
('Sistemas Operacionais', 'Gustavo Ribeiro', 'Didático', 2021, 'disponivel', 1),
('Computação na Educação', 'Rita Monteiro', 'Didático', 2022, 'disponivel', 1),
('Gestão de Projetos', 'Paulo Martins', 'Didático', 2020, 'disponivel', 1),
('Marketing Digital', 'Lívia Almeida', 'Didático', 2021, 'disponivel', 1),
('Empreendedorismo e Inovação', 'Marcela Cruz', 'Didático', 2022, 'disponivel', 1),
('Administração Básica', 'Renata Costa', 'Didático', 2019, 'disponivel', 1),
('Contabilidade Introdutória', 'Robson Silva', 'Didático', 2020, 'disponivel', 1),
('Direito do Consumidor', 'Larissa Fonseca', 'Didático', 2021, 'disponivel', 1),
('Educação Ambiental', 'Leonardo Pires', 'Didático', 2018, 'disponivel', 1),
('Sociologia Aplicada', 'Fernanda Oliveira', 'Didático', 2020, 'disponivel', 1);