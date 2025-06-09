-- 📌 Criando o banco de dados
CREATE DATABASE biblioteca_db;
\c biblioteca_db;

-- 📌 Criando o usuário do banco
CREATE USER afyalib_user WITH PASSWORD 'senhaSegura';

-- 📌 Concedendo acesso ao banco
GRANT CONNECT ON DATABASE biblioteca_db TO afyalib_user;

-- 📌 Tabela de Administradores
CREATE TABLE administrador (
    id_adm SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- 📌 Tabela de Alunos
CREATE TABLE aluno (
    id_aluno SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    matricula VARCHAR(20) UNIQUE NOT NULL,
    curso VARCHAR(50) NOT NULL,
    id_adm INT REFERENCES administrador(id_adm) ON DELETE SET NULL
);

-- 📌 Tabela de Livros
CREATE TABLE livro (
    id_livro SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    genero VARCHAR(50),
    ano_publicacao INT,
    status VARCHAR(15) CHECK (status IN ('Disponivel', 'Alugado')) DEFAULT 'Disponivel',
    id_adm INT REFERENCES administrador(id_adm) ON DELETE SET NULL
);

-- 📌 Tabela de Aluguéis
CREATE TABLE aluguel (
    id_aluguel SERIAL PRIMARY KEY,
    id_aluno INT REFERENCES aluno(id_aluno) ON DELETE CASCADE,
    id_livro INT REFERENCES livro(id_livro) ON DELETE CASCADE,
    data_aluguel DATE NOT NULL DEFAULT CURRENT_DATE,
    data_devolucao DATE,
    status VARCHAR(15) CHECK (status IN ('Alugado', 'Devolvido')) DEFAULT 'Alugado'
);

-- 📌 Concedendo permissões ao usuário
GRANT USAGE, SELECT, UPDATE ON SEQUENCE aluno_id_aluno_seq TO afyalib_user;
GRANT USAGE, SELECT, UPDATE ON SEQUENCE livro_id_livro_seq TO afyalib_user;
GRANT USAGE, SELECT, UPDATE ON SEQUENCE aluguel_id_aluguel_seq TO afyalib_user;

GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE administrador TO afyalib_user;
GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE aluno TO afyalib_user;
GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE livro TO afyalib_user;
GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE aluguel TO afyalib_user;

-- 📌 Inserção de livros iniciais
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
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'Fantasia', 1954, 'Disponivel', 1);


--psql -U postgres -f biblioteca_db.sql
--usar para criar o banco de dados e as tabelas por codigo.