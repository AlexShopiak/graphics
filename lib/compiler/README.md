## How to use a Compiler
1. Create a compiler. It's an environment you'll work in  
<code>const c = new Compiler()</code>
2. Compile an expression you will compute. You can recompile it. The last will be stored    
<code>c.compile('x+5')</code>  
<code>c.compile('x+6')</code>  
3. Compute stored expression with your values  
   If your expression has no vars, all values will be ignored  
<code>res1 = c.compute(4)</code>   
<code>res2 = c.compute(5)</code>   
<code>res3 = c.compute(78)</code>  
4. Save your history(optionaly)  
<code>c.saveHistory();</code>

## How Compiler works
1. Reads your expression
2. Tokenizes it
3. Parses it to ast(abstract syntax tree) or takes ast from DB
4. Computes the ast with your value
5. Gives you a result
6. Saves all ast-s of all expression you worked with(optionaly)
