import { useQuery } from '@tanstack/react-query';
import { fetchAll } from '../api/fetchObjects';
import { Button, Card, Center, Checkbox, Group, Loader, Pagination, SimpleGrid, Text } from '@mantine/core';
import ObjectCard from '../components/ObjectCard';
import type { ICardObject } from '../types/Interfaces';
import ToggleThemeIcon from '../components/ToggleThemeIcon';
import ToggleSortIcon from '../components/ToggleSortIcon'; 
import { Link, Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router';
import { useAppStore } from '../store/useAppStore';


export default function ObjectBoardPage() {

    const {type} = useParams()
    const [ searchParams, setSearchParams ] = useSearchParams();
    const page = searchParams.get('page') || '1';
    const sort = useAppStore((state) => state.sort) || 'desc';
    const roomQuantity = searchParams.get('roomQuantity')?.split(',') || [];
    const location = useLocation();
    const navigator = useNavigate();

    const { data, isLoading, isError, error } = useQuery({
    queryKey: ['data', type, page, sort, roomQuantity],
    queryFn: () => fetchAll(type || 'new', page, sort, roomQuantity),
        
    })

    if (isLoading) return <Center><Text>Loading...</Text><Loader /></Center>
    if (isError) return "ПРОИЗОШЛА КРИТИЧЕСКИ-НЕВЬЕБИЧЕСКАЯ ОШИБКА. ЧИТАЙ, ГОЛОВА " + error.message;

    const handlePaginationChange = (p: number) => {
        setSearchParams({...Object.fromEntries(searchParams), page: p.toString()});
    }

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

    const objData = data.result?.list;
    if (!objData || objData.length === 0) return (
         <>
            <Group mb={50}>
                <Button onClick={() => navigator('/')}>Главная</Button>
                <Button onClick={() => navigator(`map`)}>Карта</Button>
                <ToggleThemeIcon/>
                <ToggleSortIcon />
            </Group>
            <Center><Card h={60}>Пока здесь нет данных, видимо что-то пошло не по плану, придётся подождать</Card></Center>
         </>
    )
    return (
        <>
            <Group h={130} align='center' justify='start'>
                <Button onClick={() => navigator('/')}>Главная</Button>
                <Button onClick={() => navigator(`map`)}>Карта</Button>
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
                
                {/* {(type === 'new' || 
                type === 'flats' ||
                type === 'rent') && (<Checkbox label='Комната' value={'room'} checked={searchParams.get('roomQuantity') === 'room'}/>)} */}
                </Group>
                </Checkbox.Group>

                <Checkbox.Group
                    label="Диапазон комнат"
                    styles={{label: {'margin-bottom': '10px'}}}
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
            <SimpleGrid minColWidth={250}>
                {objData.map((card: ICardObject) => (
                    <Link key = {card.id} to={`/objects/${type}/${card.id}${location.search}`} style={{textDecoration: 'none'}}><ObjectCard card = {card}/></Link>
                ))}
            </SimpleGrid>
            <Center>
                <Pagination total={Math.ceil(data?.result?.total/20)} value={parseInt(page)} onChange={handlePaginationChange} withEdges boundaries={0} styles={{dots: {display: 'none'}}} mt={20} mb={10}/>
            </Center>
            <Outlet />
        </>
    )
}