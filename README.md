# Grafico
Grafico is a Console App, prototype for future web app for drawinf f(x) graphs

### How to build & run a project
- Install <code><a href="https://nodejs.org/en">Node.js</a></code>
- Insall <code><a href="https://www.npmjs.com/package/npm">Node Package Manager</a></code>
- At the root of the project, update the dependencies <code>npm i</code>
- At the root of the project run the app <code>node app.js</code>
- At the root of the project run tests <code>npm test</code> при потребі

### Interaction scenario
- <code>👦</code> launches the app
- <code>💻</code> asks for an expression
- <code>👦</code> type an expression, press Enter
- If the expression contains errors, the query procedure is repeated
- <code>💻</code> if variables are present it asks for their values 
- <code>👦</code> tupe values, press Enter
- If the values contain errors, the query procedure is repeated
- <code>💻</code> shows the results 
- <code>💻</code> asks for more values and shows the result untill 👦 ends the interaction or chooses to enter a new expression

### Notes
- Enter <code>q</code> if you want to end the interaction
- Enter <code>e</code> if you want to enter a new exression
- Use <code>x</code>to denote a variable
- If you have problems with typing, make sure that you have selected <code>ENG</code> layout
