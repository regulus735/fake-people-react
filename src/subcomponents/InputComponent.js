import React from 'react'

const styles = {
   borderColor: 'red'
}

const InputComponent = ({ errorList, name, value, handleChange }) => {
   return (
      <>
         <label htmlFor={name}>{name}</label>
         <input style={errorList.find(e => e === name) && styles} type="text" id={name} value={value} onChange={handleChange} />
      </>
   )
}

export default InputComponent