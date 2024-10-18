import React, { useState } from 'react'
import { MdAdd ,MdClose} from 'react-icons/md'

function Taginput({tag,setTag}) {

    const [inputvalue,setInputvalue]=useState('');

    const handleinputchange=(e)=>{
         setInputvalue(e.target.value);
    }
    const addtags=()=>{
        if(inputvalue.trim() !==''){
            setTag([...tag,inputvalue.trim()]);
            setInputvalue('')
        }
    }

    const keydown=(e)=>{
        if(e.key==='Enter'){
            addtags()
        }
    }
    const removeTag = (tagremove) => {
        setTag(tag.filter((tag) => tag !== tagremove))
      }
    

  return (
    <div>
    {tag?.length>0 &&(
        <div className='flex item-center flex-wrap gap-2 mt-2'>
        {tag.map((ef,index)=>(
            <span className='flex items-center px-3 py-1 gap-2 bg-slate-300 rounded-lg text-gray-800 ' key={index}>#{ef}
            <button  onClick={() => removeTag(ef)} ><MdClose/></button>
            </span>
    ))}
    </div>
    )}
    
      <div className='flex items-center gap-4 mt-3 mb-3 '>
        <input type='text' className='border border-gray-400 p-1 outline-none' placeholder='Add tags' value={inputvalue} onChange={handleinputchange} onKeyDown={keydown}/>
        <button className='w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full' onClick={()=>{addtags()}}><MdAdd className='font-semibold' /></button>
      </div>
    </div>
  )
}

export default Taginput
