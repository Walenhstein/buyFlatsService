import { Modal, Text, Grid, Image, Loader, Center, Divider, ScrollArea, GridCol } from "@mantine/core";
import { useNavigate, useParams } from "react-router";
import { Carousel } from '@mantine/carousel';
import { useQuery } from "@tanstack/react-query";
import { fetchId } from "../api/fetchObjects";
import placeholderImg from '../assets/placeholder.webp';

    export default function ObjectPage() {
    
    const navigate = useNavigate();
    const {id, type} = useParams();


    
    const { data, isLoading, isError, error } = useQuery({
            queryKey: ['data', id, type],
            queryFn: () => fetchId(Number(id), type || 'new')
    })
    if (isLoading) return (<Center h={'100vh'}><Loader></Loader></Center>);
    if (isError) return (`Случилась критически въебичаская ошибка` + error);
    const clearData = data.result?.object;
    const photos = clearData.photos;


    return (
        <>
            <Modal opened={true} onClose={() => navigate(-1)} centered size={'75vw'} title={<Text size="xl" fw={600}>Данные объекта</Text>}>
            <Divider mb={10}/>
                <Grid>
                    <GridCol span={{base: 12, md: 6}}>
                    <Carousel withIndicators mah={300} pt={5} styles={{ indicators: {padding: '0px 10px 20px 10px', opacity: '0.3' }, controls: {opacity: '0.3'} }}>
                        {photos.map((url: string) => (
                            <Carousel.Slide key={url}>
                                <Image src={url || placeholderImg} h={300} fit="contain"/>
                            </Carousel.Slide>        
                        ))}
                    </Carousel>
                        </GridCol>
                        <GridCol span={{base: 12, md: 6}}>
                    <Text fw={700}>Описание:</Text>
                    <ScrollArea h={300} type="never" style={{paddingBottom: '20px', paddingTop: '5px', whiteSpace: 'pre-wrap'}}>
                    <Text>{clearData.description}</Text>
                    </ScrollArea>
                        </GridCol>
                    <GridCol span={12}><Divider/></GridCol>
                </Grid>

            </Modal>
        </>
    )
}