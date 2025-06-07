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
    status VARCHAR(15) CHECK (status IN ('Disponivel', 'Alugado')) DEFAULT 'Disponivel',
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
('Matematica Essencial - Volume 1', 'Carlos Andrade', 'Didatico', 2020, 'Disponivel', 1),
('Matematica Essencial - Volume 2', 'Carlos Andrade', 'Didatico', 2021, 'Disponivel', 1),
('Fisica Fundamental - Volume 1', 'Ana Beatriz Lima', 'Didatico', 2019, 'Disponivel', 1),
('Fisica Fundamental - Volume 2', 'Ana Beatriz Lima', 'Didatico', 2020, 'Disponivel', 1),
('Quimica para o Ensino Médio', 'Roberto Silva', 'Didatico', 2018, 'Disponivel', 1),
('Biologia em Foco', 'Luciana Campos', 'Didatico', 2021, 'Disponivel', 1),
('Historia do Brasil - Volume 1', 'Marcos Paulo', 'Didático', 2017, 'Disponivel', 1),
('Historia do Brasil - Volume 2', 'Marcos Paulo', 'Didático', 2018, 'Disponivel', 1),
('Geografia Geral', 'Carolina Dias', 'Didatico', 2020, 'Disponivel', 1),
('Ingles Basico para Estudantes', 'John Smith', 'Didatico', 2021, 'Disponivel', 1),
('Portugues: Gramatica Aplicada', 'Marta Borges', 'Didatico', 2019, 'Disponivel', 1),
('Literatura Brasileira', 'Fernando Rocha', 'Didatico', 2016, 'Disponivel', 1),
('Redacao Nota 1000', 'Patricia Souza', 'Didatico', 2022, 'Disponivel', 1),
('Quimica Organica Basica', 'Igor Teixeira', 'Didatico', 2020, 'Disponivel', 1),
('Fisica Mecanica', 'Douglas Ferreira', 'Didatico', 2021, 'Disponivel', 1),
('Matematica Financeira', 'Claudia Fernandes', 'Didatico', 2018, 'Disponivel', 1),
('Programacao em Python', 'Juliana Nunes', 'Didatico', 2021, 'Disponivel', 1),
('Logica de Programação', 'Bruno Araújo', 'Didatico', 2020, 'Disponivel', 1),
('Banco de Dados - SQL', 'Renato Dias', 'Didatico', 2022, 'Disponivel', 1),
('Desenvolvimento Web', 'Carla Mota', 'Didatico', 2023, 'Disponivel', 1),
('Algoritmos e Estruturas de Dados', 'Eduardo Ramos', 'Didatico', 2021, 'Disponivel', 1),
('Engenharia de Software', 'Vinicius Souza', 'Didatico', 2019, 'Disponivel', 1),
('Arquitetura de Computadores', 'Tatiane Lima', 'Didatico', 2018, 'Disponivel', 1),
('Segurança da Informação', 'Alberto Monteiro', 'Didatico', 2020, 'Disponivel', 1),
('Redes de Computadores', 'Simone Marques', 'Didatico', 2019, 'Disponivel', 1),
('Sistemas Operacionais', 'Gustavo Ribeiro', 'Didatico', 2021, 'Disponivel', 1),
('Computação na Educação', 'Rita Monteiro', 'Didatico', 2022, 'Disponivel', 1),
('Gestao de Projetos', 'Paulo Martins', 'Didatico', 2020, 'Disponivel', 1),
('Marketing Digital', 'Livia Almeida', 'Didatico', 2021, 'Disponivel', 1),
('Empreendedorismo e Inovação', 'Marcela Cruz', 'Didatico', 2022, 'Disponivel', 1),
('Administracao Basica', 'Renata Costa', 'Didatico', 2019, 'Disponivel', 1),
('Contabilidade Introdutoria', 'Robson Silva', 'Didatico', 2020, 'Disponivel', 1),
('Direito do Consumidor', 'Larissa Fonseca', 'Didatico', 2021, 'Disponivel', 1),
('Educacao Ambiental', 'Leonardo Pires', 'Didatico', 2018, 'Disponivel', 1),
('Sociologia Aplicada', 'Fernanda Oliveira', 'Didatico', 2020, 'Disponivel', 1);