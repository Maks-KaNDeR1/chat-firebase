import React, { useState, useEffect, useRef } from 'react'
import { db, auth } from '../App'
import SendMessage from './SendMessage'
import SignOut from './SignOut'

function Chat() {
    const scroll = useRef(null)
    const [messages, setMessages] = useState<any[]>([])
    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => doc.data())
            console.log(data)
            setMessages(data)
        })
    }, [])

    return (
        <div>
            <SignOut />
            <div className="msgs">
                {messages.map(({ id, text, photoURL, uid }) => (
                    <div>
                        <div key={id} className={`msg ${uid === auth.currentUser?.uid ? 'sent' : 'received'}`}>
                            <img src={photoURL} alt="" />
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
        </div>
    )
}

export default Chat