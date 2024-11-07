import React from 'react'
import { cn } from "@/lib/utils";

function Label({ htmlFor, text, className, required }) {
    return (
        <label htmlFor={htmlFor} className={cn("label_text", className)}>{text}{required && <span className='text-red-500'> *</span>}</label>
    )
}

export default Label