## How to use a DataBase
1. Create a DataBase. It's just an interface to access, read, write    
<code>const db = new DataBase()</code>
2. Start DataBase. It will download data from storage to your local cache   
<code>db.start()</code>
3. Read or Write to DataBase  
read returns faulse if storage haven't your request  
<code>db.read('x+35')</code>   
<code>db.write('3*4', 12)</code>
4. Stop DataBase. It will load all you curent history to storage  
<code>db.finish()</code>

## How DataBase works
1. You create DB interface
2. DB creates storage if it doesnt exists
3. DB fixes current storage if its broken
4. Db makes a backup of a broken one
5. DB load json storage to your local cache(JS object)
5. Now you can read and write
6. You stopes DB interface to load your local cache to json storage

If you want only to read DB, you shouldnt start() & finish()  
Just create interface and read
