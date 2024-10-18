import React from 'react'
import { MdCreate, MdDelete, MdOutlinePushPin } from 'react-icons/md'

function Notecards({ title, date, content, tags, isPinned, isEdit, isDeleted, onPinnote }) {
  return (
    <div className='w-[100%] '>
      <div className=' border border-gray-400 p-3 rounded-lg h-full flex flex-col'>
        <div className='flex justify-between'>
          <div>
            <h5 className='text-gray-900 font-semibold'>{title}</h5>
            <span className='text-slate-600 text-sm'>{date}</span>
          </div>
          <MdOutlinePushPin
            className={`icon-btn ${isPinned ? 'text-blue-400' : 'text-slate-400'} cursor-pointer`}
            onClick={onPinnote}
          />
        </div> 
        <p className='flex-grow text-wrap break-words'>
          {content.slice(0,60)+'...'}
        </p>
        <div className='flex justify-between'>
        <div >
        <p className='text-xs text-slate-600 font-semibold'>{tags.map((item)=>`#${item}`)}</p>
          </div>
          <div className='flex'>
            <MdCreate className='cursor-pointer text-slate-500 hover:text-gray-900' onClick={isEdit}/>
            <MdDelete className='cursor-pointer text-slate-500 hover:text-gray-900' onClick={isDeleted}/>
          </div>
          </div>
      </div>
    </div>
  )
}

export default Notecards;
