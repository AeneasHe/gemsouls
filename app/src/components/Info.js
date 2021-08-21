import { SearchIcon, ChatAlt2Icon } from '@heroicons/react/outline';
import { useState, useEffect } from 'react'

export default function Info(props) {
    return (
        <div className="flex  p-3 m-3 lg:w-8/12 justify-center ">
            {props.value}
        </div>
    )
}