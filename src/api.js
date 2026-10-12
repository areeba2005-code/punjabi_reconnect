const B=import.meta.env.VITE_API_URL||'http://localhost:5000/api';
const tok=()=>localStorage.getItem('pr_token');
async function call(p,o={}){const r=await fetch(B+p,{...o,headers:{'Content-Type':'application/json',...(tok()?{Authorization:'Bearer '+tok()}:{})}});
 const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||'Something went wrong');return j;}
export const register=b=>call('/auth/register',{method:'POST',body:JSON.stringify(b)});
export const login=b=>call('/auth/login',{method:'POST',body:JSON.stringify(b)});
export const saveProgress=b=>call('/progress',{method:'POST',body:JSON.stringify(b)});
export const getMe=()=>call('/me');
export const submitScore=b=>call('/scores',{method:'POST',body:JSON.stringify(b)});
export const getBoard=()=>call('/leaderboard');
