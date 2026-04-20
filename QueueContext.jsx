import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../api/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, doc, serverTimestamp, deleteDoc } from 'firebase/firestore';

const QueueContext = createContext();

export const QueueProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "active_queue"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTickets(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const joinQueue = async (name) => {
    const nextNum = tickets.length > 0 ? Math.max(...tickets.map(t => t.number)) + 1 : 101;
    await addDoc(collection(db, "active_queue"), {
      name,
      number: nextNum,
      status: 'waiting',
      createdAt: serverTimestamp()
    });
  };

  const updateStatus = async (ticketId, newStatus) => {
    await updateDoc(doc(db, "active_queue", ticketId), { status: newStatus });
  };

  const clearQueue = async () => {
    tickets.forEach(async (t) => await deleteDoc(doc(db, "active_queue", t.id)));
  };

  return (
    <QueueContext.Provider value={{ tickets, loading, joinQueue, updateStatus, clearQueue }}>
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => useContext(QueueContext);