const CODE_SAMPLES = {
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  python: `print("Hello, World!")`,
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  cpp: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
  nodejs: `console.log("Hello, World!");`,
  javascript: `console.log("Hello, World!");`,
  groovy: `class Main {
    static void main(String[] args) {
        println("Hello, World!");
    }
}`,
  jshell: `System.out.println("Hello, World!");`,
  haskell: `main = putStrLn "Hello, World!"`,
  tcl: `puts "Hello, World!"`,
  lua: `print("Hello, World!")`,
  ada: `with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
begin
    Put_Line("Hello, World!");
end Main;`,
  commonlisp: `(format t "Hello, World!")`,
  d: `import std.stdio;

void main() {
    writeln("Hello, World!");
}`,
  elixir: `IO.puts "Hello, World!"`,
  erlang: `io:format("Hello, World!~n", []).`,
  fsharp: `printfn "Hello, World!"`,
  fortran: `program hello
    print *, "Hello, World!"
end program hello`,
  assembly: `section .data
    msg db 'Hello, World!', 0xa ; our dear string
    len equ $ - msg             ; length of our dear string

section .text
    global _start

_start:                         ; let's start
    ; write our string to stdout
    mov eax, 4                  ; 'write' system call
    mov ebx, 1                  ; file descriptor 1 is stdout
    mov ecx, msg                ; address of string to output
    mov edx, len                ; number of bytes to write
    int 0x80                    ; call the kernel

    ; and exit
    mov eax, 1                  ; 'exit' system call
    xor ebx, ebx                ; exit with code 0
    int 0x80                    ; call the kernel`,
  scala: `object Main extends App {
    println("Hello, World!")
}`,
  php: `<?php
echo "Hello, World!";
?>`,
  python2: `print ("Hello, World!")`,
  csharp: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
  perl: `print "Hello, World!\\n";`,
  ruby: `puts "Hello, World!"`,
  go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
  r: `cat("Hello, World!")`,
  racket: `#lang racket
(displayln "Hello, World!")`,
  ocaml: `print_endline "Hello, World!"`,
  vb: `Public Module Program
	Public Sub Main(args() As string)
		Console.WriteLine("Hello, World!")
	End Sub
End Module`,
  basic: `PRINT "Hello, World!"`,
  bash: `echo "Hello, World!"`,
  clojure: `(defn greetings [msg]
(println (format "Hello, %s" msg)))

(greetings "World!")`,
  typescript: `console.log("Hello, World!");`,
  cobol: `IDENTIFICATION DIVISION.
PROGRAM-ID. HELLO-WORLD.
PROCEDURE DIVISION.
DISPLAY 'Hello, World!'.
STOP RUN.`,
  kotlin: `fun main() {
    println("Hello, World!")
}`,
  pascal: `program HelloWorld;
begin
    writeln('Hello, World!');
end.`,
  prolog: `:- initialization(main).
main :- write('Hello, World!'), nl.`,
  rust: `fn main() {
    println!("Hello, World!");
}`,
  swift: `print("Hello, World!")`,
  objectivec: `#import <Foundation/Foundation.h>

int main() {
    @autoreleasepool {
        NSLog(@"Hello, World!");
    }
    return 0;
}`,
  brainfk: `++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.`,
  coffeescript: `console.log "Hello, World!"`,
  ejs: `<%
 let message = 'Hello, World!'
%>
<%= message %>`,
  html: `<!DOCTYPE html>
<html>
<head>
    <title>Hello, World!</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`,
  materialize: `<!DOCTYPE html>
<html>
<head>
    <title>Hello, World!</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
</head>
<body>
    <h1>Hello, World!</h1>
    <button class="waves-effect waves-light btn" onclick="M.toast({html: 'I am a toast'})">
      Say Hi !
    </button>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
</body>
</html>`,
  bootstrap: `<!DOCTYPE html>
<html>
<head>
    <title>Hello, World!</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <h1>Hello, World!</h1>

    <button type="button" class="btn btn-primary" id="hi">Say Hi !</button>

    <div class="alert alert-success mt-2" role="alert" id="alert-div" style="display:none;">
      Hello there!
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <script>
      $( document ).ready(function() {
        $( "#hi" ).click(function() {
          $("#alert-div").toggle();
        });
      });
    </script>
</body>
</html>`,
  jquery: `<!DOCTYPE html>
<html>
<head>
    <title>Hello, World!</title>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
</head>
<body>
    <h1>Hello, World!</h1>

    <button id="hi">Say Hi !</button>

    <div id="alert-div" style="display:none;">
      Hello there!
    </div>

    <script>
      $( document ).ready(function() {
        $( "#hi" ).click(function() {
          $("#alert-div").toggle();
        });
      });
    </script>
</body>
</html>`,
  foundation: `<!DOCTYPE html>
<html>
<head>
    <title>Hello, World!</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.6.3/css/foundation.min.css">
</head>
<body>
    <h1>Hello, World!</h1>

    <button class="button" id="hi">Say Hi !</button>

    <div class="callout success mt-2" id="alert-div" style="display:none;">
      Hello there!
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.6.3/js/foundation.min.js"></script>

    <script>
      $( document ).ready(function() {
        $( "#hi" ).click(function() {
          $("#alert-div").toggle();
        });
      });
    </script>
</body>
</html>`,
  bulma: `<!DOCTYPE html>
<html>
<head>
    <title>Hello, World!</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css">
</head>
<body>
    <h1>Hello, World!</h1>

    <button class="button is-primary" id="hi">Say Hi !</button>

    <div class="notification is-success mt-2" id="alert-div" style="display:none;">
      Hello there!
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bulma@0.9.0/js/bulma.min.js"></script>

    <script>
      $( document ).ready(function() {
        $( "#hi" ).click(function() {
          $("#alert-div").toggle();
        });
      });
    </script>
</body>
</html>`,
  uikit: `<!DOCTYPE html>
<html>
<head>
    <title>Hello, World!</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.5.9/css/uikit.min.css">
</head>
<body>
    <h1>Hello, World!</h1>

    <button class="uk-button uk-button-primary" id="hi">Say Hi !</button>

    <div class="uk-alert-success mt-2" id="alert-div" style="display:none;">
      Hello there!
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.5.9/js/uikit.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.5.9/js/uikit-icons.min.js"></script>

    <script>
      $( document ).ready(function() {
        $( "#hi" ).click(function() {
          $("#alert-div").toggle();
        });
      });
    </script>
</body>
</html>`,
  semanticUI: `<!DOCTYPE html>
<html>
<head>
    <title>Hello, World!</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">
</head>
<body>
    <h1>Hello, World!</h1>

    <button class="ui basic button" id="hi">
      <i class="icon user"></i>
      Say Hi !
    </button>

    <div class="ui positive message mt-2" id="alert-div" style="display:none;">
      <p>Hello there!</p>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js"></script>

    <script>
      $( document ).ready(function() {
        $( "#hi" ).click(function() {
          $("#alert-div").toggle();
        });
      });
    </script>
</body>
</html>`,
  skeleton: `<!DOCTYPE html>
<html>
<head>
    <title>Hello, World!</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css">
</head>
<body>
    <h1>Hello, World!</h1>

    <button class="button-primary" id="hi">Say Hi !</button>

    <div id="alert-div" style="display:none;">
      Hello there!
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

    <script>
      $( document ).ready(function() {
        $( "#hi" ).click(function() {
          $("#alert-div").toggle();
        });
      });
    </script>
</body>
</html>`,
  milligram: `<!DOCTYPE html>
<html>
<head>
    <title>Hello, World!</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.min.css">
</head>
<body>
    <h1>Hello, World!</h1>

    <button class="button" id="hi">Say Hi !</button>

    <div id="alert-div" style="display:none;">
      Hello there!
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

    <script>
      $( document ).ready(function() {
        $( "#hi" ).click(function() {
          $("#alert-div").toggle();
        });
      });
    </script>
</body>
</html>`,
  paperCss: `<!DOCTYPE html>
<html>
<head>
    <title>Hello, World!</title>
    <link rel="stylesheet" href="https://unpkg.com/papercss@1.6.1/dist/paper.min.css">
</head>
<body>
    <p class="text-secondary">Hello World !</p>

    <button class="btn-success" id="hi">Say Hi !</button>

    <div class="paper container" id="alert-div" style="display:none;">
        Hello there!
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

    <script>
      $( document ).ready(function() {
        $( "#hi" ).click(function() {
          $("#alert-div").toggle();
        });
      });
    </script>
</body>
</html>`,
  backbonejs: `<!DOCTYPE html>
<html>
<head>
    <title>Hello, World!</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.11.0/underscore-min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.4.0/backbone-min.js"></script>
</head>
<body>
    <script>
        $(function() {
            (function() {
                var View = Backbone.View.extend({
                    'el': 'body',
                    'template': _.template('<h1>Hello, World!</h1>'),
                      'initialize': function() {
                        this.render();
                    },
                    'render': function() {
                        this.$el.html(this.template());
                    }
                });
        
                new View();
            })()
        });
    </script>
</body>
</html>`,
  mysql: `CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

INSERT INTO users (name, email) VALUES ('klpod221', 'klpod221.dev@gmail.com');
INSERT INTO users (name, email) VALUES ('John Doe', 'john.doe@gmail.com');
INSERT INTO users (name, email) VALUES ('Jane Doe', 'jane.doe@gmail.com');

SELECT * FROM users;`,
  oracle: `CREATE TABLE users (
    id NUMBER PRIMARY KEY,
    name VARCHAR2(15) NOT NULL,
    email VARCHAR2(30) NOT NULL
);

INSERT INTO users (id, name, email) VALUES (1, 'klpod221', 'klpod221.dev@gmail.com');
INSERT INTO users (id, name, email) VALUES (2, 'John Doe', 'john.doe@gmail.com');
INSERT INTO users (id, name, email) VALUES (3, 'Jane Doe', 'jane.doe@gmail.com');

SELECT * FROM users;`,
  postgresql: `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

INSERT INTO users (name, email) VALUES ('klpod221', 'klpod221.dev@gmail.com');
INSERT INTO users (name, email) VALUES ('John Doe', 'john.doe@gmail.com');
INSERT INTO users (name, email) VALUES ('Jane Doe', 'jane.doe@gmail.com');

SELECT * FROM users;`,
  mariadb: `CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

INSERT INTO users (name, email) VALUES ('klpod221', 'klpod221.dev@gmail.com');
INSERT INTO users (name, email) VALUES ('John Doe', 'john.doe@gmail.com');
INSERT INTO users (name, email) VALUES ('Jane Doe', 'jane.doe@gmail.com');

SELECT * FROM users;`,
  sqlserver: `CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(15) NOT NULL,
    email NVARCHAR(30) NOT NULL
);

INSERT INTO users (name, email) VALUES ('klpod221', 'klpod221.dev@gmail.com');
INSERT INTO users (name, email) VALUES ('John Doe', 'john.doe@gmail.com');
INSERT INTO users (name, email) VALUES ('Jane Doe', 'jane.doe@gmail.com');

SELECT * FROM users;`,
  sqlite: `CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL
);

INSERT INTO users (name, email) VALUES ('klpod221', 'klpod221.dev@gmail.com');
INSERT INTO users (name, email) VALUES ('John Doe', 'john.doe@gmail.com');
INSERT INTO users (name, email) VALUES ('Jane Doe', 'jane.doe@gmail.com');

SELECT * FROM users;`,
  redis: `SET name "klpod221"
GET name`,
  plsql: `DECLARE
  message varchar2(100):= 'Hello, World!'; 
BEGIN 
  dbms_output.put_line(message); 
END;
/`,
  mongodb: `db.users.insertMany([
    { name: "klpod221", email: "klpod221.dev@gmail.com" },
    { name: "John Doe", email: "john.doe@gmail.com" },
    { name: "Jane Doe", email: "jane.doe@gmail.com" }
]);

db.users.find();`,
};

export default CODE_SAMPLES;
