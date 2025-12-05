import { useState } from "react";

export default function DescricaoProgetos() {

    const [count, setCount] = useState<number>(0);

    return <>
    
        <p>Clicaste {count} vezes</p>

        <button onClick={() => setCount(count + 1)}> 
            Clica aqui 
        </button>
    
    </>

}