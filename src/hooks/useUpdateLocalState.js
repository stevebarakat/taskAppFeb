import { useEffect } from 'react';

const useUpdateLocalState = (db, user, handleSetTaskList) => {

  useEffect(() => {
    const docRef = db.collection('tasklist').doc(user.uid);
    return docRef.onSnapshot(snapshot => {
      if (!snapshot.data()) return;
      handleSetTaskList(snapshot.data().tasks);
    });
  }, [ db, user, handleSetTaskList ]);

};
export default useUpdateLocalState;
