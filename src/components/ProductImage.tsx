import React, { useContext } from "react";
import { ProductContext } from "./ProductCard";
import noImage from '../assets/no-image.jpg';
import styles from '../styles/styles.module.css';


export interface Props {
    img?:string;
    className?:string;
    style?: React.CSSProperties;
};


export const ProductImage = ({img, className, style}:Props) => {

    const { product } = useContext( ProductContext );
    
    let imgToShow:string;

    // Chequeo si la imagen viene por props, uso esa imagen, sino la imagen que viene en product 
    // y sino existe muestro sin image
    if(img){
        imgToShow = img;
    }else if( product.img ) {
        imgToShow = product.img
    }else{
        imgToShow = noImage;
    };
    
    return (
        <img className={ `${styles.productImg} ${className}` } src={ imgToShow } alt="Product Image" style={style}/>
    );
};