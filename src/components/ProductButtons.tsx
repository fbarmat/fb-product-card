import React, { useCallback, useContext } from 'react';
import styles from '../styles/styles.module.css';
import { ProductContext } from './ProductCard';


export interface Props {
    className?: string;
    style?: React.CSSProperties;
};

export const ProductButtons = ({className, style}: Props) => {

    //TODO: maxCount
    const { increaseBy, counter, maxCount } = useContext(ProductContext);

    //TODO: isMaxReached = useCallBack, dependecias [counter, maxCounter]
    // True si el count === maxCount
    // False si no lo es

    const isMaxReach = useCallback(
        () => !!maxCount && counter === maxCount,
        [counter, maxCount],
    )


    return (
        <div 
            className={`${styles.buttonsContainer} ${className}`}
            style={style}>
            <button
                className={styles.buttonMinus}
                onClick={() => increaseBy(-1)}>
                -
            </button>
            <div 
                className={styles.countLabel}
            >
                {counter}
            </div>
            <button 
                className={`${styles.buttonAdd} ${ isMaxReach() && styles.disabled }`}
                onClick={() => increaseBy(+1)}
            >
                +
            </button>
        </div>
    );
};