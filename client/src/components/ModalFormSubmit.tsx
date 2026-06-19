import { useForm } from '@mantine/form';
import { postOrder } from '../api/fetchObjects';
import { Button, TextInput} from '@mantine/core';


interface IForm {
    name: string;
    phone: string;
}

interface IPropsLocal {
    id: number
}

export default function ModalFormSubmit({ id }: IPropsLocal) {
        const form = useForm<IForm>({
        mode: 'uncontrolled',
        initialValues: {name: '', phone: ''},
        validate:{
            name: (value) => (value.length < 2 ? 'Имя должно иметь хотя бы 2 буквы' : null),
            phone: (value) => (/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/.test(value) ? null : `Невалидный номер`)
        }
    });

    const handleSubmit = (values:IForm) => {
        postOrder(id, values.name, values.phone);
    }

    return (
            <form onSubmit={
                form.onSubmit(handleSubmit)
            }>
                <TextInput label='Имя' placeholder='Ваше имя' key={form.key('name')} {...form.getInputProps('name')} />
                <TextInput label='Номер телефона' placeholder='+7(918)918-91-89' key={form.key('phone')} {...form.getInputProps('phone')} />
                <Button type='submit' mt={'sm'}>Оставить заявку</Button>
            </form>
    )
}