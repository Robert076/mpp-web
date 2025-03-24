import { Pool } from 'pg';

const pool = new Pool({
  user: 'admin',        
  host: 'localhost',    
  database: 'guns',     
  password: 'admin',    
  port: 5432,           
});

export default pool;
