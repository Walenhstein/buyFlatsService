import { Box, Button, Center, Checkbox, Group, Loader, Text } from "@mantine/core";
import ToggleThemeIcon from "../components/ToggleThemeIcon";
import ToggleSortIcon from "../components/ToggleSortIcon";
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "../store/useAppStore";
import { fetchAllMap } from "../api/fetchObjects";
import { useEffect, useRef, useState } from "react";
import initMap from "../api/ymapsInit";
import type { YMap, YMapFeature } from "@yandex/ymaps3-types";
import useDebounce from "../hooks/useDebounce";


export default function ObjectMap() {

    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<YMap>(null);
    const markersRef = useRef<YMapFeature[]>([]);
    const {type} = useParams()
    const [ searchParams, setSearchParams ] =  useSearchParams();
    const page = searchParams.get('page') || '1';
    const sort = useAppStore((state) => state.sort) || 'desc';
    const roomQuantity = searchParams.get('roomQuantity')?.split(',') || [];
    const location = useLocation();
    const navigator = useNavigate();
    const [markersLoaded, setMarkersLoaded] = useState(false);

    const debounceFilteres = useDebounce({ type, page, sort, roomQuantity}, 500);

    const { data, isLoading, isError, error } = useQuery({
    queryKey: ['data', debounceFilteres.type, debounceFilteres.page, debounceFilteres.sort, debounceFilteres.roomQuantity],
    queryFn: () => fetchAllMap(debounceFilteres.type || 'new', 
        debounceFilteres.page,
        debounceFilteres.sort, 
        debounceFilteres.roomQuantity),
        staleTime: 30000,
        
    });

    
    
    useEffect(() => {
        if (isLoading || !mapRef.current || mapInstance.current) return;

        initMap(mapRef.current).then((map) => {
            mapInstance.current = map;
        })
    },[isLoading])

    useEffect(() => {
        const handleMarkersReady = () => setMarkersLoaded(true);
        window.addEventListener('ymaps3-markers-ready', handleMarkersReady);

        if ((window as any).YMapDefaultMarker) {
            setMarkersLoaded(true);
        }

        return () => window.removeEventListener('ymaps3-markers-ready', handleMarkersReady)
    },[]);

    useEffect(() => {
        if (!mapInstance.current || !data) return;

        markersRef.current.forEach(marker => mapInstance.current?.removeChild(marker));
        markersRef.current = [];

        const YMapDefaultMarker = (window as any).YMapDefaultMarker;
        if (!YMapDefaultMarker){
            console.error("КРИТИКА: Модуль YMapDefaultMarker не найден! Проверь, что в index.html в теге <script> подключено '&import=YMapDefaultMarker'");
            return;
        };

        const objects = Array.isArray(data) ? data : (data as any)?.result?.list || [];

        console.log(objects);

        objects.forEach((obj: any) => {
            if (!obj.coordinates) return;


            const marker = new YMapDefaultMarker({
                coordinates: [Number(obj.coordinates.lng), Number(obj.coordinates.lat)],
                title: obj.title || obj.id,
                subtitle: obj.price ? `${Number(obj.price).toLocaleString()} ₽` : undefined,
                onClick: () => {
                    const targetPath = `/objects/${type || `new`}/map/${obj.id}${location.search}`;
                    navigator(targetPath);
                }
            })
                mapInstance.current?.addChild(marker);
                markersRef.current.push(marker);
        });
    },[data, isLoading, type, location.search, navigator, markersLoaded]);
    
    if (isLoading) return <Center><Text>Loading...</Text><Loader /></Center>
    if (isError) return "ПРОИЗОШЛА КРИТИЧЕСКИ-НЕВЬЕБИЧЕСКАЯ ОШИБКА. ЧИТАЙ, ГОЛОВА " + error.message;

        const searchParamsSet = (values: string[]) => {
        const addressList = new URLSearchParams(searchParams);

        if (values.length === 0) {
            addressList.delete('roomQuantity');
        } else {
            if (values.includes('studio')) {
                addressList.set('roomQuantity', 'studio');
            } else {
            const roomArr = values.join(',')
                addressList.set('roomQuantity', roomArr);
            }
        }
        addressList.set('page', '1');
        setSearchParams(addressList); 
    }


    return (
        <>
            <Group h={130} align='center' justify='start'>
                <Button onClick={() => navigator('/')}>Главная</Button>
                <ToggleThemeIcon />
                <ToggleSortIcon />
               <Checkbox.Group
                onChange={(values) => searchParamsSet(values)}
                value={searchParams.get('roomQuantity')?.split(',') || []}
                >
                <Group>
                {(type === 'new' || 
                type === 'flats' ||
                type === 'rent') && (<Checkbox label='Студия' value={'studio'} />)}
                
                </Group>
                </Checkbox.Group>

                <Checkbox.Group
                    label="Диапазон комнат"
                    styles={{label: {'marginBottom': '10px'}}}
                    disabled ={searchParams.get('roomQuantity') === 'studio' || searchParams.get('roomQuantity') === 'room'}
                    onChange={(values) => searchParamsSet(values)}
                    value={searchParams.get('roomQuantity')?.split(',') || []}
                    >
                    <Group >
                        <Checkbox value={'1'} label='1' />
                        <Checkbox value={'2'} label='2' />
                        <Checkbox value={'3'} label='3' />
                        <Checkbox value={'4'} label='4' />
                        <Checkbox value={'5'} label='5' />
                    </Group>
                </Checkbox.Group>
            </Group>
            <Box ref={mapRef} h={'70vh'}></Box>
            <Outlet />
        </>
    )
}