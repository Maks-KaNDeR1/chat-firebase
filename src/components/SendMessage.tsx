import React, { useState, FormEvent } from 'react'
import { db, auth } from '../App'
import firebase from 'firebase'
import { Input, Button } from '@material-ui/core'

type PropsType = {
    scroll: any
}

const SendMessage: React.FC<PropsType> = ({ scroll }) =>  {
    const [msg, setMsg] = useState('')

    async function sendMessage(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const uid = auth.currentUser?.uid
        const photoURL = auth.currentUser?.photoURL
                console.log(auth)
        await db.collection('messages').add({
            text: msg,
            photoURL,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })

        setMsg('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div>
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <Input
                        style={{ width: '78%', fontSize: '15px', 
                        // fontWeight: '550', 
                        marginLeft: '5px', marginBottom: '-3px' }}
                        placeholder='Message...'
                        type="text"
                        value={msg}
                        onChange={e => setMsg(e.target.value)} />
                    <Button
                        style={{ width: '18%', fontSize: '15px', 
                        // fontWeight: '550', 
                        margin: '4px 5% -13px 5%', maxWidth: '200px' }}
                        type="submit">Send</Button>
                </div>
            </form>
        </div>
    )
}

export default SendMessage