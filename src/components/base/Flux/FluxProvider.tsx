import { createContext, useContext } from "react";

interface FluxProviderProps {
  children: React.ReactNode;
  gutter: number | number[];
}

interface ContextProps {
  gutter: number | number[];
}

const FluxContext = createContext<ContextProps>({ gutter: 0 });
export const useFlux = () => useContext(FluxContext);

const FluxProvider = ({ children, gutter = 0 }: FluxProviderProps) => {
  return <FluxContext.Provider value={{ gutter }}>{children}</FluxContext.Provider>;
};

export default FluxProvider;
