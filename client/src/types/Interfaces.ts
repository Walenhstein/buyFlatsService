export interface ICardObject {
    id: number;
    photos: string[];
    title: string;
    price: number;
    floor?: string;
    complex?: {id: number, name: string};
    coordinates: {
        lat: string;
        lng: string;
    };
    address: {
        street: {name: string}
        house: number | string;
    }
}

export interface IAppStore {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    sort: 'asc' | 'desc';
    toggleSort: () => void;
    isStudio: boolean;
    toggleIsStudio: (val: boolean) => void;
    isRoom: boolean;
    toggleIsRoom: (val: boolean) => void;
    isApartment: boolean;
    toggleIsApartment: () => void;
    roomSelectArray: (number | string)[];
    setRoomSelectArray: (value: number) => void;
}
