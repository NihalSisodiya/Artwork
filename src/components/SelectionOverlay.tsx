import React, {useState} from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import type { Artwork } from "../types/Artwork";

interface Props{
    visible: boolean;
    onHide: () => void;
    artworks: Artwork[];
    selectedIds: Set<number>;
    setSelectedIds: React.Dispatch<React.SetStateAction<Set<number>>>;
}

const SelectionOverlay: React.FC<Props> = ({
    visible,
    onHide,
    artworks,
    selectedIds,
    setSelectedIds,
}) => {
    const [count, setCount] = useState<number>(0);

    const handleSelect = () => {
        if(count <= 0 || count > artworks.length){
            alert("Invalid number of rows for this page");
            return;
        }
        const newSelected = new Set(selectedIds);
        artworks.slice(0, count).forEach((art) => newSelected.add(art.id));
        setSelectedIds(newSelected);
        onHide();
    };

    if(!visible) return null;

    return(
        <OverlayPanel dismissable onHide={onHide}>
            <h3>Custom Row Selection</h3>
            <input type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value))}/>
            <button onClick={handleSelect}>Select</button>
        </OverlayPanel>
    );
};


export default SelectionOverlay;