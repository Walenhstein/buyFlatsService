import { Card, Image, NumberFormatter, Badge, Group } from "@mantine/core";
import type { ICardObject } from "../types/Interfaces";

import placeholderImg from '../assets/placeholder.webp';


interface IProps {
    card: ICardObject;
}

export default function ObjectCard(props: IProps) {
    const { card } = props;

    return (
        <Card withBorder>
            <Card.Section>
               <Image h={200} loading="lazy" src={card.photos?.length ? card.photos[0] : placeholderImg} mb={"md"} />
            </Card.Section>
            <Group gap={5}>
                <Badge><strong>Цена:</strong> <NumberFormatter suffix="₽" value={card.price} thousandSeparator=' ' /></Badge>
                {typeof card.floor === 'string' &&(<Badge><strong>Этаж:</strong> {card.floor}</Badge>)}
                {card.complex?.name && (<Badge><strong>ЖК:</strong> {card.complex?.name}</Badge>)} 
                <Badge>{card.address?.street?.name} {card.address?.house}</Badge>
            </Group>
        </Card>
    )
}