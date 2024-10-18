export const validemail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
export const nameintials=(name)=>{
  let word=name.split(' ');
  let result='';

  for(let i=0;i<Math.min(word.length,2);i++){
     result+=word[i][0];
  }
  return result.toUpperCase();
}