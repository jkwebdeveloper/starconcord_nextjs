import Image from 'next/image'
import React from 'react'

function Spinner({ show, text, width, height, children }) {
    if (!show) return text
    return (
        <>
            {/* <Image src="/static/icons/spinner.svg" alt="spinner" width={width} height={height} /> */}
            <Image src="/static/icons/loader.svg" alt="Loading..." width={width} height={height} />
            {children}
        </>
    )
}

export default Spinner