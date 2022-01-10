import { useEffect, useState, useRef } from 'react';
import { InitialValues, onChangeArgs, Product } from '../interfaces/interfaces';


interface useProductArgs {
    product: Product;
    onChange?: ( args: onChangeArgs ) => void;
    value?: number;
    initialValues?: InitialValues;
}


export const useProduct = ( { onChange, product, value = 0, initialValues}:useProductArgs) => {

    //Lo uso para que se empiece a ejecutar el setCounter una vez q ya se hizo el renderizado
    const isMounted = useRef(false);

    // Si viene el valor inicial toma ese, sino el value
    const [counter, setCounter] = useState<number>(initialValues?.count || value);

    const increaseBy = ( value:number) => {
        
        const newValue = Math.max( counter + value, 0);

        if(initialValues?.maxCount){
            if(newValue <= initialValues.maxCount){
                setCounter( newValue);
            }
        }
        
        //si tiene algun valor onChange se ejecuta onchange, es la manera corta de poner el if
        onChange && onChange({count:newValue, product});
    };

    const reset = () => {
        setCounter(initialValues?.count || value)
    };

    useEffect(() => {
        if(!isMounted.current) return;

        setCounter(value);
    }, [value]);

    useEffect(() => {
        isMounted.current = true;
    }, []);

    return {
            counter, 
            increaseBy,
            isMaxCountReached: !!initialValues?.count && initialValues.maxCount === counter, 
            maxCount: initialValues?.maxCount,
            reset
        };
}