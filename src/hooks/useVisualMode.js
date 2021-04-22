import {useState} from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (second, replace = false) => {
    setMode(second);
    if (replace) { 
      setHistory(prev => prev.slice(0, prev.length - 1));
    }
    setHistory(prev => [...prev, second]);
  }

  const back = () => {
    if (history.length === 1){
      setMode(history[0]);
    }
    if (history.length > 1) { 
      setMode(history[history.length - 2])
      setHistory(history.slice(0, history.length - 1));
    }
  }
  return { mode, history, transition, back };
}


export default useVisualMode;