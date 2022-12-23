import { useState } from "react";

export const useProducts = () => {
    const [counter, setCounter] = useState<number>(0);
    
    const increaseBy = ( value: number ) => {
        setCounter ( prev => Math.max(0, prev + value) )
    }

    return {
        counter,
        increaseBy
    }
}