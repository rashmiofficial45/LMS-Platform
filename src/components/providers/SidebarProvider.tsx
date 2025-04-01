"use client"; // Directive indicating this is a Client Component in Next.js

import { useContext, createContext, useState } from "react";

// Define the shape of the Sidebar context state and actions
interface SidebarContextType {
    isOpen: boolean; // Represents whether the sidebar is open or closed
    toggle: () => void; // Function to toggle the sidebar state
    close: () => void; // Function to close the sidebar
}

// Create a Context with an undefined default value
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

/**
 * SidebarProvider component that wraps parts of the app where
 * the sidebar state needs to be accessible.
 *
 * @param {React.ReactNode} children - The child components that can access the sidebar context.
 */
export function SidebarProvider({ children }: { children: React.ReactNode }) {
    // Initialize the sidebar state as closed
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle the sidebar open or closed
    const toggle = () => setIsOpen(!isOpen);

    // Function to explicitly close the sidebar
    const close = () => setIsOpen(false);

    return (
        // Provide the sidebar state and actions to the component tree
        <SidebarContext.Provider value={{ isOpen, toggle, close }}>
            {children}
        </SidebarContext.Provider>
    );
}

/**
 * Custom hook to access the Sidebar context.
 * Throws an error if used outside of a SidebarProvider.
 *
 * @returns {SidebarContextType} The sidebar context value.
 */
export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}
