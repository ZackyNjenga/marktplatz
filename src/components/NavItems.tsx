"use client"

import {useEffect, useRef, useState} from "react";
import {PRODUCT_CATEGORIES} from "@/config";
import NavItem from "@/components/NavItem";
import {useOnClickOutside} from "@/hooks/use-on-click-outside";

const NavItems = () => {
    const [activeIndex, setActiveindex] = useState<
        null | number
    >(null)

    useEffect(() => {
        const handler = (e: keyboardEvent) => {
            if(e.key === "Escape") {
                setActiveindex(null)
            }
        }
        document.addEventListener('keydown', handler)

        return () => {
            document.removeEventListener('keydown', handler)
        }
    }, []);
    const isAnyOpen = activeIndex !== null

     const navRef = useRef<HTMLDivElement | null>(null)

    useOnClickOutside(navRef, () => setActiveindex(null))
    return (
        <div className="flex gap-4 h-full" ref={navRef}>
            {PRODUCT_CATEGORIES.map((category, i ) => {
                const handleOpen = () => {
                    if(activeIndex === i) {
                        setActiveindex(null)
                    } else {
                        setActiveindex(i)
                    }
                }

                const isOpen = i === activeIndex
                return (
                    <NavItem
                        category={category}
                        handleOpen={handleOpen}
                        isOpen={isOpen}
                        key={category.value}
                        isAnyOpen={isAnyOpen}
                    />
                )
            })}
        </div>
    )
}

export default NavItems;