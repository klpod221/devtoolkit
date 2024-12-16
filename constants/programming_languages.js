const PROGRAMMING_LANGUAGES = [
  {
    name: "Java",
    slug: "java",
    extension: "java",
  },
  {
    name: "Python",
    slug: "python",
    extension: "py",
  },
  {
    name: "C",
    slug: "c",
    extension: "c",
  },
  {
    name: "C++",
    slug: "cpp",
    extension: "cpp",
  },
  {
    name: "Node.js",
    slug: "nodejs",
    theme: "javascript",
    extension: "js",
  },
  {
    name: "JavaScript",
    slug: "javascript",
    extension: "js",
  },
  {
    name: "Groovy",
    slug: "groovy",
    extension: "groovy",
  },
  {
    name: "JShell",
    slug: "jshell",
    extension: "jsh",
  },
  {
    name: "Haskell",
    slug: "haskell",
    extension: "hs",
  },
  {
    name: "Tcl",
    slug: "tcl",
    extension: "tcl",
  },
  {
    name: "Lua",
    slug: "lua",
    extension: "lua",
  },
  {
    name: "Ada",
    slug: "ada",
    extension: "ada",
  },
  {
    name: "CommonLisp",
    slug: "commonlisp",
    extension: "lsp",
  },
  {
    name: "D",
    slug: "d",
    extension: "d",
  },
  {
    name: "Elixir",
    slug: "elixir",
    extension: "ex",
  },
  {
    name: "Erlang",
    slug: "erlang",
    extension: "erl",
  },
  {
    name: "F#",
    slug: "fsharp",
    extension: "fs",
  },
  {
    name: "Fortran",
    slug: "fortran",
    extension: "f90",
  },
  {
    name: "Assembly",
    slug: "assembly",
    extension: "asm",
  },
  {
    name: "Scala",
    slug: "scala",
    extension: "scala",
  },
  {
    name: "PHP",
    slug: "php",
    extension: "php",
  },
  {
    name: "Python2",
    slug: "python2",
    extension: "py",
  },
  {
    name: "C#",
    slug: "csharp",
    extension: "cs",
  },
  {
    name: "Perl",
    slug: "perl",
    extension: "pl",
  },
  {
    name: "Ruby",
    slug: "ruby",
    extension: "rb",
  },
  {
    name: "Go",
    slug: "go",
    extension: "go",
  },
  {
    name: "R",
    slug: "r",
    extension: "r",
  },
  {
    name: "Racket",
    slug: "racket",
    extension: "rkt",
  },
  {
    name: "OCaml",
    slug: "ocaml",
    extension: "ml",
  },
  {
    name: "Visual Basic",
    slug: "vb",
    extension: "vb",
  },
  {
    name: "Basic",
    slug: "basic",
    extension: "bas",
  },
  {
    name: "Bash",
    slug: "bash",
    extension: "sh",
  },
  {
    name: "Clojure",
    slug: "clojure",
    extension: "clj",
  },
  {
    name: "TypeScript",
    slug: "typescript",
    extension: "ts",
  },
  {
    name: "Cobol",
    slug: "cobol",
    extension: "cob",
  },
  {
    name: "Kotlin",
    slug: "kotlin",
    extension: "kt",
  },
  {
    name: "Pascal",
    slug: "pascal",
    extension: "pas",
  },
  {
    name: "Prolog",
    slug: "prolog",
    extension: "pro",
  },
  {
    name: "Rust",
    slug: "rust",
    extension: "rs",
  },
  {
    name: "Swift",
    slug: "swift",
    extension: "swift",
  },
  {
    name: "Objective-C",
    slug: "objectivec",
    extension: "m",
    theme: "c",
  },
  {
    name: "Octave",
    slug: "octave",
    extension: "m",
  },
  {
    name: "BrainFK",
    slug: "brainfk",
    extension: "bf",
  },
  {
    name: "CoffeeScript",
    slug: "coffeescript",
    extension: "coffee",
  },
  {
    name: "EJS",
    slug: "ejs",
    extension: "ejs",
  },
  {
    name: "HTML",
    slug: "html",
    extension: "html",
  },
  {
    name: "Materialize",
    slug: "materialize",
    extension: "html",
    theme: "html",
  },
  {
    name: "Bootstrap",
    slug: "bootstrap",
    extension: "html",
    theme: "html",
  },
  {
    name: "JQuery",
    slug: "jquery",
    extension: "html",
    theme: "html",
  },
  {
    name: "Foundation",
    slug: "foundation",
    extension: "html",
    theme: "html",
  },
  {
    name: "Bulma",
    slug: "bulma",
    extension: "html",
    theme: "html",
  },
  {
    name: "Uikit",
    slug: "uikit",
    extension: "html",
    theme: "html",
  },
  {
    name: "Semantic UI",
    slug: "semanticUI",
    extension: "html",
    theme: "html",
  },
  {
    name: "Skeleton",
    slug: "skeleton",
    extension: "html",
    theme: "html",
  },
  {
    name: "Milligram",
    slug: "milligram",
    extension: "html",
    theme: "html",
  },
  {
    name: "PaperCSS",
    slug: "paperCss",
    extension: "html",
    theme: "html",
  },
  {
    name: "BackboneJS",
    slug: "backbonejs",
    extension: "html",
    theme: "html",
  },
  {
    name: "MySQL",
    slug: "mysql",
    extension: "sql",
  },
  {
    name: "Oracle Database",
    slug: "oracle",
    extension: "sql",
    theme: "mysql",
  },
  {
    name: "PostgreSQL",
    slug: "postgresql",
    theme: "mysql",
    extension: "sql",
  },
  {
    name: "MariaDB",
    slug: "mariadb",
    extension: "sql",
    theme: "mysql",
  },
  {
    name: "Microsoft SQL Server",
    slug: "sqlserver",
    extension: "sql",
    theme: "mysql",
  },
  {
    name: "SQLite",
    slug: "sqlite",
    extension: "sql",
    theme: "mysql",
  },
  {
    name: "Redis",
    slug: "redis",
    extension: "redis",
  },
  {
    name: "Oracle PL/SQL",
    slug: "plsql",
    extension: "sql",
    theme: "mysql",
  },
  {
    name: "MongoDB",
    slug: "mongodb",
    theme: "javascript",
    extension: "js",
  },
];

export default PROGRAMMING_LANGUAGES;
