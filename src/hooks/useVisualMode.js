import {useState} from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (second, replace = false) => {
    setMode(second);

    // remove the previous state to replace it
    if (replace) { 
      setHistory(prev => prev.slice(0, prev.length - 1));
    }
    setHistory(prev => [...prev, second]);
  }

  const back = () => {
    // check if there is only one mode in history and set it to be the same
    if (history.length === 1){
      setMode(history[0]);
    }
    // otherwise reduce the history and get back the last mode in history
    // the history will always be more than one in this case due to above
    if (history.length > 1) { 
      setMode(history[history.length - 2])
      setHistory(history.slice(0, history.length - 1));
    }
  }
  return { mode, history, transition, back };
}


export default useVisualMode;