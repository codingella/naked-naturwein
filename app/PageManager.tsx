"use client";
import React from "react";
import style from "./PageManager.module.css";


export default function PageManager({ children }) {

    return (
        <>  
            {/* Active page, animated for page transition */}
            <div className={`transitionContainer`}>
                {children[0]}
            </div>
            {children[1]}
        </>
    );
}
