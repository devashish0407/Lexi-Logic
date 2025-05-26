## Lexical Analyzer Project

This project is a modular Lexical Analyzer built using C, designed to tokenize source code input based on user-defined rules. It functions similarly to classic tools like Lex and Flex, but with a customized DFA-based tokenizer architecture for better educational understanding and flexibility.

The Lexical Analyzer reads source code, breaks it into tokens such as keywords, identifiers, literals, and operators, which are essential for further stages in compiler design like parsing and semantic analysis.

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/) (version 14 or above recommended)
- npm (comes with Node.js) or yarn package manager


## Getting Started

1. Clone the repository

    git clone https://github.com/your-username/file-uploader.git
    cd lx-analyzer
2. Install dependencies
Using npm:

       npm install
   
Or using yarn:
    
    yarn install

Running the Project Locally
To start the development server and run the app:

    npm run dev

or

    yarn dev

The app will be available at http://localhost:3000 (or the port shown in the terminal).

## Running Tests
This project uses Vitest as the test runner and React Testing Library for UI testing.

Run tests in watch mode (recommended during development):

    npx vitest
