When asked to generate, generate both production code as well as Jest code, unless otherwise asked. 

•	Imports only. No require statements. Modern modules.
•	.mjs files always.
•	Arrow functions everywhere.
•	No semicolons. Ever.
•	Pure functions preferred. Avoid mutations. No local variables unless forced. Compose via functions.
•	Extract all logic to separate functions. If it’s non-trivial, make the code its own function.
•	No comments. Code should explain itself.
•	In Jest, Use `describe` and `it` functions (do not use the `test` function).
•	No console.log.

Consider the examples in the prompt as specifications for the Jest test code to be generated. NEVER code additional tests unless asked. Never generate code that is not need to meet the examples in the tests.
