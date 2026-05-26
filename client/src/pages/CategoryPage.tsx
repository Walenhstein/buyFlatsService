import { Card, SimpleGrid, Image, Center } from "@mantine/core"
import { Link } from "react-router"
import buisnessIcon from '../assets/icons/buisness.svg';
import countryIcon from '../assets/icons/country.svg';
import flatIcon from '../assets/icons/flats.svg';
import garageIcon from '../assets/icons/garage.svg';
import newIcon from '../assets/icons/new.svg';
import rentIcon from '../assets/icons/rent.svg';
import ToggleThemeIcon from "../components/ToggleThemeIcon";



export default function CategoryPage() {


    return(
        <>
        <ToggleThemeIcon />
        <SimpleGrid minColWidth={200}>
            <Link to='/objects/new?page=1' style={{textDecoration: 'none'}} ><Card withBorder><Image src={newIcon} loading="lazy" /><Center>Новостройка</Center></Card></Link>
            <Link to='/objects/flats?page=1' style={{textDecoration: 'none'}}><Card withBorder><Image src={flatIcon} loading="lazy" /><Center>Вторичка</Center></Card></Link>
            <Link to='/objects/country?page=1' style={{textDecoration: 'none'}}><Card withBorder><Image src={countryIcon} loading="lazy" /><Center>Дом</Center></Card></Link>
            <Link to='/objects/garages?page=1' style={{textDecoration: 'none'}}><Card withBorder><Image src={garageIcon} loading="lazy" /><Center>Гараж</Center></Card></Link>
            <Link to='/objects/rent?page=1' style={{textDecoration: 'none'}}><Card withBorder><Image src={rentIcon} loading="lazy" /><Center>Аренда</Center></Card></Link>
            <Link to='/objects/commerce?page=1' style={{textDecoration: 'none'}}><Card withBorder><Image src={buisnessIcon} loading="lazy" /><Center>Коммерция</Center></Card></Link>
        </SimpleGrid>
        </>
    )

}