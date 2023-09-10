import { useState } from 'react';
export default function SelectRole(){

   

  async function entity(){
   
  }

  async function recipient(){
    
  }


    return (
        <div className="App">
          <div className='App-Header'>
            <div className='description'>
            <h1>BitLogix</h1>
            <h2>Select Role</h2>
            </div>
            
            <div className='custom-buttons'>
            <button
            onClick={entity}
            style={{backgroundColor: "blue"}}>Entity</button>
          <button
          onClick={recipient}
          style={{backgroundColor: "pink"}}>Recipient</button>
            </div>
          
          
          </div>
          
        </div>
      );
    }
    

