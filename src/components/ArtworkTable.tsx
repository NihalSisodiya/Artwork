import React, {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import type { Artwork } from "../types/Artwork";
import { fetchArtworks } from "../api/artworks";
import SelectionOverlay from "./SelectionOverlay";
import type { DataTableSelectionMultipleChangeEvent } from "primereact/datatable";


const ArtworkTable: React.FC = () => {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [overlayVisible, setOverlayVisible] = useState<boolean>(false);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchArtworks(page);
            setArtworks(data.data);
            setTotalRecords(data.pagination.total);
        };
        loadData();
    }, [page]);

    const onSelectionChange = (e: DataTableSelectionMultipleChangeEvent<Artwork[]>) => { 
        // e.value contains the current selection array 
        const newSelectedIds = new Set<number>(); 
        (e.value as Artwork[]).forEach((art) => { 
            newSelectedIds.add(art.id); 
        }); 
        setSelectedIds(newSelectedIds); 
    };

    return(
        <div>
            <button onClick={() => setOverlayVisible(true)}>Custom Select</button>
            <SelectionOverlay
                visible={overlayVisible}
                onHide={() => setOverlayVisible(false)}
                artworks={artworks}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
            />
            
            <p style={{margin: "0.5rem 0", fontWeight: "bold"}}>Selected Rows: {selectedIds.size}</p>

            <DataTable
                value={artworks}
                selection={artworks.filter((a) => selectedIds.has(a.id))}
                onSelectionChange={onSelectionChange}
                dataKey="id"
                selectionMode="checkbox"
                stripedRows
                responsiveLayout="scroll"
                showGridlines
                className="p-datatable-sm p-datatable-hover"
            >

                <Column selectionMode="multiple" headerStyle={{width: "3em"}}/>
                <Column field="title" header="Title"/>
                <Column field="place_of_origin" header="Origin"/>
                <Column field="artist_display" header="Artist"/>
                <Column field="inscriptions" header="Inscriptions"/>
                <Column field="date_start" header="Start Date"/>
                <Column field="date_end" header="End Date"/>

            </DataTable>

            <Paginator
                first={(page - 1)*10}
                rows={10}
                totalRecords={totalRecords}
                onPageChange={(e) => setPage(e.page + 1)}
            />
        </div>
    );
};

export default ArtworkTable;